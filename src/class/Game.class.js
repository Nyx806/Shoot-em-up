
import { Player } from './Player.class.js';

export class Game {

    constructor(canvas) {
        this.canvas = canvas;  
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.keys = [];
        this.Player = new Player(this);

        window.addEventListener('keydown', e =>{
            if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
            console.log(this.keys);
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
    }
}