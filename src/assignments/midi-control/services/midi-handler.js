class MidiHandler {
  async initializeMidi() {
    if (!navigator.requestMIDIAccess) {
      console.warn("browser does not support Web MIDI API");
      return;
    }

    try {
      const midiAccess = await navigator.requestMIDIAccess();
      this.midi = midiAccess;
      for (const [id, inputDevice] of this.midi.inputs) {
        console.log(id, inputDevice);
      }
    } catch (error) {
      console.warn("Could not access MIDI devices", error);
    }
  }

  registerMidiHandler(onMIDIMessage) {
    this.midi.inputs.forEach((input) => (input.onmidimessage = onMIDIMessage));
  }
}

const midiHandler = new MidiHandler();
export default midiHandler;
