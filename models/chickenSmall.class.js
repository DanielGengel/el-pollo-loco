import { Chicken } from "./chicken.class.js";
import { IntervalHub } from "../helper/intervallHub.js";
import { ImageHelper } from "../helper/imgHelper.class.js";
import { MoveableObject } from "./moveableObject.class.js";
import { SoundHub } from "../helper/soundHub.class.js";

export class ChickenSmall extends MoveableObject {
    width = 60;
    height = 70;
    /** y: Position of the chicken at ground level */
    y = 360;
    /** true: show frame around smallChicken for development purposes */
    showFrame = false;
    offset = { top: 0, right: 0, bottom: 0, left: 0 };

    imgStart = ImageHelper.CHICKEN.chicken_small[0];
    imgArrChickenNormal = ImageHelper.CHICKEN.chicken_small;
    imgArrChickenDead = ImageHelper.CHICKEN.chicken_small_dead;

    /**
     * Creates a small chicken and starts its movement and animation.
     * Chicken start position = 500px (position from character) + random number
     * this.moveLeftDirection => true = moving left, false = moving right
     */
    constructor() {
        super();

        this.loadImage(this.imgStart);
        this.loadImages(this.imgArrChickenNormal);
        this.loadImages(this.imgArrChickenDead);

        this.x = 500 + Math.random() * 2000;
        this.speed = 0.2 + Math.random() * 0.75;
        this.moveLeftDirection = Math.random() < 0.5;

        IntervalHub.startInterval(this.animate, 200);
        IntervalHub.startInterval(this.moveRandomly, 1000 / 60);
    }

    /**
     * Shows the small chicken walk or dead animation.
     */
    animate = () => {
        if (this.isDead()) {
            this.playAnimation(this.imgArrChickenDead);
        } else {
            this.playAnimation(this.imgArrChickenNormal);
        }
    };

    /**
     * Moves the small chicken left and right.
     * Small chance to change direction every frame
     * this.isDead() => Stop movement
     */
    moveRandomly = () => {
        if (Math.random() < 0.01) {
            this.moveLeftDirection = !this.moveLeftDirection;
        }

        if (!this.isDead()) {
            if (this.moveLeftDirection) {
                this.moveLeft();
                this.otherDirection = false;
            } else {
                this.moveRight();
                this.otherDirection = true;
            }
        }
    };

    /**
     * Kills the small chicken and plays the death sound.
     */
    die() {
        SoundHub.playOne(SoundHub.chickenDead2);
        if (this.isDead()) return;
        this.energy = 0;
    }
}
