import { TilingSprite, Texture } from 'pixi.js';

class Clouds extends TilingSprite {
  constructor(graphics) {
    // load clouds image
    const texture = Texture.from(graphics);
    // create TilingSprite with image
    super(texture, window.innerWidth, 264);
    // set initial clouds location
    this.onResize(window.innerWidth, window.innerHeight);
    // set clouds speed
    this.speed = 4;
  }
  // moves caluds(<-) by this.speed
  updateClouds() {
    // update x position of clouds object
    this.tilePosition.x -= this.speed;
  }
  // onResize adjusts clouds location based on window size
  onResize(width, heigth) {
    this.width = width;
    this.y = heigth * 0.01;
  }
}

export { Clouds };
