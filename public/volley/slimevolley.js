/*!

p5.js implementation of slime volleyball, with evolved neural networks to be the ai.

@licstart  The following is the entire license notice for the
JavaScript code in this page.

Copyright (C) 2015 david ha, otoro.net, otoro labs

The JavaScript code in this page is free software: you can
redistribute it and/or modify it under the terms of the GNU
General Public License (GNU GPL) as published by the Free Software
Foundation, either version 3 of the License, or (at your option)
any later version.  The code is distributed WITHOUT ANY WARRANTY;
without even the implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

As additional permission under GNU GPL version 3 section 7, you
may distribute non-source (e.g., minimized or compacted) forms of
that code without the copy of the GNU GPL normally required by
section 4, provided you include this license notice and a URL
through which recipients can access the Corresponding Source.


@licend  The above is the entire license notice
for the JavaScript code in this page.

Corresponding Source: https://mars.college/volley/slimevolley.js
*/

/*
Mars College footer edition. Slimmed for battery + bandwidth:

- This file is the SOURCE. The page loads /volley/volley.min.js — after
  editing, regenerate it (from web/mars-v2):
    node_modules/.pnpm/esbuild@0.27.7/node_modules/esbuild/bin/esbuild \
      public/volley/slimevolley.js --minify --outfile=public/volley/volley.min.js
- convnet.js + ga.js are replaced by the tiny inference shim below: the
  original shipped a full deep-learning library and a genetic-algorithm
  trainer to run one frozen 19->7 tanh layer per agent. Training-mode,
  keyboard/touch control, and all commented-out draw paths are gone; the
  pretrained gene and the live physics/AI are byte-for-byte the same.
- p5.dom.js is gone (only user was a redundant canvas.size() on resize).
- Sky is one cached native canvas gradient instead of 44 lerped bands per
  frame; the ball's transparency uses globalAlpha instead of p5 0.4.4's
  software tint() (which re-tinted the sprite through a brand-new <canvas>
  every frame); stars twinkle from a precomputed field.
- The loader in SiteFooter.astro owns pause/resume (scroll + tab
  visibility); resizes go through volleyResized() with a real
  changed-size check.
*/

// ---------------------------------------------------------------------------
// Minimal convnetjs-compatible inference shim.
// The brain is: input(19) -> fully-connected(7) -> tanh. The gene layout
// matches convnet.js + ga.js exactly: each neuron's 19 weights in order,
// then the 7 biases. Forward output is written into a persistent buffer —
// nothing allocates per frame.
// ---------------------------------------------------------------------------
var convnetjs = (function () {
  "use strict";
  function zeros(n) { return new Float64Array(n); }

  function Vol(sx, sy, depth) { this.w = zeros(sx * sy * depth); }

  // Same curve as convnet.js's tanh helper, clamped so large sums can't
  // overflow exp() into NaN (tanh(±20) is already ±1 in double precision).
  function tanh(x) {
    if (x > 20) return 1;
    if (x < -20) return -1;
    var y = Math.exp(2 * x);
    return (y - 1) / (y + 1);
  }

  function Net() { this.nIn = 0; this.nOut = 0; this.W = null; this.b = null; this._out = null; }
  Net.prototype.makeLayers = function (defs) {
    // defs: [{type:'input', out_depth}, {type:'fc', num_neurons, activation:'tanh'}]
    this.nIn = defs[0].out_depth;
    this.nOut = defs[1].num_neurons;
    this.W = zeros(this.nIn * this.nOut);
    this.b = zeros(this.nOut);
    this._out = new Vol(1, 1, this.nOut);
  };
  Net.prototype.forward = function (vol) {
    var x = vol.w, W = this.W, b = this.b, o = this._out.w;
    var nI = this.nIn, nO = this.nOut;
    for (var i = 0; i < nO; i++) {
      var s = b[i], off = i * nI;
      for (var j = 0; j < nI; j++) s += W[off + j] * x[j];
      o[i] = tanh(s);
    }
    return this._out;
  };

  function Chromosome(gene) { this.gene = gene; }
  Chromosome.prototype.pushToNetwork = function (net) {
    var g = this.gene, n = 0, i;
    for (i = 0; i < net.W.length; i++) net.W[i] = g[n++];
    for (i = 0; i < net.b.length; i++) net.b[i] = g[n++];
  };

  return { zeros: zeros, Vol: Vol, Net: Net, Chromosome: Chromosome };
})();

// ---------------------------------------------------------------------------
// Small helpers (formerly useful.js)
// ---------------------------------------------------------------------------
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomColor = function (alpha) {
  return color(getRandomInt(127, 255), getRandomInt(127, 255), getRandomInt(127, 255), alpha ? alpha : 0);
};

