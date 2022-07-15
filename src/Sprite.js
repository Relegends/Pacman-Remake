class Sprite {
  constructor(image, x, y, width, height) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  drawSprite(canvasCtx, x, y) {
    canvasCtx.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height,
      x,
      y,
      this.width,
      this.height
    );
  }
}
