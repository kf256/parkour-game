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
    get borders() {
        return {
            left:  this.list[i].x,
            right: this.list[i].x+1,
            up:    this.list[i].y,
            down:  this.list[i].y+1,
        };
    }
    dist(x, y) {
        const borders = this.borders;
        return {
            left:  borders.left-x,
            right: x-borders.right,
            up:    borders.up-y,
            down:  y-borders.down,
        };
    }
    draw() {
        // will be embellished later
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, 1, 1);
    }
    checkCollisions() {
        const borders = this.list[i].borders;
        
        /*
        // continue if the position is not within the obstacle
        if (x < borders.left ) continue; // too far left
        if (x > borders.right) continue; // too far right
        if (y < borders.up   ) continue; // too far up
        if (y > borders.down ) continue; // too far down
        */
        
        const dist = this.list[i].dist(posX, posY);
        let maxDist = Math.max(...Object.values(dist));
        if (maxDist > 0) return;
        
        let minDist = Math.min(...Object.values(dist));
        
        switch (minDist) {
            case dist.top: {
                posY -= dist.top;
                speedY = 0;
                break;
            }
            case dist.bottom: {
                posY += dist.bottom;
                speedY = 0;
                break;
            }
            case dist.left: {
                posX -= dist.left;
                speedX = 0;
                break;
            }
            case dist.right: {
                posX += dist.right;
                speedX = 0;
                break;
            }
        }
    }
    
    static list = [];
    static draw() {
        for (let i = 0; i < this.list.length; i++) this.list[i].draw();
    }
    static checkCollisions() {
        for (let i = 0; i < this.list.length; i++) this.list[i].checkCollisions();
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
    
    // calculate gravitation
    velY += delay;
    
    // update the position
    posX += velX*delay;
    posY += velY*delay;
    
    // calculate collisions with the obstackles
    Obstacle.checkCollisions();
    
    // draw everything
    draw();
    
    // call update() again for the next frame
    requestAnimationFrame(update);
}
function draw() {
    // clear everything that was visible before
    ctx.clearRect(0, 0, canvas.width/50, canvas.height/50);
    
    // draw the obstacles
    Obstacle.draw();
    
    // draw the player character
    ctx.fillStyle = "yellow";
    ctx.fillRect(posX, posY, 1, 1);
}

// resize the canvas to fill the entire screen
function updateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // scale the contents of the canvas to make drawing easier
    ctx.scale(50, 50);
}