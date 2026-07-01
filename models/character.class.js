import { MoveableObject } from "./moveableObject.class.js";
import { ImageHelper } from "../helper/imgHelper.class.js";
import { IntervalHub } from "../helper/intervallHub.js";
// import { World } from "./world.class.js";

export class Character extends MoveableObject {
    width = 130;
    height = 300;
    y = 130;
    speed = 10;
    imgStart = ImageHelper.PEPE.idle[0];
    imgArrPepeIdle = ImageHelper.PEPE.idle;
    imgArrPepeLongIdle = ImageHelper.PEPE.long_idle;
    imgArrPepeWalk = ImageHelper.PEPE.walk;
    imgArrPepeJump = ImageHelper.PEPE.jump;
    imgArrPepeHurt = ImageHelper.PEPE.hurt;
    imgArrPepeDead = ImageHelper.PEPE.dead;
    world; // this variable to access the variables in world.class.js
    showFrame = true; // show frame around character
    coins = 0;
    bottles = 0;
    lastAction = Date.now();

    // animations = {
    //     idle: this.imgArrPepeIdle,
    //     longIdle: this.imgArrPepeLongIdle,
    //     walk: this.imgArrPepeWalk,
    //     jump: this.imgArrPepeJump,
    //     hurt: this.imgArrPepeHurt,
    //     dead: this.imgArrPepeDead,
    // };

    constructor() {
        super();
        this.loadImage(this.imgStart);
        this.loadImages(this.imgArrPepeIdle);
        this.loadImages(this.imgArrPepeLongIdle);
        this.loadImages(this.imgArrPepeWalk);
        this.loadImages(this.imgArrPepeJump);
        this.loadImages(this.imgArrPepeHurt);
        this.loadImages(this.imgArrPepeDead);
        this.applyGravity();
        this.animate();
    }

    

    animate() {
        // Move character (60 FPS)
        IntervalHub.startInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
                this.otherDirection = false; // Don't mirror character image
                this.moveRight();
            }

            if (this.world.keyboard.LEFT && this.x > -1200) {
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
                this.playAnimation(this.imgArrPepeDead);
            } else if (this.isHurt()) {
                // console.log("is above ground");
                this.playAnimation(this.imgArrPepeHurt);
            } else if (this.isAboveGround()) {
                // console.log("is above ground");
                this.lastAction = Date.now();
                this.playAnimation(this.imgArrPepeJump);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // console.log("walking");
                this.lastAction = Date.now();
                this.playAnimation(this.imgArrPepeWalk);
            } else {
                const idleTime = this.timePassedSinceLastAction();
                if (idleTime > 5000) {
                    this.playAnimation(this.imgArrPepeLongIdle);
                } else {
                    this.playAnimation(this.imgArrPepeIdle);
                }
            }
        }, 150);

        // IntervalHub.startInterval(() => {
        //     this.playAnimation(this.animations[this.getState()]);
        // }, 150);
    }

    // getState() {
    //     if (this.isDead()) {
    //         return "dead";
    //     } else if (this.isHurt()) {
    //         return "hurt";
    //     } else if (this.isAboveGround()) {
    //         this.lastAction = Date.now();
    //         return "jump";
    //     } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
    //         this.lastAction = Date.now();
    //         return "walk";
    //     } else if (this.timePassedSinceLastAction() > 5000) {
    //         return "longIdle";
    //     } else return "idle";
    // }

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
