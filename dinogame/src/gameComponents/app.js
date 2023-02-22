import { Application } from 'pixi.js';
import { Ground } from './ground';
import { Hero } from './hero';
import { ObstacleManager } from './obstacle';
import { Score } from './scoreBoard';
import { detectCollision } from './utils';
import { GameOverText } from './gameOver';

const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH = 800;

class Game extends Application {
  constructor() {
    super({
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      backgroundColor: 0x5bba6f,
    });

    this.addObjects();

    document.removeEventListener('keydown', (event) => this.hero.onJump(event));
    document.addEventListener('keydown', (event) => this.hero.onJump(event));

    this.ticker.add(this.gameLoop.bind(this));
  }
  addObjects() {
    this.ground = new Ground('imgs/ground.png');
    this.hero = new Hero('imgs/dino-stationary.png');
    this.obstacleManager = new ObstacleManager();
    this.score = new Score();
    this.gameOverText = new GameOverText('Game Over');

    this.stage.addChild(this.ground.element);
    this.stage.addChild(this.hero.element);
    this.stage.addChild(this.score.element);
    this.obstacleManager.obstacles.forEach((obstacle) => {
      this.stage.addChild(obstacle.element);
    });
  }
  gameLoop(delta) {
    this.obstacleManager.moveObstacles();
    this.score.updateScore(delta);
    this.obstacleManager.obstacles.forEach((obstacle) => {
      if (detectCollision(this.hero.element, obstacle.element)) {
        this.stage.addChild(this.gameOverText.element);
        this.stop();
      }
    });
    this.ground.updateGround(delta);
  }
}

export { Game };
