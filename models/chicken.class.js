import { MoveableObject } from "./moveableObject.class.js";
import { ImageHelper } from "../helper/imgHelper.class.js";
import { IntervalHub } from "../helper/intervallHub.js";
import { SoundHub } from '../helper/soundHub.class.js';

export class Chicken extends MoveableObject {
    width = 80;
    height = 100;
    y = 330;
    imgStart = ImageHelper.CHICKEN.chicken_normal[0];
    imgArrChickenNormal = ImageHelper.CHICKEN.chicken_normal;
    imgArrChickenDead = ImageHelper.CHICKEN.chicken_normal_dead;
    showFrame = false; // show frame around chicken
    offset = { top: 10, right: 0, bottom: 0, left: 0 };

    /**
     * Creates a chicken and starts its animation and movement.
     */
    constructor() {
        super();
        this.loadImage(this.imgStart);
        this.loadImages(this.imgArrChickenNormal);
        this.loadImages(this.imgArrChickenDead);

        // Chicken start position = 200px (position from character + random number)
        this.x = 500 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.25;
        // this.animate();
        IntervalHub.startInterval(this.animate, 200);
         // Only chicken alive can move
         IntervalHub.startInterval(this.checkIfChickenIsAlive, 1000 / 60);

    }

    /**
     * Shows the chicken walk or dead animation.
     */
    animate = () => {
 
            if (this.isDead()) {
                this.playAnimation(this.imgArrChickenDead);
            } else {
                this.playAnimation(this.imgArrChickenNormal);
            }
        }

    /**
     * Checks if the chicken is alive and moves it left.
     */
        checkIfChickenIsAlive = () => {
        // Only chicken alive can move
            if (!this.isDead()) {
                this.moveLeft();
            }
       
    }

    /**
     * Kills the chicken and plays the death sound.
     */
    die() {
        SoundHub.playOne(SoundHub.chickenDead); 
        if (this.isDead()) return;

        this.energy = 0;
    }
}