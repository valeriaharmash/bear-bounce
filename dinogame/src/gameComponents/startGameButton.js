import { Text, TextStyle } from 'pixi.js';

const style = new TextStyle({
  fontFamily: 'Press Start 2P',
  fontSize: 25,
  fill: 'white',
  stroke: 'black',
  strokeThickness: 4,
});

class StartGameButton extends Text {
  constructor(onClick) {
    super('Press any button to start', style);
    this.x = window.innerWidth * 0.4;
    this.y = window.innerHeight * 0.47;
    this.onClick = onClick;

    document.removeEventListener('keydown', (event) => this.onClick(event));
    document.addEventListener('keydown', (event) => this.onClick(event));
  }
}

export { StartGameButton };
