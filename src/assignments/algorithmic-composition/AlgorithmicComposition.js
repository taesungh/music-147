import React, { useRef, useState } from "react";

import celestial from "./services/Celestial";

function AlgorithmicComposition() {
  const [running, setRunning] = useState(false);
  const canvas = useRef();

  const startEngine = () => {
    celestial.createWorld(canvas.current);
    setRunning(true);
  };

  return (
    <div className="algorithmic-composition">
      <div className="container">
        <h1>Algorithmic Composition / Probabilistic Decisions / Musical Timing</h1>
        <p>
          {running || (
            <button type="button" onClick={startEngine}>
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
