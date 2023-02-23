import { Sprite, Ticker } from 'pixi.js';

const GRAVITY = 1;

class Hero {
  constructor(graphics) {
    this.element = Sprite.from(graphics);
    this.element.x = window.innerWidth * 0.03;
    this.element.y = window.innerHeight * 0.8;
    this.element.scale.set(0.5, 0.5);
    this.isJumping = false;
    this.power = 20;
    this.direction = -1;
    this.jumpAt = this.element.y;

    document.removeEventListener('keydown', (event) => this.onJump(event));
    document.addEventListener('keydown', (event) => this.onJump(event));
  }

  onJump(event) {
    if (event.code !== 'Space' || this.isJumping) return;
    this.isJumping = true;

    let time = 0;

    const tick = (deltaMs) => {
      const jumpHeight = Math.round(
        (-GRAVITY / 2) * Math.pow(time, 2) + this.power * time
      );

      if (jumpHeight < 0) {
        this.isJumping = false;
        Ticker.shared.remove(tick);
        this.element.y = this.jumpAt;
        return;
      }

      this.element.y = this.jumpAt + jumpHeight * this.direction;
      time += deltaMs;
    };

    Ticker.shared.add(tick);
  }
}

export { Hero };
