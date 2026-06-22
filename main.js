// import { MoveableObject } from "./models/moveable-object.class.js";
import { World } from "./models/world.class.js";

let canvas;
let world;

init();

function init() {
    console.log("init");
    canvas = document.getElementById("canvas");
    world = new World(canvas);

    

    // character.src = '../assets/img/2_character_pepe/1_idle/idle/I-1.png';

    console.log("Character is ", world.character);
       console.log("enemies are ", world.enemies);

    //     ctx.drawImage(character, 20, 20, 50, 150)
}


