import { Body, Bodies, Composite, Engine, Events, Render, Runner, Vector } from "matter-js";
import { Mouse, MouseConstraint } from "matter-js";
import { playNote, playWisp } from "./celesta";

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
    // fix scaling issues
    this._mouse.pixelRatio = this._render.options.pixelRatio;
    // MouseConstraint supports touch input unlike Mouse
    this._mouseConstraint = MouseConstraint.create(this._engine, {
      mouse: this._mouse,
    });
    Events.on(this._mouseConstraint, "mousedown", this.processClick.bind(this));

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

        if (bodyA === this._attractor) {
          Composite.remove(this._engine.world, bodyB);
          playWisp();
        } else if (bodyB === this._attractor) {
          Composite.remove(this._engine.world, bodyA);
          playWisp();
        }
      });
    });
  }

  processClick(event) {
    // planet must spawn outside of attractor
    if (Vector.magnitude(this._mouse.position) > this._attractor.circleRadius + 5) {
      this._addPlanet(this._mouse.position);
    }
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
    let vw = document.body.clientWidth;

    // fit within container
    let width = Math.min(_CONTAINER_MAX_WIDTH, vw) - 2 * _CONTAINER_PADDING;
    let height = width;

    let canvas = this._render.canvas;
    let pixelRatio = this._render.options.pixelRatio;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    // enforce minimum padding. may have performance hit for large pixelRatio (e.g. 3 on mobile)
    width = Math.max(800, width);
    height = Math.max(800, height);

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
    const reverse = Math.random() < 0.05;

    const size = 3 + 3 * Math.random();
    const pitch = Math.round(40 + (80 * position.x) / 1000);
    const octave = Math.floor(pitch / 12);

    const dist = Vector.sub(this._attractor.position, position);
    // v = sqrt(GM/R) for circular orbit
    const circularVelocity = Vector.mult(
      Vector.perp(Vector.normalise(dist), reverse),
      Math.sqrt((G * this._attractor.mass) / Vector.magnitude(dist))
    );
    const perturbationVelocity = Vector.mult(Vector.normalise(dist), Math.random() / 15);
    const velocity = Vector.add(circularVelocity, perturbationVelocity);

    const planet = Bodies.circle(position.x, position.y, size, {
      density: 20,
      frictionAir: 0.0001,
      friction: 0.01,
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
