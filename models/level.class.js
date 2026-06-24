export class Level {
    enemies;
    clouds;
    collectibleObjects;
    backgroundObjects;
    levelEndX = 2200;

    constructor(enemies, clouds, collectibleObjects, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.collectibleObjects = collectibleObjects;
        this.backgroundObjects = backgroundObjects;
    }
}
