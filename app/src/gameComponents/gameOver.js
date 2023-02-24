import { Text, TextStyle } from 'pixi.js';

class GameOverText extends Text {
  constructor(myText) {
    // create styles
    const style = new TextStyle({
      fontFamily: 'Press Start 2P',
      fontSize: 45,
      fill: '0xff1010',
      stroke: 'black',
      strokeThickness: 4,
      align: 'center',
    });
    // create text with styles
    super(myText, style);
    // set initial location
    this.onResize(window.innerWidth, window.innerHeight);
  }
  // onResize adjusts game over location based on window size
  onResize(width, heigth) {
    this.x = width * 0.36;
    this.y = heigth * 0.4;
  }
}

export { GameOverText };
