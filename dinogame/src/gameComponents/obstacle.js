import { Texture, Sprite } from 'pixi.js';
import { randomNumberBetween } from './utils';

class Obstacle {
  constructor(graphics, x) {
    const texture = Texture.from(graphics);
    this.element = new Sprite(texture);
    this.element.x = x;
    this.element.y = 600 * 0.8;
    this.element.scale.set(0.7, 0.7);
    this.speed = 2;
  }
  updateObstacle() {
    this.element.x -= this.speed;

    if (this.element.x < -10) {
      this.element.x = randomNumberBetween(800, 1500);
      return;
    }
  }
}

class ObstacleManager {
  constructor() {
    this.numObstables = 3;
    this.obstacles = [];
    for (let i = 0; i < 3; i++) {
      const obstacle = new Obstacle(
        'imgs/cactus.png',
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
}

export { Obstacle, ObstacleManager };
