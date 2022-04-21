import { Bodies, Composite, Engine, Render, Runner } from "matter-js";
import midiHandler from "./midi-handler";

class MusicBall {
  async createWorld(canvas) {
    this._engine = Engine.create();
    this._render = Render.create({
      canvas: canvas,
      engine: this._engine,
      options: {
        pixelRatio: "auto",
      },
    });

    await midiHandler.initializeMidi();
    midiHandler.registerMidiHandler(this.processMidi.bind(this));

    const bumperLeft = Bodies.rectangle(370, 0, 600, 100, { angle: -0.2, isStatic: true });
    const bumperRight = Bodies.rectangle(-370, 0, 600, 100, { angle: 0.2, isStatic: true });

    Composite.add(this._engine.world, [bumperLeft, bumperRight]);

    this._render.options.hasBounds = true;
    this._resizeWindow();
    this._enableWindowResizing();

    // run the renderer
    Render.run(this._render);
    // create runner
    this._runner = Runner.create();
    // run the engine
    Runner.run(this._runner, this._engine);
  }

  processMidi(message) {
    const [status, data1, data2] = message.data;
    const type = status >> 4;
    const channel = 0x0f & status;

    if (type === 0b1001) {
      // note on
      this._addBall(data1, data2);
    } else if (type === 0b1000) {
      // note off
      const note = data1;
      const velocity = data2;
    } else if (type === 0b1011) {
      // control change
      const num = data1;
      const value = data2;
      console.log("cc", num, value);
    } else if (type === 0b1110) {
      // pitch bend
      const amount = data1;
      console.log("pitch bend", amount);
    }
  }

  _enableWindowResizing() {
    window.addEventListener("resize", this._resizeWindow.bind(this));
  }

  _resizeWindow() {
    let vw = window.innerWidth;
    let vh = window.innerHeight;

    // fit within container
    let width = Math.min(1170, vw - 30);
    let height = 0.6 * vh;

    let canvas = this._render.canvas;
    let pixelRatio = this._render.options.pixelRatio;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;

    this._render.bounds.min.y = -height;
    this._render.bounds.max.y = 0;
    this._render.bounds.min.x = -width / 2;
    this._render.bounds.max.x = width / 2;

    // necessary for proper scaling
    this._render.options.width = width;
    this._render.options.height = height;
  }

  _addBall(note, velocity) {
    const size = 10 + velocity / 5;
    const x = -200 + 400 * Math.random();
    const ball = Bodies.circle(x, -600, size);
    Composite.add(this._engine.world, ball);
  }
}

const musicBall = new MusicBall();
export default musicBall;
