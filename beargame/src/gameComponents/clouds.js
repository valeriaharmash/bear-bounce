import { TilingSprite, Texture } from 'pixi.js';

class Clouds extends TilingSprite {
  constructor(graphics) {
    const texture = Texture.from(graphics);
    super(texture, window.innerWidth, window.innerHeight * 0.265);
    this.y = window.innerHeight * 0.01;
    this.speed = 4;
  }
  updateClouds() {
    this.tilePosition.x -= this.speed;
  }
}

export { Clouds };
