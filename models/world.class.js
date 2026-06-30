import { Character } from "./character.class.js";
import { level1 } from "../levels/level1.js";
import { MoveableObject } from "./moveableObject.class.js";
import { IntervalHub } from "../helper/intervallHub.js";
import { StatusBar } from "./statusBar.class.js";
import { ThrowableObject } from "./throwableObject.class.js";
import { CollectibleObjects } from "./collectibleObjects.class.js";
import { Chicken } from "./chicken.class.js";
import { StatusBarHealth } from "./statusBarHealth.class.js";
import { StatusBarCoins } from "./statusBarCoins.class.js";
import { StatusBarBottles } from "./statusBarBottles.class.js";
import { StatusBarEndboss } from "./statusBarEndboss.class.js";
import { Coin } from "./coins.class.js";
import { Bottle } from "./bottles.class.js";
import { Endboss } from "./endboss.class.js";

export class World {
    character = new Character();
    chicken = new Chicken();
    level = level1;
    canvas;
    ctx;
    keyboard;
    cameraX = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarCoins = new StatusBarCoins();
    statusBarBottles = new StatusBarBottles();
    statusBarEndboss = new StatusBarEndboss();
    throwableObject = []; // Array to draw object thrown to map
    // bottleAboveGround = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.draw();
        this.setWorld();
        // this.character.getRealFrame();
        this.run();
    }

    run() {
        // console.log("checkCollision()");
        IntervalHub.startInterval(() => {
            this.checkCollisionWithEnemy();
            this.checkCollisionWithCollectibles();
            this.checkObjectThrown();
            this.checkCollisionBottleWithEnemy();
            this.checkCollisionBottleWithGround();
            // this.checkCollisionOfBottleWithGround();
        }, 100);
    }

    checkCollisionBottleWithGround() {
        IntervalHub.startInterval(() => {
            this.throwableObject.forEach((bottle, index) => {
                if (!bottle.hasHit && bottle.y >= 340) {
                    bottle.breakAndSplash();

                    setTimeout(() => {
                        this.throwableObject.splice(index, 1);
                    }, 300);
                }
            }, 1000 / 60);
        });
    }

    checkCollisionBottleWithEnemy() {
        this.throwableObject.forEach((bottle, bottleIndex) => {
            if (bottle.hasHit) return; // Avoid calling it to often
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    console.log("Bottle hit", enemy);
                    // kill enemy
                    if (enemy instanceof Endboss && enemy.energy > 0) {
                        console.log("this enemy instanceof Endboss, energy = ", enemy.energy);
                        enemy.hit();
                        this.statusBarEndboss.setPercentage(enemy.energy);
                    } else {
                        enemy.die();

                        // bottle splash animation
                        bottle.breakAndSplash();

                        // remove enemy after death animation
                        setTimeout(() => {
                            this.removeObjectFromMap(this.level.enemies, enemy);
                        }, 500);

                        // remove bottle after splash animation
                        setTimeout(() => {
                            this.throwableObject.splice(bottleIndex, 1);
                        }, 300);
                    }
                }
            });
        });
    }

    checkCollisionWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            // console.log("checkCollision forEach((enemy)");
            // Kill chicken only of this.character.speedY < -10 (= negative speed)
            // console.log("this.character.speedY", this.character.speedY);

            if (this.character.isColliding(enemy) && this.character.speedY < 0) {
                enemy.die();
                this.character.jump();

                // Show dead chicken for 500ms than remove
                setTimeout(() => {
                    this.removeObjectFromMap(this.level.enemies, enemy);
                }, 500);
                // console.log("CHICKEN DEAD ", this.chicken.isDead());
            } else if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
            }
        });
    }

    // checkCollisionWithBottle() {
    //         this.level.collectibleObjects.forEach((object) => {
    //             // console.log("checkCollision forEach((enemy)");
    //             if (this.character.isColliding(object)) {

    //                 console.log("remove bottle ", object);

    //                 // this.character.hit();
    //                 // this.statusBar.setPercentage(this.character.energy);
    //             }
    //         });
    //     }

    // checkCollisionWithBottle() {
    //     this.level.collectibleObjects =
    //         this.level.collectibleObjects.filter((object) => {
    //             if (this.character.isColliding(object)) {
    //                 console.log("remove bottle", object);
    //                 return false; // entfernen
    //             }
    //             return true; // behalten
    //         });
    // }

    // Character can collect coins and bottles
    checkCollisionWithCollectibles() {
        this.level.collectibleObjects.forEach((object) => {
            if (this.character.isColliding(object)) {
                if (object instanceof Coin) {
                    this.character.collectCoin();
                    this.statusBarCoins.setPercentage(this.character.coins * 20);
                }

                if (object instanceof Bottle) {
                    this.character.collectBottle();
                    this.statusBarBottles.setPercentage(this.character.bottles * 20);
                }

                this.removeObjectFromMap(this.level.collectibleObjects, object);
            }
        });
    }

    removeObjectFromMap(array, objectToRemove) {
        const index = array.indexOf(objectToRemove);

        if (index > -1) {
            array.splice(index, 1);
        }
    }

    checkObjectThrown() {
        // Unlimited bootles
        // if (this.character.bottles > 0) {
        if (this.keyboard.D) {
            console.log("this.character.bottles ", this.character.bottles);

            let bottle = new ThrowableObject(
                this.character.x + 100,
                this.character.y + 100,
                this.character.otherDirection,
            );
            // Array to draw object thrown to map
            this.throwableObject.push(bottle);
            this.character.throwBottle();
            // number of available bottles * 20 => status bar percentage
            this.statusBarBottles.setPercentage(this.character.bottles * 20);
            // Avoid character falling asleep while throwing bottles
            this.character.lastAction = Date.now();
            // this.bottleAboveGround = true;
        }
        // }
    }

    // checkCollisionOfEndbossWithBottle() {}

    // checkCollisionOfBottleWithGround() {
    //     console.log("this.throwableObject.bottleAboveGround", this.bottleAboveGround);

    //     // if (this.bottleAboveGround === true) {
    //     //     this.throwableObject.forEach((throwableObject, index) => {
    //     //         if (throwableObject.speedY < -38) {
    //     //             throwableObject.breakAndSplash();
    //     //             setTimeout(() => {
    //     //                 this.throwableObject.splice(index, 1);
    //     //             }, 300);
    //     //         }
    //     //     });
    //     // }
    // }

    setWorld() {
        this.character.world = this; // to make the World accessible to the character
        // this.character.animate();
    }

    draw() {
        // clear content from canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.level.collectibleObjects);

        this.ctx.translate(-this.cameraX, 0);
        // Space for fixed objects moving with camera
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarEndboss);

        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {
        objects.forEach((object) => {
            this.addToMap(object);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawCollsionFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
            mo.drawCollsionFrame(this.ctx);
        }
    }

    flipImage(mo) {
        // If left-key is pressed, mirror image of character
        this.ctx.save(); // save ctx to only mirror image of character
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        // If left-key is pressed, mirror only image of character, restore rest
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
