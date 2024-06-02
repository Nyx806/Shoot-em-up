 

export class Enemy {
    constructor(game, positionX, positionY){
        this.game = game;
        this.width = this.game.enemySize;
        this.height = this.game.enemySize;
        this.x = 0;
        this.y = 0;
        this.positionX = positionX;
        this.positionY = positionY;
        this.markedForDeletion = false;
    }
    draw(context){
        // context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image,0,0,20,30,this.x, this.y, this.width,this.height);
    }
    update(x,y,player){
        this.x = x + this.positionX;
        this.y = y  + this.positionY; 
        // check collision enemies - projectiles
        player.projectilePool.forEach( projectile => {
            if (!projectile.free && this.game.checkCollision(this,projectile)){
                this.hit(1);
                projectile.restart();
            }
        });

        if (this.lives < 1){
            this.markedForDeletion = true;
            if(!this.game.gameOver){
                this.game.score += this.maxLives;
                if(!this.game.player.cooldown) this.game.player.energy += this.maxLives;
            }
        }

        // collision enemies - player
        if (this.game.checkCollision(this,this.game.player)){
            this.markedForDeletion = true;
            if (!this.game.gameOver && this.game.score > 0){
                this.game.score--;  
            } 
            this.game.player.lives--;
            if (this.game.player.lives < 1){
                this.game.gameOver = true;
            } 
        }
        // lose condition
        if (this.y +this.height > this.game.height){
            this.game.gameOver = true;
            this.markedForDeletion = true;
        }
    }
    hit (damage){
        this.lives -= damage;
    }
}