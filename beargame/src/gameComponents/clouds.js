import { TilingSprite, Texture } from 'pixi.js';

class Clouds extends TilingSprite {
  constructor(graphics) {
    const texture = Texture.from(graphics);
    super(texture, window.innerWidth, 264);
    this.onResize(window.innerWidth, window.innerHeight);
    this.speed = 4;
  }
  updateClouds() {
    this.tilePosition.x -= this.speed;
  }
  onResize(width, heigth) {
    this.width = width;
    this.y = heigth * 0.01;
  }
}

export { Clouds };
