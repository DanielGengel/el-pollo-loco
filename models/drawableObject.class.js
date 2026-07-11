import { getPreloadedImage } from "../helper/preload.js";

export class DrawableObject {
    /** x: this is the object position from left to right. */
    x = 120;
    /** y: this is the object position from top to bottom. */
    y = 280;
    width = 100;
    height = 150;
    speed = 0.15;
    img;
    imageCache = {};
    currentImage = 0;

    /**
     * Loads one picture for the object.
     * @param {string} path -> The path to the picture
     */
    loadImage(path) {
        const preloadedImage = getPreloadedImage(path);

        if (preloadedImage) {
            this.img = preloadedImage;
        } else {
            this.img = new Image();
            this.img.src = path;
        }
    }

    /**
     * Loads many pictures and saves them for later.
     * @param {Array} imageArray -> The picture paths that should be loaded
     */
    loadImages(imageArray) {
        imageArray.forEach((path) => {
            let img = getPreloadedImage(path);

            if (!img) {
                img = new Image();
                img.src = path;
            }

            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the object on the canvas.
     * @param {CanvasRenderingContext2D} ctx -> The canvas tool for drawing
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        this.drawCollsionFrame(ctx);
    }

    /**
     * Draws blue and red frames around the object for development purposes
     * Blue = the actual picture frame
     * Red = the corrected collision frame 
     * @param {CanvasRenderingContext2D} ctx -> The canvas tool for drawing
     */
    drawCollsionFrame(ctx) {
        if (this.showFrame) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            ctx.rect(this.collisionBox.x, this.collisionBox.y, this.collisionBox.width, this.collisionBox.height);
            ctx.stroke();
        }
    }
}