// precomputed sine/cosine to the nearest degree
var cosTable = new Float64Array(360);
var sinTable = new Float64Array(360);
for (var _i = 0; _i < 360; _i++) {
  cosTable[_i] = Math.cos((_i / 360) * 2 * Math.PI);
  sinTable[_i] = Math.sin((_i / 360) * 2 * Math.PI);
}
var fastSin = function (xDeg) {
  var deg = Math.round(xDeg);
  if (deg >= 0) return sinTable[deg % 360];
  return -sinTable[(-deg) % 360];
};
var fastCos = function (xDeg) {
  return cosTable[Math.round(Math.abs(xDeg)) % 360];
};

// ---------------------------------------------------------------------------
// Game settings
// ---------------------------------------------------------------------------
// The court is REF_W_MAX units wide at comfortable sizes. Below MIN_DESIGN_W
// pixels we stop scaling the world down and narrow it instead — the sides give
// up horizontal court rather than the riders and ball shrinking to nothing.
var REF_W_MAX = 24 * 2;
var MIN_DESIGN_W = 720;
var ref_w = REF_W_MAX;
var ref_h = ref_w;
// Extra sand drawn below the court line, as a multiple of the ground height,
// so the riders aren't parked on the very bottom edge of the frame.
var GROUND_PAD = 1.5;
var groundPad = 0;
// Purely cosmetic: lift the drawn horizon (and the cactus with it) a little
// above the physics floor, so the sand laps over the bottom of the wheels
// instead of the riders balancing on a hairline. About a fifth of a wheel
// radius — the wheel measures ~1.9 units tall in the rider sprites.
var WHEEL_R = 0.95;
var HORIZON_RISE = 0.18 * WHEEL_R;
// The cactus art is drawn from a taller box than the net it stands for, so its
// base used to sink well under the riders' wheels. Lift it so the base lands a
// little below the line the riders rest on — 0.35 units puts the lift at 18px
// at desktop scale.
var CACTUS_SINK = 0.35;
var ref_u = 1.5; // ground height
var ref_wallwidth = 1.0; // wall width
var ref_wallheight = 3.5;
var factor = 1;
var playerSpeedX = 10 * 1.75;
var playerSpeedY = 10 * 1.35;
var maxBallSpeed = 15 * 1.5;
var gravity;
var timeStep = 1 / 30;
var theFrameRate = 60;
var nudge = 0.1;
var friction = 1.0; // 1 means no friction, less means friction
var initDelayFrames = 30 * 2;
var theGravity = -9.8 * 2 * 1.5;

// drawing params
var sunspeed = 0.003;
var numStars = 80;
var sunRad = 150;
var ballRadius = 0.4;

// Pretrained gene (140 floats: 7 neurons x 19 weights, then 7 biases).
var initGene = Float64Array.from([
  7.5719, 4.4285, 2.2716, -0.3598, -7.8189, -2.5422, -3.2034, 0.3935, -6.7593, -8.0551,
  1.3679, 2.1859, 1.2202, -0.49, -0.0316, 0.5221, 0.7026, 0.4179, -2.1689, 1.646,
  -13.3639, 1.5151, 1.1175, -5.3561, 5.0442, 0.8451, 0.3987, -2.6158, 0.4318, -0.7361,
  0.5715, -2.9501, -3.7811, -5.8994, 6.4167, 2.5014, 7.338, -2.9887, 2.4586, 13.4191,
  2.7395, -3.9708, 1.6548, -2.7554, -1.5345, -6.4708, -4.4454, -0.6224, -1.0988, 4.4501,
  9.2426, -0.7392, 0.4452, 1.8828, -2.6277, -10.851, -3.2353, -4.4653, -3.1153, -1.3707,
  7.318, 16.0902, 1.4686, 7.0391, 1.7765, -4.9573, -1.0578, 1.3668, -1.4029, -1.155,
  2.6697, -8.8877, 1.1958, -3.2839, -5.4425, 1.6809, 7.6812, -2.4732, 1.738, 0.3781,
  0.8718, 2.5886, 1.6911, 1.2953, -5.5961, 2.174, -3.5098, -5.4715, -9.0052, -4.6038,
  -6.7447, -2.5528, 0.4391, -4.9278, -3.6695, -4.8673, -1.6035, 1.5011, -5.6124, 4.9747,
  1.8998, 3.0359, 6.2983, -2.703, 1.5025, 6.1841, -0.9357, -4.8568, -2.1888, -4.1143,
  -3.9874, -0.0459, 4.7134, 2.8952, -9.3627, -4.685, 0.3601, -1.3699, 9.7294, 11.5596,
  0.1918, 3.0783, -6.6828, -5.4398, -5.088, 3.6948, 0.0329, -0.1362, -0.1188, -0.7579,
  0.3278, -0.977, -0.9377, 2.2935, -2.0353, -1.7786, 5.4567, -3.6368, 3.4996, -0.0685
]);

