import { MoveableObject } from "./moveable-object.class.js";
import { ImageHelper } from "../js/imgHelper.js";

export class Character extends MoveableObject {
    width = 130;
    height = 300;
    y = 135;
    
    constructor() {
        // super().loadImage('../assets/img/2_character_pepe/1_idle/idle/I-1.png');
        super().loadImage(ImageHelper.PEPE.idle[0]);
    }

    jump() {}
}
