import { DrawableObject } from "./drawableObject.class.js";

export class StatusBar extends DrawableObject {
    percentage = 0;
    imagesArr = [];

    constructor(images, x, y) {
        super();

        this.imagesArr = images;
        this.loadImages(images);
        console.log(this.imagesArr );
        

        this.x = x;
        this.y = y;
        this.width = 150;
        this.height = 40;
    }

    setPercentage(percentage) {
        this.percentage = percentage;

        const index = this.resolveImageIndex();
        this.img = this.imageCache[this.imagesArr[index]];
    }

    resolveImageIndex() {
        if (this.percentage === 100) return 5;
        if (this.percentage >= 80) return 4;
        if (this.percentage >= 60) return 3;
        if (this.percentage >= 40) return 2;
        if (this.percentage >= 20) return 1;
        return 0;
    }
}