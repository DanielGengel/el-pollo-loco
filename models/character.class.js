import { MoveableObject } from "./moveableObject.class.js";
import { ImageHelper } from "../helper/imgHelper.class.js";
import { IntervalHub } from "../helper/intervallHub.js";
// import { World } from "./world.class.js";
import { SoundHub } from '../helper/soundHub.class.js';

export class Character extends MoveableObject {
    width = 130;
    height = 300;
    y = 130;
    speed = 10;
    imgStart = ImageHelper.PEPE.idle[0];
    imgArrPepeIdle = ImageHelper.PEPE.idle;
    imgArrPepeLongIdle = ImageHelper.PEPE.long_idle;
    imgArrPepeWalk = ImageHelper.PEPE.walk;
    imgArrPepeJump = ImageHelper.PEPE.jump;
    imgArrPepeHurt = ImageHelper.PEPE.hurt;
    imgArrPepeDead = ImageHelper.PEPE.dead;
    world; // this variable to access the variables in world.class.js
    showFrame = false; // show frame around character
    coins = 0;
    bottles = 0;
    lastAction = Date.now();

    /**
     * Creates the character and starts his movement and animation checks.
     */
    constructor() {
        super();
        this.loadCharacterImages();
        this.startCharacterIntervals();
    }

    /**
     * Loads all pictures for the character.
     */
    loadCharacterImages() {
        this.loadImage(this.imgStart);
        this.loadImages(this.imgArrPepeIdle);
        this.loadImages(this.imgArrPepeLongIdle);
        this.loadImages(this.imgArrPepeWalk);
        this.loadImages(this.imgArrPepeJump);
        this.loadImages(this.imgArrPepeHurt);
        this.loadImages(this.imgArrPepeDead);
    }

    /**
     * Starts the character movement, gravity and animation.
     */
    startCharacterIntervals() {
        IntervalHub.startInterval(this.applyGravity, 1000 / 25);
        IntervalHub.startInterval(this.animate, 150);
        IntervalHub.startInterval(this.checkKeyboard, 1000 / 60);
    }

    /**
     * Checks the pressed keyboard buttons and moves the character.
     */
    checkKeyboard = () => {
        if (this.isDead()) {
            return;
        }

        this.checkMoveRight();
        this.checkMoveLeft();
        this.checkJump();
        this.updateCamera();
    };

    /**
     * Checks if the character should move right.
     */
    checkMoveRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
            this.otherDirection = false;
            this.moveRight();
        }
    }

    /**
     * Checks if the character should move left.
     */
    checkMoveLeft() {
        if (this.world.keyboard.LEFT && this.x > -2000) {
            this.otherDirection = true;
            this.moveLeft();
        }
    }

    /**
     * Checks if the character should jump.
     */
    checkJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
        }
    }

    /**
     * Moves the camera with the character.
     */
    updateCamera() {
        this.world.cameraX = -this.x + 100;
    }

    /**
     * Shows the correct character animation.
     */
    animate = () => {
        if (this.isDead()) {
            this.showDeadAnimation();
        } else if (this.isHurt()) {
            this.showHurtAnimation();
        } else if (this.isAboveGround()) {
            this.showJumpAnimation();
        } else if (this.characterIsWalking()) {
            this.showWalkAnimation();
        } else {
            this.showIdleAnimation();
        }
    };

    /**
     * Shows the dead animation and plays the dead sound.
     */
    showDeadAnimation() {
        this.playAnimation(this.imgArrPepeDead);
        SoundHub.playOne(SoundHub.characterDead);
    }

    /**
     * Shows the hurt animation and plays the damage sound.
     */
    showHurtAnimation() {
        this.playAnimation(this.imgArrPepeHurt);
        SoundHub.playOne(SoundHub.characterDamage);
    }

    /**
     * Shows the jump animation and plays the jump sound.
     */
    showJumpAnimation() {
        this.lastAction = Date.now();
        this.playAnimation(this.imgArrPepeJump);
        SoundHub.pauseOne(SoundHub.characterRun);
        SoundHub.playOne(SoundHub.characterJump);
    }

    /**
     * Checks if the character is walking left or right.
     * @returns {boolean} -> True when the character is walking
     */
    characterIsWalking() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    /**
     * Shows the walk animation and plays the running sound.
     */
    showWalkAnimation() {
        this.lastAction = Date.now();
        this.playAnimation(this.imgArrPepeWalk);
        SoundHub.playOne(SoundHub.characterRun);
    }

    /**
     * Shows the normal idle or sleeping animation.
     */
    showIdleAnimation() {
        SoundHub.pauseOne(SoundHub.characterRun);

        if (this.timePassedSinceLastAction() > 5000) {
            this.showLongIdleAnimation();
        } else {
            this.showShortIdleAnimation();
        }
    }

    /**
     * Shows the sleeping animation and plays the snoring sound.
     */
    showLongIdleAnimation() {
        this.playAnimation(this.imgArrPepeLongIdle);
        SoundHub.playOne(SoundHub.characterSnoring);
    }

    /**
     * Shows the normal idle animation.
     */
    showShortIdleAnimation() {
        this.playAnimation(this.imgArrPepeIdle);
    }

    /**
     * Checks how much time passed since the last character action.
     * @returns {number} -> The time after the last action
     */
    timePassedSinceLastAction() {
        return Date.now() - this.lastAction;
    }

    /**
     * Gives one coin to the character.
     */
    collectCoin() {
        SoundHub.pauseOne(SoundHub.collectSound);
        this.coins++;
        this.limitCoins();
        SoundHub.playOne(SoundHub.collectSound)
    }

    /**
     * Makes sure the character can only have 5 coins.
     */
    limitCoins() {
        if (this.coins > 5) {
            this.coins = 5;
        }
    }

    /**
     * Gives one bottle to the character.
     */
    collectBottle() {
        SoundHub.pauseOne(SoundHub.bottleCollectSound);
        this.bottles++;
        this.limitBottles();
        SoundHub.playOne(SoundHub.bottleCollectSound)
    }

    /**
     * Makes sure the character can only have 5 bottles.
     */
    limitBottles() {
        if (this.bottles > 5) {
            this.bottles = 5;
        }
    }

    /**
     * Takes one bottle away after throwing.
     */
    throwBottle() {
        this.bottles--;
        this.stopBottlesFromGoingBelowZero();
    }

    /**
     * Makes sure the character cannot have less than 0 bottles.
     */
    stopBottlesFromGoingBelowZero() {
        if (this.bottles < 0) {
            this.bottles = 0;
        }
    }
}