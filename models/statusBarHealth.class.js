import { StatusBar } from "./statusBar.class.js";
import { ImageHelper } from "../helper/imgHelper.class.js";

export class StatusBarHealth extends StatusBar {
    /**
     * Creates the health bar and sets default to 100 percent
     * Parameters are ImageArray, x, y (Coordinates for StatusBar)
     */
    constructor() {
        super(ImageHelper.STATUSBAR.health_green, 40, 0);
        this.setPercentage(100);
    }
}