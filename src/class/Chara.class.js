
import { Enemy } from './Enemy.class.js'

export class Chara extends Enemy {
    constructor(game, positionX, positionY){
        super(game, positionX, positionY);
        this.image = document.getElementById('chara');
        this.lives = 1;
        this.maxLives = this.lives;
    }
}