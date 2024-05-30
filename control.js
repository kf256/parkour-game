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
    left:  document.getElementById("button_left"),
    right: document.getElementById("button_right"),
    up:    document.getElementById("button_up"),
    down:  document.getElementById("button_down"),
};

buttons.left .addEventListener("pointerdown",  () => arrows.left  = true);
buttons.left .addEventListener("pointerup",    () => arrows.left  = false);
buttons.left .addEventListener("pointerleave", () => arrows.left  = false);
buttons.right.addEventListener("pointerdown",  () => arrows.right = true);
buttons.right.addEventListener("pointerup",    () => arrows.right = false);
buttons.right.addEventListener("pointerleave", () => arrows.right = false);
buttons.up   .addEventListener("pointerdown",  () => arrows.up    = true);
buttons.up   .addEventListener("pointerup",    () => arrows.up    = false);
buttons.up   .addEventListener("pointerleave", () => arrows.up    = false);
buttons.down .addEventListener("pointerdown",  () => arrows.down  = true);
buttons.down .addEventListener("pointerup",    () => arrows.down  = false);
buttons.down .addEventListener("pointerleave", () => arrows.down  = false);