
import { Laser } from "./Laser.class.js";

export class BigLaser extends Laser{
    constructor(game){ 
        super(game);
        this.width = 25;
        this.damage = 0.7;
    }
    render(context){
        if(this.game.player.energy > 1 && !this.game.player.cooldown){
            super.render(context);
        }
    }
}