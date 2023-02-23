import { Text, TextStyle } from 'pixi.js';
const style = new TextStyle({
  fontFamily: 'Press Start 2P',
  fontSize: 45,
  fill: '0xff1010',
  stroke: 'black',
  strokeThickness: 4,
});
class GameOverText {
  constructor(myText) {
    this.element = new Text(myText, style);
    this.element.x = window.innerWidth * 0.38;
    this.element.y = window.innerHeight * 0.4;
    this.score = 0;
  }
}

export { GameOverText };
