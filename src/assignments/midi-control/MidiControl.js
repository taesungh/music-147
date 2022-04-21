import React, { useEffect, useRef } from "react";

import musicBall from "./services/MusicBall";

import "./MidiControl.css";

const supportsMidi = !!navigator.requestMIDIAccess;

function MidiControl() {
  const canvas = useRef();

  useEffect(() => {
    if (supportsMidi) {
      musicBall.createWorld(canvas.current);
    }
  }, []);

  const unsupportedMessage = (
    <div className="unsupported-message">
      Your web browser does not support the Web MIDI API. Please use Google Chrome, Opera, or
      Microsoft Edge.
    </div>
  );

  return (
    <div className="container">
      <h1>Music Ball</h1>
      {supportsMidi ? <canvas ref={canvas} style={{ width: "100%" }} /> : unsupportedMessage}
    </div>
  );
}

export default MidiControl;
