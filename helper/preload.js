import { ImageHelper } from "./imgHelper.class.js";

export const preloadedImages = {};

export function preloadImages() {
    let imagePreloader = new ImagePreloader();

    return imagePreloader.preloadImages();
}

export function getPreloadedImage(path) {
    return preloadedImages[path];
}

class ImagePreloader {
    imagePaths = [];

    constructor() {
        this.collectImagePaths(ImageHelper);
        this.addImagePath("./assets/img/background.png");
    }

    preloadImages() {
        let imagePromises = [];

        this.imagePaths.forEach((path) => {
            imagePromises.push(this.loadImage(path));
        });

        return Promise.all(imagePromises);
    }

    loadImage(path) {
        return new Promise((resolve, reject) => {
            let img = new Image();

            img.onload = () => {
                preloadedImages[path] = img;
                resolve(path);
            };

            img.onerror = () => reject(path);
            img.src = path;
        });
    }

    collectImagePaths(obj) {
        Object.values(obj).forEach((value) => {
            if (Array.isArray(value)) {
                this.addImagePaths(value);
            } else if (typeof value === "object" && value !== null) {
                this.collectImagePaths(value);
            }
        });
    }

    addImagePaths(paths) {
        paths.forEach((path) => {
            this.addImagePath(path);
        });
    }

    addImagePath(path) {
        if (!this.imagePaths.includes(path)) {
            this.imagePaths.push(path);
        }
    }
}
