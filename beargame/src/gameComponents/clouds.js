import { TilingSprite, Texture } from 'pixi.js';

class Clouds {
  constructor(graphics) {
    const texture = Texture.from(graphics);
    this.element = new TilingSprite(texture, window.innerWidth, 259);
    this.element.y = window.innerHeight * 0.01;
    this.speed = 4;
  }
  updateClouds() {
    this.element.tilePosition.x -= this.speed;
  }
}

export { Clouds };
