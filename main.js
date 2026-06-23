// import { MoveableObject } from "./models/moveable-object.class.js";
import { World } from "./models/world.class.js";
import { Keyboard } from "./helper/keyboard.class.js";

let canvas;
let world;
// keyboard;

init();

function init() {
    console.log("init");
    canvas = document.getElementById("canvas");
    world = new World(canvas, Keyboard);

    

    // character.src = '../assets/img/2_character_pepe/1_idle/idle/I-1.png';

    // console.log("Character is ", world.character);
    //    console.log("enemies are ", world.enemies);

    //     ctx.drawImage(character, 20, 20, 50, 150)
}

window.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") Keyboard.LEFT = true;
    if (event.code === "ArrowRight") Keyboard.RIGHT = true;
    if (event.code === "ArrowUp") Keyboard.UP = true;
    if (event.code === "ArrowDown") Keyboard.DOWN = true;
    if (event.code === "Space") Keyboard.SPACE = true;
});

window.addEventListener("keyup", (event) => {
    if (event.code === "ArrowLeft") Keyboard.LEFT = false;
    if (event.code === "ArrowRight") Keyboard.RIGHT = false;
    if (event.code === "ArrowUp") Keyboard.UP = false;
    if (event.code === "ArrowDown") Keyboard.DOWN = false;
    if (event.code === "Space") Keyboard.SPACE = false;
});
