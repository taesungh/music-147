import * as Tone from "tone";
import { sample5 } from "assets/audio";

const sampler = new Tone.Sampler({
  urls: {
    "A#3": sample5,
  },
}).toDestination();

export function playNote(note, velocity) {
  // convert midi note to frequency
  const frequency = 440 * Math.pow(2, (note - 69) / 12);
  // scale velocity to amplitude curve
  const amplitude = Math.log(1 + velocity) / Math.log(1.2) / 50;
  // extend duration of lower notes
  const duration = (120 - note) / 30;

  sampler.triggerAttackRelease(frequency, duration, Tone.now(), amplitude);
}
