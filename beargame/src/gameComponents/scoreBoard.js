import { Text, TextStyle } from 'pixi.js';
class Score extends Text {
  constructor(myText) {
    const style = new TextStyle({
      fontFamily: 'Press Start 2P',
      fontSize: 25,
      fill: 'white',
      stroke: 'black',
      strokeThickness: 4,
    });

    super(myText, style);
    this.x = window.innerWidth * 0.42;
    this.y = window.innerHeight * 0.33;
    this.score = 0;
  }
  updateScore(delta) {
    this.score += delta * 0.02;
    this.text = `Score: ${Math.floor(this.score)}`;
  }
  resetScore() {
    this.score = 0;
    this.text = 'Score: 0';
  }
}

export { Score };
