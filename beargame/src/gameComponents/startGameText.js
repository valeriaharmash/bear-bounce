import { Text, TextStyle } from 'pixi.js';

class StartGameText extends Text {
  constructor(onClick) {
    const style = new TextStyle({
      fontFamily: 'Press Start 2P',
      fontSize: 30,
      fill: 'white',
      stroke: 'black',
      strokeThickness: 4,
      align: 'center',
    });
    super('Press any key to start', style);
    this.onResize(window.innerWidth, window.innerHeight);
    this.onClick = onClick;

    document.removeEventListener('keydown', (event) => this.onClick(event));
    document.addEventListener('keydown', (event) => this.onClick(event));
  }
  onResize(width, heigth) {
    this.x = width * 0.4;
    this.y = heigth * 0.48;
  }
}

export { StartGameText };
