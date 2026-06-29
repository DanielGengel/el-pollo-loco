import { Chicken } from "./chicken.class.js";
import { IntervalHub } from "../helper/intervallHub.js";
import { ImageHelper } from "../helper/imgHelper.class.js";

export class ChickenSmall extends Chicken {
    width = 60;
    height = 70;
    y = 360;
    offset = { top: 20, right: 0, bottom: 0, left: 0 };

    imgStart = ImageHelper.CHICKEN.chicken_small[0];
    imgArrChickenNormal = ImageHelper.CHICKEN.chicken_small;
    imgArrChickenDead = ImageHelper.CHICKEN.chicken_small_dead;

    constructor() {
        super();

        // Reload the small chicken images (super() loaded the normal chicken images)
        this.loadImage(this.imgStart);
        this.loadImages(this.imgArrChickenNormal);
        this.loadImages(this.imgArrChickenDead);

        this.speed = 0.2 + Math.random() * 0.75;

        // true = moving left, false = moving right
        this.moveLeftDirection = Math.random() < 0.5;
    }

    animate() {
        // Animation
        IntervalHub.startInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.imgArrChickenDead);
            } else {
                this.playAnimation(this.imgArrChickenNormal);
            }
        }, 200);

        // Movement
        IntervalHub.startInterval(() => {
            // Stop dead chicken from moving before removing it from map
            if (this.isDead()) return;

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
        }, 1000 / 60);
    }
}
