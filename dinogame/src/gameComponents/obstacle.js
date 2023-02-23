import { Texture, Sprite } from 'pixi.js';
import { randomNumberBetween } from './utils';

class Obstacle {
  constructor(graphics, x) {
    const texture = Texture.from(graphics);
    this.element = new Sprite(texture);
    this.element.x = x;
    this.element.y = window.innerHeight * 0.8;
    this.element.scale.set(0.08, 0.08);
    this.speed = 4;
  }
  updateObstacle() {
    this.element.x -= this.speed;

    if (this.element.x < -15) {
      this.element.x = randomNumberBetween(800, 1500);
      return;
    }
  }
}

class ObstacleManager {
  constructor() {
    this.numObstables = 3;
    this.obstacles = [];
    for (let i = 0; i < 1; i++) {
      const obstacle = new Obstacle(
        'imgs/obstacle.png',
        randomNumberBetween(800, 1500)
      );
      this.obstacles.push(obstacle);
    }
  }
  moveObstacles() {
    this.obstacles.forEach((obstacle) => {
      obstacle.updateObstacle();
    });
  }
  resetObstacles() {
    this.obstacles.forEach((obstacle) => {
      obstacle.element.x = randomNumberBetween(800, 1500);
    });
  }
}

export { Obstacle, ObstacleManager };
