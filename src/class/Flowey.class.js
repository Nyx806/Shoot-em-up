import { Enemy } from "./Enemy.class.js";

export class Flowey extends Enemy {
    constructor(game, positionX, positionY){
        super(game, positionX, positionY);
        this.image = document.getElementById('flowey');
        this.lives = 4;
        this.maxLives = this.lives;
    }
}