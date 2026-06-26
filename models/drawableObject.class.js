export class DrawableObject {
    x = 120;
    y = 280;
    width = 100;
    height = 150;
    speed = 0.15;
    img;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(imageArray) {
        imageArray.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawCollsionFrame(ctx) {
        if (this.showFrame) {
            // Picture frame
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();

            // Corrected picture frame (real frame)
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            ctx.rect(this.collisionBox.x, this.collisionBox.y, this.collisionBox.width, this.collisionBox.height);
            ctx.stroke();
        }
    }
}
