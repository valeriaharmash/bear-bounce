import { TilingSprite, Texture } from 'pixi.js';

class Ground extends TilingSprite {
  constructor(graphics) {
    const texture = Texture.from(graphics);
    super(texture, window.innerWidth, 100);
    this.onResize(window.innerWidth, window.innerHeight);

    this.speed = 6;
  }
  updateGround() {
    this.tilePosition.x -= this.speed;
  }
  onResize(width, height) {
    this.scale.set(1, 2);
    this.y = height * 0.84;
    this.width = width;
  }
}

export { Ground };