// html elements
var myCanvas;
var textColor = 0;
var frame = 0;
var inkTarget;
var lastInk = -1;
var lastBallAlpha = -1;
var ballColor = null;

// declare objects
var game = {
  ball: null,
  ground: null,
  fence: null,
  fenceStub: null,
  agent1: null,
  agent2: null
};

// conversion to pixels
function toX(x) {
  return (x + ref_w / 2) * factor;
}
function toP(x) {
  return (x) * factor;
}
function toY(y) {
  return height - groundPad - y * factor;
}

// Recompute the world scale for a canvas of w pixels.
function applyScale(w) {
  factor = Math.max(w, MIN_DESIGN_W) / REF_W_MAX;
  ref_w = w / factor;
  ref_h = ref_w;
  groundPad = ref_u * factor * (GROUND_PAD - 1);
  if (game && game.ground) game.ground.w = ref_w;
}

var delayScreen = {
  life: initDelayFrames,
  init: function (life) {
    this.life = life;
  },
  status: function () {
    if (this.life === 0) {
      return true;
    }
    this.life -= 1;
    return false;
  }
};

// ---------------------------------------------------------------------------
// Objects
// ---------------------------------------------------------------------------
function Particle(loc, v, r, c) { // location p5.Vector, velocity p5.Vector, r float, color
  "use strict";
  this.loc = loc || createVector(random(-ref_w * 1 / 4, ref_w * 1 / 4), random(ref_w / 4, ref_w * 3 / 4));
  this.prevLoc = this.loc.copy();
  this.v = v || createVector(random(-20, 20), random(10, 25));
  this.r = r || random(0.5, 1.5);
  this.c = c || getRandomColor(128);
  this.ang = 0;
  this.angAcc = 0.0;
}
Particle.prototype.move = function () {
  // in place — the old copy()/Vector.mult pair allocated two vectors a frame
  this.prevLoc.x = this.loc.x;
  this.prevLoc.y = this.loc.y;
  this.loc.x += this.v.x * timeStep;
  this.loc.y += this.v.y * timeStep;
};
Particle.prototype.applyAcceleration = function (acceleration) {
  this.v.x += acceleration.x * timeStep;
  this.v.y += acceleration.y * timeStep;
};
Particle.prototype.checkEdges = function () {
  if (this.loc.x <= this.r - ref_w / 2) {
    this.v.x *= -friction;
    this.loc.x = this.r - ref_w / 2 + nudge * timeStep;
  }
  if (this.loc.x >= (ref_w / 2 - this.r)) {
    this.v.x *= -friction;
    this.loc.x = ref_w / 2 - this.r - nudge * timeStep;
  }
  if (this.loc.y <= this.r + ref_u) {
    this.v.y *= -friction;
    this.loc.y = this.r + ref_u + nudge * timeStep;
    if (this.loc.x <= 0) {
      return -1;
    } else {
      return 1;
    }
  }
  if (this.loc.y >= (ref_h - this.r)) {
    this.v.y *= -friction;
    this.loc.y = ref_h - this.r - nudge * timeStep;
  }
  // fence:
  if ((this.loc.x <= (ref_wallwidth / 2 + this.r)) && (this.prevLoc.x > (ref_wallwidth / 2 + this.r)) && (this.loc.y <= ref_wallheight)) {
    this.v.x *= -friction;
    this.loc.x = ref_wallwidth / 2 + this.r + nudge * timeStep;
  }
  if ((this.loc.x >= (-ref_wallwidth / 2 - this.r)) && (this.prevLoc.x < (-ref_wallwidth / 2 - this.r)) && (this.loc.y <= ref_wallheight)) {
    this.v.x *= -friction;
    this.loc.x = -ref_wallwidth / 2 - this.r - nudge * timeStep;
  }
  return 0;
};
Particle.prototype.getDist2 = function (p) { // returns distance squared from p
  var dy = p.loc.y - this.loc.y;
  var dx = p.loc.x - this.loc.x;
  return (dx * dx + dy * dy);
};
Particle.prototype.isColliding = function (p) { // returns true if it is colliding w/ p
  var r = this.r + p.r;
  return (r * r > this.getDist2(p)); // if distance is less than total radius, then colliding.
};
Particle.prototype.bounce = function (p) { // bounce two balls that have collided (this and that)
  // runs a handful of times a second at most, so the vector allocations here
  // are fine.
  var ab = createVector();
  ab.set(this.loc);
  ab.sub(p.loc);
  ab.normalize();
  ab.mult(nudge);

  this.angAcc += 0.5 * ab.x;

  while (this.isColliding(p)) {
    this.loc.add(ab);
  }

  var n = p5.Vector.sub(this.loc, p.loc);
  n.normalize();
  var u = p5.Vector.sub(this.v, p.v);
  var un = p5.Vector.mult(n, u.dot(n) * 2); // added factor of 2
  u.sub(un);
  this.v = p5.Vector.add(u, p.v);
};
Particle.prototype.limitSpeed = function (minSpeed, maxSpeed) {
  var mag2 = this.v.magSq();
  if (mag2 > (maxSpeed * maxSpeed)) {
    this.v.normalize();
    this.v.mult(maxSpeed);
  }
  if (mag2 < (minSpeed * minSpeed)) {
    this.v.normalize();
    this.v.mult(minSpeed);
  }
};

