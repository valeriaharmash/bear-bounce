import { Text } from 'pixi.js';

class Score {
  constructor(myText) {
    this.element = new Text(myText);
    this.element.x = 800 * 0.7;
    this.element.y = 600 * 0.5;
    this.score = 0;
  }
  updateScore(delta) {
    this.score += delta * 0.01;
    this.element.text = `Score: ${Math.floor(this.score)}`;
  }
}

export { Score };
