import { Text, TextStyle } from 'pixi.js';
class StartGameButton extends Text {
  constructor(onClick) {
    const style = new TextStyle({
      fontFamily: 'Press Start 2P',
      fontSize: 25,
      fill: 'white',
      stroke: 'black',
      strokeThickness: 4,
    });
    super('Press any button to start', style);
    this.x = window.innerWidth * 0.34;
    this.y = window.innerHeight * 0.48;
    this.onClick = onClick;

    document.removeEventListener('keydown', (event) => this.onClick(event));
    document.addEventListener('keydown', (event) => this.onClick(event));
  }
}

export { StartGameButton };
