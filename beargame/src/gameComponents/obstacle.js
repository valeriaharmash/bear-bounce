import { Texture, Sprite } from 'pixi.js';
import { randomNumberBetween } from './utils';

class Obstacle {
  constructor(graphics, x) {
    const texture = Texture.from(graphics);
    this.element = new Sprite(texture);
    this.element.x = x;
    this.element.y = window.innerHeight * 0.8;
    this.element.scale.set(0.08, 0.08);
    this.speed = 6;
  }
  updateObstacle(idx) {
    this.element.x -= this.speed;

    if (this.element.x < -30) {
      const lowerBound = window.innerWidth + idx * 400;
      const upperBound = lowerBound + 400;
      this.element.x = randomNumberBetween(lowerBound, upperBound);
      return;
    }
  }
}

class ObstacleManager {
  constructor() {
    this.numObstables = 3;
    this.obstacles = [];
    for (let i = 0; i < 2; i++) {
      const lowerBound = window.innerWidth + i * 400;
      const upperBound = lowerBound + 400;
      const obstacle = new Obstacle(
        'imgs/obstacle.png',
        randomNumberBetween(lowerBound, upperBound)
      );
      this.obstacles.push(obstacle);
    }
  }
  moveObstacles() {
    this.obstacles.forEach((obstacle, idx) => {
      obstacle.updateObstacle(idx);
    });
  }
  resetObstacles() {
    this.obstacles.forEach((obstacle) => {
      obstacle.element.x = randomNumberBetween(800, 1500);
    });
  }
}

export { Obstacle, ObstacleManager };
