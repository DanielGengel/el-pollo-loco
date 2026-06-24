import { IntervalHub } from "../helper/intervallHub.js";
import { DrawableObject } from "./drawableObject.class.js";
// import { ThrowableObject } from "./throwableObject.class.js";

export class MoveableObject extends DrawableObject {
    otherDirection = false; // mirroring character image when walking left
    speedY = 0; // fall speed of character
    acceleration = 3;
    showFrame = false; // if true => drawCollsionFrame around character and chicken
    energy = 100;
    lastHit = 0;
    bottleAboveGround = false;

    // New coordinates for real frame
    collisionBox = { x: 0, y: 0, width: 0, height: 0 };
    offset = { top: 120, right: 35, bottom: 15, left: 20 };

    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 7 % 6; =>  1, Rest 1
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }

    applayGravity() {
        IntervalHub.startInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    // bottle should fall through ground, character until dead should not 
    isAboveGround() {
        if (this.bottleAboveGround) {
            return true;
        } else {
            return this.y < 130;
        }
    }

    getRealFrame() {
        // this.collisionBox.x = this.x + this.offset.left;
        // this.collisionBox.y = this.y + this.offset.top;
        // this.collisionBox.width = this.width - this.offset.left - this.offset.right;
        // this.collisionBox.height = this.height - this.offset.top - this.offset.bottom;

        // Mirror coordinates if character walks in other direction
        if (this.otherDirection) {
            this.collisionBox.x = this.x + this.offset.right;
            this.collisionBox.y = this.y + this.offset.top;
            this.collisionBox.width = this.width - this.offset.left - this.offset.right;
            this.collisionBox.height = this.height - this.offset.top - this.offset.bottom;
        } else {
            {
                this.collisionBox.x = this.x + this.offset.left;
                this.collisionBox.y = this.y + this.offset.top;
                this.collisionBox.width = this.width - this.offset.left - this.offset.right;
                this.collisionBox.height = this.height - this.offset.top - this.offset.bottom;
            }
        }
    }

    isColliding(mO) {
        this.getRealFrame();
        // console.log("this.x =>", this.x);
        // console.log("this.y =>", this.y);
        // console.log("this.width =>", this.width);
        // console.log("this.height =>", this.height);
        // console.log("this.collisionBox.x =>", this.collisionBox.x);
        // console.log("this.collisionBox.y =>", this.collisionBox.y);
        // console.log("this.collisionBox.width =>", this.collisionBox.width);
        // console.log("this.collisionBox.height =>", this.collisionBox.height);

        return (
            this.collisionBox.x + this.collisionBox.width > mO.x &&
            this.collisionBox.y + this.collisionBox.height > mO.y &&
            this.collisionBox.x < mO.x + mO.width &&
            this.collisionBox.y < mO.y + mO.height

            // this.x + this.width > mO.x &&
            // this.y + this.height > mO.y &&
            // this.x < mO.x + mO.width &&
            // this.y < mO.y + mO.height
        );
    }

    hit() {
        // Decrease energy level of character
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        console.log(this.energy);
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Time diff. in ms
        return timePassed < 1000; // 1000 milli seconds
    }

    isDead() {
        return this.energy === 0;
    }
}

// playAnimation(images, timer) {
//         IntervalHub.startInterval(() => this.addImages(images), timer);
//     }

//     addImages = (images) => {
//         let i = this.currentImage % images.length; // let i = 7 % 6; =>  1, Rest 1
//         let path = images[i];
//         this.img = this.imageCache[path];
//         this.currentImage++;
//     };

//     moveRight() {
//         console.log("moving right");
//     }

//     moveLeft() {
//         IntervalHub.startInterval(() => this.x -= this.speed, 1000/ 60);
//         // setInterval(() => {
//         //     this.x -= this.speed;
//         // }, 1000 / 60);
//     }
