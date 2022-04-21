import { Bodies, Composite, Engine, Events, Render, Runner } from "matter-js";

import { playNote } from "./audio-handler";
import midiHandler from "./midi-handler";

class MusicBall {
  async createWorld(canvas) {
    this._engine = Engine.create();
    this._render = Render.create({
      canvas: canvas,
      engine: this._engine,
      options: {
        wireframes: false,
        pixelRatio: "auto",
      },
    });

    await midiHandler.initializeMidi();
    midiHandler.registerMidiHandler(this.processMidi.bind(this));

    const bumperLeft = Bodies.rectangle(400, -150, 800, 100, {
      angle: -0.6,
      isStatic: true,
      render: { strokeStyle: "#fff", lineWidth: 4 },
    });
    const bumperMid = Bodies.rectangle(0, -300, 150, 150, {
      angle: Math.PI / 4,
      isStatic: true,
      render: { strokeStyle: "#fff", lineWidth: 4 },
    });
    const bumperRight = Bodies.rectangle(-400, -150, 800, 100, {
      angle: 0.6,
      isStatic: true,
      render: { strokeStyle: "#fff", lineWidth: 4 },
    });

    // add all of the bodies to the world
    Composite.add(this._engine.world, [bumperLeft, bumperMid, bumperRight]);

    this._render.options.hasBounds = true;
    this._resizeWindow();
    this._enableWindowResizing();

    // run the renderer
    Render.run(this._render);
    // create runner
    this._runner = Runner.create();
    // run the engine
    Runner.run(this._runner, this._engine);
    this.startCollisionHandler();
  }

  processMidi(message) {
    const [status, data1, data2] = message.data;
    const type = status >> 4;
    // const channel = 0x0f & status;

    if (type === 0b1001) {
      // note on
      this._addBall(data1, data2);
    } else if (type === 0b1000) {
      // note off
    } else if (type === 0b1011) {
      // control change
      this._handleControlChange(data1, data2);
    } else if (type === 0b1110) {
      // pitch bend
      this._handlePitchBend(data2);
    }
  }

  startCollisionHandler() {
    Events.on(this._engine, "collisionStart", (event) => {
      event.pairs.forEach(({ bodyA, bodyB }) => {
        // console.log("collision between", bodyA, bodyB);
        if (bodyA.entityType === "ball") {
          playNote(bodyA.music.note, bodyA.music.velocity);
        }
        if (bodyB.entityType === "ball") {
          playNote(bodyB.music.note, bodyB.music.velocity);
        }
      });
    });
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
    const pitch = note % 12;
    const octave = note / 12;
    const size = 5 + velocity / 8;
    const rw = this._render.options.width;
    const x = (rw * (note - 60)) / 100;

    const ball = Bodies.circle(x, -600, size, {
      render: {
        fillStyle: `hsl(${pitch * 30}, 60%, ${30 + octave * 5}%)`,
      },
      restitution: 0.95,
      entityType: "ball",
      music: {
        note,
        velocity,
      },
    });
    Composite.add(this._engine.world, ball);

    // remove balls out of view
    Composite.remove(
      this._engine.world,
      Composite.allBodies(this._engine.world).filter((b) => b.position.y > 100)
    );
  }

  _handleControlChange(num, value) {
    if (num === 1) {
      // mod wheel
      this._engine.timing.timeScale = 1 - value / 128;
    } else if (num === 64) {
      // sustain pedal
      this._engine.gravity.y = 1 - value / 64;
    }
  }

  _handlePitchBend(amount) {
    // add sideways acceleration
    this._engine.gravity.x = (amount - 64) / 64;
  }
}

const musicBall = new MusicBall();
export default musicBall;
