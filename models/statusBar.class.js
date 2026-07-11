import { DrawableObject } from "./drawableObject.class.js";

export class StatusBar extends DrawableObject {
    percentage = 0;
    imagesArr = [];

    /**
     * Creates a status bar object and loads all pictures for it.
     * @param {Array} images -> The pictures for the status bar
     * @param {number} x -> The place from left to right
     * @param {number} y -> The place from top to bottom
     * x/y: x and y positions of the status bars
     */
    constructor(images, x, y) {
        super();

        this.imagesArr = images;
        this.loadImages(images);

        this.x = x;
        this.y = y;
        this.width = 150;
        this.height = 40;
    }

    /**
     * Sets the new percent value and shows the matching picture.
     * @param {number} percentage -> The new percent value
     */
    setPercentage(percentage) {
        this.percentage = percentage;

        const index = this.resolveImageIndex();
        this.img = this.imageCache[this.imagesArr[index]];
    }

    /**
     * Finds the right picture for the current percent value.
     * @returns {number} -> The place of the right picture in the picture array
     */
    resolveImageIndex() {
        if (this.percentage === 100) return 5;
        if (this.percentage >= 80) return 4;
        if (this.percentage >= 60) return 3;
        if (this.percentage >= 40) return 2;
        if (this.percentage >= 20) return 1;
        return 0;
    }
}