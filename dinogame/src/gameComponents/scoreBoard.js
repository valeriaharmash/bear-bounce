import { Text, TextStyle } from 'pixi.js';

const style = new TextStyle({
  fontFamily: 'Press Start 2P',
  fontSize: 25,
  fill: 'white',
  stroke: 'black',
  strokeThickness: 4,
});

class Score {
  constructor(myText) {
    this.element = new Text(myText, style);
    this.element.x = window.innerWidth * 0.42;
    this.element.y = window.innerHeight * 0.33;
    this.score = 0;
  }
  updateScore(delta) {
    this.score += delta * 0.02;
    this.element.text = `Score: ${Math.floor(this.score)}`;
  }
  resetScore() {
    this.score = 0;
    this.element.text = 'Score: 0';
  }
}

export { Score };
