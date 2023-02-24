import { Application, Ticker } from 'pixi.js';
import { Ground } from './ground';
import { Hero } from './hero';
import { ObstacleManager } from './obstacle';
import { Score } from './scoreBoard';
import { detectCollision } from './utils';
import { GameOverText } from './gameOver';
import { StartGameText } from './startGameText';
import { Clouds } from './clouds';
import { Howl } from 'howler';

class Game extends Application {
  constructor() {
    super({
      width: window.innerWidth,
      height: window.innerHeight * 0.8,
      backgroundColor: 0x2980b9,
      resizeTo: window,
    });
    this.playing = false;

    this.init();

    this.renderer.on('resize', (width, height) => this.onResize(width, height));
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
    this.startGameText = new StartGameText((event) => {
      if (!this.playing) {
        this.resetGame();
        this.stage.removeChild(this.startGameText);
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
        this.stage.addChild(this.startGameText);
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
    this.stage.addChild(this.startGameText);
  }
  onResize(width, height) {
    this.startGameText.onResize(width, height);
    this.score.onResize(width, height);
    this.gameOverText.onResize(width, height);
    this.clouds.onResize(width, height);
    this.hero.onResize(width, height);
    this.obstacleManager.onResize(width, height);
    this.ground.onResize(width, height);
  }
}

export { Game };
