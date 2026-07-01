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

    // to stop bottle intervalls
    gravityInterval;
    moveInterval;
    animationInterval;

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
        this.applyGravityToBottle();
        this.bottleAboveGround = true;
        this.bottleFlying = true;

        // Add 1x correction factor if character looking in other direction
        if (this.otherDirection) {
            this.x -= 100;
        }

        this.moveInterval = IntervalHub.startInterval(() => {
            if (this.hasHit) return;

            if (this.otherDirection) {
                this.x -= 10;
            } else {
                this.x += 10;
            }
        }, 25);
    }

    applyGravityToBottle() {
    this.gravityInterval = IntervalHub.startInterval(() => {

        if (this.y < 340 || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        } else {
            this.y = 340;
            this.speedY = 0;
        }

    }, 1000 / 25);
}

    animateFlyingBottle() {
        this.animationInterval = IntervalHub.startInterval(() => {
            if (!this.hasHit) {
                this.playAnimation(this.imgArrBottleRotation);
            } else {
                this.playAnimation(this.imgArrBottleSplash);
            }
        }, 1000 / 60);
    }

    breakAndSplash(onGround = true) {
    if (this.hasHit) return;

    this.hasHit = true;

    // stop horizontal movement
    IntervalHub.stopInterval(this.moveInterval);

    if (onGround) {
        // Bottle already reached the ground
        IntervalHub.stopInterval(this.gravityInterval);

        this.speedY = 0;
        this.y = 390;
    } else {
        // Bottle hit an enemy in the air.
        // Gravity continues so the splash falls down.
        this.speedY = 0;
    }

    setTimeout(() => {
        IntervalHub.stopInterval(this.animationInterval);

        // If gravity is still running (enemy hit), stop it once the splash
        // reaches the ground.
        if (!onGround) {
            IntervalHub.stopInterval(this.gravityInterval);
            this.y = 340;
        }

        this.img = this.imageCache[this.imgArrBottleSplash.at(-1)];
    }, 300);
}
}
