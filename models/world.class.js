import { Character } from "./character.class.js";
import { createLevel1 } from "../levels/level1.js";
import { IntervalHub } from "../helper/intervallHub.js";
import { ThrowableObject } from "./throwableObject.class.js";
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
    level = createLevel1();
    gameIsRunning = true;
    canvas;
    ctx;
    keyboard;
    cameraX = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarCoins = new StatusBarCoins();
    statusBarBottles = new StatusBarBottles();
    statusBarEndboss = new StatusBarEndboss();
    throwableObject = [];
    lastThrow = 0;
    gameResult = "";

    /**
     * Creates the game world and starts the game checks.
     * @param {HTMLCanvasElement} canvas -> The place where the game is drawn
     * @param {Object} keyboard -> The pressed keyboard buttons
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.draw();
        this.setWorld();
        IntervalHub.startInterval(this.run, 100);
        IntervalHub.startInterval(this.checkObjectThrown, 1000 / 60);
    }

    /**
     * Draws the whole game again and again.
     */
    draw() {
        if (!this.gameIsRunning) return;

        this.clearCanvas();
        this.drawMoveableGameObjects();
        this.drawFixedGameObjects();

        requestAnimationFrame(() => this.draw());
    }

    /**
     * Clears the old picture from the canvas.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draws all objects that move with the camera.
     */
    drawMoveableGameObjects() {
        this.ctx.translate(this.cameraX, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.level.collectibleObjects);

        this.ctx.translate(-this.cameraX, 0);
    }

    /**
     * Draws all objects that always stay at the same screen place.
     */
    drawFixedGameObjects() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarEndboss);
    }

    /**
     * Draws many objects on the map.
     * @param {Array} objects -> The objects that should be drawn
     */
    addObjectsToMap(objects) {
        objects.forEach((object) => {
            this.addToMap(object);
        });
    }

    /**
     * Draws one object on the map.
     * @param {Object} mo -> The object that should be drawn
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Turns the picture around when the object looks left.
     * @param {Object} mo -> The object that should be turned around
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Turns the picture back to normal after drawing.
     * @param {Object} mo -> The object that was turned around
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Gives the character and enemies access to this world.
     */
    setWorld() {
        this.character.world = this;

        this.level.enemies.forEach((enemy) => {
            enemy.world = this;
        });
    }

    /**
     * Checks the important game actions again and again.
     */
    run = () => {
        this.checkCollisionWithEnemy();
        this.checkCollisionWithCollectibles();
        this.checkCollisionBottleWithEnemy();
        this.checkCollisionBottleWithGround();
        this.checkCollisionBottleWithCharacter();
        this.checkGameOver();
    };

    /**
     * Checks if the character touches an enemy.
     */
    checkCollisionWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            const characterIsColliding = this.character.isColliding(enemy);

            if (!characterIsColliding) {
                enemy.hasHitCharacter = false;
                return;
            }

            if (enemy instanceof Endboss) {
                this.checkEndbossHit(enemy);
            } else {
                this.checkNormalEnemyHit(enemy);
            }
        });
    }

    /**
     * Hurts the character when the endboss hits him.
     * @param {Endboss} enemy -> The endboss
     */
    checkEndbossHit(enemy) {
        if (!this.canEndbossHitCharacter(enemy)) return;

        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
        enemy.lastCharacterHit = new Date().getTime();
    }

    /**
     * Checks if the endboss is allowed to hit again.
     * @param {Endboss} enemy -> The endboss
     * @returns {boolean} -> True when the endboss can hit
     */
    canEndbossHitCharacter(enemy) {
        const now = new Date().getTime();

        if (!enemy.lastCharacterHit) return true;

        return now - enemy.lastCharacterHit >= 500;
    }

    /**
     * Checks if a normal enemy gets killed or hurts the character.
     * @param {Object} enemy -> The normal enemy
     */
    checkNormalEnemyHit(enemy) {
        if (this.character.speedY < 0) {
            this.killNormalEnemy(enemy);
        } else if (!enemy.hasHitCharacter) {
            this.character.hit();
            this.statusBarHealth.setPercentage(this.character.energy);
            enemy.hasHitCharacter = true;
        }
    }

    /**
     * Kills a normal enemy and removes it after a short time.
     * @param {Object} enemy -> The enemy that should die
     */
    killNormalEnemy(enemy) {
        enemy.die();
        this.character.jump();

        setTimeout(() => {
            this.removeObjectFromMap(this.level.enemies, enemy);
        }, 500);
    }

    /**
     * Checks if the character collects coins or bottles.
     */
    checkCollisionWithCollectibles() {
        this.level.collectibleObjects.forEach((object) => {
            if (this.character.isColliding(object)) {
                this.collectObject(object);
            }
        });
    }

    /**
     * Collects one object and removes it from the map.
     * @param {Object} object -> The object that the character collects
     */
    collectObject(object) {
        if (object instanceof Coin) {
            this.collectCoin();
        }

        if (object instanceof Bottle) {
            this.collectBottle();
        }

        this.removeObjectFromMap(this.level.collectibleObjects, object);
    }

    /**
     * Gives one coin to the character and updates the coin bar.
     */
    /**
     * Gives one coin to the character and checks if health can be restored.
     */
    collectCoin() {
        this.character.collectCoin();
        this.healCharacterWithCoins();
        this.statusBarCoins.setPercentage(this.character.coins * 20);
    }

    /**
     * Gives the character 20 percent energy when he collected 5 coins.
     * This only works when the character already lost energy.
     */
    healCharacterWithCoins() {
        if (this.character.coins >= 5 && this.character.energy < 100) {
            this.character.energy += 20;

            if (this.character.energy > 100) {
                this.character.energy = 100;
            }

            this.character.coins = 0;
            this.statusBarHealth.setPercentage(this.character.energy);
        }
    }

    /**
     * Gives one bottle to the character and updates the bottle bar.
     */
    collectBottle() {
        this.character.collectBottle();
        this.statusBarBottles.setPercentage(this.character.bottles * 20);
    }

    /**
     * Checks if a thrown bottle hits an enemy.
     */
    checkCollisionBottleWithEnemy() {
        this.throwableObject.forEach((bottle, bottleIndex) => {
            if (bottle.hasHit) return;

            this.checkBottleHitEnemies(bottle, bottleIndex);
        });
    }

    /**
     * Checks one bottle against all enemies.
     * @param {ThrowableObject} bottle -> The thrown bottle
     * @param {number} bottleIndex -> The place of the bottle in the bottle list
     */
    checkBottleHitEnemies(bottle, bottleIndex) {
        this.level.enemies.forEach((enemy) => {
            if (bottle.isColliding(enemy)) {
                this.hitEnemyWithBottle(enemy, bottle, bottleIndex);
            }
        });
    }

    /**
     * Decides what happens when a bottle hits an enemy.
     * @param {Object} enemy -> The enemy that was hit
     * @param {ThrowableObject} bottle -> The bottle that hit the enemy
     * @param {number} bottleIndex -> The place of the bottle in the bottle list
     */
    hitEnemyWithBottle(enemy, bottle, bottleIndex) {
        if (enemy instanceof Endboss && enemy.energy > 0) {
            this.hitEndbossWithBottle(enemy, bottle);
        } else {
            this.killEnemyWithBottle(enemy, bottle, bottleIndex);
        }
    }

    /**
     * Hurts the endboss with a bottle and kills him after 5 hits
     * @param {Endboss} enemy -> The endboss
     * @param {ThrowableObject} bottle -> The bottle that hit the endboss
     */
    hitEndbossWithBottle(enemy, bottle) {
        enemy.hit();
        this.statusBarEndboss.setPercentage(enemy.energy);
        bottle.breakAndSplash(false);

        if (enemy.energy <= 0) {
            enemy.die();
        }
    }

    /**
     * Kills a normal enemy with a bottle.
     * @param {Object} enemy -> The enemy that should die
     * @param {ThrowableObject} bottle -> The bottle that hit the enemy
     * @param {number} bottleIndex -> The place of the bottle in the bottle list
     */
    killEnemyWithBottle(enemy, bottle, bottleIndex) {
        enemy.die();
        bottle.breakAndSplash(false);

        this.removeEnemyAfterDeath(enemy);
        this.removeBottleAfterSplash(bottleIndex);
    }

    /**
     * Removes an enemy after the death animation.
     * @param {Object} enemy -> The enemy that should be removed
     */
    removeEnemyAfterDeath(enemy) {
        setTimeout(() => {
            this.removeObjectFromMap(this.level.enemies, enemy);
        }, 500);
    }

    /**
     * Removes a bottle after the splash animation.
     * @param {number} bottleIndex -> The place of the bottle in the bottle list
     */
    removeBottleAfterSplash(bottleIndex) {
        setTimeout(() => {
            this.throwableObject.splice(bottleIndex, 1);
        }, 300);
    }

    /**
     * Removes one object from a list.
     * @param {Array} array -> The list where the object is inside
     * @param {Object} objectToRemove -> The object that should be removed
     */
    removeObjectFromMap(array, objectToRemove) {
        const index = array.indexOf(objectToRemove);

        if (index > -1) {
            array.splice(index, 1);
        }
    }

    /**
     * Checks if a bottle hits the ground.
     */
    checkCollisionBottleWithGround() {
        this.throwableObject.forEach((bottle) => {
            if (!bottle.hasHit && bottle.y >= 340) {
                bottle.breakAndSplash(true);
            }
        });
    }

    /**
     * Checks if a thrown bottle hits the character.
     */
    checkCollisionBottleWithCharacter() {
        this.throwableObject.forEach((bottle) => {
            if (this.bottleCanHitCharacter(bottle)) {
                this.hitCharacterWithBottle(bottle);
            }
        });
    }

    /**
     * Checks if the bottle is allowed to hit the character.
     * @param {ThrowableObject} bottle -> The thrown bottle
     * @returns {boolean} -> True when the bottle can hit the character
     */
    bottleCanHitCharacter(bottle) {
        return !bottle.hasHit && bottle.isColliding(this.character);
    }

    /**
     * Hurts the character when his own bottle hits him.
     * @param {ThrowableObject} bottle -> The bottle that hit the character
     */
    hitCharacterWithBottle(bottle) {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
        bottle.breakAndSplash(false);
    }

    /**
     * Stops the game world.
     */
    destroyWorld() {
        this.gameIsRunning = false;
    }

    /**
     * Checks if the player won or lost the game.
     */
    checkGameOver() {
        this.checkPlayerLost();
        this.checkPlayerWon();
    }

    /**
     * Checks if the character is dead.
     */
    checkPlayerLost() {
        if (this.character.isDead()) {
            this.showGameResultAfterTime("lost", 1500);
        }
    }

    /**
     * Checks if the endboss is dead.
     */
    checkPlayerWon() {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss && enemy.isDead) {
                this.showGameResultAfterTime("won", 1500);
            }
        });
    }

    /**
     * Shows the win or lose screen. Game result => world.gameResult
     * @param {string} result -> The result of the game
     * @param {number} time -> The time before the screen is shown
     */
    showGameResultAfterTime(result, time) {
        setTimeout(() => {
            this.gameIsRunning = false;
            this.gameResult = result;
        }, time);
    }

    /**
     * Checks if the player throws a bottle.
     */
    checkObjectThrown = () => {
        if (this.keyboard.D && this.canThrowBottle() && this.character.bottles > 0) {
            this.throwBottle();
        }
    };

    /**
     * Checks if enough time passed to throw the next bottle.
     * @returns {boolean} -> True when the character can throw a bottle
     */
    canThrowBottle() {
        const justThrown = new Date().getTime() / 1000;

        return justThrown - this.lastThrow > 0.5;
    }

    /**
     * Creates a bottle and throws it from the character.
     */
    throwBottle() {
        const justThrown = new Date().getTime() / 1000;
        const bottle = this.createBottle();

        this.throwableObject.push(bottle);
        this.character.throwBottle();
        this.statusBarBottles.setPercentage(this.character.bottles * 20);
        this.character.lastAction = Date.now();
        this.lastThrow = justThrown;
    }

    /**
     * Creates a new bottle at the character place.
     * @returns {ThrowableObject} -> The new bottle
     */
    createBottle() {
        let bottleX = this.character.x + 100;

        if (this.character.otherDirection) {
            bottleX = this.character.x - 20;
        }

        return new ThrowableObject(bottleX, this.character.y + 100, this.character.otherDirection);
    }
}
