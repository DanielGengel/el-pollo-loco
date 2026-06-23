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
    speedY = 0; // fall speed of character
    acceleration = 3;
    showFrame = false; // hide frame around character and chicken

    // New coordinates for real frame
    rX;
    rY;
    rW;
    rH;
    offset = {
        top: 100,
        right: 10,
        bottom: 10,
        left: 15,
    };

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
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }

    applayGravity() {
        IntervalHub.startInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 130;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this.showFrame) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            ctx.rect(this.rX, this.rY, this.rW, this.rH);
            ctx.stroke();
        }
    }

    getRealFrame() {
        // console.log("getRealFrame");

        this.rX = this.x + this.offset.left;
        this.rY = this.y + this.offset.top;
        this.rW = this.width - this.offset.left - this.offset.right;
        this.rH = this.height - this.offset.top - this.offset.bottom;
        // console.log("this.x ", this.x);
        // console.log("this.y ", this.y);
        // console.log("this.width ", this.width);
        // console.log("this.height ", this.height);
        // console.log("this.rX ", this.rX);
        // console.log("this.rY ", this.rY);
        // console.log("this.rW ", this.rW);
        // console.log("this.rH ", this.rH);
    }

    isColliding(mO) {
        this.getRealFrame();
        return (
            // this.rX + this.rW > mO.rX &&
            // this.rY + this.rH > mO.rY &&
            // this.rX < mO.rX + mO.rW &&
            // this.rY < mO.rY + mO.rH

            this.x + this.width > mO.x &&
            this.y + this.height > mO.y &&
            this.x < mO.x + mO.width &&
            this.y < mO.y + mO.height
        );
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
