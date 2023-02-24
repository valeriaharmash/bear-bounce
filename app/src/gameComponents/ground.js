import { TilingSprite, Texture } from 'pixi.js';

class Ground extends TilingSprite {
  constructor(graphics) {
    // load ground image
    const texture = Texture.from(graphics);
    // create TilingSprite and fill it with image
    super(texture, window.innerWidth, 100);
    // set initial location
    this.onResize(window.innerWidth, window.innerHeight);
    // set ground movement speed
    this.speed = 6;
  }
  // updateGround moves(<-) ground by this.speed
  updateGround() {
    this.tilePosition.x -= this.speed;
  }
  // onResize adjusts ground location based on window size
  onResize(width, height) {
    this.scale.set(1, 2);
    this.y = height - this.height;
    this.width = width;
  }
}

export { Ground };
