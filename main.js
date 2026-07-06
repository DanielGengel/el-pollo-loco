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
const winScreen = document.getElementById("winScreen");
const loseScreen = document.getElementById("loseScreen");

init();

function init() {
    canvas = document.getElementById("canvas");
}

function startGame() {
    if (world) {
        world.destroyWorld();
    }

    IntervalHub.stopAllIntervals();
    resetKeyboard();
    world = new World(canvas, Keyboard);
    // IntervalHub(checkGameState, 100);
    IntervalHub.startInterval(checkGameState, 100);
}

function stopGame() {
    if (world) {
        world.destroyWorld();
    }

    IntervalHub.stopAllIntervals();
    resetKeyboard();
}

function checkGameState() {
    if (!world) return;

    if (!world.gameIsRunning) {
        stopGame();

        if (world.gameResult === "won") {
            winScreen.classList.add("active");
        }

        if (world.gameResult === "lost") {
            loseScreen.classList.add("active");
        }
    }
}

function resetKeyboard() {
    Keyboard.LEFT = false;
    Keyboard.RIGHT = false;
    Keyboard.UP = false;
    Keyboard.DOWN = false;
    Keyboard.SPACE = false;
    Keyboard.D = false;
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
    startGame();
};

// document.getElementById("btnRestart").onclick = () => {
//     gameOverScreen.classList.remove("active");
//     startGame();
// };

// document.getElementById("btnMenu").onclick = () => {
//     stopGame();
//     gameOverScreen.classList.remove("active");
//     startScreen.classList.add("active");
// };

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

document.getElementById("btnRestartWin").onclick = () => {
    winScreen.classList.remove("active");
    startGame();
};

document.getElementById("btnRestartLose").onclick = () => {
    loseScreen.classList.remove("active");
    startGame();
};
