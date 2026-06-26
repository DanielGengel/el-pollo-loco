import { ImageHelper } from "../helper/imgHelper.class.js";
import { CollectibleObjects } from "./collectibleObjects.class.js";

export class Bottle extends CollectibleObjects {
    // Create randome distance between each bootle and avoid them being stacked above each other
    static lastX = 200 + Math.random() * 150;
    x = (Bottle.lastX += 150 + Math.random() * 500);
    // x = 200 + Math.random() * 2000;
    y = 360;
    height = 90;
    width = 100;
    imgArrBottleGround = ImageHelper.SALSA_BOTTLE.ground;
    showFrame = true; // show frame around chicken
    offset = { top: 10, right: 40, bottom: 5, left: 40 }; // Offset values for real collision frame

    constructor() {
        super();
        // Choose either picture one or two (left/right) for bottle placement
        this.loadImage(this.imgArrBottleGround[Math.floor(Math.random() * this.imgArrBottleGround.length)]);
    }
}
