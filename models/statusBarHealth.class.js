import { StatusBar } from "./statusBar.class.js";
import { ImageHelper } from "../helper/imgHelper.class.js";

export class StatusBarHealth extends StatusBar {
    constructor() {
        super(ImageHelper.STATUSBAR.health_green, 40, 0);

        this.setPercentage(100);
    }
}