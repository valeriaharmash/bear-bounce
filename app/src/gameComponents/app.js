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

class App extends Application {
  constructor() {
    super({
      width: window.innerWidth,
      height: window.innerHeight * 0.8,
      backgroundColor: 0x2980b9,
      resizeTo: window,
    });
    // set initial playing to false
    this.playing = false;

    // create objects and game loop
    this.init();

    // set resize listener
    this.renderer.on('resize', (width, height) => this.onResize(width, height));
  }
  init() {
    //  load game over audio
    this.gameOverSound = new Howl({
      src: ['/sounds/game-over.mp3'],
    });
    // create clouds
    this.clouds = new Clouds('imgs/clouds.png');
    // create ground
    this.ground = new Ground('imgs/ground.jpeg');
    // create hero
    this.hero = new Hero();
    // create obstacle manager
    this.obstacleManager = new ObstacleManager();
    // create text score
    this.score = new Score();
    // create game over text
    this.gameOverText = new GameOverText('Game Over');
    // create start game text with on any key handler
    this.startGameText = new StartGameText((event) => {
      // only if plaing is false
      if (!this.playing) {
        //  reset game elements
        this.resetGame();
        //  remove start game text
        this.stage.removeChild(this.startGameText);
        // remove game over text
        this.stage.removeChild(this.gameOverText);
        // start game loop
        this.gameTiker.start();
        // set playing to true
        this.playing = true;
      }
    });
    // inject clouds object into canvas
    this.stage.addChild(this.clouds);
    // inject ground object into canvas
    this.stage.addChild(this.ground);
    // inject hero object into canvas
    this.stage.addChild(this.hero);
    // inject score object into canvas
    this.stage.addChild(this.score);
    // inject all obsacle objects into canvas
    this.obstacleManager.obstacles.forEach((obstacle) => {
      this.stage.addChild(obstacle);
    });
    // create new game loop ticker
    this.gameTiker = new Ticker();
    // propogate Application context to gameLoop add it to game ticker
    this.gameTiker.add(this.gameLoop.bind(this));
  }
  gameLoop(delta) {
    // move obstacles
    this.obstacleManager.moveObstacles();
    // update score
    this.score.updateScore(delta);
    // move every obstacle
    for (let obstacle of this.obstacleManager.obstacles) {
      // check if hero hit obsticle
      if (this.playing && detectCollision(this.hero, obstacle)) {
        // set playing to false
        this.playing = false;
        // stop game loop
        this.gameTiker.stop();
        // add game over text
        this.stage.addChild(this.gameOverText);
        // add start game text
        this.stage.addChild(this.startGameText);
        return;
      }
    }
    // move clouds
    this.clouds.updateClouds(delta);
    // move ground
    this.ground.updateGround(delta);
  }
  resetGame() {
    // reset score to 0
    this.score.resetScore();
    // reset obsacles location
    this.obstacleManager.resetObstacles();
  }
  startGame() {
    // remove game over test
    this.stage.removeChild(this.gameOverText);
    // stop game loop
    this.gameTiker.stop();
    // render canvas
    this.start();
    // render start text
    this.stage.addChild(this.startGameText);
  }
  onResize(width, height) {
    // update canvas
    this.height = height;
    this.width = width;
    // resize elements
    this.startGameText.onResize(width, height);
    this.score.onResize(width, height);
    this.gameOverText.onResize(width, height);
    this.clouds.onResize(width, height);
    this.hero.onResize(width, height);
    this.obstacleManager.onResize(width, height);
    this.ground.onResize(width, height);
  }
}

export { App };
