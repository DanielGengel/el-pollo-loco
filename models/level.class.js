export class Level {
    enemies;
    clouds;
    collectibleObjects;
    backgroundObjects;
    levelEndX = 3500;

    constructor(enemies, clouds, backgroundObjects, collectibleObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.collectibleObjects = collectibleObjects;
        this.backgroundObjects = backgroundObjects;
    }
}
