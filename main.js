import {arrows} from "./control.js";
import {Obstacle} from "./obstacle.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// time of the last update
let time;

// time between the updates
let delay;

// object containing information about the player character
let player = {
    posX: 1,
    posY: 1,
    velX: 0,
    velY: 0,
    width: 0.9,
    height: 1.9,
    touching: {
        up: false,
        down: false,
        left: false,
        right: false,
    },
    climb: false,
};

let gravitation = 10;
let friction = 3;
let jumpSpeed = 7; // speed at the beginning of a jump
let controlAcceleration = 20; // controls how fast the player can accelerate without jumping

// position and size of the target
let target = {
    posX: 10,
    posY: 11,
    width: 1,
    height: 1,
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
    new Obstacle( 1,  3,  2,  1);
    new Obstacle( 4,  2,  1,  2);
    new Obstacle( 2,  4,  3,  1);
    new Obstacle( 4,  5,  4,  1);
    new Obstacle( 7,  4,  1,  2);
    new Obstacle( 8,  3,  1,  2);
    new Obstacle( 0,  0,  1, 14);
    new Obstacle(12,  0,  1, 14);
    new Obstacle( 4,  9,  9,  1);
    new Obstacle( 1, 11,  1,  2);
    new Obstacle(10,  7,  1,  2);
    new Obstacle(11,  5,  1,  4);
    new Obstacle( 1, 13, 11,  1);
    
    // calculate target.borders
    target.borders = {
        left:  target.posX,
        right: target.posX+target.width,
        up:    target.posY,
        down:  target.posY+target.height,
    };
    
    time = Date.now();
    
    // start updating the positions
    update();
    
    // time to start the game: draw the very first frame
    draw();
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
    player.velY += delay*gravitation;
    
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
            if (player.touching.left) player.velX = -jumpSpeed;
            if (player.touching.up || player.touching.down) player.velX -= delay*controlAcceleration;
        } else {
            if (player.touching.up) player.velX -= delay*controlAcceleration;
        }
    }
    if (arrows.right) {
        if (player.climb) {
            if (player.touching.right) player.velX = jumpSpeed;
            if (player.touching.up || player.touching.down) player.velX += delay*controlAcceleration;
        } else {
            if (player.touching.up) player.velX += delay*controlAcceleration;
        }
    }
    if (arrows.up) {
        if (player.climb) {
            if (player.touching.up) player.velY = -jumpSpeed;
            if (player.touching.left || player.touching.right) player.velY -= delay*controlAcceleration;
        } else {
            if (player.touching.up) player.velY = -jumpSpeed;
        }
    }
    if (arrows.down) {
        if (player.climb) {
            if (player.touching.down) player.velY = jumpSpeed;
            if (player.touching.left || player.touching.right) player.velY += delay*controlAcceleration;
        }
    }
    
    // simulate friction
    if (player.climb) {
        if (player.touching.up || player.touching.down) {
            player.velX /= friction**delay;
        }
        if (player.touching.left || player.touching.right) {
            player.velY /= friction**delay;
        }
    } else {
        if (player.touching.up) {
            player.velX /= friction**delay;
        }
    }
    
    // calculate the distances to the target
    target.dist = {
        left:  target.borders.left-(player.posX+player.width),
        right: (player.posX)-target.borders.right,
        up:    target.borders.up-(player.posY+player.height),
        down:  (player.posY)-target.borders.down,
    }
    
    // check if the user won
    let maxTargetDist = Math.max(...Object.values(target.dist));
    if (maxTargetDist <= 0) console.log("You won! Well done!");
    
    // call update() again as soom as possible
    setTimeout(update, 0);
}
function draw() {
    // clear everything that was visible before
    ctx.clearRect(0, 0, canvas.width/50, canvas.height/50);
    
    // draw the obstacles
    Obstacle.draw(ctx);
    
    // draw the target
    ctx.fillStyle = "green";
    ctx.fillRect(target.posX, target.posY, target.width, target.height);
    
    // draw the player character
    ctx.fillStyle = "yellow";
    ctx.fillRect(player.posX, player.posY, player.width, player.height);
    
    // call draw() again for the next frame
    requestAnimationFrame(draw);
}

// resize the canvas to fill the entire screen
function updateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // scale the contents of the canvas to make drawing easier
    ctx.scale(50, 50);
}