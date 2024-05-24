
import { Player } from './Player.class.js';
import { Wave } from './Wave.class.js'

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
        this.wave.push(new Wave(this));
        this.waveCount = 1;

        // score
        this.score = 0;
        this.gameOver = false;

        this.fired = false;
        
        


        window.addEventListener('keydown', e =>{
            if(e.key ==='a'&& !this.fired) this.player.shoot();
            this.fired = true;
            if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
            if(e.key ==='r' && this.gameOver) this.restart();
        })
        window.addEventListener('keyup', e =>{
            this.fired = false;
           const index = this.keys.indexOf(e.key);
           if (index >-1) this.keys.splice(index, 1);

            
        })

    }
    render(context){
        this.drawStatusText(context);
        this.player.draw(context);
        this.player.update();
        this.player.showProjectiles(context);
        this.wave.forEach( wave =>{
            wave.render(context);
            if (wave.enemies.length < 1 && !wave.nextWaveTrigger && !this.gameOver){
                this.newWave();
                this.waveCount++
                wave.nextWaveTrigger = true;
                if (this.player.lives < 6) this.player.lives++;
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
        context.fillText('Score : '+ this.score, 20,40)
        context.fillText('wave : '+ this.waveCount, 20,80)
        for(let i = 0;i < this.player.lives;i++){
            context.fillRect(20 + 10*i, 100,5,20);
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
        if (Math.random() < 0.5 && this.columns * this.enemySize < this.width * 0.8){
            this.columns++;
        }else if( this.rows * this.enemySize < this.height * 0.6) {
            this.rows++
        }      
        this.wave.push(new Wave(this));
    }
    restart(){
        this.player.restart();

        this.columns = 2;
        this.rows = 2;
        // creation wave 
        this.wave = [];
        this.wave.push(new Wave(this));
        this.waveCount = 1;
        
        // score
        this.score = 0;
        this.gameOver = false;

    }
}