const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

update();

function update() {
    ctx.fillStyle = `HSL(${Date.now()/100%360}, 100%, 50%)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});