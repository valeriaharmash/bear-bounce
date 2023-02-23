import { TilingSprite, Texture } from 'pixi.js';

class Ground {
  constructor(graphics) {
    const texture = Texture.from(graphics);
    this.element = new TilingSprite(texture, window.innerWidth, 40);
    this.element.y = window.innerHeight * 0.84;
    this.element.scale._y = 0.5;
    this.speed = 4;
  }
  updateGround() {
    this.element.tilePosition.x -= this.speed;
  }
}

export { Ground };