Particle.prototype.display = function () {
  "use strict";
  stroke(0, 50);
  fill(this.c);
  ellipse(toX(this.loc.x), toY(this.loc.y) - toP(4.8), toP(this.r * 2) * 2, toP(this.r * 2) * 2);
  push();
  translate(toX(this.loc.x), toY(this.loc.y) - toP(4.8));
  rotate(this.ang);
  this.ang += this.angAcc;
  // 220/255 alpha, straight through the compositor. p5 0.4.4's tint() did
  // this in software via getImageData + a fresh <canvas> per frame.
  drawingContext.globalAlpha = 220 / 255;
  image(volleyball, -toP(this.r * 2), -toP(this.r * 2), toP(this.r * 2) * 2, toP(this.r * 2) * 2);
  drawingContext.globalAlpha = 1;
  pop();
};

// ---------------------------------------------------------------------------
// Agent brain (frozen pretrained network)
// ---------------------------------------------------------------------------
function Brain() {
  "use strict";
  this.nGameInput = 12; // 8 states for agent, plus 4 state for opponent
  this.nGameOutput = 3; // 3 buttons (forward, backward, jump)
  this.nRecurrentState = 4; // extra recurrent states for feedback.
  this.nOutput = this.nGameOutput + this.nRecurrentState;
  this.nInput = this.nGameInput + this.nOutput;

  // store current inputs and outputs
  this.inputState = convnetjs.zeros(this.nInput);
  this.convInputState = new convnetjs.Vol(1, 1, this.nInput); // compatible with convnetjs lib input.
  this.outputState = convnetjs.zeros(this.nOutput);
  this.prevOutputState = convnetjs.zeros(this.nOutput);

  // setup neural network:
  this.layer_defs = [
    { type: 'input', out_sx: 1, out_sy: 1, out_depth: this.nInput },
    { type: 'fc', num_neurons: this.nOutput, activation: 'tanh' }
  ];

  this.net = new convnetjs.Net();
  this.net.makeLayers(this.layer_defs);

  new convnetjs.Chromosome(initGene).pushToNetwork(this.net);
}
// get current input for nn
Brain.prototype.setCurrentInputState = function (agent, opponent) {
  "use strict";
  var i;
  var scaleFactor = 10; // scale inputs to be in the order of magnitude of 10.
  this.inputState[0] = agent.state.x / scaleFactor;
  this.inputState[1] = agent.state.y / scaleFactor;
  this.inputState[2] = agent.state.vx / scaleFactor;
  this.inputState[3] = agent.state.vy / scaleFactor;
  this.inputState[4] = agent.state.bx / scaleFactor;
  this.inputState[5] = agent.state.by / scaleFactor;
  this.inputState[6] = agent.state.bvx / scaleFactor;
  this.inputState[7] = agent.state.bvy / scaleFactor;
  // the original zeroed the opponent inputs (0 * state), so they stay zeros
  this.inputState[8] = 0;
  this.inputState[9] = 0;
  this.inputState[10] = 0;
  this.inputState[11] = 0;
  for (i = 0; i < this.nOutput; i++) { // feeds back output to input
    this.inputState[i + this.nGameInput] = this.outputState[i];
  }
  for (i = 0; i < this.nInput; i++) { // copies input state into convnet cube object format to be used later.
    this.convInputState.w[i] = this.inputState[i];
  }
};
Brain.prototype.forward = function () {
  "use strict";
  var a = this.net.forward(this.convInputState);
  for (var i = 0; i < this.nOutput; i++) {
    this.prevOutputState[i] = this.outputState[i]; // backs up previous value.
    this.outputState[i] = a.w[i];
  }
};

