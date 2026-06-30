import { ImageHelper } from "../helper/imgHelper.class.js";
import { IntervalHub } from "../helper/intervallHub.js";
import { MoveableObject } from "./moveableObject.class.js";
// import { Character } from "./character.class.js";

export class ThrowableObject extends MoveableObject {
    bottleAboveGround = false;
    bottleFlying = false;
    imgStart = ImageHelper.SALSA_BOTTLE.rotation[3];
    imgArrBottleRotation = ImageHelper.SALSA_BOTTLE.rotation;
    imgArrBottleSplash = ImageHelper.SALSA_BOTTLE.splash;

    offset = { top: 0, right: 0, bottom: 0, left: 0 };
    showFrame = true; // show frame around chicken
    constructor(x, y, otherDirection) {
        super();
        this.loadImage(this.imgStart);
        this.loadImages(this.imgArrBottleRotation);
        this.loadImages(this.imgArrBottleSplash);
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.height = 60;
        this.width = 50;

        this.throw();
        this.animateFlyingBottle();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.bottleAboveGround = true;
        this.bottleFlying = true;

        // Add 1x correction factor if character looking in other direction
        if (this.otherDirection) {
            this.x -= 100;
        }

        IntervalHub.startInterval(() => {
            // If bottle has hit, return;
            if (this.hasHit) return;

            if (this.otherDirection) {
                this.x -= 10;
            } else {
                this.x += 10;
            }
        }, 25);
    }

    animateFlyingBottle() {
        IntervalHub.startInterval(() => {
            if (!this.hasHit) {
                this.playAnimation(this.imgArrBottleRotation);
            } else {
                this.playAnimation(this.imgArrBottleSplash);
            }
        }, 1000 / 60);
    }

    breakAndSplash() {
        // this.loadImage("img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png");

        // or start splash animation
        // this.playAnimation(this.imgArrBottleSplash);

        this.hasHit = true;
        this.speedX = 0;
        this.speedY = 0;
    }
}
