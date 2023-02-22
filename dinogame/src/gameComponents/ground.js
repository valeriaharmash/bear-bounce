import { Sprite } from 'pixi.js';

class Ground {
  constructor(graphics) {
    this.element = Sprite.from(graphics);
    this.element.y = 600 * 0.88;
    this.element.scale._y = 0.5;
  }
  coordinates() {
    return [this.element.x, this.element.y];
  }
  moveGround() {}
}

export { Ground };
