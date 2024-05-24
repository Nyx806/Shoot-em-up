
import { Game } from "./class/Game.class.js";

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 800;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.font = '40px Impact';
    const game = new Game(canvas);

    function Animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(ctx);
        
        requestAnimationFrame(Animate);
    }
    Animate();

}); 