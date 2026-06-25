import { StatusBar } from "./statusBar.class.js";
import { ImageHelper } from "../helper/imgHelper.class.js";

export class StatusBarCoins extends StatusBar {
    constructor() {
        super(ImageHelper.STATUSBAR.coin_blue, 40, 40);

        this.setPercentage(0);
    }
}