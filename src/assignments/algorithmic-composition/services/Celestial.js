import { Body, Bodies, Composite, Engine, Events, Mouse, Render, Runner, Vector } from "matter-js";
import { playNote } from "./celesta";

// gravitational constant
const G = 7e-8;
// from global styles for .container
const _CONTAINER_MAX_WIDTH = 1200;
const _CONTAINER_PADDING = 15;

class Celestial {
  async createWorld(canvas) {
    this._engine = Engine.create({
      gravity: {
        y: 0,
      },
    });
    this._render = Render.create({
      canvas: canvas,
      engine: this._engine,
      options: {
        wireframes: false,
        pixelRatio: "auto",
      },
    });

    // the central "sun" of the system
    this._attractor = Bodies.circle(0, 0, 80, {
      density: 12000,
      render: {
        strokeStyle: "#fff",
        lineWidth: 3,
        fillStyle: "#cba",
      },
    });

    // reference bar for producing sounds
    this._needle = Bodies.rectangle(580, 0, 1000, 2, {
      isStatic: true,
      isSensor: true,
      mass: 0,
      render: {
        fillStyle: "rgba(240, 240, 240, 0.4)",
      },
    });

    // add initial bodies to the world
    Composite.add(this._engine.world, [this._attractor, this._needle]);

    // set up mouse
    this._mouse = Mouse.create(canvas);
    // Events.on(this._mouse, "mousedown", this.processClick.bind(this));
    this._mouse.element.addEventListener("mousedown", this.processClick.bind(this));

    // set up viewport
    Render.lookAt(this._render, this._attractor, { x: 500, y: 500 }, true);
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

    Events.on(this._engine, "beforeUpdate", this.processGravity.bind(this));
  }

  startCollisionHandler() {
    Events.on(this._engine, "collisionStart", (event) => {
      event.pairs.forEach(({ bodyA, bodyB }) => {
        if (bodyA === this._needle) {
          playNote(bodyB.music.note, bodyB.music.velocity);
        } else if (bodyB === this._needle) {
          playNote(bodyA.music.note, bodyA.music.velocity);
        }
      });
    });
  }

  processClick(event) {
    this._addPlanet(this._mouse.position);
  }

  processGravity() {
    Composite.allBodies(this._engine.world).forEach((b) => {
      // do not apply to static bodies
      if (b.isStatic) {
        return;
      }
      Composite.allBodies(this._engine.world).forEach((other) => {
        // do not apply to self and static bodies
        if (b === other || other.isStatic) {
          return;
        }
        const dist = Vector.sub(other.position, b.position);
        // inverse-square gravitational force, based on Newton's law of universal gravitation
        const force = Vector.mult(
          Vector.normalise(dist),
          (G * b.mass * other.mass) / Vector.magnitudeSquared(dist)
        );
        Body.applyForce(b, other.position, force);
      });
    });
  }

  _enableWindowResizing() {
    window.addEventListener("resize", this._resizeWindow.bind(this));
  }

  _resizeWindow() {
    let vw = window.innerWidth;

    // fit within container
    let width = Math.min(_CONTAINER_MAX_WIDTH, vw) - 2 * _CONTAINER_PADDING;
    let height = width;

    let canvas = this._render.canvas;
    let pixelRatio = this._render.options.pixelRatio;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;

    this._render.bounds.min.y = -height / 2;
    this._render.bounds.max.y = height / 2;
    this._render.bounds.min.x = -width / 2;
    this._render.bounds.max.x = width / 2;

    // necessary for proper scaling
    this._render.options.width = width;
    this._render.options.height = height;

    // make mouse position reflect world coordinates
    Mouse.setOffset(this._mouse, this._render.bounds.min);
  }

  _addPlanet(position, options) {
    const size = 3 + 3 * Math.random();
    const pitch = Math.round(40 + (80 * position.x) / 1000);
    const octave = Math.floor(pitch / 12);

    const dist = Vector.sub(this._attractor.position, position);
    // v = sqrt(GM/R) for circular orbit
    const velocity = Vector.mult(
      Vector.perp(Vector.normalise(dist)),
      Math.sqrt((G * this._attractor.mass) / Vector.magnitude(dist))
    );

    const planet = Bodies.circle(position.x, position.y, size, {
      density: 20,
      frictionAir: 0,
      render: {
        fillStyle: `hsl(${pitch * 30}, 65%, ${40 + octave * 5}%)`,
      },
      entityType: "planet",
      music: {
        note: pitch,
        velocity: 20 * size,
      },
    });
    // velocity must be set after body is created and be scaled by simulation time step
    Body.setVelocity(planet, Vector.mult(velocity, this._runner.delta));
    Composite.add(this._engine.world, planet);
  }
}

const celestial = new Celestial();
export default celestial;
