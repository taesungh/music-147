import * as Tone from "tone";
import { celesta49, celesta61, celesta73 } from "assets/audio";

const sampler = new Tone.Sampler({
  urls: {
    "C#3": celesta49,
    "C#4": celesta61,
    "C#5": celesta73,
  },
}).toDestination();

export function playNote(note, velocity) {
  // convert midi note to frequency
  const frequency = 440 * Math.pow(2, (note - 69) / 12);
  // scale velocity to amplitude curve
  const amplitude = Math.log(1 + velocity) / Math.log(1.2) / 60;
  // extend duration of lower notes
  const duration = (120 - note) / 15;

  sampler.triggerAttackRelease(frequency, duration, Tone.now(), amplitude);
}

const player = new Tone.Player(celesta61);
player.reverse = true;
player.playbackRate = 16;

const pitchShift = new Tone.PitchShift(-24).toDestination();
player.fan(pitchShift);

export function playWisp() {
  player.start();
}
