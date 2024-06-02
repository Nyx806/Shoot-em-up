import { Projectile } from "./Projectile.class.js";


export class Player {
    constructor(game) {
        this.game = game;
        this.width = 60;
        this.height = 77;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
        this.speed = 7;
        this.image = document.getElementById('sans');

        this.projectilePool = [];
        this.numberOfProjectile = 10;
        this.createProjectiles();
        console.log(this.projectilePool);

        this.lives = 3;
    }
    draw(context) {
        
        context.drawImage(this.image,this.x, this.y, this.width,this.height);
    }
    update() {
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
        console.log(this.x, this.y, projectile.free);
    }
    // create projectiles object pool 
    createProjectiles() {
        for (let i = 0; i < this.numberOfProjectile; i++) {
            this.projectilePool.push(new Projectile());
        }
    }
    // get a free projectile from the pool
    getProjectile() {
        console.log("entré dans la methode getProjectile");
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