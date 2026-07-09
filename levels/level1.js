import { ImageHelper } from "../helper/imgHelper.class.js";
import { BackgroundObject } from "../models/background.class.js";
import { Cloud } from "../models/clouds.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Endboss } from "../models/endboss.class.js";
import { CollectibleObjects } from "../models/collectibleObjects.class.js";
import { Bottle } from "../models/bottles.class.js";
import { Coin } from "../models/coins.class.js";
import { ChickenSmall } from "../models/chickenSmall.class.js";
import { Level } from "../models/level.class.js";


function createEnemies() {
    const enemies = [];

    // Chickens
    for (let i = 0; i < 5; i++) {
        enemies.push(new Chicken());
    }

    // Small chickens
    for (let i = 0; i < 5; i++) {
        enemies.push(new ChickenSmall()); 
    }

    // Endboss
    enemies.push(new Endboss());

    return enemies;
}

function createClouds() {
    const clouds = [];

    for (let i = 0; i < 2; i++) {
        clouds.push(new Cloud());
    }

    return clouds;
}

function createBackgroundObjects() {
    const backgroundObjects = [];
    const layers = [
        "sky",
        "clouds",
        "third_layer",
        "second_layer",
        "first_layer"
    ];

    for (let section = -2; section <= 5; section++) {

        const x = section * 719;

        // Sky always uses image 0
        backgroundObjects.push(
            new BackgroundObject(ImageHelper.BACKGROUND.sky[0], x)
        );

        // Alternate other layers
        const imageIndex = Math.abs(section % 2);

        for (const layer of layers.slice(1)) {
            backgroundObjects.push(
                new BackgroundObject(ImageHelper.BACKGROUND[layer][imageIndex], x)
            );
        }
    }

    return backgroundObjects;
}

function createCollectibles() {
    let bottleX = 300;
    let coinX = 300;

    const collectibles = [];

    // Bottles
    for (let i = 0; i < 9; i++) {
        const bottle = new Bottle();
        bottle.x = bottleX;
        collectibles.push(bottle);
        bottleX += 150 + Math.random() * 500;
    }

    // Coins
    for (let i = 0; i < 9; i++) {
        const coin = new Coin();
        coin.x = coinX;
        collectibles.push(coin);
        coinX += 150 + Math.random() * 500;
    }

    return collectibles;
}

export function createLevel1() {
    console.log("Create Level 1");

    const enemies = createEnemies();
    const clouds = createClouds();
    const backgroundObjects = createBackgroundObjects();
    const collectibles = createCollectibles();

    return new Level(
        enemies,
        clouds,
        backgroundObjects,
        collectibles
    );
}