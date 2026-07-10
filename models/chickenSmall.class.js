import { Chicken } from "./chicken.class.js";
import { IntervalHub } from "../helper/intervallHub.js";
import { ImageHelper } from "../helper/imgHelper.class.js";
import { MoveableObject } from "./moveableObject.class.js";
import { SoundHub } from '../helper/soundHub.class.js';

export class ChickenSmall extends MoveableObject {
    width = 60;
    height = 70;
    y = 360;
    offset = { top: 20, right: 0, bottom: 0, left: 0 };

    imgStart = ImageHelper.CHICKEN.chicken_small[0];
    imgArrChickenNormal = ImageHelper.CHICKEN.chicken_small;
    imgArrChickenDead = ImageHelper.CHICKEN.chicken_small_dead;

    /**
     * Creates a small chicken and starts its movement and animation.
     */
    constructor() {
        super();
        

        // Reload the small chicken images (super() loaded the normal chicken images)
        this.loadImage(this.imgStart);
        this.loadImages(this.imgArrChickenNormal);
        this.loadImages(this.imgArrChickenDead);

        // Chicken start position = 200px (position from character + random number)
        this.x = 500 + Math.random() * 2000;

        this.speed = 0.2 + Math.random() * 0.75;

        // true = moving left, false = moving right
        this.moveLeftDirection = Math.random() < 0.5;

        // this.animate();
         IntervalHub.startInterval(this.animate, 200);
         IntervalHub.startInterval(this.moveRandomly, 1000 / 60);
    }

    /**
     * Shows the small chicken walk or dead animation.
     */
    animate = () => {
        // Animation
        // IntervalHub.startInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.imgArrChickenDead);
            } else {
                this.playAnimation(this.imgArrChickenNormal);
            }
        // }, 200);
    }

    /**
     * Moves the small chicken left and right.
     */
    moveRandomly = () => {
        // Movement
        // IntervalHub.startInterval(() => {
            // Stop dead chicken from moving before removing it from map
            // if (this.isDead()) return;

            // Small chance to change direction every frame
            if (Math.random() < 0.01) {
                this.moveLeftDirection = !this.moveLeftDirection;
            }

            if (this.moveLeftDirection) {
                this.moveLeft();
                this.otherDirection = false;
            } else {
                this.moveRight();
                this.otherDirection = true;
            }
        // }, 1000 / 60);
    }

    /**
     * Kills the small chicken and plays the death sound.
     */
      die() {
        SoundHub.playOne(SoundHub.chickenDead2); 
        if (this.isDead()) return;

        this.energy = 0;
    }
}