// ---------------------------------------------------------------------------
// Agents
// ---------------------------------------------------------------------------
function Agent(dir, loc, c) {
  "use strict";
  this.dir = dir; // -1 means left, 1 means right player for symmetry.
  this.img = riderImg[this.dir == -1 ? RIDERS_F[0] : RIDERS_M[0]];
  this.facing = 1;
  this.loc = loc || createVector(ref_w / 4, 1.5);
  this.v = createVector(0, 0);
  this.desiredVelocity = createVector(0, 0);
  this.r = 1.5;
  this.c = c;
  this.opponent = null;
  this.score = 0;
  this.action = { // the current set of actions the agent wants to take
    forward: false, // this set of actions is set by the neural net
    backward: false,
    jump: false
  };
  this.state = { // complete game state for this agent.  used by neural network.
    x: 0, // normalized to side, appears different for each agent's perspective
    y: 0,
    vx: 0,
    vy: 0,
    bx: 0,
    by: 0,
    bvx: 0,
    bvy: 0
  };
  this.brain = new Brain();
}
Agent.prototype.setOpponent = function (opponent) {
  "use strict";
  this.opponent = opponent;
};
Agent.prototype.setAction = function (forward, backward, jump) {
  "use strict";
  this.action.forward = forward;
  this.action.backward = backward;
  this.action.jump = jump;
};
Agent.prototype.setBrainAction = function () {
  "use strict"; // this function converts the brain's output layer into actions to move forward, backward, or jump
  var forward = this.brain.outputState[0] > 0.75; // sigmoid decision.
  var backward = this.brain.outputState[1] > 0.75; // sigmoid decision.
  var jump = this.brain.outputState[2] > 0.75; // sigmoid decision.
  this.setAction(forward, backward, jump);
};
Agent.prototype.processAction = function () { // convert action into real movement
  "use strict";
  var forward = this.action.forward;
  var backward = this.action.backward;
  this.desiredVelocity.x = 0;
  this.desiredVelocity.y = 0;

  if (forward && !backward) {
    this.desiredVelocity.x = -playerSpeedX;
  }
  if (backward && !forward) {
    this.desiredVelocity.x = playerSpeedX;
  }
  if (this.action.jump) {
    this.desiredVelocity.y = playerSpeedY;
  }
};
Agent.prototype.move = function () {
  "use strict";
  this.loc.x += this.v.x * timeStep;
  this.loc.y += this.v.y * timeStep;
};
Agent.prototype.getState = function () { // refreshes game state for this agent, in place
  "use strict";
  var s = this.state;
  s.x = this.loc.x * this.dir; // normalized to side, appears different for each agent's perspective
  s.y = this.loc.y;
  s.vx = this.v.x * this.dir;
  s.vy = this.v.y;
  s.bx = game.ball.loc.x * this.dir;
  s.by = game.ball.loc.y;
  s.bvx = game.ball.v.x * this.dir;
  s.bvy = game.ball.v.y;
  return s;
};
Agent.prototype.update = function () {
  "use strict";
  this.v.y += theGravity * timeStep;
  if (this.loc.y <= ref_u + nudge * timeStep) {
    this.v.y = this.desiredVelocity.y;
  }
  this.v.x = this.desiredVelocity.x * this.dir;
  if (this.v.x > 0) {
    this.facing = 1;
  } else if (this.v.x < 0) {
    this.facing = -1;
  }
  this.move();
  if (this.loc.y <= ref_u) {
    this.loc.y = ref_u;
    this.v.y = 0;
  }

  // stay in their own half:
  if (this.loc.x * this.dir <= (ref_wallwidth / 2 + this.r)) {
    this.v.x = 0;
    this.loc.x = this.dir * (ref_wallwidth / 2 + this.r);
  }
  if (this.loc.x * this.dir >= (ref_w / 2 - this.r)) {
    this.v.x = 0;
    this.loc.x = this.dir * (ref_w / 2 - this.r);
  }
};
Agent.prototype.display = function () {
  "use strict";
  var x = this.loc.x;
  var y = this.loc.y;

  // Rider sprites are tightly cropped and each has its own width, so draw
  // at the sprite's natural aspect ratio with the wheel resting exactly on
  // the ground line (agents come to rest at y = ref_u, which is ground top).
  var ih = 7.7;
  var iw = (this.img && this.img.height) ? ih * (this.img.width / this.img.height) : 2.8;
  push();
  if (this.facing == -1) {
    translate(toX(x) + toP(iw) / 2, toY(y) - toP(ih));
    scale(-1.0, 1.0);
  } else {
    translate(toX(x) - toP(iw) / 2, toY(y) - toP(ih));
  }
  image(this.img, 0, 0, toP(iw), toP(ih));
  pop();
};

