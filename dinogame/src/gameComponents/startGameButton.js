import { Text } from 'pixi.js';

class StartGameButton extends Text {
  constructor(onClick) {
    super('Press any button to start');
    this.x = 800 * 0.2;
    this.y = 600 * 0.6;
    this.onClick = onClick;

    document.removeEventListener('keydown', (event) => this.onClick(event));
    document.addEventListener('keydown', (event) => this.onClick(event));
  }
}

export { StartGameButton };
