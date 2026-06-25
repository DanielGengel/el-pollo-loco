import { StatusBar } from "./statusBar.class.js";
import { ImageHelper } from "../helper/imgHelper.class.js";

export class StatusBarEndboss extends StatusBar {
    constructor() {
        // Parameters are ImageArray, x, y (Coordinates for StatusBar)
        super(ImageHelper.STATUSBAR.endboss_green, 250, 8);
        this.setPercentage(100);
    }
}