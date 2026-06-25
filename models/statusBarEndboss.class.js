import { StatusBar } from "./statusBar.class.js";
import { ImageHelper } from "../helper/imgHelper.class.js";

export class StatusBarEndboss extends StatusBar {
    constructor() {
        super(ImageHelper.STATUSBAR.endboss_green, 250, 8);

        this.setPercentage(100);
    }
}