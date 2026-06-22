import { MoveableObject } from "./moveable-object.class.js";
import { ImageHelper } from "../js/imgHelper.js";

export class Chicken extends MoveableObject {
    width = 80;
    height = 100;
    y = 330;

    constructor() {
        super();
        this.loadImage(ImageHelper.CHICKEN.chicken_normal[0]);
        this.loadImages(ImageHelper.CHICKEN.chicken_normal);

        // Chicken start position = 200px (position from character + random number)
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }
    
    animate() {
        setInterval(() => {
            let index = this.currentImage % ImageHelper.CHICKEN.chicken_normal.length;
            let path = ImageHelper.CHICKEN.chicken_normal[index];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 200);
        this.moveLeft();
    }
}
