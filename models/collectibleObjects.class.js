import { ImageHelper } from "../helper/imgHelper.class.js";
import { DrawableObject } from "./drawableObject.class.js";
import { MoveableObject } from "./moveableObject.class.js"; // because of collision frame

export class CollectibleObjects extends MoveableObject {
    x = 200 + Math.random() * 2000;
    y = 350;
    height = 90;
    width = 100;
    showFrame = true; // show frame around chicken
    offset = { top: 10, right: 40, bottom: 5, left: 40 };

    constructor() {
        super();
        this.loadImage(ImageHelper.ICONS.bottle[0]);

        //this.x = -100 + Math.random() * 1000;
    }
}


