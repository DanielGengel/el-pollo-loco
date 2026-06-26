import { MoveableObject } from "./moveableObject.class.js";
import { ImageHelper } from "../helper/imgHelper.class.js";
import { IntervalHub } from "../helper/intervallHub.js";

export class Endboss extends MoveableObject {
    height = 500;
    width = 300;
    y = -40;
    imgStart = ImageHelper.CHICKEN_BOSS.alert[0];
    imgArrEndbossWalk = ImageHelper.CHICKEN_BOSS.walk;
    imgArrEndbossAlert = ImageHelper.CHICKEN_BOSS.alert 
    imgArrEndbossAttack = ImageHelper.CHICKEN_BOSS.attack;
    imgArrEndbossHurt = ImageHelper.CHICKEN_BOSS.hurt;
    imgArrEndbossDead = ImageHelper.CHICKEN_BOSS.dead;
    showFrame = true; // show frame around chicken
    offset = { top: 60, right: 40, bottom: 0, left: 40 };

    constructor() {
        super();
        this.loadImage(this.imgStart);
        this.loadImages(this.imgArrEndbossAlert);
        this.x = 2500;

        this.animate();
    }

    animate() {
        IntervalHub.startInterval(() => {
            this.playAnimation(this.imgArrEndbossAlert);
            // let index = this.currentImage % ImageHelper.CHICKEN.chicken_normal.length;
            // let path = ImageHelper.CHICKEN.chicken_normal[index];
            // this.img = this.imageCache[path];
            // this.currentImage++;
        }, 200);
    }
}
