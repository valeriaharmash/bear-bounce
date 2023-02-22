import { Ticker, TilingSprite, Texture } from 'pixi.js';

class Ground {
  constructor(graphics) {
    const texture = Texture.from(graphics);
    this.element = new TilingSprite(texture, 800, 40);
    this.x = 0;
    this.element.y = 600 * 0.88;
    this.element.scale._y = 0.5;
    this.speed = 2;
  }
  coordinates() {
    return [this.element.x, this.element.y];
  }
  updateGround() {
    this.x = this.x - this.speed;
    this.element.tilePosition.x = this.x;
  }
  moveGround() {
    const tick = (delta) => {
      this.updateGround();
    };

    Ticker.shared.add(tick);
  }
}

export { Ground };
