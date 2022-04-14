import React, { useState } from "react";
import {
  sample1,
  sample2,
  sample3,
  sample4,
  sample5,
  sample6,
  sample7,
  sample8,
} from "../../assets/audio";
import { playTrack, resumeAudioContext } from "./services/audio_handler";

import "./SoundFileExploration.css";

const keySounds = [sample8, sample1, sample2, sample3, sample4, sample5, sample6, sample7];

function SoundFileExploration() {
  const [text, setText] = useState("");

  const handleTextChange = (e) => {
    // extract the text from the input event
    const s = e.nativeEvent.data || " ";
    // select a sample to play based on the character code
    const track = keySounds[s.charCodeAt() % 8];
    playTrack(track);

    // update state value
    setText(e.target.value);
  };

  return (
    <div className="container sound-file-exploration">
      <h1>Sound File Exploration</h1>
      <p>Enter some text to trigger sounds.</p>
      <textarea value={text} onFocus={resumeAudioContext} onChange={handleTextChange} />
    </div>
  );
}

export default SoundFileExploration;
