
import { Character } from "./character.class.js";
import { level1 } from "../levels/level1.js";

export class World {
    character = new Character();
level = level1;
    canvas;
    ctx;
    keyboard;
    cameraX = 0;

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
        this.ctx.translate(this.cameraX, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.cameraX, 0);

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
        if (mo.otherDirection) {
            // If left-key is pressed, mirror image of character
            this.ctx.save(); // save ctx to only mirror image of character
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }

        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if (mo.otherDirection) {
            // If left-key is pressed, mirror only image of character, restore rest
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }
}
