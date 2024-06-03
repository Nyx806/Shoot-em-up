import { Projectile } from "./Projectile.class.js";
import { SmallLaser } from "./SmallLaser.class.js";
import { BigLaser } from "./BigLaser.class.js";

export class Player {
    constructor(game) {
        this.game = game;
        this.width = 60;
        this.height = 77;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
        this.speed = 3;
        this.image = document.getElementById('sans');

        this.projectilePool = [];
        this.numberOfProjectile = 10;
        this.createProjectiles();
        
        // super weapons
        this.smallLaser = new SmallLaser(this.game);
        this.bigLaser = new BigLaser(this.game);
        this.energy = 50 ;
        this.maxEnergy = 100;
        this.cooldown = false;
        
        // player lives 
        this.lives = 3;
        this.maxLives = 10;
    }
    draw(context) {
        if(this.game.keys.indexOf('z') > -1 || this.game.keys.indexOf('Z') > -1){
            this.smallLaser.render(context);
        }else if (this.game.keys.indexOf('e') > -1 || this.game.keys.indexOf('E') > -1){
            this.bigLaser.render(context);
        }
        context.drawImage(this.image,this.x, this.y, this.width,this.height);
    }
    update() {
        //energy
        if(!this.game.start){

            if(this.energy < this.maxEnergy) this.energy += 0.03;
        }
        if(this.energy < 1 )this.cooldown = true;
        else if (this.energy > this.maxEnergy * 0.2)this.cooldown = false;
        // horizontal movement
        if (this.game.keys.indexOf('ArrowLeft') > -1) this.x -= this.speed;
        if (this.game.keys.indexOf('ArrowRight') > -1) this.x += this.speed;
        // horizontal boundaries
        if (this.x < -this.width * 0.5) this.x = -this.width * 0.5;
        else if (this.x > this.game.width - this.width * 0.5) this.x = this.game.width - this.width * 0.5;

    }
    shoot() {
        const projectile = this.getProjectile();
        if (projectile) projectile.start(this.x + this.width * 0.5, this.y);
    }
    // create projectiles object pool 
    createProjectiles() {
        for (let i = 0; i < this.numberOfProjectile; i++) {
            this.projectilePool.push(new Projectile());
        }
    }
    // get a free projectile from the pool
    getProjectile() {
        for (let i = 0; i < this.projectilePool.length; i++) {
            if (this.projectilePool[i].free) return this.projectilePool[i];
        }
    }
    showProjectiles(context) {
        this.projectilePool.forEach(projectile => {
            projectile.update();
            projectile.draw(context);
        });
    }
    restart() {
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
        this.lives = 3;
    }
}
