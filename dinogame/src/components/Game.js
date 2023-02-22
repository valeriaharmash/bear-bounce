import './Game.css';
import React, { useRef, useEffect, useState } from 'react';
import { Application, Sprite } from 'pixi.js';
import { Hero } from '../gameComponents';
import { Ground } from '../gameComponents';

const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH = 800;

const app = new Application({
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
  backgroundColor: 0x5bba6f,
});

// const createGround = (x) => {
//   const ground = Sprite.from('imgs/ground.png');
//   ground.x = x;
//   ground.y = CANVAS_HEIGHT * 0.88;
//   ground.scale._y = 0.5;
//   ground.interactive = true;
//   return ground;
// };

const Game = () => {
  const ref = useRef(null);
  const [grounds, setGrounds] = useState([]);

  useEffect(() => {
    ref.current.appendChild(app.view);
    app.start();
    const hero = new Hero('imgs/dino-stationary.png');
    const ground = new Ground('imgs/ground.png');
    setGrounds([ground]);

    document.removeEventListener('keydown', (event) => hero.onJump(event));
    document.addEventListener('keydown', (event) => hero.onJump(event));

    console.log(ground.element);
    app.stage.addChild(ground.element);
    app.stage.addChild(hero.element);

    return () => app.stop();
  }, []);

  return <div ref={ref}></div>;
};

export default Game;
