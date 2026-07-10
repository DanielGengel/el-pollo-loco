import { ImageHelper } from "../helper/imgHelper.class.js";
import { IntervalHub } from "../helper/intervallHub.js";
import { MoveableObject } from "./moveableObject.class.js";
import { SoundHub } from "../helper/soundHub.class.js";

export class ThrowableObject extends MoveableObject {
    bottleAboveGround = false;
    bottleFlying = false;
    imgStart = ImageHelper.SALSA_BOTTLE.rotation[3];
    imgArrBottleRotation = ImageHelper.SALSA_BOTTLE.rotation;
    imgArrBottleSplash = ImageHelper.SALSA_BOTTLE.splash;

    gravityInterval;
    moveInterval;
    animationInterval;

    offset = { top: 0, right: 0, bottom: 0, left: 0 };
    showFrame = false;

    /**
     * Creates a new bottle and throws it.
     * @param {number} x -> The start place from left to right
     * @param {number} y -> The start place from top to bottom
     * @param {boolean} otherDirection -> Shows if the bottle flies to the left
     */
    constructor(x, y, otherDirection) {
        super();
        this.loadBottleImages();
        this.setBottlePosition(x, y, otherDirection);
        this.setBottleSize();
        this.throw();
        this.animateFlyingBottle();
    }

    /**
     * Loads all bottle pictures.
     */
    loadBottleImages() {
        this.loadImage(this.imgStart);
        this.loadImages(this.imgArrBottleRotation);
        this.loadImages(this.imgArrBottleSplash);
    }

    /**
     * Sets the start place and direction of the bottle.
     * @param {number} x -> The start place from left to right
     * @param {number} y -> The start place from top to bottom
     * @param {boolean} otherDirection -> Shows if the bottle flies to the left
     */
    setBottlePosition(x, y, otherDirection) {
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
    }

    /**
     * Sets the size of the bottle.
     */
    setBottleSize() {
        this.height = 60;
        this.width = 50;
    }

    /**
     * Throws the bottle and starts the flying movement.
     */
    throw() {
        this.prepareBottleThrow();
        this.startBottleMovement();
    }

    /**
     * Gives the bottle power and starts gravity.
     */
    prepareBottleThrow() {
        this.speedY = 30;
        this.applyGravityToBottle();
        this.bottleAboveGround = true;
        this.bottleFlying = true;
    }

    /**
     * Starts moving the bottle to the left or right.
     */
    startBottleMovement() {
        this.moveInterval = IntervalHub.startInterval(this.moveBottleInterval, 25);
    }

    /**
     * Moves the bottle while the interval is running.
     */
    moveBottleInterval = () => {
        if (this.hasHit) return;

        this.moveBottleForward();
    };

    /**
     * Moves the bottle in the flying direction.
     */
    moveBottleForward() {
        if (this.otherDirection) {
            this.x -= 10;
        } else {
            this.x += 10;
        }
    }

    /**
     * Lets the bottle fly up and fall down again.
     */
    applyGravityToBottle() {
        this.gravityInterval = IntervalHub.startInterval(this.gravityBottleInterval, 1000 / 25);
    }

    /**
     * Moves the bottle up and down while gravity is running.
     */
    gravityBottleInterval = () => {
        if (this.y < 340 || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        } else {
            this.y = 340;
            this.speedY = 0;
        }
    };

    /**
     * Shows the flying or splash animation of the bottle.
     */
    animateFlyingBottle() {
        this.animationInterval = IntervalHub.startInterval(this.animateBottleInterval, 1000 / 60);
    }

    /**
     * Changes the bottle picture while the animation is running.
     */
    animateBottleInterval = () => {
        if (!this.hasHit) {
            this.playAnimation(this.imgArrBottleRotation);
        } else {
            this.playAnimation(this.imgArrBottleSplash);
        }
    };

    /**
     * Breaks the bottle and shows the splash.
     * @param {boolean} onGround -> Shows if the bottle broke on the ground
     */
    breakAndSplash(onGround = true) {
        if (this.hasHit) return;

        this.hasHit = true;
        this.stopBottleMovement();
        this.playBottleBreakSound();
        this.setBottleSplashPlace(onGround);
        this.stopSplashAnimationAfterTime(onGround);
    }

    /**
     * Stops the bottle from flying left or right.
     */
    stopBottleMovement() {
        IntervalHub.stopInterval(this.moveInterval);
    }

    /**
     * Plays the bottle break sound.
     */
    playBottleBreakSound() {
        SoundHub.pauseOne(SoundHub.bottleBreak);
        SoundHub.playOne(SoundHub.bottleBreak);
    }

    /**
     * Sets the place of the splash after the bottle breaks.
     * @param {boolean} onGround -> Shows if the bottle broke on the ground
     */
    setBottleSplashPlace(onGround) {
        if (onGround) {
            this.stopBottleOnGround();
        } else {
            this.stopBottleInAir();
        }
    }

    /**
     * Stops the bottle when it breaks on the ground.
     */
    stopBottleOnGround() {
        IntervalHub.stopInterval(this.gravityInterval);
        this.speedY = 0;
        this.y = 390;
    }

    /**
     * Stops the bottle speed when it hits something in the air.
     */
    stopBottleInAir() {
        this.speedY = 0;
    }

    /**
     * Stops the splash animation after a short time.
     * @param {boolean} onGround -> Shows if the bottle broke on the ground
     */
    stopSplashAnimationAfterTime(onGround) {
        setTimeout(() => {
            this.stopSplashAnimation(onGround);
        }, 300);
    }

    /**
     * Stops the splash animation and shows the last splash picture.
     * @param {boolean} onGround -> Shows if the bottle broke on the ground
     */
    stopSplashAnimation(onGround) {
        IntervalHub.stopInterval(this.animationInterval);

        if (!onGround) {
            this.stopAirSplashOnGround();
        }

        this.img = this.imageCache[this.imgArrBottleSplash.at(-1)];
    }

    /**
     * Stops the falling splash when it reaches the ground.
     */
    stopAirSplashOnGround() {
        IntervalHub.stopInterval(this.gravityInterval);
        this.y = 340;
    }
}
