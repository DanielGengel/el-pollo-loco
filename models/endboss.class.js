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
    showFrame = false; // show frame around chicken
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
        this.speed = 0.5;

        IntervalHub.startInterval(this.animate, 200);
        IntervalHub.startInterval(this.checkIfCharacterIsNear, 1000 / 60);
    }

    /**
     * Shows the correct endboss animation depending on endboss state
     */
    animate = () => {
        if (this.isDead) {
            this.playAnimation(this.imgArrEndbossDead);
        } else if (this.isHurt()) {
            this.playAnimation(this.imgArrEndbossHurt);
        } else if (this.endbossIsWalking) {
            this.playAnimation(this.imgArrEndbossWalk);
        } else {
            this.playAnimation(this.imgArrEndbossAlert);
        }
    };

    /**
     * Checks if the character is near and start moving the endboss.
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
            this.otherDirection = false;
            this.moveLeft();
            SoundHub.playOne(SoundHub.endbossApproach);
        }
    };

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