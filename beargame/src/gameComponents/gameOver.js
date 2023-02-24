import { Text, TextStyle } from 'pixi.js';

class GameOverText extends Text {
  constructor(myText) {
    const style = new TextStyle({
      fontFamily: 'Press Start 2P',
      fontSize: 45,
      fill: '0xff1010',
      stroke: 'black',
      strokeThickness: 4,
      align: 'center',
    });
    super(myText, style);
    this.onResize(window.innerWidth, window.innerHeight);
    this.score = 0;
  }
  onResize(width, heigth) {
    this.x = width * 0.36;
    this.y = heigth * 0.4;
  }
}

export { GameOverText };
