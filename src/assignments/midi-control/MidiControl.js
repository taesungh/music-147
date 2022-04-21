import React, { useRef, useState } from "react";
import * as Tone from "tone";

import musicBall from "./services/MusicBall";

import "./MidiControl.css";

const supportsMidi = !!navigator.requestMIDIAccess;

function MidiControl() {
  const [running, setRunning] = useState(false);
  const canvas = useRef();

  const unsupportedMessage = (
    <div className="unsupported-message">
      Your web browser does not support the Web MIDI API. Please use Google Chrome, Opera, or
      Microsoft Edge.
    </div>
  );

  const startEngine = () => {
    Tone.start();
    if (supportsMidi) {
      musicBall.createWorld(canvas.current);
    }
    setRunning(true);
  };

  return (
    <div className="container">
      <h1>Music Ball</h1>
      <p>
        Play notes on a MIDI keyboard to create balls which will produce sounds when bouncing. The
        color and size of the balls illustrate the pitch and velocity of the notes they will
        produce. Use the modulation wheel to slow down time. Use the pitch bend wheel to induce
        horizontal motion. Use the sustain pedal to reverse gravity.
      </p>
      <p>
        {!supportsMidi || running || (
          <button type="button" onClick={startEngine}>
            Start Demo
          </button>
        )}
      </p>
      {supportsMidi ? <canvas ref={canvas} style={{ width: "100%" }} /> : unsupportedMessage}
      <p>Created with Matter.js and Tone.js</p>
    </div>
  );
}

export default MidiControl;
