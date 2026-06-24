// import { MoveableObject } from "./models/moveable-object.class.js";
import { World } from "./models/world.class.js";
import { Keyboard } from "./helper/keyboard.class.js";

let canvas;
let world;

init();

function init() {
    console.log("init");
    canvas = document.getElementById("canvas");
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
