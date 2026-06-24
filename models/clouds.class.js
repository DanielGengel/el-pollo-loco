import { MoveableObject } from "./moveableObject.class.js";
import { ImageHelper } from "../helper/imgHelper.class.js";
import { IntervalHub } from "../helper/intervallHub.js";

export class Cloud extends MoveableObject {
    y = 20;
    width = 500;
    height = 250;
    

    constructor() {
        super();
        this.loadImage(ImageHelper.BACKGROUND.clouds[0]);
        this.loadImages(ImageHelper.BACKGROUND.clouds);
        this.x = -100 + Math.random() * 1000;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        IntervalHub.startInterval(() => this.moveLeft(), 1000 / 60);
    }
}
