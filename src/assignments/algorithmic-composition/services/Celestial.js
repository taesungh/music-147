import { Bodies, Composite, Engine, Events, Mouse, Render, Runner } from "matter-js";

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
    const attractor = Bodies.circle(0, 0, 100, {
      isStatic: true,
      density: 500,
      render: {
        strokeStyle: "#fff",
        lineWidth: 3,
        fillStyle: "#cba",
      },
    });

    // reference bar for producing sounds
    const needle = Bodies.rectangle(500, 0, 800, 2, {
      isStatic: true,
      mass: 0,
      render: {
        fillStyle: "rgba(240, 240, 240, 0.2)",
      },
    });

    // add all of the bodies to the world
    Composite.add(this._engine.world, [attractor, needle]);

    // set up mouse
    this._mouse = Mouse.create(canvas);
    // Events.on(this._mouse, "mousedown", this.processClick.bind(this));
    this._mouse.element.addEventListener("mousedown", this.processClick.bind(this));

    // set up viewport
    Render.lookAt(this._render, attractor, { x: 500, y: 500 }, true);
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
        // console.log("collision between", bodyA, bodyB);
      });
    });
  }

  processClick(event) {
    this._addPlanet(this._mouse.position);
  }

  processGravity() {}

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

  _addPlanet(position, options) {}
}

const celestial = new Celestial();
export default celestial;
