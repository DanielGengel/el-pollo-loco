export class Level {
    enemies;
    clouds;
    collectibleObjects;
    backgroundObjects;
    levelEndX = 3500;

    /**
     * Creates a level with enemies, clouds, background and things to collect.
     * @param {Array} enemies -> The enemies in the level
     * @param {Array} clouds -> The clouds in the level
     * @param {Array} backgroundObjects -> The background pictures in the level
     * @param {Array} collectibleObjects -> The coins and bottles in the level
     */
    constructor(enemies, clouds, backgroundObjects, collectibleObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.collectibleObjects = collectibleObjects;
        this.backgroundObjects = backgroundObjects;
    }
}