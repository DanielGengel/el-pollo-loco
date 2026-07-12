import { ImageHelper } from "../helper/imgHelper.class.js";
import { IntervalHub } from "../helper/intervallHub.js";
import { CollectibleObjects } from "./collectibleObjects.class.js";

export class Coin extends CollectibleObjects {

    /** Create random distance between each coin and avoid them being stacked above each other */
    static lastX = 200 + Math.random() * 150;
    /** x: this is the coin position from left to right. */
    x = Coin.lastX += 150 + Math.random() * 500;
    /** y: this is the coin position from top to bottom. */
    y = 20 + Math.random() * 100;
    height = 150;
    width = 150;
    /** true: Show frame around coins for development purposes */
    showFrame = false; 
    /** Offset values for real collision frame */
    offset = { top: 40, right: 40, bottom: 40, left: 40 };

    /**
     * Creates a coin and starts its animation.
     */
    constructor() {
        super();
        this.loadImage(ImageHelper.COINS.idle[0]);
        this.loadImages(ImageHelper.COINS.idle);
        IntervalHub.startInterval(this.animate, 300);

    }

    /**
     * Shows the coin animation.
     */
    animate = () => {
            this.playAnimation(ImageHelper.COINS.idle);
    }
}