const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// position of the player character
let posX = 0;
let posY = 0;

class Obstacle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        
        this.index = Obstacle.list.length;
        Obstacle.list.push(this);
    }
    draw() {
        // will be embellished later
        ctx.fillStyle = "black";
        ctx.fillRect(this.x*50, this.y*50, 50, 50);
    }
    
    static list = [];
    static draw() {
        for (let i = 0; i < this.list.length; i++) this.list[i].draw();
    }
}

main();

function main() {
    // set the correct size of the canvas
    updateCanvasSize();
    // update the size whenever the page is resized
    addEventListener("resize", updateCanvasSize);
    
    // add a first obstacle
    new Obstacle(0, 1);
    
    // time to start the game: draw the very first frame
    update();
}

// this function draws every frame
function update() {
    // clear everything that was visible before
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // draw the obstacles
    Obstacle.draw();
    
    // draw the player character
    ctx.fillStyle = "yellow";
    ctx.fillRect(posX, posY, 50, 50);
    
    // call update() again for the next frame
    requestAnimationFrame(update);
}

// resize the canvas to fill the entire screen
function updateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}