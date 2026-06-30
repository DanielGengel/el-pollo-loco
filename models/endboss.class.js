import { MoveableObject } from "./moveableObject.class.js";
import { ImageHelper } from "../helper/imgHelper.class.js";
import { IntervalHub } from "../helper/intervallHub.js";

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
    showFrame = true; // show frame around chicken
    offset = { top: 60, right: 40, bottom: 0, left: 40 };

    constructor() {
        super();
        this.loadImage(this.imgStart);
        this.loadImages(this.imgArrEndbossWalk);
        this.loadImages(this.imgArrEndbossAlert);
        this.loadImages(this.imgArrEndbossAttack);
        this.loadImages(this.imgArrEndbossHurt);
        this.loadImages(this.imgArrEndbossDead);
        this.x = 2500;

        this.animate();
    }

    animate() {
        IntervalHub.startInterval(() => {
            if (this.isDead()) {
                // console.log("is above ground");
                this.playAnimation(this.imgArrEndbossDead);
            } else if (this.isHurt()) {
                // console.log("is above ground");
                this.playAnimation(this.imgArrEndbossHurt);
                // this.playAnimation(this.imgArrEndbossAttack);
            } else {
                this.playAnimation(this.imgArrEndbossAlert);
            }

            // let index = this.currentImage % ImageHelper.CHICKEN.chicken_normal.length;
            // let path = ImageHelper.CHICKEN.chicken_normal[index];
            // this.img = this.imageCache[path];
            // this.currentImage++;
        }, 200);
    }

    die() {
        if (this.isDead()) return;

        this.energy = 0;
        console.log("enboss energy = ", this.energy);
    }
}