function Wall(x, y, w, h) {
  "use strict";
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.c = color(0, 200, 50, 128);
  this.isCactus = false;
}

Wall.prototype.display = function () {
  "use strict";
  if (this.isCactus) {
    var ww = toP(this.h) * (cactus.width / cactus.height);
    // world y the art's base would land on if drawn straight, and the lift
    // needed to bring it up level with the riders (minus a hair)
    var baseY = this.y + this.h / 2 - (this.h + 0.45);
    var lift = (ref_u - CACTUS_SINK) - baseY;
    image(cactus, toX(this.x - this.w / 2), toY(this.y + this.h / 2) - toP(HORIZON_RISE + lift), ww, toP(this.h + 0.45));
  } else {
    // (the old white underlay rect beneath the sand was 100% covered by the
    // opaque sand color — deleted)
    noStroke();
    var rise = toP(HORIZON_RISE);
    var gy = toY(this.y + this.h / 2) - rise;
    var gh = toP(this.h) + groundPad + rise;
    fill(this.c);
    rect(toX(this.x - this.w / 2), gy, toP(this.w), gh);
  }
};

function initGame() {
  game.ball = new Particle(createVector(0, ref_w / 4));
  game.ball.r = ballRadius;
  game.ball.ang = 0;

  game.agent1 = game.agent1 || new Agent(-1, createVector(-ref_w, 20), color(240, 75, 0, 255));
  game.agent2 = game.agent2 || new Agent(1, createVector(ref_w, 20), color(0, 150, 255, 255));

  game.agent1.setOpponent(game.agent2); // point agent to the other agent as an opponent.
  game.agent2.setOpponent(game.agent1);

  pickRiders();

  delayScreen.init(initDelayFrames);
}

let cactus, volleyball;

// The two players are drawn from the Mars College rider illustrations
// (public/riders). Each rally picks a fresh pair — one from each list — so the
// match-up keeps changing. These lists are a read of stylised artwork; swap
// numbers between them freely.
var RIDERS_M = [2, 4, 6];
var RIDERS_F = [1, 3, 5, 7, 8];
var riderImg = {};

function preload() {
  volleyball = loadImage('/volley/volleyball.png');
  cactus = loadImage('/volley/cactus.png');
  RIDERS_M.concat(RIDERS_F).forEach(function (n) {
    riderImg[n] = loadImage('/riders/' + n + '.png');
  });
}

// One male + one female, never the same sprite twice, sides randomised.
function pickRiders() {
  var m = RIDERS_M[Math.floor(Math.random() * RIDERS_M.length)];
  var f = RIDERS_F[Math.floor(Math.random() * RIDERS_F.length)];
  var left = Math.random() < 0.5 ? m : f;
  var right = left === m ? f : m;
  if (game.agent1) game.agent1.img = riderImg[left];
  if (game.agent2) game.agent2.img = riderImg[right];
}

// ---------------------------------------------------------------------------
// Sky, stars, sun
// ---------------------------------------------------------------------------
// Day/night sky endpoints (same values the banded gradient used).
var SKY_TOP_DAY = [170, 170, 245], SKY_TOP_NIGHT = [30, 30, 150];
var SKY_BOT_DAY = [235, 235, 255], SKY_BOT_NIGHT = [45, 45, 165];
var SKY_ALPHA = 150 / 255; // the old bands were drawn at alpha 150...
// ...over the .ftr__court CSS backdrop (SiteFooter.astro):
//   linear-gradient(to bottom, #2b2b62, #6a6ab0)
// Two stacked 2-stop linear gradients compose to another 2-stop linear
// gradient, so the blend is baked here and drawn OPAQUE — that lets draw()
// skip clear() entirely (one full-canvas pass saved per frame). The CSS
// gradient stays as the pre-boot backdrop; if it ever changes, re-bake.
var CSS_TOP = [43, 43, 98], CSS_BOT = [106, 106, 176];
var skyGrad = null;
var lastSkyKey = -1;

function skyStop(day, night, css, t) {
  var a = SKY_ALPHA, b = 1 - SKY_ALPHA;
  var r = Math.round((day[0] + (night[0] - day[0]) * t) * a + css[0] * b);
  var g = Math.round((day[1] + (night[1] - day[1]) * t) * a + css[1] * b);
  var bl = Math.round((day[2] + (night[2] - day[2]) * t) * a + css[2] * b);
  return 'rgb(' + r + ',' + g + ',' + bl + ')';
}

