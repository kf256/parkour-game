// information about which arrow keys are pressed
let arrows = {
    up: false,
    down: false,
    left: false,
    right: false,
};

// event listeners updating the arrows object
addEventListener("keydown", (evt) => {
    switch (evt.key) {
        case "ArrowLeft": {
            arrows.left = true;
            break;
        }
        case "ArrowRight": {
            arrows.right = true;
            break;
        }
        case "ArrowUp": {
            arrows.up = true;
            break;
        }
        case "ArrowDown": {
            arrows.down = true;
            break;
        }
    }
});
addEventListener("keyup", (evt) => {
    switch (evt.key) {
        case "ArrowLeft": {
            arrows.left = false;
            break;
        }
        case "ArrowRight": {
            arrows.right = false;
            break;
        }
        case "ArrowUp": {
            arrows.up = false;
            break;
        }
        case "ArrowDown": {
            arrows.down = false;
            break;
        }
    }
});