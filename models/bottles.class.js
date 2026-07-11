import { ImageHelper } from "../helper/imgHelper.class.js";
import { CollectibleObjects } from "./collectibleObjects.class.js";

export class Bottle extends CollectibleObjects {
    /** lastX: Create random distance between each bootle and avoid them being stacked above each other */
    static lastX = 200 + Math.random() * 150;
    /** x: this is the bottle position from left to right. */
    x = (Bottle.lastX += 150 + Math.random() * 500);
    /** y: this is the bottle position from top to bottom. */
    y = 360;
    height = 90;
    width = 100;
    imgArrBottleGround = ImageHelper.SALSA_BOTTLE.ground;
    /** true: show frame around bottle for development purposes */
    showFrame = false;
    /** Offset values for real collision frame */
    offset = { top: 10, right: 40, bottom: 5, left: 40 };

    /**
     * Creates a bottle that the character can collect.
     * Choose either picture one or two (left/right) for bottle placement
     */
    constructor() {
        super();
        this.loadImage(this.imgArrBottleGround[Math.floor(Math.random() * this.imgArrBottleGround.length)]);
    }
}
