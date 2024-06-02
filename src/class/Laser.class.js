import { Boss } from "./Boss.class.js";

export class Laser {
    constructor(game){
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.height = this.game.height - 50;
    }
    render(context){
        this.x = this.game.player.x + this.game.player.width * 0.5 - this.width * 0.5;
        
        this.game.player.energy -= this.damage;

        context.save();
        context.fillstyle = 'gold';
        context.fillRect(this.x,this.y,this.width,this.height);
        context.restore();

        if (this.game.spriteUpdate){

            this.game.wave.forEach(wave => {
                wave.enemies.forEach(enemy => {
                    if (this.game.checkCollision(enemy,this)){
                        enemy.hit(this.damage);
                    }
                })
            });
    
            this.game.bossArray.forEach(boss => {
                if(this.game.checkCollision(boss,this) && boss.y > 0){
                    boss.hit(this.damage);
                }
            })
        }


    }

}