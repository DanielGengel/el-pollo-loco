import { MoveableObject } from "./moveableObject.class.js";

export class BackgroundObject extends MoveableObject {
    width = 720;
    height = 480;

    /**
     * Loads the background picture for the level...
     * @param {string} path -> The path to the background picture
     * @param {number} x -> The place from left to right
     * @param {number} y -> The place from top to bottom
     */
    constructor(path, x, y) {
        super().loadImage(path);
        this.x = x;
        this.y = 480 - this.height;
    }
}