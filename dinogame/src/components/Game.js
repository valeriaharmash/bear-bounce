import './Game.css';
import React, { useRef, useEffect } from 'react';
import { Game as gameApp } from '../gameComponents';

const app = new gameApp();

const Game = () => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.appendChild(app.view);
    app.start();

    return () => app.stop();
  }, []);

  return <div ref={ref}></div>;
};

export default Game;
