export class WorldRenderer {
    world;

    /**
     * Creates the renderer for the world.
     * @param {World} world -> The game world
     */
    constructor(world) {
        this.world = world;
    }

    /**
     * Draws the whole game again and again.
     */
    draw() {
        if (!this.world.gameIsRunning) return;

        this.clearCanvas();
        this.drawMoveableGameObjects();
        this.drawFixedGameObjects();

        requestAnimationFrame(() => this.draw());
    }

    /**
     * Clears the old picture from the canvas.
     */
    clearCanvas() {
        this.world.ctx.clearRect(0, 0, this.world.canvas.width, this.world.canvas.height);
    }

    /**
     * Draws all objects that move with the camera.
     */
    drawMoveableGameObjects() {
        this.world.ctx.translate(this.world.cameraX, 0);

        this.addObjectsToMap(this.world.level.backgroundObjects);
        this.addToMap(this.world.character);
        this.addObjectsToMap(this.world.level.enemies);
        this.addObjectsToMap(this.world.level.clouds);
        this.addObjectsToMap(this.world.throwableObject);
        this.addObjectsToMap(this.world.level.collectibleObjects);

        this.world.ctx.translate(-this.world.cameraX, 0);
    }

    /**
     * Draws all objects that always stay at the same screen place.
     */
    drawFixedGameObjects() {
        this.addToMap(this.world.statusBarHealth);
        this.addToMap(this.world.statusBarCoins);
        this.addToMap(this.world.statusBarBottles);
        this.addToMap(this.world.statusBarEndboss);
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

        mo.draw(this.world.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Turns the picture around when the object looks left.
     * @param {Object} mo -> The object that should be turned around
     */
    flipImage(mo) {
        this.world.ctx.save();
        this.world.ctx.translate(mo.width, 0);
        this.world.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Turns the picture back to normal after drawing.
     * @param {Object} mo -> The object that was turned around
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.world.ctx.restore();
    }
}