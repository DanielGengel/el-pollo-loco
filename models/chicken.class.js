import { MoveableObject } from "./moveableObject.class.js";
import { ImageHelper } from "../helper/imgHelper.class.js";
import { IntervalHub } from "../helper/intervallHub.js";
import { SoundHub } from "../helper/soundHub.class.js";

export class Chicken extends MoveableObject {
    width = 80;
    height = 100;
    /** y: Position of the chicken at ground level */
    y = 330;
    imgStart = ImageHelper.CHICKEN.chicken_normal[0];
    imgArrChickenNormal = ImageHelper.CHICKEN.chicken_normal;
    imgArrChickenDead = ImageHelper.CHICKEN.chicken_normal_dead;
    /** true: show frame around chicken for development purposes */
    showFrame = false;
    offset = { top: 10, right: 0, bottom: 0, left: 0 };

    /**
     * Creates a chicken and starts its animation and movement.
     * this.x: Chicken start position = 500px (position from character + random number)
     * Only chicken alive can move
     */
    constructor() {
        super();
        this.loadImage(this.imgStart);
        this.loadImages(this.imgArrChickenNormal);
        this.loadImages(this.imgArrChickenDead);

        this.x = 500 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.25;
        IntervalHub.startInterval(this.animate, 200);
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
    };

    /**
     * Checks if the chicken is alive and moves it left.
     * Only chicken alive can move
     */
    checkIfChickenIsAlive = () => {
        if (!this.isDead()) {
            this.moveLeft();
        }
    };

    /**
     * Kills the chicken and plays the death sound.
     */
    die() {
        SoundHub.playOne(SoundHub.chickenDead);
        if (this.isDead()) return;

        this.energy = 0;
    }
}
