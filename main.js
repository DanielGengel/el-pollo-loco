// import { MoveableObject } from "./models/moveable-object.class.js";
import { World } from "./models/world.class.js";
import { Keyboard } from "./helper/keyboard.class.js";
import { IntervalHub } from "./helper/intervallHub.js";
import { preloadImages } from "./helper/preload.js";
import { SoundHub } from "./helper/soundHub.class.js";

let canvas;
let world;
let preloadPromise;
let gameIsStarting = false;

const loadingScreen = document.getElementById("loadingScreen");
const countdown = document.getElementById("countdown");
const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const infoPopup = document.getElementById("infoPopup");
const imprintPopup = document.getElementById("imprintPopup");
const winScreen = document.getElementById("winScreen");
const loseScreen = document.getElementById("loseScreen");

init();

function init() {
    canvas = document.getElementById("canvas");
    preloadPromise = preloadImages();
    initMobileButtons();
    SoundHub.loadVolume();
    initVolumeControls();
}

function showCountdown() {
    SoundHub.playLoop(SoundHub.backgroundMusic);
    loadingScreen.classList.add("active");

    let seconds = 3;
    countdown.textContent = seconds;

    const timer = setInterval(() => {
        seconds--;
        countdown.textContent = seconds;

        if (seconds === 0) {
            clearInterval(timer);

            loadingScreen.classList.remove("active");

            startGame();
            gameIsStarting = false;
        }
    }, 1000);
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
    SoundHub.playOne(SoundHub.gameStart);
}

function stopGame() {
    if (world) {
        world.destroyWorld();
    }

    IntervalHub.stopAllIntervals();
    SoundHub.pauseAll();
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

function initMobileButtons() {
    addMobileButton("btnMobileLeft", "LEFT");
    addMobileButton("btnMobileRight", "RIGHT");
    addMobileButton("btnMobileJump", "SPACE");
    addMobileButton("btnMobileThrow", "D");
}

function addMobileButton(buttonId, key) {
    let button = document.getElementById(buttonId);

    button.addEventListener("touchstart", (event) => {
        event.preventDefault();
        Keyboard[key] = true;
    });

    button.addEventListener("touchend", (event) => {
        event.preventDefault();
        Keyboard[key] = false;
    });

    button.addEventListener("touchcancel", (event) => {
        event.preventDefault();
        Keyboard[key] = false;
    });

    button.addEventListener("touchmove", (event) => {
        event.preventDefault();
    });

    button.addEventListener("mousedown", () => {
        Keyboard[key] = true;
    });

    button.addEventListener("mouseup", () => {
        Keyboard[key] = false;
    });

    button.addEventListener("mouseleave", () => {
        Keyboard[key] = false;
    });

    button.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });
}

document.getElementById("btnStart").onclick = async () => {
    if (gameIsStarting) return;

    gameIsStarting = true;
    startScreen.classList.remove("active");
    loadingScreen.classList.add("active");
    countdown.textContent = "Loading...";

    try {
        await preloadPromise;
        showCountdown();
    } catch (error) {
        console.error("Image could not be loaded:", error);
        countdown.textContent = "Loading failed";
        gameIsStarting = false;
    }
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

// document.getElementById("btnMute").onclick = function () {
//     muted = !muted;

//     this.textContent = muted ? "🔇 UNMUTE" : "🔊 MUTE";

//     // mute / unmute all sounds here
// };

document.getElementById("btnRestartWin").onclick = () => {
    winScreen.classList.remove("active");
    startGame();
};

document.getElementById("btnRestartLose").onclick = () => {
    loseScreen.classList.remove("active");
    startGame();
};

function initVolumeControls() {
    const slider = document.getElementById("volumeSlider");
    const textButton = document.getElementById("btnMute");
    const iconButton = document.getElementById("btnMuteIcon");

    SoundHub.initControls(slider, textButton, iconButton);

    slider.addEventListener("input", () => {
        SoundHub.setVolume(slider.value / 100);
    });

    textButton.onclick = () => SoundHub.toggleMute();
    iconButton.onclick = () => SoundHub.toggleMute();
}

// function updateMuteButtons() {
//     const textButton = document.getElementById("btnMute");
//     const iconButton = document.getElementById("btnMuteIcon");

//     if (SoundHub.isMuted()) {
//         textButton.textContent = "🔇 SOUNDS OFF";
//         iconButton.textContent = "🔇";
//     } else {
//         textButton.textContent = "🔊 SOUNDS ON";
//         iconButton.textContent = "🔊";
//     }
// }

// function toggleMute() {
//     SoundHub.toggleMute();

//     volumeSlider.value = SoundHub.masterVolume * 100;

//     updateMuteButtons();
// }
