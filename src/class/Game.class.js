
import { Player } from './Player.class.js';
import { Wave } from './Wave.class.js'

export  class Game {

    constructor(canvas) {
        this.canvas = canvas;  
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.keys = [];
        this.Player = new Player(this);
        
        // settings wave 
        this.columns = 3;
        this.rows = 3;
        this.enemySize = 60;

        // creation wave 
        this.wave = [];
        this.wave.push(new Wave(this));
        
        


        window.addEventListener('keydown', e =>{
            if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
            console.log(e.key)
            if(e.key ==='a') this.Player.shoot();
        })
        window.addEventListener('keyup', e =>{
           const index = this.keys.indexOf(e.key);
           if (index >-1) this.keys.splice(index, 1);
            console.log(this.keys);
            
        })

    }
    render(context){
        this.Player.draw(context);
        this.Player.update();
        this.Player.showProjectiles(context);
        this.wave.forEach( wave =>{
            wave.render(context);
        })

    }
}