import { ImageHelper } from "../helper/imgHelper.class.js";
import { CollectibleObjects } from "./collectibleObjects.class.js";

export class Coin extends CollectibleObjects {

    // Create randome distance between each coin and avoid them being stacked above each other
    static lastX = 200 + Math.random() * 150;
    x = Coin.lastX += 150 + Math.random() * 500;

    // x = 200 + Math.random() * 2000;
    y = 20 + Math.random() * 100;
    height = 120;
    width = 130;
    showFrame = true; // show frame around chicken
    offset = { top: 10, right: 20, bottom: 5, left: 20 }; // Offset values for real collision frame

    constructor() {
        super();
        this.loadImage(ImageHelper.COINS.idle[0]);
        this.loadImages(ImageHelper.COINS.idle);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(ImageHelper.COINS.idle);
        }, 300);
    }
}
