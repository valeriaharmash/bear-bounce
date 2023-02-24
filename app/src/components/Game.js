import './Game.css';
import React, { useRef, useEffect } from 'react';
import { App } from '../gameComponents';

const Game = () => {
  const ref = useRef(null);

  const app = new App();

  useEffect(() => {
    ref.current.appendChild(app.view);

    app.startGame();

    return () => app.stop();
  }, []);

  return <div ref={ref}></div>;
};

export default Game;
