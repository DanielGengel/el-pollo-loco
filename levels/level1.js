import { ImageHelper } from "../helper/imgHelper.class.js";
import { BackgroundObject } from "../models/background.class.js";
import { Cloud } from "../models/clouds.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Level } from "../models/level.class.js";
import { Endboss } from "../models/endboss.class.js";
import { CollectibleObjects } from "../models/collectibleObjects.class.js";
import { Bottle } from "../models/bottles.class.js";
import { Coin } from "../models/coins.class.js";
import { ChickenSmall } from "../models/chickenSmall.class.js";

export function createLevel1() {

    const enemies = [];
    const clouds = [];
    const backgroundObjects = [];
    const collectibles = [];

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

    // Clouds
    for (let i = 0; i < 2; i++) {
        clouds.push(new Cloud());
    }

    // Background
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

        backgroundObjects.push(
            new BackgroundObject(ImageHelper.BACKGROUND.clouds[imageIndex], x)
        );

        backgroundObjects.push(
            new BackgroundObject(ImageHelper.BACKGROUND.third_layer[imageIndex], x)
        );

        backgroundObjects.push(
            new BackgroundObject(ImageHelper.BACKGROUND.second_layer[imageIndex], x)
        );

        backgroundObjects.push(
            new BackgroundObject(ImageHelper.BACKGROUND.first_layer[imageIndex], x)
        );
    }

    // Bottles
    for (let i = 0; i < 10; i++) {
        collectibles.push(new Bottle());
    }

    // Coins
    for (let i = 0; i < 5; i++) {
        collectibles.push(new Coin());
    }

    return new Level(
        enemies,
        clouds,
        backgroundObjects,
        collectibles
    );
}
