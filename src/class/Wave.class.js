
import { Chara } from './Chara.class.js';
import { Flowey } from './Flowey.class.js';

export class Wave{
    constructor(game){
        this.game = game;
        this.width = this.game.columns * this.game.enemySize;
        this.height = this.game.rows * this.game.enemySize;
        this.x = 0;
        this.y= -this.height;
        this.speedX = 1;
        this.speedY = 0;
        this.nextWaveTrigger = false; 
        this.enemies = [];
        this.markedForDeletion = false;
        this.create();
    }
    render(context){
        if (this.y < 0) this.y +=5;
        this.speedY = 0;
        if (this.x < 0 || this.x > this.game.width - this.width){
            this.speedX *= -1;
            this.speedY = this.game.enemySize;
        }
        this.x +=this.speedX;
        this.y +=this.speedY
        this.enemies.forEach(enemy => {
            enemy.update(this.x,this.y,this.game.player);
            enemy.draw(context);
        })
        this.enemies = this.enemies.filter(object => !object.markedForDeletion);
        // clean unused tab 
        if (this.enemies.length <= 0) this.markedForDeletion = true;
    }
    create(){
        for (let y = 0; y < this.game.rows; y++){
            for (let x = 0; x < this.game.columns; x++){
                let enemyX = x * this.game.enemySize;
                let enemyY = y * this.game.enemySize;
                if (Math.random() < 0.4){
                    this.enemies.push(new  Flowey(this.game, enemyX,enemyY));
                }else {
                    this.enemies.push(new  Chara(this.game, enemyX,enemyY));
                }
            }
                
        }
    }
}