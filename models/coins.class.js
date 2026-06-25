import { ImageHelper } from "../helper/imgHelper.class.js";
import { IntervalHub } from "../helper/intervallHub.js";
import { CollectibleObjects } from "./collectibleObjects.class.js";

export class Coin extends CollectibleObjects {

    // Create randome distance between each coin and avoid them being stacked above each other
    static lastX = 200 + Math.random() * 150;
    x = Coin.lastX += 150 + Math.random() * 500;

    // x = 200 + Math.random() * 2000;
    y = 20 + Math.random() * 100;
    height = 150;
    width = 150;
    showFrame = true; // show frame around chicken
    offset = { top: 40, right: 40, bottom: 40, left: 40 }; // Offset values for real collision frame

    constructor() {
        super();
        this.loadImage(ImageHelper.COINS.idle[0]);
        this.loadImages(ImageHelper.COINS.idle);
        this.animate();
    }

    animate() {
        IntervalHub.startInterval(() => {
            this.playAnimation(ImageHelper.COINS.idle);
        }, 300);
    }
}
