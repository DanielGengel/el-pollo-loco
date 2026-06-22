import { MoveableObject } from "./moveable-object.class.js";
import { ImageHelper } from "../js/imgHelper.js";
// import { World } from "./world.class.js";

export class Character extends MoveableObject {
    width = 130;
    height = 300;
    y = 135;
    speed = 10;
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
            // Walking animation
            if (this.world.keyboard.RIGHT) {
                this.x += this.speed;
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            this.world.cameraX = -this.x;

        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // Walk 'movement' animation
                let index = this.currentImage % ImageHelper.PEPE.walk.length;
                let path = ImageHelper.PEPE.walk[index];
                this.img = this.imageCache[path];
                this.currentImage++;
            } else {
                // Idle animation
                let index = this.currentImage % ImageHelper.PEPE.idle.length;
                let path = ImageHelper.PEPE.idle[index];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 100);
    }

    jump() {}
}
