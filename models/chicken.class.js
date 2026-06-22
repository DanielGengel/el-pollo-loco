import { MoveableObject } from "./moveable-object.class.js";
import { ImageHelper } from "../js/imgHelper.js";

export class Chicken extends MoveableObject {
    width = 80; 
    height = 100;
    y = 330;

    constructor() {
        super().loadImage(ImageHelper.CHICKEN.chicken_normal[0]);

        // Chicken start position = 200px (position from character + random number)
        this.x = 200 + Math.random() * 500;
        }

}