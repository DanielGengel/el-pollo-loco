import { IntervalHub } from "../helper/intervallHub.js";

export class MoveableObject {
    x = 120;
    y = 280;
    width = 100;
    height = 150;
    speed = 0.15;
    img;
    imageCache = {};
    currentImage = 0;
    otherDirection = false; // mirroring character image when walking left

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(imageArray) {
        imageArray.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 7 % 6; =>  1, Rest 1 
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    moveRight() {
        console.log("moving right");
    }

    moveLeft() {
        IntervalHub.startInterval(() => this.x -= this.speed, 1000/ 60);
    }
}


// playAnimation(images, timer) {
//         IntervalHub.startInterval(() => this.addImages(images), timer);
//     }

//     addImages = (images) => {
//         let i = this.currentImage % images.length; // let i = 7 % 6; =>  1, Rest 1
//         let path = images[i];
//         this.img = this.imageCache[path];
//         this.currentImage++;
//     };

//     moveRight() {
//         console.log("moving right");
//     }

//     moveLeft() {
//         IntervalHub.startInterval(() => this.x -= this.speed, 1000/ 60);
//         // setInterval(() => {
//         //     this.x -= this.speed;
//         // }, 1000 / 60);
//     }