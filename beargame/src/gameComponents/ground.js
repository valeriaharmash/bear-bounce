import { TilingSprite, Texture } from 'pixi.js';

class Ground {
  constructor(graphics) {
    const texture = Texture.from(graphics);
    this.element = new TilingSprite(texture, window.innerWidth, 90);
    this.element.y = window.innerHeight * 0.84;
    this.speed = 6;
  }
  updateGround() {
    this.element.tilePosition.x -= this.speed;
  }
}

export { Ground };
