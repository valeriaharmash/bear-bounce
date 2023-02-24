import { Text, TextStyle } from 'pixi.js';

class StartGameText extends Text {
  constructor(onClick) {
    // create text styling
    const style = new TextStyle({
      fontFamily: 'Press Start 2P',
      fontSize: 30,
      fill: 'white',
      stroke: 'black',
      strokeThickness: 4,
      align: 'center',
    });
    // init text object
    super('Press any key to start', style);
    // set initial location
    this.onResize(window.innerWidth, window.innerHeight);
    // assign onClick event
    this.onClick = onClick;

    // remove existing 'keydown' event
    document.removeEventListener('keydown', (event) => this.onClick(event));
    // create 'keydown' to handle any key press
    document.addEventListener('keydown', (event) => this.onClick(event));
  }
  // onResize adjusts game over text location based on window size
  onResize(width, heigth) {
    this.x = width * 0.4;
    this.y = heigth * 0.48;
  }
}

export { StartGameText };
