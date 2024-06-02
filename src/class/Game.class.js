
import { Player } from "./Player.class.js";
import { Wave } from './Wave.class.js'
import { Boss } from "./Boss.class.js";

export  class Game {

    constructor(canvas) {
        this.canvas = canvas;  
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.keys = [];
        this.player = new Player(this);
        
        // settings wave 
        this.columns = 2;
        this.rows = 2;
        this.enemySize = 60;

        // creation wave 
        this.wave = [];
        this.waveCount = 1;

        // score
        this.score = 0;
        this.gameOver = false;

        // start 
        this.start = true;

        this.fired = false;

        this.bossArray = [];
        this.bossLives = 10;
        this.restart();

        //framerate 
        this.spriteUpdate = false;
        this.spriteTimer = 0;
        this.spriteInterval = 150;
        
        


        window.addEventListener('keydown', e =>{
            if(!this.start){
                if(e.key ==='a'&& !this.fired) this.player.shoot();
                this.fired = true;
                if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
                if(e.key ==='r' && this.gameOver) this.restart();
            }

            if(e.key ==='Enter' && this.start) {
                this.start = false;
                this.restart(); 
            } 
        })
        window.addEventListener('keyup', e =>{
            this.fired = false;
           const index = this.keys.indexOf(e.key);
           if (index >-1) this.keys.splice(index, 1); 
        })

    }
    render(context, deltaTime){
        // sprite timing 
        if (this.spriteTimer > this.spriteInterval){
            this.spriteUpdate = true;
            this.spriteTimer = 0;
        }else {
            this.spriteUpdate = false;
            this.spriteTimer += deltaTime;
        }

        this.drawStatusText(context);
        this.bossArray.forEach(boss => {
            boss.draw(context);
            boss.update();
        })
        this.bossArray = this.bossArray.filter(object => !object.markedForDeletion);
        this.player.draw(context);
        this.player.update();
        this.player.showProjectiles(context);
        this.wave.forEach( wave =>{
            wave.render(context);
            if (wave.enemies.length < 1 && !wave.nextWaveTrigger && !this.gameOver){
                this.newWave();
                wave.nextWaveTrigger = true;
                
            }
        })
    }
    // collision detection between 2 retangles 
    checkCollision(a,b){
        return(
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        )
    }
    drawStatusText(context){
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'black';
        context.fillText('Score : '+ this.score, 20,40)
        context.fillText('wave : '+ this.waveCount, 20,80)
        for(let i = 0;i < this.player.lives;i++){
            context.fillRect(20 + 10*i, 100,5,20);
        }
        // energy 
        context.save();
        this.player.cooldown ? context.fillStyle = 'red' : context.fillStyle = 'gold';
        for(let i = 0; i < this.player.energy; i++){
            context.fillRect(20 + 2 * i, 130, 2, 15);
        }
        context.restore();

        if (this.start){
            context.textAlign = 'center';
            context.font = '100px Impact'
            context.fillText('WELCOME', this.width * 0.5, this.height * 0.5)
            context.font = '20px Impact'
            context.fillText('Press Enter to start', this.width * 0.5, this.height * 0.5 + 30)
            context.fillText('left arrow : move left', this.width * 0.5, this.height * 0.5 + 60)
            context.fillText('right arrow : move right', this.width * 0.5, this.height * 0.5 + 80)
            context.fillText('a : little projectiles', this.width * 0.5, this.height * 0.5 + 100)
            context.fillText('z : small laser', this.width * 0.5, this.height * 0.5 + 120)
            context.fillText('e : big laser', this.width * 0.5, this.height * 0.5 + 140)
        }

        if(this.gameOver){
            context.textAlign = 'center';
            context.font = '100px Impact'
            context.fillText('GAME OVER!', this.width * 0.5, this.height * 0.5)
            context.font = '20px Impact'
            context.fillText('Press R to restart', this.width * 0.5, this.height * 0.5 + 30)
        }
        context.restore();
    }
    newWave(){
        this.waveCount++
        if (this.player.lives < this.player.maxLives) this.player.lives++;
        // boss aparition 
        if (this.waveCount % 3 === 0){
            this.bossArray.push(new Boss(this, this.bossLives));
        }else {
            if (Math.random() < 0.5 && this.columns * this.enemySize < this.width * 0.8){
                this.columns++;
            }else if( this.rows * this.enemySize < this.height * 0.6) {
                this.rows++
            }      
            this.wave.push(new Wave(this));
        }

        this.wave = this.wave.filter(object => !object.markedForDeletion);
    }
    restart(){
        if(!this.start){
            this.player.restart();
    
            this.columns = 2;
            this.rows = 2;
            // creation wave 
            this.wave = [];
            this.wave.push(new Wave(this));
            this.waveCount = 1;
            //boss
            this.bossArray = [];
            // score
            this.score = 0;
            this.gameOver = false;
        }

    }
}