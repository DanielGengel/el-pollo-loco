import { StatusBar } from "./statusBar.class.js";
import { ImageHelper } from "../helper/imgHelper.class.js";

export class StatusBarBottles extends StatusBar {
    constructor() {
        super(ImageHelper.STATUSBAR.bottle_green, 250, 40);

        this.setPercentage(0);
    }
}