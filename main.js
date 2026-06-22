// import { MoveableObject } from "./models/moveable-object.class.js";
import { World } from "./models/world.class.js";
import { Keyboard } from "./models/keyboard.class.js";

let canvas;
let world;
let keyboard = new Keyboard();

init();

function init() {
    console.log("init");
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);

    

    // character.src = '../assets/img/2_character_pepe/1_idle/idle/I-1.png';

    console.log("Character is ", world.character);
       console.log("enemies are ", world.enemies);

    //     ctx.drawImage(character, 20, 20, 50, 150)
}

window.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") keyboard.LEFT = true;
    if (event.code === "ArrowRight") keyboard.RIGHT = true;
    if (event.code === "ArrowUp") keyboard.UP = true;
    if (event.code === "ArrowDown") keyboard.DOWN = true;
    if (event.code === "Space") keyboard.SPACE = true;
});

window.addEventListener("keyup", (event) => {
    if (event.code === "ArrowLeft") keyboard.LEFT = false;
    if (event.code === "ArrowRight") keyboard.RIGHT = false;
    if (event.code === "ArrowUp") keyboard.UP = false;
    if (event.code === "ArrowDown") keyboard.DOWN = false;
    if (event.code === "Space") keyboard.SPACE = false;
});
