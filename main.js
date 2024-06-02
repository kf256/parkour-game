import {arrows} from "./control.js";
import {Obstacle} from "./obstacle.js";
import {strings} from "./strings.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let canvasWidth, canvasHeight;

let gameStatus = "menu";
let gameVisible;

// time of the last update
let time;

// time between the updates
let delay;

// object containing information about the player character
let player;

let gravitation = 10;
let friction = 3;
let jumpSpeed = 7; // speed at the beginning of a jump
let controlAcceleration = 20; // controls how fast the player can accelerate without jumping
let maxY = 14; // maximum depth of the player character (bigger Y position means lower height)

// time at which the message appeared
let messageTime;

// position and size of the target
let target;

// center of the viewing window
let viewX, viewY;

addEventListener("click", function(evt) {
    switch (gameStatus) {
        case "running":
            // already managed in control.js
            break;
        case "won":
        case "lost":
            // check if the animation has finished
            if (Date.now()-messageTime > 1000) {
                gameVisible = false;
                gameStatus = "menu";
                drawMenu();
                document.getElementById("buttons").style.display = "none";
                document.getElementById("messages").innerHTML = "";
                document.getElementById("messages").style.backgroundColor = "#0000";
                document.getElementById("menu").style.display = "";
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            }
            break;
        case "menu":
            // already managed by drawMenu()
            break;
        default:
            throw "unknown gameStatus: "+gameStatus;
    }
});

function drawMenu() {
    let menu = document.getElementById("menu");
    
    menu.innerHTML = "";
    
    let button = document.createElement("button");
    button.innerHTML = strings.start;
    button.style.fontSize = "2vw";
    button.addEventListener("click", function() {
        gameStatus = "running";
        startGame();
    });
    menu.appendChild(button);
}

main();

function main() {
    // set the title of the page
    document.title = strings.title;
    
    // set the correct size of the canvas
    updateCanvasSize();
    // update the size whenever the page is resized
    addEventListener("resize", updateCanvasSize);
    
    // draw the menu
    drawMenu();
}

function startGame() {
    gameStatus = "running";
    gameVisible = true;
    
    document.getElementById("buttons").style.display = "";
    document.getElementById("menu").style.display = "none";
    
    player = {
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
    viewX = player.posX+player.width/2;
    viewY = player.posY+player.height/2;
    
    target = {
        posX: 11,
        posY: 11,
        width: 1,
        height: 1,
    };
    
    // add some obstacles
    new Obstacle( 1,  3,  2,  1);
    new Obstacle( 4,  2,  1,  2);
    new Obstacle( 2,  4,  3,  1);
    new Obstacle( 4,  5,  4,  1);
    new Obstacle( 7,  4,  1,  2);
    new Obstacle( 8,  3,  1,  2);
    new Obstacle( 0,  0,  1, 14);
    new Obstacle(13,  0,  1, 14);
    new Obstacle( 5,  9,  8,  1);
    new Obstacle( 1, 11,  1,  2);
    new Obstacle(11,  7,  1,  2);
    new Obstacle(12,  5,  1,  4);
    new Obstacle( 1, 13, 12,  1);
    
    // calculate target.borders
    target.borders = {
        left:  target.posX,
        right: target.posX+target.width,
        up:    target.posY,
        down:  target.posY+target.height,
    };
    
    time = Date.now();
    
    // start updating the positions
    updateGame();
    
    // time to start the game: draw the very first frame
    drawGame();
}

// this function draws every frame
function updateGame() {
    if (!gameVisible) return;
    
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
    if (gameStatus === "running") {
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
    
    // move the center the viewing window closer to the player character
    viewX += (player.posX+player.width/2-viewX)*delay*2;
    viewY += (player.posY+player.height/2-viewY)*delay*2;
    
    // calculate the distances to the target
    target.dist = {
        left:  target.borders.left-(player.posX+player.width),
        right: (player.posX)-target.borders.right,
        up:    target.borders.up-(player.posY+player.height),
        down:  (player.posY)-target.borders.down,
    }
    
    if (gameStatus === "running") {
        // check if the player won
        let maxTargetDist = Math.max(...Object.values(target.dist));
        if (maxTargetDist <= 0) {
            gameStatus = "won";
            document.getElementById("messages").style.backgroundColor = "#8888";
            document.getElementById("messages").innerHTML = strings.won;
            document.getElementById("messages").style.opacity = 0;
            messageTime = Date.now();
        }
        
        // check if the player lost
        if (player.posY > maxY) {
            gameStatus = "lost";
            document.getElementById("messages").style.backgroundColor = "#8888";
            document.getElementById("messages").innerHTML = strings.lost;
            document.getElementById("messages").style.opacity = 0;
            messageTime = Date.now();
        }
    }
    
    // call updateGame() again as soon as possible
    setTimeout(updateGame, 0);
}
function drawGame() {
    if (!gameVisible) return;
    
    // clear everything that was visible before
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // set the correct viewing window
    ctx.save();
    ctx.translate(canvasWidth/2-viewX, canvasHeight/2-viewY);
    
    // draw the obstacles
    Obstacle.draw(ctx);
    
    // draw the target
    ctx.fillStyle = "green";
    ctx.fillRect(target.posX, target.posY, target.width, target.height);
    
    // draw the player character
    ctx.fillStyle = "yellow";
    ctx.fillRect(player.posX, player.posY, player.width, player.height);
    
    // reset the translation
    ctx.restore();
    
    // update the opacity of the message if there is any
    if (gameStatus === "won" || gameStatus === "lost") {
        document.getElementById("messages").style.opacity = (Date.now()-messageTime)/1000;
    }
    
    // call drawGame() again for the next frame
    requestAnimationFrame(drawGame);
}

// resize the canvas to fill the entire screen
function updateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // calculate the screen diagonal
    const screenSize = Math.hypot(canvas.width, canvas.height);
    
    // scale the contents of the canvas to make drawing easier
    const scale = screenSize/20;
    ctx.scale(scale, scale);
    
    // update canvasWidth and canvasHeight
    canvasWidth = Math.ceil(canvas.width/scale);
    canvasHeight = Math.ceil(canvas.height/scale);
}