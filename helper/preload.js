import { ImageHelper } from "./imgHelper.class.js";

export const preloadedImages = {};

/**
 * Loads all game pictures before the game starts.
 * @returns {Promise} -> The loading work for all pictures
 */
export function preloadImages() {
    let imagePreloader = new ImagePreloader();

    return imagePreloader.preloadImages();
}

/**
 * Gives back one already loaded picture.
 * @param {string} path -> The path to the picture
 * @returns {HTMLImageElement} -> The loaded picture
 */
export function getPreloadedImage(path) {
    return preloadedImages[path];
}

class ImagePreloader {
    imagePaths = [];

    /**
     * Creates the image preloader and collects all picture paths.
     */
    constructor() {
        this.collectImagePaths(ImageHelper);
        this.addImagePath("./assets/img/background.png");
    }

    /**
     * Loads all collected pictures.
     * @returns {Promise} -> The loading work for all pictures
     */
    preloadImages() {
        let imagePromises = [];

        this.imagePaths.forEach((path) => {
            imagePromises.push(this.loadImage(path));
        });

        return Promise.all(imagePromises);
    }

    /**
     * Loads one picture.
     * @param {string} path -> The path to the picture
     * @returns {Promise} -> The loading work for one picture
     */
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

    /**
     * Collects all picture paths from an object.
     * @param {Object} obj -> The object with picture paths
     */
    collectImagePaths(obj) {
        Object.values(obj).forEach((value) => {
            if (Array.isArray(value)) {
                this.addImagePaths(value);
            } else if (typeof value === "object" && value !== null) {
                this.collectImagePaths(value);
            }
        });
    }

    /**
     * Adds many picture paths to the list.
     * @param {Array} paths -> The picture paths
     */
    addImagePaths(paths) {
        paths.forEach((path) => {
            this.addImagePath(path);
        });
    }

    /**
     * Adds one picture path to the list.
     * @param {string} path -> The picture path
     */
    addImagePath(path) {
        if (!this.imagePaths.includes(path)) {
            this.imagePaths.push(path);
        }
    }
}