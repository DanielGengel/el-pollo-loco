import { MoveableObject } from "./moveableObject.class.js";
import { ImageHelper } from "../helper/imgHelper.class.js";
import { IntervalHub } from "../helper/intervallHub.js";
import { SoundHub } from "../helper/soundHub.class.js";

export class Endboss extends MoveableObject {
    height = 500;
    width = 300;
    y = -40;
    imgStart = ImageHelper.CHICKEN_BOSS.alert[0];
    imgArrEndbossWalk = ImageHelper.CHICKEN_BOSS.walk;
    imgArrEndbossAlert = ImageHelper.CHICKEN_BOSS.alert;
    imgArrEndbossAttack = ImageHelper.CHICKEN_BOSS.attack;
    imgArrEndbossHurt = ImageHelper.CHICKEN_BOSS.hurt;
    imgArrEndbossDead = ImageHelper.CHICKEN_BOSS.dead;
    showFrame = false;
    offset = { top: 60, right: 40, bottom: 0, left: 40 };
    isDead = false;
    world;
    endbossIsWalking = false;

    /**
     * Creates the endboss and starts his animation and checks.
     */
    constructor() {
        super();
        this.loadImage(this.imgStart);
        this.loadImages(this.imgArrEndbossWalk);
        this.loadImages(this.imgArrEndbossAlert);
        this.loadImages(this.imgArrEndbossAttack);
        this.loadImages(this.imgArrEndbossHurt);
        this.loadImages(this.imgArrEndbossDead);
        this.x = 2500;
        this.speed = 2.5;

        IntervalHub.startInterval(this.animate, 200);
        IntervalHub.startInterval(this.checkIfCharacterIsNear, 1000 / 60);
    }

    /**
     * Shows the correct endboss animation depending on endboss state.
     */
    animate = () => {
        if (this.isDead) {
            this.playAnimation(this.imgArrEndbossDead);
        } else if (this.isHurt()) {
            this.playAnimation(this.imgArrEndbossHurt);
        } else if (this.endbossIsWalking) {
            this.playWalkAndAlertAnimation();
        } else {
            this.playAnimation(this.imgArrEndbossAlert);
        }
    };

    /**
     * Switches between walk and alert while the endboss is walking.
     */
    playWalkAndAlertAnimation() {
        if (this.currentImage % 2 === 0) {
            this.playAnimation(this.imgArrEndbossWalk);
        } else {
            this.playAnimation(this.imgArrEndbossAlert);
        }
    }

    /**
     * Checks if the character is near and starts moving the endboss.
     */
    checkIfCharacterIsNear = () => {
        if (!this.world) {
            return;
        }

        if (this.isDead) {
            return;
        }

        if (this.characterIsNear()) {
            this.endbossIsWalking = true;
        }

        if (this.endbossIsWalking) {
            this.walkToCharacter();
            SoundHub.playOne(SoundHub.endbossApproach);
        }
    };

    /**
     * Moves the endboss in the direction of the character.
     */
    walkToCharacter() {
        if (this.characterIsLeftFromEndboss()) {
            this.otherDirection = false;
            this.moveLeft();
        } else {
            this.otherDirection = true;
            this.moveRight();
        }
    }

    /**
     * Checks if the character is left from the endboss.
     * @returns {boolean} -> True when the character is left from the endboss
     */
    characterIsLeftFromEndboss() {
        return this.world.character.x < this.x;
    }

    /**
     * Checks if the character is close to the endboss.
     * @returns {boolean} -> True when the character is close
     */
    characterIsNear() {
        return this.world.character.x > this.x - 600;
    }

    /**
     * Kills the endboss and plays the death sound.
     */
    die() {
        SoundHub.playOne(SoundHub.chickenDead);
        this.isDead = true;
    }
}
