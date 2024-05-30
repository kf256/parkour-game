// information about which arrow keys are pressed
export const arrows = {
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

let buttons = {
    up: document.getElementById("button_up"),
};

buttons.up.addEventListener("pointerdown",  () => arrows.up = true);
buttons.up.addEventListener("pointerup",    () => arrows.up = false);
buttons.up.addEventListener("pointerleave", () => arrows.up = false);