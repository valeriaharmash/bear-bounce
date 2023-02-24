import { Text, TextStyle } from 'pixi.js';
class Score extends Text {
  constructor(myText) {
    // create score styling
    const style = new TextStyle({
      fontFamily: 'Press Start 2P',
      fontSize: 25,
      fill: 'white',
      stroke: 'black',
      strokeThickness: 4,
    });
    // init text objext
    super(myText, style);
    // set initial location
    this.onResize(window.innerWidth, window.innerHeight);
    // set score state to 0
    this.score = 0;
  }
  // updateScore updates score state and renders new score on score object
  updateScore(delta) {
    this.score += delta * 0.02;
    this.text = `Score: ${Math.floor(this.score)}`;
  }
  // resetScore resets score store to 0 and updates object text
  resetScore() {
    this.score = 0;
    this.text = 'Score: 0';
  }
  // onResize adjusts score location based on window size
  onResize(width, height) {
    this.x = width * 0.42;
    this.y = height * 0.33;
  }
}

export { Score };
