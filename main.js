// import { MoveableObject } from "./models/moveable-object.class.js";
import { World } from "./models/world.class.js";
import { Keyboard } from "./helper/keyboard.class.js";
import { IntervalHub } from "./helper/intervallHub.js";

let canvas;
let world;

const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const infoPopup = document.getElementById("infoPopup");
const imprintPopup = document.getElementById("imprintPopup");

// Preload game as background for starting screen
init();

function init() {
    console.log("init");
    canvas = document.getElementById("canvas");
    world = new World(canvas, Keyboard);
}

// Restart game at the end, but also first start = restart because
// game is running in backgroud of starting screen
function restartGame() {
    world.destroyWorld(); // stop intervals, animations, sounds...
    IntervalHub.stopAllIntervals();
    world = new World(canvas, Keyboard);
}

window.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") Keyboard.LEFT = true;
    if (event.code === "ArrowRight") Keyboard.RIGHT = true;
    if (event.code === "ArrowUp") Keyboard.UP = true;
    if (event.code === "ArrowDown") Keyboard.DOWN = true;
    if (event.code === "Space") Keyboard.SPACE = true;
    if (event.code === "KeyD") Keyboard.D = true;
});

window.addEventListener("keyup", (event) => {
    if (event.code === "ArrowLeft") Keyboard.LEFT = false;
    if (event.code === "ArrowRight") Keyboard.RIGHT = false;
    if (event.code === "ArrowUp") Keyboard.UP = false;
    if (event.code === "ArrowDown") Keyboard.DOWN = false;
    if (event.code === "Space") Keyboard.SPACE = false;
    if (event.code === "KeyD") Keyboard.D = false;
});



document.getElementById("btnStart").onclick = () => {
    startScreen.classList.remove("active");
    restartGame();
};

document.getElementById("btnRestart").onclick = () => {
    gameOverScreen.classList.remove("active");

    // restartGame();
};

document.getElementById("btnMenu").onclick = () => {
    gameOverScreen.classList.remove("active");
    startScreen.classList.add("active");
};

document.getElementById("btnInfo").onclick = () => {
    infoPopup.classList.remove("hidden");
};

document.getElementById("btnImprint").onclick = () => {
    imprintPopup.classList.remove("hidden");
};

document.querySelectorAll(".closePopup").forEach((button) => {
    button.onclick = () => {
        infoPopup.classList.add("hidden");
        imprintPopup.classList.add("hidden");
    };
});

let muted = false;

document.getElementById("btnMute").onclick = function () {
    muted = !muted;

    this.textContent = muted ? "🔇 UNMUTE" : "🔊 MUTE";

    // mute / unmute all sounds here
};
