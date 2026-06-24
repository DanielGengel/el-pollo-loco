import { ImageHelper } from "../helper/imgHelper.class.js";
import { CollectibleObjects } from "./collectibleObjects.class.js";

export class Bottle extends CollectibleObjects { 


    
// Create randome distance between each bootle and avoid them being stacked above each other
    static lastX = 200 + Math.random() * 150;
    x = Bottle.lastX += 150 + Math.random() * 500;
// x = 200 + Math.random() * 2000;
    y = 350;
    height = 90;
    width = 100;
    showFrame = true; // show frame around chicken
    offset = { top: 10, right: 40, bottom: 5, left: 40 };  // Offset values for real collision frame

    constructor() {
        super();
        this.loadImage(ImageHelper.ICONS.bottle[0]);

        //this.x = -100 + Math.random() * 1000;
    }



}
