import { Texture, Sprite } from 'pixi.js';
import { randomNumberBetween } from './utils';

class Obstacle extends Sprite {
  constructor(graphics, x) {
    // load obstacle image
    const texture = Texture.from(graphics);
    // create Sprite and fill it with image
    super(texture);
    // set calculated obstacle x position
    this.x = x;
    // set initial location
    this.onResize(window.innerWidth, window.innerHeight);
    // set obstacle size
    this.scale.set(0.08, 0.08);
    // set obstacle speed
  }
  // updateObstacle moves(<-) obstacle by speed
  updateObstacle(idx, speed) {
    this.x -= speed;
    // move obsticle to begining of canvas when out of focus
    if (this.x < -40) {
      // calculte x lowerBound
      const lowerBound = window.innerWidth + idx * 400;
      // calculte x upperBound
      const upperBound = lowerBound + 400;
      // render obsticle at new "start" x position
      this.x = randomNumberBetween(lowerBound, upperBound);
      return;
    }
  }
  // onResize adjusts obstacle location based on window size
  onResize(width, height) {
    // ground heigh _ 40
    this.y = height - 140;
  }
}

class ObstacleManager {
  constructor() {
    // set number of obstacles
    this.numObstables = 3;
    // set obstacle state
    this.obstacles = [];
    // create obstacles
    for (let i = 0; i < 2; i++) {
      // calculte obstacle x lowerBound
      const lowerBound = window.innerWidth + i * 400;
      // calculte obstacle x upperBound
      const upperBound = lowerBound + 400;
      // create obstacle
      const obstacle = new Obstacle(
        'imgs/obstacle.png',
        randomNumberBetween(lowerBound, upperBound)
      );
      // add obstacle to obstacles state
      this.obstacles.push(obstacle);
      //  set game speed
      this.speed = 6;
    }
  }
  // moveObstacles moves(<-) all obstacles by this.speed
  moveObstacles() {
    this.obstacles.forEach((obstacle, idx) => {
      obstacle.updateObstacle(idx, this.speed);
    });
  }
  // resetObstacles moves all obstacles to "start" state
  resetObstacles() {
    this.obstacles.forEach((obstacle) => {
      obstacle.x = randomNumberBetween(800, 1500);
    });
  }
  // onResize adjusts obstacles location based on window size
  onResize(width, height) {
    this.obstacles.forEach((obstacle) => obstacle.onResize(width, height));
  }
}

export { Obstacle, ObstacleManager };
