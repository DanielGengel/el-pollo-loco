import { StatusBar } from "./statusBar.class.js";
import { ImageHelper } from "../helper/imgHelper.class.js";

export class StatusBarBottles extends StatusBar {
     /**
     * Creates the StatusBarBottles and sets default to 0 percent
     * Parameters are ImageArray, x, y (Coordinates for StatusBar)
     */
    constructor() {
        super(ImageHelper.STATUSBAR.bottle_green, 250, 40);
        this.setPercentage(0);
    }
}