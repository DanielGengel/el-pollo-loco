import { ThrowableObject } from "./throwableObject.class.js";

export class ThrowManager {
    world;

    /**
     * Creates the throw manager.
     * @param {World} world -> The game world
     */
    constructor(world) {
        this.world = world;
    }

    /**
     * Checks if the player throws a bottle.
     */
    checkObjectThrown = () => {
        if (this.world.keyboard.D && this.canThrowBottle() && this.world.character.bottles > 0) {
            this.throwBottle();
        }
    };

    /**
     * Checks if enough time passed to throw the next bottle.
     * @returns {boolean} -> True when the character can throw a bottle
     */
    canThrowBottle() {
        const justThrown = new Date().getTime() / 1000;

        return justThrown - this.world.lastThrow > 0.5;
    }

    /**
     * Creates a bottle and throws it from the character.
     */
    throwBottle() {
        const justThrown = new Date().getTime() / 1000;
        const bottle = this.createBottle();

        this.world.throwableObject.push(bottle);
        this.world.character.throwBottle();
        this.world.statusBarBottles.setPercentage(this.world.character.bottles * 20);
        this.world.character.lastAction = Date.now();
        this.world.lastThrow = justThrown;
    }

    /**
     * Creates a new bottle at the character place.
     * @returns {ThrowableObject} -> The new bottle
     */
    createBottle() {
        let bottleX = this.world.character.x + 100;

        if (this.world.character.otherDirection) {
            bottleX = this.world.character.x - 20;
        }

        return new ThrowableObject(bottleX, this.world.character.y + 100, this.world.character.otherDirection);
    }

    /**
     * Removes a bottle after the splash animation.
     * @param {number} bottleIndex -> The place of the bottle in the bottle list
     */
    removeBottleAfterSplash(bottleIndex) {
        setTimeout(() => {
            this.world.throwableObject.splice(bottleIndex, 1);
        }, 300);
    }
}