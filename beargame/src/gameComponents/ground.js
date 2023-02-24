import { TilingSprite, Texture } from 'pixi.js';

class Ground extends TilingSprite {
  constructor(graphics) {
    const texture = Texture.from(graphics);
    super(texture, window.innerWidth, 90);
    this.y = window.innerHeight * 0.84;
    this.speed = 6;
  }
  updateGround() {
    this.tilePosition.x -= this.speed;
  }
}

export { Ground };
