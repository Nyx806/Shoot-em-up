
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
        this.columns = 4;
        this.rows = 4;
        this.enemySize = 60;

        // creation wave 
        this.wave = [];
        this.wave.push(new Wave(this));
        
        // score
        this.score = 0;
        this.gameOver = false;
        this.waveCount = 1;
        this.lives = 4;
        


        window.addEventListener('keydown', e =>{
            if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
            console.log(e.key)
            if(e.key ==='a') this.player.shoot();
        })
        window.addEventListener('keyup', e =>{
           const index = this.keys.indexOf(e.key);
           if (index >-1) this.keys.splice(index, 1);
            console.log(this.keys);
            
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
                if (this.lives < 6) this.lives++;
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
        for(let i = 0;i < this.lives;i++){
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
}