import { Ticker, TilingSprite, Texture } from 'pixi.js';

class Ground {
  constructor(graphics) {
    const texture = Texture.from(graphics);
    this.element = new TilingSprite(texture, 800, 40);
    this.element.y = 600 * 0.88;
    this.element.scale._y = 0.5;
    this.speed = 2;
  }
  updateGround() {
    this.element.tilePosition.x -= this.speed;
  }
  moveGround() {
    const tick = (delta) => {
      this.updateGround();
    };
    Ticker.shared.add(tick);
  }
}

export { Ground };
