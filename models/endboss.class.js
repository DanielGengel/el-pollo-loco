import { MoveableObject } from "./moveable-object.class.js";
import { ImageHelper } from "../helper/imgHelper.class.js";
import { IntervalHub } from "../helper/intervallHub.js";

export class Endboss extends MoveableObject {
    height = 500;
    width = 300;
    y = -40;

    constructor() {
        super();
        this.loadImage(ImageHelper.CHICKEN_BOSS.alert[0]);
        this.loadImages(ImageHelper.CHICKEN_BOSS.alert);
        this.x = 2500;

        this.animate();
    }

    animate() {
        IntervalHub.startInterval(() => {
            this.playAnimation(ImageHelper.CHICKEN_BOSS.alert);
            // let index = this.currentImage % ImageHelper.CHICKEN.chicken_normal.length;
            // let path = ImageHelper.CHICKEN.chicken_normal[index];
            // this.img = this.imageCache[path];
            // this.currentImage++;
        }, 200);
    }
}
