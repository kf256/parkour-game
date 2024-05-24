const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// time of the last update
let time;

// time between the updates
let delay;

// position and velocity of the player character
let posX = 0;
let posY = 0;
let velX = 0;
let velY = 0;

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
        ctx.fillRect(this.x, this.y, 1, 1);
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
    new Obstacle(0, 2);
    
    time = Date.now();
    
    // time to start the game: draw the very first frame
    update();
}

// this function draws every frame
function update() {
    // calculate the time between the last and this update
    delay = Date.now()-time;
    delay /= 1000; // convert to seconds
    
    // save this update's time
    time = Date.now();
    
    // clear everything that was visible before
    ctx.clearRect(0, 0, canvas.width/50, canvas.height/50);
    
    // draw the obstacles
    Obstacle.draw();
    
    // calculate gravitation
    velY += delay;
    
    // update the position
    posX += velX*delay;
    posY += velY*delay;
    
    // draw the player character
    ctx.fillStyle = "yellow";
    ctx.fillRect(posX, posY, 1, 1);
    
    // call update() again for the next frame
    requestAnimationFrame(update);
}

// resize the canvas to fill the entire screen
function updateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // scale the contents of the canvas to make drawing easier
    ctx.scale(50);
}