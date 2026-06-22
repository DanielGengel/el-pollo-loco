import { MoveableObject } from "./moveable-object.class.js";
import { ImageHelper } from "../js/imgHelper.js";

export class Character extends MoveableObject {
    width = 130;
    height = 300;
    y = 135;
    

    constructor() {
        super();
        this.loadImage(ImageHelper.PEPE.idle[0]);
        this.loadImages(ImageHelper.PEPE.idle);
        this.animate();
    }

    animate() {
        setInterval(() => {
            let index = this.currentImage % ImageHelper.PEPE.idle.length;
            let path = ImageHelper.PEPE.idle[index]
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 200);
    }

    jump() {}
}
