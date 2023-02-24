import { Text, TextStyle } from 'pixi.js';

class GameOverText extends Text {
  constructor(myText) {
    const style = new TextStyle({
      fontFamily: 'Press Start 2P',
      fontSize: 45,
      fill: '0xff1010',
      stroke: 'black',
      strokeThickness: 4,
    });
    super(myText, style);
    this.x = window.innerWidth * 0.38;
    this.y = window.innerHeight * 0.4;
    this.score = 0;
  }
}

export { GameOverText };
