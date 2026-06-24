import { Character } from "./character.class.js";
import { level1 } from "../levels/level1.js";
import { MoveableObject } from "./moveableObject.class.js";
import { IntervalHub } from "../helper/intervallHub.js";

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
        // this.character.getRealFrame();
        this.checkCollision();
    }

    checkCollision() {
        // console.log("checkCollision()");
        IntervalHub.startInterval(() => {
            this.level.enemies.forEach((enemy) => {
                // console.log("checkCollision forEach((enemy)");
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                }
            });
        }, 100);
    }

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

        this.ctx.translate(-this.cameraX, 0);

        // self = this;
        // In requestAnimationFrame "this" is unknown, therfore self = this
        // requestAnimationFrame(function () {
        //     self.draw();
        // });

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
