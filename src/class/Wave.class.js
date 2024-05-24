
import { Enemy } from './Enemy.class.js'

export class Wave{
    constructor(game){
        this.game = game;
        this.width = this.game.columns * this.game.enemySize;
        this.height = this.game.rows * this.game.enemySize;
        this.x = 0;
        this.y= -this.height;
        this.speedX = 3;
        this.speedY = 0;
        this.enemies = [];
        this.create();
    }
    render(context){
        if (this.y < 0) this.y +=5;
        this.speedY = 0;
        context.strokeRect(this.x,this.y,this.width, this.height);
        if (this.x < 0 || this.x > this.game.width - this.width){
            this.speedX *= -1;
            this.speedY = this.game.enemySize;
        }
        this.x +=this.speedX;
        this.y +=this.speedY
        this.enemies.forEach(enemy => {
            enemy.update(this.x,this.y);
            enemy.draw(context);
        })
    }
    create(){
        console.log("methode creation des enemies");
        for (let y = 0; y < this.game.rows; y++){
            console.log("première boucle de creation des enemies creation des enemies");
            for (let x = 0; x < this.game.columns; x++){
                console.log("boucle creation des enemies");
                let enemyX = x * this.game.enemySize;
                let enemyY = y * this.game.enemySize;
                this.enemies.push(new Enemy(this.game, enemyX,enemyY));
            }
        }
    }
}