export class MoveableObject {
    x = 120;
    y = 280;
    width = 100;
    height = 150;
    img;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log("moving right");
    }

    moveLeft() {
        
    }
}