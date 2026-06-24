import { Character } from "./character.class.js";
import { level1 } from "../levels/level1.js";
import { MoveableObject } from "./moveableObject.class.js";
import { IntervalHub } from "../helper/intervallHub.js";
import { StatusBar } from "./statusBar.class.js";
import { ThrowableObject } from "./throwableObject.class.js";
import { CollectibleObjects } from "./collectibleObjects.class.js";

export class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    cameraX = 0;
    statusBar = new StatusBar();
    throwableObject = [];

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
            this.checkCollision();
            this.checkCollisionWithBottle();
            this.checkObjectThrown();
        }, 100);
    }

    checkCollision() {
        this.level.enemies.forEach((enemy) => {
            // console.log("checkCollision forEach((enemy)");
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
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

checkCollisionWithBottle() {
    this.level.collectibleObjects.forEach((object) => {
        if (this.character.isColliding(object)) {
            console.log("remove bottle", object);
            this.removeObjectFromMap(
                this.level.collectibleObjects,
                object
            );
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
        if (this.keyboard.D) {
            console.log("key D");
            
            let bottle =  new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
            this.throwableObject.push(bottle);
        }
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

        this.ctx.translate(-this.cameraX, 0);
        // Space for fixed objects moving with camera
        this.addToMap(this.statusBar);
        this.ctx.translate(this.cameraX, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.level.collectibleObjects);

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
