import { Application, Ticker } from 'pixi.js';
import { Ground } from './ground';
import { Hero } from './hero';
import { ObstacleManager } from './obstacle';
import { Score } from './scoreBoard';
import { detectCollision } from './utils';
import { GameOverText } from './gameOver';
import { StartGameButton } from './startGameButton';
import { Clouds } from './clouds';
import { Howl } from 'howler';

const CANVAS_HEIGHT = window.innerHeight;
const CANVAS_WIDTH = window.innerWidth;

class Game extends Application {
  constructor() {
    super({
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT - 100,
      backgroundColor: 0x2980b9,
    });
    this.playing = false;

    this.init();
  }
  init() {
    this.gameOverSound = new Howl({
      src: ['/sounds/game-over.mp3'],
    });
    this.clouds = new Clouds('imgs/clouds.png');
    this.ground = new Ground('imgs/ground.jpeg');
    this.hero = new Hero();
    this.obstacleManager = new ObstacleManager();
    this.score = new Score();
    this.gameOverText = new GameOverText('Game Over');
    this.startGameButton = new StartGameButton((event) => {
      if (!this.playing) {
        this.resetGame();
        this.stage.removeChild(this.startGameButton);
        this.stage.removeChild(this.gameOverText);
        this.gameTiker.start();
        this.playing = true;
      }
    });
    this.stage.addChild(this.clouds);
    this.stage.addChild(this.ground);
    this.stage.addChild(this.hero);
    this.stage.addChild(this.score);
    this.obstacleManager.obstacles.forEach((obstacle) => {
      this.stage.addChild(obstacle);
    });
    this.gameTiker = new Ticker();
    this.gameTiker.add(this.gameLoop.bind(this));
  }
  gameLoop(delta) {
    this.obstacleManager.moveObstacles();
    this.score.updateScore(delta);
    for (let obstacle of this.obstacleManager.obstacles) {
      if (this.playing && detectCollision(this.hero, obstacle)) {
        this.playing = false;
        this.gameTiker.stop();
        this.stage.addChild(this.gameOverText);
        this.stage.addChild(this.startGameButton);
        return;
      }
    }
    this.clouds.updateClouds(delta);
    this.ground.updateGround(delta);
  }
  resetGame() {
    this.score.resetScore();
    this.obstacleManager.resetObstacles();
  }
  startGame() {
    this.stage.removeChild(this.gameOverText);
    this.gameTiker.stop();
    this.start();
    this.stage.addChild(this.startGameButton);
  }
}

export { Game };
