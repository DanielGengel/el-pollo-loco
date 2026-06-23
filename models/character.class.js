import { MoveableObject } from "./moveable-object.class.js";
import { ImageHelper } from "../helper/imgHelper.class.js";
import { IntervalHub } from "../helper/intervallHub.js";
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
        // this.animate();
    }

    // animate() {
        
    //     setInterval(() => {
    //         // Walking animation
    //         if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
    //             this.x += this.speed;
    //             this.otherDirection = false;
    //             console.log("charcter move forward...");
    //         }

    //         if (this.world.keyboard.LEFT && this.x > 0) {
    //             this.x -= this.speed;
    //             this.otherDirection = true;
    //         }
    //         this.world.cameraX = -this.x + 100;

    //     }, 1000 / 60);

    //     // setInterval(() => {
    //         if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
    //             console.log("charcter make steps...");
                
    //             // Walk 'movement' animation
    //             // this.playAnimation(ImageHelper.PEPE.walk, 200);
    //             let index = this.currentImage % ImageHelper.PEPE.walk.length;
    //             let path = ImageHelper.PEPE.walk[index];
    //             this.img = this.imageCache[path];
    //             this.currentImage++;
    //         } else {
    //             // Idle animation
    //             this.playAnimation(ImageHelper.PEPE.idle, 200);
    //             // let index = this.currentImage % ImageHelper.PEPE.idle.length;
    //             // let path = ImageHelper.PEPE.idle[index];
    //             // this.img = this.imageCache[path];
    //             // this.currentImage++;
    //         }
    //     // }, 200);
    // }

    animate() {
        // Move character (60 FPS)
        IntervalHub.startInterval(() => {

            if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
                this.x += this.speed;
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            this.world.cameraX = -this.x + 100;
        }, 1000 / 60);


        // Animate character (alle 200 ms)
        IntervalHub.startInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.addImages(ImageHelper.PEPE.walk);
            } else {
                this.addImages(ImageHelper.PEPE.idle);
            }
        }, 200);
    }

    addImages = (images) => {
        let index = this.currentImage % images.length;
        let path = images[index];
        this.img = this.imageCache[path];
        this.currentImage++;
    };


    jump() {}
}
