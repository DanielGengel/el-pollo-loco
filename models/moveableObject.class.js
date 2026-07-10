import { DrawableObject } from "./drawableObject.class.js";
import { SoundHub } from "../helper/soundHub.class.js";

export class MoveableObject extends DrawableObject {
    otherDirection = false; // mirroring character image when walking left
    speedY = 0; // fall speed of character
    acceleration = 3;
    showFrame = false; // if true => drawCollsionFrame around all moveable onjects
    energy = 100;
    lastHit = 0;
    bottleAboveGround = false;

    // New coordinates for real frame
    collisionBox = { x: 0, y: 0, width: 0, height: 0 };
    offset = { top: 120, right: 35, bottom: 15, left: 20 };

    /**
     * Shows the next picture from the animations
     * @param {Array} images -> The pictures for the animation
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the character and small Chickens to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the character, chickens and endboss to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the character jump and plays the jump sound.
     */
    jump() {
        this.speedY = 30;
        SoundHub.playOne(SoundHub.characterJump);
    }

    /**
     * Pulls the character down after jumping or throwing.
     */
    applyGravity = () => {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        } else {
            this.speedY = 0;
        }
    };

    /**
     * Checks if the character is still above the ground
     * @returns {boolean} -> True when the object is above the ground
     */
    isAboveGround() {
        if (this.bottleAboveGround) {
            console.log("bottleAboveGround");
            return true;
        } else {
            return this.y < 130;
        }
    }

    /**
     * Sets the real box that is used for touching other objects.
     */
    getRealFrame() {
        if (this.otherDirection) {
            this.setRealFrameToLeft();
        } else {
            this.setRealFrameToRight();
        }
    }

    /**
     * Sets the real box when the object looks left.
     */
    setRealFrameToLeft() {
        this.collisionBox.x = this.x + this.offset.right;
        this.collisionBox.y = this.y + this.offset.top;
        this.collisionBox.width = this.width - this.offset.left - this.offset.right;
        this.collisionBox.height = this.height - this.offset.top - this.offset.bottom;
    }

    /**
     * Sets the real box when the object looks right.
     */
    setRealFrameToRight() {
        this.collisionBox.x = this.x + this.offset.left;
        this.collisionBox.y = this.y + this.offset.top;
        this.collisionBox.width = this.width - this.offset.left - this.offset.right;
        this.collisionBox.height = this.height - this.offset.top - this.offset.bottom;
    }

    /**
     * Checks if this object touches another object.
     * @param {MoveableObject} mO -> The other object
     * @returns {boolean} -> True when both objects touch
     */
    isColliding(mO) {
        this.getRealFrame();
        mO.getRealFrame();

        return (
            this.collisionBox.x + this.collisionBox.width > mO.collisionBox.x &&
            this.collisionBox.y + this.collisionBox.height > mO.collisionBox.y &&
            this.collisionBox.x < mO.collisionBox.x + mO.collisionBox.width &&
            this.collisionBox.y < mO.collisionBox.y + mO.collisionBox.height
        );
    }

    /**
     * Takes 20 energy away from the character or endboss.
     */
    hit() {
        this.energy -= 20;

        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the character or endboss were hit a short moment ago.
     * @returns {boolean} -> True when the object is still hurt
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 1000;
    }

    /**
     * Checks if the character or endboss has no energy left.
     * @returns {boolean} -> True when the object is dead
     */
    isDead() {
        return this.energy === 0;
    }
}