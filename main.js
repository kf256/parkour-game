import {arrows} from "./keys.js";
import {Obstacle} from "./obstacle.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// time of the last update
let time;

// time between the updates
let delay;

// object containing information about the player character
let player = {
    posX: 0,
    posY: 0,
    velX: 0,
    velY: 0,
    touching: {
        up: false,
        down: false,
        left: false,
        right: false,
    },
    climb: false,
};

// test
addEventListener("click", () => player.climb = true);

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
    if (delay > 0.2) delay = 0.2; // limit the delay, so the game pauses when the tab is inactive
    
    // save this update's time
    time = Date.now();
    
    // calculate gravitation
    player.velY += delay*2;
    
    // update the position
    player.posX += player.velX*delay;
    player.posY += player.velY*delay;
    
    // reset player.touching
    player.touching = {
        up: false,
        down: false,
        left: false,
        right: false,
    };
    
    // calculate collisions with the obstacles and update player.touching
    Obstacle.checkCollisions(player);
    
    // control the speed by using the keys
    if (arrows.left) {
        if (player.climb) {
            if (player.touching.left) player.velX = -3;
            if (player.touching.up || player.touching.down) if (player.velX > -1) player.velX -= delay*5;
        } else {
            if (player.touching.up) if (player.velX > -1) player.velX -= delay*5;
        }
    }
    if (arrows.right) {
        if (player.climb) {
            if (player.touching.right) player.velX = 3;
            if (player.touching.up || player.touching.down) if (player.velX < 1) player.velX += delay*5;
        } else {
            if (player.touching.up) if (player.velX < 1) player.velX += delay*5;
        }
    }
    if (arrows.up) {
        if (player.climb) {
            if (player.touching.up) player.velY = -3;
            if (player.touching.left || player.touching.right) if (player.velY > -1) player.velY -= delay*5;
        } else {
            if (player.touching.up) player.velY = -3;
        }
    }
    if (arrows.down) {
        if (player.climb) {
            if (player.touching.down) player.velY = 3;
            if (player.touching.left || player.touching.right) if (player.velY < 1) player.velY += delay*5;
        }
    }
    
    // simulate friction
    if (player.climb) {
        if (player.touching.up || player.touching.down) {
            player.velX /= 5**delay;
        }
        if (player.touching.left || player.touching.right) {
            player.velY /= 5**delay;
        }
    } else {
        if (player.touching.up) {
            player.velX /= 5**delay;
        }
    }
    
    // draw everything
    draw();
    
    // call update() again for the next frame
    requestAnimationFrame(update);
}
function draw() {
    // clear everything that was visible before
    ctx.clearRect(0, 0, canvas.width/50, canvas.height/50);
    
    // draw the obstacles
    Obstacle.draw(ctx);
    
    // draw the player character
    ctx.fillStyle = "yellow";
    ctx.fillRect(player.posX, player.posY, 1, 1);
}

// resize the canvas to fill the entire screen
function updateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // scale the contents of the canvas to make drawing easier
    ctx.scale(50, 50);
}