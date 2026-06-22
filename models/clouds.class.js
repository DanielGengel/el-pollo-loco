import { MoveableObject } from "./moveable-object.class.js";
import { ImageHelper } from "../js/imgHelper.js";

export class Cloud extends MoveableObject {
    y = 20;
    width = 500;
    height = 250;

    constructor() {
        super().loadImage(ImageHelper.BACKGROUND.clouds[0]);
        this.x = -100 + Math.random() * 500;
    }
}
