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

const buttons = {
    left:  document.getElementById("button_left"),
    right: document.getElementById("button_right"),
    up:    document.getElementById("button_up"),
    down:  document.getElementById("button_down"),
};
const buttonNames = Object.keys(buttons);
for (let i = 0; i < buttonNames.length; i++) {
    const name = buttonNames[i];
    buttons[name].addEventListener("pointerdown",  () => arrows[name] = true);
    buttons[name].addEventListener("pointerup",    () => arrows[name] = false);
    buttons[name].addEventListener("pointerleave", () => arrows[name] = false);
    buttons[name].addEventListener("touchstart",    e => e.preventDefault());
}