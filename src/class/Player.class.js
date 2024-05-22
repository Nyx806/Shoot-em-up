
export class Player {
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = this.game.width * 0.5 - this.width *0.5;    
        this.y = this.game.height - this.height;
        this.speed = 5;
    }
    draw(context){
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    update(){
        // horizontal movement
        if (this.game.keys.indexOf('ArrowLeft') > -1) this.x -= this.speed;
        if (this.game.keys.indexOf('ArrowRight') > -1)this.x += this.speed;
        // horizontal boundaries
        if (this.x < 0) this.x = 0;
        else if (this.x + this.width > this.game.width) this.x = this.game.width - this.width;

    }
}