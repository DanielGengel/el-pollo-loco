import { ImageHelper } from "../js/imgHelper.js";
import { BackgroundObject } from "./background.class.js";
import { Cloud } from "./clouds.class.js";
import { Character } from "../models/character.class.js";
import { Chicken } from "../models/chicken.class.js";

export class World {
    character = new Character();
    enemies = [new Chicken(), new Chicken(), new Chicken()];
    clouds = [new Cloud()];
    backgroundObjects = [new BackgroundObject(ImageHelper.BACKGROUND.sky[0], 0),
    new BackgroundObject(ImageHelper.BACKGROUND.third_layer[0], 0),
    new BackgroundObject(ImageHelper.BACKGROUND.second_layer[0], 0),
    new BackgroundObject(ImageHelper.BACKGROUND.first_layer[0], 0)];
    canvas;
    ctx;
    keyboard;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this; // to make the World accessible to the character
    }

    draw() {
        // clear content from canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);
        

        self = this;
        // In requestAnimationFrame "this" is unknown, therfore self = this
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach((object) => {
            this.addToMap(object);
        });
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}
