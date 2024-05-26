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
    
    // get the borders of the obstacle
    get borders() {
        return {
            left:  this.x,
            right: this.x+1,
            up:    this.y,
            down:  this.y+1,
        };
    }
    
    // get the distance between the player and the obstacle in all four directions
    get dist() {
        const borders = this.borders;
        return {
            left:  borders.left-(posX+1),
            right: (posX)-borders.right,
            up:    borders.up-(posY+1),
            down:  (posY)-borders.down,
        };
    }
    
    // draw the obstacle
    draw() {
        // will be embellished later
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, 1, 1);
    }
    
    // calculate collisions of the player with the obstacle
    checkCollisions() {
        const dist = this.dist;
        let maxDist = Math.max(...Object.values(dist));
        
        // return if the player character is not touching the obstacle
        if (maxDist > 0) return;
        
        // see which side of the obstacle the player collided with
        switch (maxDist) {
            case dist.up: {
                posY += dist.up;
                velY = 0;
                break;
            }
            case dist.down: {
                posY -= dist.down;
                velY = 0;
                break;
            }
            case dist.left: {
                posX += dist.left;
                velX = 0;
                break;
            }
            case dist.right: {
                posX -= dist.right;
                velX = 0;
                break;
            }
        }
    }
    
    static list = []; // list containing all the obstacles
    static draw() { // draw all obstacles
        for (let i = 0; i < this.list.length; i++) this.list[i].draw();
    }
    static checkCollisions() { // calculate collisions of the player with obstacles
        for (let i = 0; i < this.list.length; i++) this.list[i].checkCollisions();
    }
}

main();

function main() {
    // set the correct size of the canvas
    updateCanvasSize();
    // update the size whenever the page is resized
    addEventListener("resize", updateCanvasSize);
    
    // add some obstacles
    new Obstacle(0, 2);
    new Obstacle(3, 1);
    new Obstacle(2, 3);
    new Obstacle(4, 5);
    new Obstacle(6, 3);
    new Obstacle(8, 2);
    
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

addEventListener("keydown", (evt) => {
    switch (evt.key) {
        case "ArrowLeft": {
            if (velX > -1) velX -= delay;
            break;
        }
        case "ArrowRight": {
            if (velX < 1) velX += delay;
            break;
        }
        case "ArrowUp": {
            if (velY > -1) velY -= delay;
            break;
        }
        case "ArrowDown": {
            if (velY < 1) velY += delay;
            break;
        }
    }
});