// One native gradient, rebuilt only when the (quantized) time of day moves —
// every few frames — instead of 40+ lerped, alpha-blended bands per frame.
function updateSkyGradient(dayLerp) {
  var key = Math.round(dayLerp * 255);
  if (key === lastSkyKey && skyGrad) return;
  lastSkyKey = key;
  var t = key / 255;
  var g = drawingContext.createLinearGradient(0, 0, 0, height);
  g.addColorStop(0, skyStop(SKY_TOP_DAY, SKY_TOP_NIGHT, CSS_TOP, t));
  g.addColorStop(1, skyStop(SKY_BOT_DAY, SKY_BOT_NIGHT, CSS_BOT, t));
  skyGrad = g;
}

// Star field: position, radius, brightness, and a slow twinkle phase/speed
// per star, precomputed. Stars only live above the sand line — the old field
// scattered a quarter of them under the ground fill where they were painted
// over every frame.
// Positions are stored normalized (0..1) and scaled at draw time, so a
// window resize stretches the field in place instead of re-rolling every
// star (which used to make the whole sky "pop").
var starField = [];
var starSkyH = 1; // pixel height of the sky band (above the sand)

function calcStarPos() {
  starField = [];
  for (var s = 0; s < numStars; s++) {
    starField.push({
      x: Math.random(),
      y: Math.random(),
      // mostly fine pinpricks, a few brighter standouts
      r: Math.random() < 0.12 ? 1.6 + Math.random() * 0.9 : 0.6 + Math.random() * 0.9,
      bright: 0.55 + Math.random() * 0.45,
      phase: Math.random() * 360,
      speed: 0.5 + Math.random() * 1.2 // degrees per frame
    });
  }
}

function updateStarBox() {
  starSkyH = Math.max(1, height - (ref_u * factor + groundPad));
}

