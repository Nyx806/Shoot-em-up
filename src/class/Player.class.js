import { Projectile } from "./Projectile.class.js";

export class Player {
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = this.game.width * 0.5 - this.width *0.5;    
        this.y = this.game.height - this.height;
        this.speed = 7;
        
        this.projectilePool = [];
        this.numberOfProjectile = 10;
        this.createProjectiles();
        console.log(this.projectilePool);
    }
    draw(context){
        // context.fillStyle = 'blue';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    update(){
        // horizontal movement
        if (this.game.keys.indexOf('ArrowLeft') > -1) this.x -= this.speed;
        if (this.game.keys.indexOf('ArrowRight') > -1)this.x += this.speed;
        // horizontal boundaries
        if (this.x < -this.width *0.5) this.x = -this.width *0.5;
        else if (this.x > this.game.width - this.width * 0.5) this.x = this.game.width - this.width*0.5;

    }
    shoot(){
       const projectile = this.getProjectile();
        if (projectile) projectile.start(this.x + this.width*0.5, this.y);
        console.log(this.x, this.y, projectile.free); 
    }
        // create projectiles object pool 
    createProjectiles(){
        for (let i = 0; i < this.numberOfProjectile; i++){
            this.projectilePool.push(new Projectile());
        }
    }
    // get a free projectile from the pool
    getProjectile(){
        console.log("entré dans la methode getProjectile");
        for( let i = 0; i <this.projectilePool.length ; i++){
            if( this.projectilePool[i].free) return this.projectilePool[i];
        }
    }
    showProjectiles(context){
        this.projectilePool.forEach(projectile => {
            projectile.update();
            projectile.draw(context);
        })
    }
}