import './Game.css';
import React, { useRef, useEffect, useState } from 'react';
import { Application } from 'pixi.js';
import { Hero, ObstacleManager } from '../gameComponents';
import { Ground } from '../gameComponents';

const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH = 800;

const app = new Application({
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
  backgroundColor: 0x5bba6f,
});

const Game = () => {
  const ref = useRef(null);

  const ground = new Ground('imgs/ground.png');
  const hero = new Hero('imgs/dino-stationary.png');
  const obstacleManager = new ObstacleManager();

  useEffect(() => {
    ref.current.appendChild(app.view);
    app.start();

    document.removeEventListener('keydown', (event) => hero.onJump(event));
    document.addEventListener('keydown', (event) => hero.onJump(event));

    app.stage.addChild(ground.element);
    app.stage.addChild(hero.element);

    obstacleManager.obstacles.forEach((obstacle) => {
      app.stage.addChild(obstacle.element);
    });

    app.ticker.add(function (delta) {
      obstacleManager.moveObstacles();
      ground.updateGround(delta);
    });

    return () => app.stop();
  }, []);

  return <div ref={ref}></div>;
};

export default Game;
