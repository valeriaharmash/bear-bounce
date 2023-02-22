import { Text } from 'pixi.js';

class GameOverText {
  constructor(myText) {
    this.element = new Text(myText);
    this.element.x = 800 * 0.3;
    this.element.y = 600 * 0.5;
    this.score = 0;
  }
}

export { GameOverText };
