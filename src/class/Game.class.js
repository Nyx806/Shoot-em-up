
import { Player } from './Player.class.js';

export class Game {

    constructor(canvas) {
        this.canvas = canvas;  
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.Player = new Player(this);
    }
    render(context){
        this.Player.draw(context);
        this.Player.update();
    }
}