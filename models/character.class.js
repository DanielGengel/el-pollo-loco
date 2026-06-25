import { MoveableObject } from "./moveableObject.class.js";
import { ImageHelper } from "../helper/imgHelper.class.js";
import { IntervalHub } from "../helper/intervallHub.js";
// import { World } from "./world.class.js";

export class Character extends MoveableObject {
    width = 130;
    height = 300;
    y = 130;
    speed = 10;
    world; // this variable to access the variables in world.class.js
    showFrame = true; // show frame around character
    coins = 0;
    bottles = 0;
    lastAction = Date.now();

    constructor() {
        super();
        this.loadImage(ImageHelper.PEPE.idle[0]);
        this.loadImages(ImageHelper.PEPE.idle);
        this.loadImages(ImageHelper.PEPE.long_idle);
        this.loadImages(ImageHelper.PEPE.walk);
        this.loadImages(ImageHelper.PEPE.jump);
        this.loadImages(ImageHelper.PEPE.hurt);
        this.loadImages(ImageHelper.PEPE.dead);
        this.applayGravity();
        this.animate();
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
                this.otherDirection = false; // Don't mirror character image
                this.moveRight();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.otherDirection = true; // Mirror character image
                this.moveLeft();
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }

            this.world.cameraX = -this.x + 100;
        }, 1000 / 60);

        // Animate character (every 200 ms)
        IntervalHub.startInterval(() => {
            if (this.isDead()) {
                // console.log("is above ground");
                this.playAnimation(ImageHelper.PEPE.dead);
            } else if (this.isHurt()) {
                // console.log("is above ground");
                this.playAnimation(ImageHelper.PEPE.hurt);
            } else if (this.isAboveGround()) {
                // console.log("is above ground");
                this.lastAction = Date.now(); 
                this.playAnimation(ImageHelper.PEPE.jump);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // console.log("walking");
                this.lastAction = Date.now();
                this.playAnimation(ImageHelper.PEPE.walk);
            } else {
                const idleTime = this.timePassedSinceLastAction();
                if (idleTime > 5000) {
                    this.playAnimation(ImageHelper.PEPE.long_idle);
                } else {
                    this.playAnimation(ImageHelper.PEPE.idle);
                }
            }
        }, 150);
    }

    timePassedSinceLastAction() {
        return Date.now() - this.lastAction;
    }

    // addImages = (images) => {
    //     let index = this.currentImage % images.length;
    //     let path = images[index];
    //     this.img = this.imageCache[path];
    //     this.currentImage++;
    // };

    collectCoin() {
        this.coins++;

        if (this.coins > 5) {
            this.coins = 5;
        }
    }

    collectBottle() {
        this.bottles++;

        if (this.bottles > 5) {
            this.bottles = 5;
        }
    }

    throwBottle() {
        this.bottles--;

        if (this.bottles < 0) {
            this.bottles = 0;
        }
    }
}
