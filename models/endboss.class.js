import { MoveableObject } from "./moveable-object.class.js";
import { ImageHelper } from "../js/imgHelper.js";

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
        setInterval(() => {
            this.playAnimation(ImageHelper.CHICKEN_BOSS.alert);
            // let index = this.currentImage % ImageHelper.CHICKEN.chicken_normal.length;
            // let path = ImageHelper.CHICKEN.chicken_normal[index];
            // this.img = this.imageCache[path];
            // this.currentImage++;
        }, 200);
    }
}
