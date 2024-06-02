
import { Enemy } from './Enemy.class.js'

export class Chara extends Enemy {
    constructor(game, positionX, positionY){
        super(game, positionX, positionY);
        this.image = document.getElementById('chara');
        this.frameX = 0;
        this.frameY = 0;
    }
}