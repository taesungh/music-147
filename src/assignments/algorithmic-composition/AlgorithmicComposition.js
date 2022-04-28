import React, { useRef, useState } from "react";
import * as Tone from "tone";

import celestial from "./services/Celestial";

function AlgorithmicComposition() {
  const [running, setRunning] = useState(false);
  const canvas = useRef();

  const startEngine = () => {
    Tone.start();
    celestial.createWorld(canvas.current);
    setRunning(true);
  };

  return (
    <div className="algorithmic-composition">
      <div className="container">
        <h1>Celestial</h1>
        <p>
          This demo explores algorithmic composition, probabilistic decisions, and musical timing.
        </p>
        <p>
          Click or tap within the universe to spawn planets which orbit around the center. Planets
          will trigger a note on a celesta when crossing the horizontal line extending to the right.
          The initial horizontal position will determine the pitch of the note played. All bodies
          obey laws of gravity and attract one another. The planets also slowly decay in motion
          until colliding with the center. There is a small chance that a planet will spawn with
          reverse motion, introducing additional chaos.
        </p>
        <p>Created with Matter.js and Tone.js</p>
        <p>
          {running || (
            <button type="button" className="btn" onClick={startEngine}>
              Start Demo
            </button>
          )}
        </p>
        <canvas ref={canvas} />
      </div>
    </div>
  );
}

export default AlgorithmicComposition;
