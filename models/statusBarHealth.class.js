import { StatusBar } from "./statusBar.class.js";
import { ImageHelper } from "../helper/imgHelper.class.js";

export class StatusBarHealth extends StatusBar {
    constructor() {
        // Parameters are ImageArray, x, y (Coordinates for StatusBar)
        super(ImageHelper.STATUSBAR.health_green, 40, 0);
        this.setPercentage(100);
    }
}