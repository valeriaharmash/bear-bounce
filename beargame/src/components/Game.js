import './Game.css';
import React, { useRef, useEffect } from 'react';
import { Game as gameApp } from '../gameComponents';

const Game = () => {
  const ref = useRef(null);

  const app = new gameApp();

  useEffect(() => {
    ref.current.appendChild(app.view);

    app.startGame();

    return () => app.stop();
  }, []);

  return <div ref={ref}></div>;
};

export default Game;
