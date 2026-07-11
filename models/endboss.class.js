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
    offset = { top: 60, right: 60, bottom: 0, left: 60 };
    isDead = false;
    world;
    endbossIsWalking = false;
    endbossIsAttacking = false;
    walkDirection = "left";

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
        } else if (this.endbossIsAttacking) {
            this.playAnimation(this.imgArrEndbossAttack);
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

        this.endbossIsAttacking = this.isColliding(this.world.character);

        if (this.characterIsNear()) {
            this.endbossIsWalking = true;
        }

        if (this.endbossIsWalking && !this.endbossIsAttacking) {
            this.walkToCharacter();
            SoundHub.playOne(SoundHub.endbossApproach);
        }
    };

    /**
     * Moves the endboss in the saved direction.
     */
    walkToCharacter() {
        this.updateWalkDirection();

        if (this.walkDirection === "left") {
            this.otherDirection = false;
            this.moveLeft();
        } else {
            this.otherDirection = true;
            this.moveRight();
        }
    }

    /**
     * Changes the walking direction only when the character is far enough behind him.
     */
    updateWalkDirection() {
        if (this.world.character.x < this.x - 200) {
            this.walkDirection = "left";
        }

        if (this.world.character.x > this.x + 200) {
            this.walkDirection = "right";
        }
    }

    /**
     * Checks if the character is far left from the endboss.
     * @returns {boolean} -> True when the character is far left
     */
    characterIsFarLeftFromEndboss() {
        return this.world.character.x < this.x - 200;
    }

    /**
     * Checks if the character is far right from the endboss.
     * @returns {boolean} -> True when the character is far right
     */
    characterIsFarRightFromEndboss() {
        return this.world.character.x > this.x + 200;
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
