import { ImageHelper } from "../helper/imgHelper.class.js";
import { IntervalHub } from "../helper/intervallHub.js";
import { MoveableObject } from "./moveableObject.class.js";
// import { Character } from "./character.class.js";


export class ThrowableObject extends MoveableObject {
    bottleAboveGround = false;

    constructor(x, y, otherDirection) {
        super();
        this.loadImage(ImageHelper.ICONS.bottle[0]);
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.height = 60;
        this.width = 50;

        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applayGravity();
        this.bottleAboveGround = true;

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
}