function drawStars(maxalpha) {
  var ctx = drawingContext;
  var base = maxalpha / 255;
  var w = width;
  ctx.fillStyle = '#fff';
  for (var s = 0; s < starField.length; s++) {
    var st = starField[s];
    // gentle twinkle: ±20% brightness on a slow per-star cycle
    var tw = 0.8 + 0.2 * fastSin(frame * st.speed + st.phase);
    ctx.globalAlpha = base * st.bright * tw;
    ctx.beginPath();
    ctx.arc(st.x * w, st.y * starSkyH, st.r, 0, 6.2832);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

// Sun: five constant-color rings — the fillStyles never change, so they are
// built once here instead of running p5's Color pipeline 5x per frame.
var SUN_FILLS = (function () {
  var f = [];
  for (var i = 0; i < 5; i++) f.push('rgba(255,177,43,' + ((50 + 13 * i) / 255).toFixed(3) + ')');
  return f;
})();

function drawSun(sunX, sunY, sunR) {
  var ctx = drawingContext;
  for (var i = 0; i < 5; i++) {
    ctx.fillStyle = SUN_FILLS[i];
    ctx.beginPath();
    ctx.arc(sunX, sunY, (sunR - i * sunR / 30) / 2, 0, 6.2832);
    ctx.fill();
  }
}

// ---------------------------------------------------------------------------
// p5 lifecycle
// ---------------------------------------------------------------------------
function setup() {
  "use strict";

  var box = volleyBox();
  myCanvas = createCanvas(box.w, box.h);
  // Decorative background — cap the backing store at 1.5x. Full 3x retina
  // costs 4x the fill of 1.5x and is invisible at these shapes and speeds.
  devicePixelScaling(Math.min(window.devicePixelRatio || 1, 1.5));
  applyScale(box.w);
  myCanvas.parent('p5Container');
  frameRate(theFrameRate);

  gravity = createVector(0, theGravity);

  // setup game objects
  game.ground = new Wall(0, 0.75, ref_w, ref_u);

  var ww = (ref_wallheight - 1.5 + 4.5) * (cactus.width / cactus.height);
  game.fence = new Wall(0, 0.75 + ref_wallheight, ww, (ref_wallheight - 1.5 + 4.5));
  game.fence.isCactus = true;
  game.fence.c = color(70, 200, 100, 255);
  game.ground.c = color(240, 210, 130, 255);
  game.fenceStub = new Particle(createVector(0, ref_wallheight), createVector(0, 0), ref_wallwidth / 2, color(240, 210, 130, 255));

  initGame();
  calcStarPos();
  updateStarBox();

  window.__volleyReady = true;
}

// updates game element according to physics
function update(nStep) {
  "use strict";

  var result = 0;

  for (var step = 0; step < nStep; step++) {

    // ai here
    // update internal states
    game.agent1.getState();
    game.agent2.getState();
    // push states to brain
    game.agent1.brain.setCurrentInputState(game.agent1, game.agent2);
    game.agent2.brain.setCurrentInputState(game.agent2, game.agent1);
    // make a decision
    game.agent1.brain.forward();
    game.agent2.brain.forward();
    // convert brain's output signals into game actions
    game.agent1.setBrainAction();
    game.agent2.setBrainAction();

    // process actions
    game.agent1.processAction();
    game.agent2.processAction();
    game.agent1.update();
    game.agent2.update();

    if (delayScreen.status() === true) {
      game.ball.applyAcceleration(gravity);
      game.ball.limitSpeed(0, maxBallSpeed);
      game.ball.move();
    }

    if (game.ball.isColliding(game.agent1)) {
      game.ball.bounce(game.agent1);
    }
    if (game.ball.isColliding(game.agent2)) {
      game.ball.bounce(game.agent2);
    }
    if (game.ball.isColliding(game.fenceStub)) {
      game.ball.bounce(game.fenceStub);
    }

    result = game.ball.checkEdges();
    if (Math.abs(result) > 0) {
      initGame();
      if (result > 0) {
        game.agent1.score += 1;
      } else {
        game.agent2.score += 1;
      }
      return result;
    }

  }

  return result; // 0 means tie, -1 means landed on left side, 1 means landed on right side.
}

function draw() {
  "use strict";
  frame += 1;

  var sunHeight = map(cos(sunspeed * frame), -1, 1, 40, 5);
  var dayLerp = pow(constrain(map(sunHeight, 5, 33, 0, 1), 0, 1), 3);
  var ctx = drawingContext;

  // opaque sky covers every pixel — no clear() needed
  updateSkyGradient(dayLerp);
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, width, height);

  update(1);

  // draw stars
  var maxalpha = constrain(map(sunHeight, 30, 40, 0, 255), 0, 255);
  if (maxalpha > 5) {
    drawStars(maxalpha);
  }

  // Day/night ink, exactly as the original sketch tinted the brahman.ai page:
  // black text over the day sky, white once the stars are out. Published as a
  // CSS variable so the footer's links and credit ride the same cycle.
  textColor = lerp(textColor, sunHeight > 30 ? 255 : 0, 0.1);
  if (inkTarget === undefined) {
    inkTarget = document.querySelector('.ftr--game') || null;
  }
  var ink = Math.round(textColor);
  if (inkTarget && ink !== lastInk) { // settles between transitions — no writes
    lastInk = ink;
    inkTarget.style.setProperty('--volley-ink', 'rgb(' + ink + ',' + ink + ',' + ink + ')');
    // The opposite ink, used as a soft halo so overlaid text survives a rider
    // or the ball passing behind it.
    var inv = 255 - ink;
    inkTarget.style.setProperty('--volley-ink-inv', 'rgba(' + inv + ',' + inv + ',' + inv + ',0.55)');
  }

  // draw sun — sized and placed relative to the canvas, so it stays a sun
  // rather than a wall of orange when the sketch is boxed in the footer.
  var sunR = constrain(width * 0.105, 34, sunRad);
  var sunX = width - width * 0.17;
  var sunY = map(sunHeight, 5, 40, sunR + 10, height + sunR + 10);
  if (sunY < height + sunR) {
    drawSun(sunX, sunY, sunR);
  }

  // draw game
  game.ground.display();
  game.fence.display();
  game.agent1.display();
  game.agent2.display();

  // ball fades in over the serve delay; rebuild its color only when the
  // fade actually moves (it's constant after the first two seconds of a rally)
  var ballAlpha = Math.round(255 * Math.max((initDelayFrames - delayScreen.life) / initDelayFrames, 0));
  if (ballAlpha !== lastBallAlpha) {
    lastBallAlpha = ballAlpha;
    ballColor = color(70, 110, 200, ballAlpha);
  }
  game.ball.c = ballColor;
  game.ball.display();
}

// The sketch fills its container (the footer's right-hand panel), not the
// window, so every size comes from the parent element.
function volleyBox() {
  var el = document.getElementById('p5Container');
  var w = el ? el.clientWidth : windowWidth;
  var h = el ? el.clientHeight : windowHeight;
  return { w: Math.max(1, Math.round(w)), h: Math.max(1, Math.round(h)) };
}

// Called by the loader's (debounced) ResizeObserver — p5's own window-resize
// listener is stripped, and this bails when nothing actually changed (mobile
// URL-bar show/hide fires resizes constantly while scrolling).
function volleyResized() {
  "use strict";
  var box = volleyBox();
  if (box.w === width && box.h === height) return;
  resizeCanvas(box.w, box.h, true); // true: don't force a synchronous redraw
  applyScale(box.w);
  updateStarBox(); // stars are normalized — they stretch, not re-roll
  lastSkyKey = -1; // gradient spans the new height
}

// Explicit globals: p5 looks these up on window, the loader calls
// volleyResized, and minification would otherwise rename them.
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.volleyResized = volleyResized;
