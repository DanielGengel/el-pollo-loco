import { ImageHelper } from "../helper/imgHelper.class.js";
import { BackgroundObject } from "../models/background.class.js";
import { Cloud } from "../models/clouds.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Endboss } from "../models/endboss.class.js";
import { Bottle } from "../models/bottles.class.js";
import { Coin } from "../models/coins.class.js";
import { ChickenSmall } from "../models/chickenSmall.class.js";
import { Level } from "../models/level.class.js";

export class Level1 extends Level {
    /**
     * Creates level 1 with enemies, clouds, background and collectibles.
     */
    constructor() {
        super(
            Level1.createEnemies(),
            Level1.createClouds(),
            Level1.createBackgroundObjects(),
            Level1.createCollectibles()
        );
    }

    /**
     * Creates all enemies for level 1.
     * @returns {Array} -> The enemies for the level
     */
    static createEnemies() {
        const enemies = [];

        Level1.addChickens(enemies);
        Level1.addSmallChickens(enemies);
        Level1.addEndboss(enemies);

        return enemies;
    }

    /**
     * Adds normal chickens to the enemy array
     * @param {Array} enemies -> The enemy list
     */
    static addChickens(enemies) {
        for (let i = 0; i < 5; i++) {
            enemies.push(new Chicken());
        }
    }

    /**
     * Adds small chickens to the enemy array
     * @param {Array} enemies -> The enemy list
     */
    static addSmallChickens(enemies) {
        for (let i = 0; i < 5; i++) {
            enemies.push(new ChickenSmall());
        }
    }

    /**
     * Adds the endboss to the enemy array
     * @param {Array} enemies -> The enemy list
     */
    static addEndboss(enemies) {
        enemies.push(new Endboss());
    }

    /**
     * Creates all clouds for level 1.
     * @returns {Array} -> The clouds for the level
     */
    static createClouds() {
        const clouds = [];

        for (let i = 0; i < 2; i++) {
            clouds.push(new Cloud());
        }

        return clouds;
    }

    /**
     * Creates all background pictures 
     * @returns {Array} -> The background pictures for the level
     */
    static createBackgroundObjects() {
        const backgroundObjects = [];
        const layers = Level1.getBackgroundLayers();

        for (let section = -3; section <= 5; section++) {
            Level1.addBackgroundSection(backgroundObjects, layers, section);
        }

        return backgroundObjects;
    }

    /**
     * Gives back the background layer names.
     * @returns {Array} -> The background layer names
     */
    static getBackgroundLayers() {
        return [
            "sky",
            "clouds",
            "third_layer",
            "second_layer",
            "first_layer"
        ];
    }

    /**
     * Adds one full background part to the background list.
     * @param {Array} backgroundObjects -> The background list
     * @param {Array} layers -> The background layer names
     * @param {number} section -> The number of the background part
     */
    static addBackgroundSection(backgroundObjects, layers, section) {
        const x = section * 719;
        const imageIndex = Math.abs(section % 2);

        Level1.addSky(backgroundObjects, x);
        Level1.addBackgroundLayers(backgroundObjects, layers, imageIndex, x);
    }

    /**
     * Adds the sky picture to the background list.
     * @param {Array} backgroundObjects -> The background list
     * @param {number} x -> The place from left to right
     */
    static addSky(backgroundObjects, x) {
        backgroundObjects.push(
            new BackgroundObject(ImageHelper.BACKGROUND.sky[0], x)
        );
    }

    /**
     * Adds all other background layer pictures.
     * @param {Array} backgroundObjects -> The background list
     * @param {Array} layers -> The background layer names
     * @param {number} imageIndex -> The picture number for this background part
     * @param {number} x -> The place from left to right
     */
    static addBackgroundLayers(backgroundObjects, layers, imageIndex, x) {
        for (const layer of layers.slice(1)) {
            backgroundObjects.push(
                new BackgroundObject(ImageHelper.BACKGROUND[layer][imageIndex], x)
            );
        }
    }

    /**
 * Creates all bottles and coins for level 1.
 * @returns {Array} -> The collectibles for the level
 */
static createCollectibles() {
    const collectibles = [];
    const levelEndX = 3500;

    Level1.addStartBottles(collectibles);
    Level1.addStartCoins(collectibles);
    Level1.addBottles(collectibles, levelEndX);
    Level1.addCoins(collectibles, levelEndX);

    return collectibles;
}

/**
 * Adds 3 bottles at the very left side of the level.
 * @param {Array} collectibles -> The collectible list
 */
static addStartBottles(collectibles) {
    const bottlePlaces = [-2000, -1900, -1800];

    bottlePlaces.forEach((x) => {
        const bottle = new Bottle();
        bottle.x = x;
        collectibles.push(bottle);
    });
}

/**
 * Adds 2 coins at the very left side of the level.
 * @param {Array} collectibles -> The collectible list
 */
static addStartCoins(collectibles) {
    const coinPlaces = [-1950, -1850];

    coinPlaces.forEach((x) => {
        const coin = new Coin();
        coin.x = x;
        collectibles.push(coin);
    });
}

/**
 * Adds bottles to the collectible list.
 * @param {Array} collectibles -> The collectible list
 * @param {number} levelEndX -> The last place where bottles are allowed
 */
static addBottles(collectibles, levelEndX) {
    let bottleX = 300;

    for (let i = 0; i < 9; i++) {
        if (bottleX > levelEndX) return;

        const bottle = new Bottle();
        bottle.x = bottleX;
        collectibles.push(bottle);
        bottleX += 150 + Math.random() * 500;
    }
}

/**
 * Adds coins to the collectible list.
 * @param {Array} collectibles -> The collectible list
 * @param {number} levelEndX -> The last place where coins are allowed
 */
static addCoins(collectibles, levelEndX) {
    let coinX = 300;

    for (let i = 0; i < 9; i++) {
        if (coinX > levelEndX) return;

        const coin = new Coin();
        coin.x = coinX;
        collectibles.push(coin);
        coinX += 150 + Math.random() * 500;
    }
}
}

/**
 * Creates level 1.
 * @returns {Level1} -> The first level
 */
export function createLevel1() {
    return new Level1();
}