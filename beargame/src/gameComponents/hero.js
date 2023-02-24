import { Ticker, Spritesheet, AnimatedSprite, BaseTexture } from 'pixi.js';
import { Howl } from 'howler';

const GRAVITY = 1;

const heroData = {
  frames: {
    'frame1.png': {
      frame: {
        x: 1,
        y: 1,
        w: 190,
        h: 262,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 190,
        h: 262,
      },
      sourceSize: {
        w: 190,
        h: 262,
      },
    },
    'frame2.png': {
      frame: {
        x: 193,
        y: 1,
        w: 194,
        h: 252,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 194,
        h: 252,
      },
      sourceSize: {
        w: 194,
        h: 252,
      },
    },
    'frame3.png': {
      frame: {
        x: 193,
        y: 255,
        w: 250,
        h: 240,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 250,
        h: 240,
      },
      sourceSize: {
        w: 250,
        h: 240,
      },
    },
    'frame4.png': {
      frame: {
        x: 389,
        y: 1,
        w: 253,
        h: 242,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 253,
        h: 242,
      },
      sourceSize: {
        w: 253,
        h: 242,
      },
    },
    'frame5.png': {
      frame: {
        x: 445,
        y: 245,
        w: 243,
        h: 260,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 243,
        h: 260,
      },
      sourceSize: {
        w: 243,
        h: 260,
      },
    },
    'frame6.png': {
      frame: {
        x: 1,
        y: 507,
        w: 242,
        h: 260,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 242,
        h: 260,
      },
      sourceSize: {
        w: 242,
        h: 260,
      },
    },
  },
  meta: {
    image: 'imgs/spritesheet.png',
    format: 'RGBA8888',
    size: {
      w: 689,
      h: 768,
    },
    scale: '1',
  },
  animations: {
    hero: [
      'frame1.png',
      'frame2.png',
      'frame3.png',
      'frame4.png',
      'frame5.png',
      'frame6.png',
    ],
  },
};

class Hero extends AnimatedSprite {
  constructor() {
    const spritesheet = new Spritesheet(
      BaseTexture.from(heroData.meta.image),
      heroData
    );
    spritesheet.parse();
    super(spritesheet.animations.hero);

    this.animationSpeed = 0.17;
    this.play();
    this.initialScreenWidth = window.screen.width;
    this.initialScreenHeight = window.screen.height;
    this.onResize(window.innerWidth, window.innerHeight);
    this.isJumping = false;
    this.power = 20;
    this.direction = -1;
    this.jumpAt = this.y;
    this.jumpSound = new Howl({
      src: ['/sounds/jump.mp3'],
    });

    document.removeEventListener('keydown', (event) => this.onJump(event));
    document.addEventListener('keydown', (event) => this.onJump(event));
  }
  onJump(event) {
    if (event.code !== 'Space' || this.isJumping) return;
    this.isJumping = true;
    this.jumpSound.play();

    let time = 0;

    const tick = (deltaMs) => {
      const jumpHeight = Math.round(
        (-GRAVITY / 2) * Math.pow(time, 2) + this.power * time
      );

      if (jumpHeight < 0) {
        this.isJumping = false;
        Ticker.shared.remove(tick);
        this.y = this.jumpAt;
        return;
      }

      this.y = this.jumpAt + jumpHeight * this.direction;
      time += deltaMs;
    };

    Ticker.shared.add(tick);
  }
  onResize(width, height) {
    const widthRatio = width / this.initialScreenWidth;
    const heightRatio = width / this.initialScreenHeight;
    const ratio = (widthRatio + heightRatio) * 0.15;
    this.scale.set(ratio, ratio);
    this.x = width * 0.03;
    this.y = height * 0.74;
  }
}

export { Hero };
