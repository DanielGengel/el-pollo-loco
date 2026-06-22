import { MoveableObject } from "./moveable-object.class.js";
import { ImageHelper } from "../js/imgHelper.js";
// import { World } from "./world.class.js";

export class Character extends MoveableObject {
    width = 130;
    height = 300;
    y = 135;
    world; // this variable to access the variables in world.class.js

    constructor() {
        super();
        this.loadImage(ImageHelper.PEPE.idle[0]);
        this.loadImages(ImageHelper.PEPE.idle);
        this.loadImages(ImageHelper.PEPE.walk);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                let index = this.currentImage % ImageHelper.PEPE.walk.length;
                let path = ImageHelper.PEPE.walk[index];
                this.img = this.imageCache[path];
                this.currentImage++;
            } else {
                let index = this.currentImage % ImageHelper.PEPE.idle.length;
                let path = ImageHelper.PEPE.idle[index];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 200);
    }

    jump() {}
}
