import { StatusBar } from "./statusBar.class.js";
import { ImageHelper } from "../helper/imgHelper.class.js";

export class StatusBarEndboss extends StatusBar {
    /**
     * Creates the StatusBarEndboss and sets default to 100 percent
     * Parameters are ImageArray, x, y (Coordinates for StatusBar)
     */
    constructor() {
        super(ImageHelper.STATUSBAR.endboss_green, 250, 8);
        this.setPercentage(100);
    }
}