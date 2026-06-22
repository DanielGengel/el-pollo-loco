import { ImageHelper } from "../js/imgHelper.js";
import { BackgroundObject } from "../models/background.class.js";
import { Cloud } from "../models/clouds.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Level } from "../models/level.class.js";


export const level1 = new Level(
    [new Chicken(), new Chicken(), new Chicken()],
    [new Cloud()],
    [
        new BackgroundObject(ImageHelper.BACKGROUND.sky[0], -719),
        new BackgroundObject(ImageHelper.BACKGROUND.third_layer[1], -719),
        new BackgroundObject(ImageHelper.BACKGROUND.second_layer[1], -719),
        new BackgroundObject(ImageHelper.BACKGROUND.first_layer[1], -719),

        new BackgroundObject(ImageHelper.BACKGROUND.sky[0], 0),
        new BackgroundObject(ImageHelper.BACKGROUND.third_layer[0], 0),
        new BackgroundObject(ImageHelper.BACKGROUND.second_layer[0], 0),
        new BackgroundObject(ImageHelper.BACKGROUND.first_layer[0], 0),

        new BackgroundObject(ImageHelper.BACKGROUND.sky[0], 719),
        new BackgroundObject(ImageHelper.BACKGROUND.third_layer[1], 719),
        new BackgroundObject(ImageHelper.BACKGROUND.second_layer[1], 719),
        new BackgroundObject(ImageHelper.BACKGROUND.first_layer[1], 719),

        new BackgroundObject(ImageHelper.BACKGROUND.sky[0], 719 * 2),
        new BackgroundObject(ImageHelper.BACKGROUND.third_layer[0], 719 * 2),
        new BackgroundObject(ImageHelper.BACKGROUND.second_layer[0], 719 * 2),
        new BackgroundObject(ImageHelper.BACKGROUND.first_layer[0], 719 * 2),

        new BackgroundObject(ImageHelper.BACKGROUND.sky[0], 719 * 3),
        new BackgroundObject(ImageHelper.BACKGROUND.third_layer[1], 719 * 3),
        new BackgroundObject(ImageHelper.BACKGROUND.second_layer[1], 719 * 3),
        new BackgroundObject(ImageHelper.BACKGROUND.first_layer[1], 719 * 3),
    ]
);
