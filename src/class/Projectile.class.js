
export class Projectile {
    constructor(){
        this.width = 4;
        this.height = 20;
        this.x = 0;
        this.y = 0;
        this.speed = 20;
        this.free = true;
    }
    draw(context){
        if (!this.free){
            context.fillStyle = 'white';
            context.fillRect(this.x,this.y,this.width, this.height)
        }
    }
    update(){
        if (!this.free){
            this.y -= this.speed;
            if (this.y < -this.height) this.restart(); 
        }
    }
    start(x,y){
        this.x = x - this.width * 0.5;
        this.y = y;
        this.free = false;
        console.log("la valeur de free est : " + this.free)
    }
    restart(){
        this.free = true;
    }
}