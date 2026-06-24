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
    showFrame = false; // if true => drawCollsionFrame around character and chicken
    energy = 100;
    lastHit = 0;

    // New coordinates for real frame
    collisionBox = { x: 0, y: 0, width: 0, height: 0 };
    offset = { top: 120, right: 35, bottom: 15, left: 20 };

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

    drawCollsionFrame(ctx) {
        if (this.showFrame) {
            // Picture frame
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();

            // Corrected picture frame (real frame)
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            ctx.rect(this.collisionBox.x, this.collisionBox.y, this.collisionBox.width, this.collisionBox.height);
            ctx.stroke();
        }
    }

    getRealFrame() {
        // this.collisionBox.x = this.x + this.offset.left;
        // this.collisionBox.y = this.y + this.offset.top;
        // this.collisionBox.width = this.width - this.offset.left - this.offset.right;
        // this.collisionBox.height = this.height - this.offset.top - this.offset.bottom;

        // Mirror coordinates if character walks in other direction
        if (this.otherDirection) {
            this.collisionBox.x = this.x + this.offset.right;
            this.collisionBox.y = this.y + this.offset.top;
            this.collisionBox.width = this.width - this.offset.left - this.offset.right;
            this.collisionBox.height = this.height - this.offset.top - this.offset.bottom;
        } else {
            {
                this.collisionBox.x = this.x + this.offset.left;
                this.collisionBox.y = this.y + this.offset.top;
                this.collisionBox.width = this.width - this.offset.left - this.offset.right;
                this.collisionBox.height = this.height - this.offset.top - this.offset.bottom;
            }
        }
    }

    isColliding(mO) {
        this.getRealFrame();
        // console.log("this.x =>", this.x);
        // console.log("this.y =>", this.y);
        // console.log("this.width =>", this.width);
        // console.log("this.height =>", this.height);
        // console.log("this.collisionBox.x =>", this.collisionBox.x);
        // console.log("this.collisionBox.y =>", this.collisionBox.y);
        // console.log("this.collisionBox.width =>", this.collisionBox.width);
        // console.log("this.collisionBox.height =>", this.collisionBox.height);

        return (
            this.collisionBox.x + this.collisionBox.width > mO.x &&
            this.collisionBox.y + this.collisionBox.height > mO.y &&
            this.collisionBox.x < mO.x + mO.width &&
            this.collisionBox.y < mO.y + mO.height

            // this.x + this.width > mO.x &&
            // this.y + this.height > mO.y &&
            // this.x < mO.x + mO.width &&
            // this.y < mO.y + mO.height
        );
    }

    hit() {
        // Decrease energy level of character
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        console.log(this.energy);
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Time diff. in ms
        return (timePassed < 1000); // 1000 milli seconds
    }

    isDead() {
        return this.energy === 0;
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
