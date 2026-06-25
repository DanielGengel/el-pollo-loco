import { ImageHelper } from "../helper/imgHelper.class.js";
import { IntervalHub } from "../helper/intervallHub.js";
import { MoveableObject } from "./moveableObject.class.js";
// import { Character } from "./character.class.js";

export class ThrowableObject extends MoveableObject {
    bottleAboveGround = false;
    bottleFlying = false;

    constructor(x, y, otherDirection) {
        super();
        this.loadImage(ImageHelper.SALSA_BOTTLE.rotation[3]);
        this.loadImages(ImageHelper.SALSA_BOTTLE.rotation);
        this.loadImages(ImageHelper.SALSA_BOTTLE.splash);
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
        this.applayGravity();
        this.bottleAboveGround = true;
        this.bottleFlying = true;

        // Correction factor if character looking in other direction
        if (this.otherDirection) {
            this.x -= 100;
        }

        IntervalHub.startInterval(() => {
            // If character looking in other direction, reverse throw direction
            if (this.otherDirection) {
                this.x -= 10;
            } else {
                this.x += 10;
            }
        }, 25);
    }

    animateFlyingBottle() {
        IntervalHub.startInterval(() => {
            if (this.bottleAboveGround) {
                this.playAnimation(ImageHelper.SALSA_BOTTLE.rotation);
            }
        }, 9000 / 60);
    }
}
