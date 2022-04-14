const AudioContext = window.AudioContext || window.webkitAudioContext;

const ctx = new AudioContext();
const trackBuffers = {};

export async function resumeAudioContext() {
  console.log("Resuming audio context");
  await ctx.resume();
}

export async function playTrack(track) {
  const audioBuffer = trackBuffers[track] || await _getFile(track);
  // create a buffer source with the audio buffer of the track
  const trackSource = ctx.createBufferSource();
  trackSource.buffer = audioBuffer;

  const gainNode = ctx.createGain();
  trackSource.connect(gainNode);
  gainNode.connect(ctx.destination);
  gainNode.gain.value = 0.8;

  trackSource.start();
  return trackSource;
}

async function _getFile(track) {
  // fetch the track from a given URL
  const response = await fetch(track);
  const arrayBuffer = await response.arrayBuffer();

  // decode the audio data in the array buffer
  const audioBuffer = await ctx.decodeAudioData(arrayBuffer, function onSuccess(decodedBuffer) {
    trackBuffers[track] = decodedBuffer;
  });
  return audioBuffer;
}
