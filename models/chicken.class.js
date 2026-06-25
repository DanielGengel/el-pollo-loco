import { MoveableObject } from "./moveableObject.class.js";
import { ImageHelper } from "../helper/imgHelper.class.js";
import { IntervalHub } from "../helper/intervallHub.js";

export class Chicken extends MoveableObject {
    width = 80;
    height = 100;
    y = 330;
    showFrame = true; // show frame around chicken
    offset = { top: 10, right: 0, bottom: 0, left: 0 };

    constructor() {
        super();
        this.loadImage(ImageHelper.CHICKEN.chicken_normal[0]);
        this.loadImages(ImageHelper.CHICKEN.chicken_normal);
        this.loadImages(ImageHelper.CHICKEN.chicken_normal_dead);

        // Chicken start position = 200px (position from character + random number)
        this.x = 200 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        // IntervalHub.startInterval(this.startCounter, 200);
        IntervalHub.startInterval(() => {
            // console.log("this chicken is dead ", this.isDead());

            if (this.isDead()) {
                this.playAnimation(ImageHelper.CHICKEN.chicken_normal_dead);
            } else {
                this.playAnimation(ImageHelper.CHICKEN.chicken_normal);
            }
        }, 200);

        IntervalHub.startInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }

    // startCounter = () => {
    //                let index = this.currentImage % ImageHelper.CHICKEN.chicken_normal.length;
    //         let path = ImageHelper.CHICKEN.chicken_normal[index];
    //         this.img = this.imageCache[path];
    //         this.currentImage++;
    //             };

    //  animate() {

    //     setInterval(() => {
    //         this.playAnimation(ImageHelper.CHICKEN.chicken_normal);
    //         // let index = this.currentImage % ImageHelper.CHICKEN.chicken_normal.length;
    //         // let path = ImageHelper.CHICKEN.chicken_normal[index];
    //         // this.img = this.imageCache[path];
    //         // this.currentImage++;
    //     }, 200);
    //     this.moveLeft();
    // }

    die() {
        if (this.isDead()) return;

        this.energy = 0;
    }
}
