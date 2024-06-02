

export class Boss {
    constructor(game, bossLives){
        this.game = game;
        this.width = 175;
        this.height = 229;
        this.x = this.game.width * 0.5 - this.width *0.5;
        this.y = -this.height;
        this.speedX = 1;
        this.speedY = 0;
        this.lives = bossLives; 
        this.maxLives = this.lives;
        this.markedForDeletion = false;
        this.image = document.getElementById('Undyne');
    }
    draw(context){
        context.drawImage(this.image,0,0,this.width,this.height,this.x, this.y,this.width,this.height);
        
        // lives 
        if (this.lives > 0){
            context.save();
            context.fillText(this.lives, this.x + this.width * 0.54,this.y + 100);
            context.restore();    
        }
    }
    update(){
        this.speedY = 0;

        if (this.y < 0) this.y += 4;
        if (this.x < 0 || this.x > this.game.width - this.width){
            this.speedX *= -1;
            this.speedY = this.height*0.5;
        }
        this.x += this.speedX;
        this.y += this.speedY; 
        
         // collision detection boss - projectile
        this.game.player.projectilePool.forEach(projectile => {
            if ( this.game.checkCollision(this, projectile) && !projectile.free && this.lives > 0){
                 this.hit(1);
                 projectile.restart();
             }
        });

        // collision boss - player
            if (this.game.checkCollision(this,this.game.player) && this.lives > 0){
                this.game.gameOver = true;
                this.speedX = 0;
                this.speedY = 0;

            }
        // boss destroyed 
        if (this.lives < 1){
            this.markedForDeletion = true;
            this.game.score += this.maxLives;
            this.game.bossLives += 5;
            if (!this.game.gameOver) this.game.newWave();
        }

        // lose condition
        if (this.y + this.height > this.game.height) this.game.gameOver = true;
        
    }
    hit(damage){
        this.lives -= damage;
    }

}