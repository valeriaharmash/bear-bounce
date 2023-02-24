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
    // load herp frames
    const spritesheet = new Spritesheet(
      BaseTexture.from(heroData.meta.image),
      heroData
    );
    //  parse hero frames
    spritesheet.parse();
    // init AnimatedSprite from spritesheet
    super(spritesheet.animations.hero);
    // set animation speed
    this.animationSpeed = 0.17;
    // run anymation
    this.play();
    // set hero size
    this.scale.set(0.4, 0.4);
    // set initial location
    this.onResize(window.innerWidth, window.innerHeight);
    // set isJumping state
    this.isJumping = false;
    // set jump power
    this.power = 20;
    // set jump direction
    this.direction = -1;
    // set original hero position
    this.jumpAt = this.y;
    // load jump sound
    this.jumpSound = new Howl({
      src: ['/sounds/jump.mp3'],
    });

    //  remove existing "keydown" listenre
    document.removeEventListener('keydown', (event) => this.onJump(event));
    // add new 'keydown' listener to handle jumps
    document.addEventListener('keydown', (event) => this.onJump(event));
  }
// onJump performs hero jump
  onJump(event) {
    // only jump is not isJumpint and "Space" key pressed
    if (event.code !== 'Space' || this.isJumping) return;
    // set isJumping state to true
    this.isJumping = true;
    // play jump sound
    this.jumpSound.play();

    let time = 0;

    const tick = (deltaMs) => {
      const jumpHeight = Math.round(
        (-GRAVITY / 2) * Math.pow(time, 2) + this.power * time
      );

      // clean up jump ticker if back to initial position
      if (jumpHeight < 0) {
        //  set isJumping state to false
        this.isJumping = false;
        // remove tocker
        Ticker.shared.remove(tick);
        // reset initial hero position
        this.y = this.jumpAt;
        return;
      }

      this.y = this.jumpAt + jumpHeight * this.direction;
      time += deltaMs;
    };
    // start jump ticker
    Ticker.shared.add(tick);
  }
  // onResize adjusts hero location based on window size
  onResize(width, height) {
    this.x = width * 0.05;
    // current height - 2 * ground height
    this.y = height - 200;
    this.jumpAt = this.y;
  }
}

export { Hero };
