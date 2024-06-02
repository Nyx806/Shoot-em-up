
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
    }
    create(){
        console.log("methode creation des enemies");
        for (let y = 0; y < this.game.rows; y++){
            console.log("première boucle de creation des enemies creation des enemies");
            for (let x = 0; x < this.game.columns; x++){
                console.log("boucle creation des enemies");
                let enemyX = x * this.game.enemySize;
                let enemyY = y * this.game.enemySize;
                if (Math.random() < 0.4 ){
                    this.enemies.push(new Chara(this.game, enemyX,enemyY));   
                }else {
                    this.enemies.push(new Flowey(this.game, enemyX,enemyY));
                }
            }
                
        }
        console.log(this.enemies)
    }
}