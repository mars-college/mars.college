

/*

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
*/

// game settings:
var trainingVersion = false;
var showArrowKeys = false;
var ref_w = 24*2;
var ref_h = ref_w;
var ref_u = 1.5; // ground height
var ref_wallwidth = 1.0; // wall width
var ref_wallheight = 3.5;
var factor = 1;
var playerSpeedX = 10*1.75;
var playerSpeedY = 10*1.35;
var maxBallSpeed = 15*1.5;
var gravity;
var timeStep = 1/30;
var theFrameRate = 60*1;
var nudge = 0.1;
var friction = 1.0; // 1 means no friction, less means friction
var windDrag = 1.0;
var initDelayFrames = 30*2*1;
var trainingFrames = 30*20; // assume each match is 7 seconds. (vs 30fps)
var theGravity = -9.8*2*1.5;
var trainingMode = false;
var human1 = false; // if this is true, then player 1 is controlled by keyboard
var human2 = false; // same as above
var humanHasControlled = false;
var trainer = null;
var generationCounter = 0;
var baseScoreFontSize = 64;
//var trainingVersion = false; // this variable is stored on html file pro.html

// drawing params
var sunspeed = 0.003;
var numStars = 80;
var sunRad = 150;
var skyMargin = 16;
var ballRadius = 0.4;

var initGeneJSON = '{"fitness":1.3846153846153846,"nTrial":0,"gene":{"0":7.5719,"1":4.4285,"2":2.2716,"3":-0.3598,"4":-7.8189,"5":-2.5422,"6":-3.2034,"7":0.3935,"8":-6.7593,"9":-8.0551,"10":1.3679,"11":2.1859,"12":1.2202,"13":-0.49,"14":-0.0316,"15":0.5221,"16":0.7026,"17":0.4179,"18":-2.1689,"19":1.646,"20":-13.3639,"21":1.5151,"22":1.1175,"23":-5.3561,"24":5.0442,"25":0.8451,"26":0.3987,"27":-2.6158,"28":0.4318,"29":-0.7361,"30":0.5715,"31":-2.9501,"32":-3.7811,"33":-5.8994,"34":6.4167,"35":2.5014,"36":7.338,"37":-2.9887,"38":2.4586,"39":13.4191,"40":2.7395,"41":-3.9708,"42":1.6548,"43":-2.7554,"44":-1.5345,"45":-6.4708,"46":-4.4454,"47":-0.6224,"48":-1.0988,"49":4.4501,"50":9.2426,"51":-0.7392,"52":0.4452,"53":1.8828,"54":-2.6277,"55":-10.851,"56":-3.2353,"57":-4.4653,"58":-3.1153,"59":-1.3707,"60":7.318,"61":16.0902,"62":1.4686,"63":7.0391,"64":1.7765,"65":-4.9573,"66":-1.0578,"67":1.3668,"68":-1.4029,"69":-1.155,"70":2.6697,"71":-8.8877,"72":1.1958,"73":-3.2839,"74":-5.4425,"75":1.6809,"76":7.6812,"77":-2.4732,"78":1.738,"79":0.3781,"80":0.8718,"81":2.5886,"82":1.6911,"83":1.2953,"84":-5.5961,"85":2.174,"86":-3.5098,"87":-5.4715,"88":-9.0052,"89":-4.6038,"90":-6.7447,"91":-2.5528,"92":0.4391,"93":-4.9278,"94":-3.6695,"95":-4.8673,"96":-1.6035,"97":1.5011,"98":-5.6124,"99":4.9747,"100":1.8998,"101":3.0359,"102":6.2983,"103":-2.703,"104":1.5025,"105":6.1841,"106":-0.9357,"107":-4.8568,"108":-2.1888,"109":-4.1143,"110":-3.9874,"111":-0.0459,"112":4.7134,"113":2.8952,"114":-9.3627,"115":-4.685,"116":0.3601,"117":-1.3699,"118":9.7294,"119":11.5596,"120":0.1918,"121":3.0783,"122":-6.6828,"123":-5.4398,"124":-5.088,"125":3.6948,"126":0.0329,"127":-0.1362,"128":-0.1188,"129":-0.7579,"130":0.3278,"131":-0.977,"132":-0.9377,"133":2.2935,"134":-2.0353,"135":-1.7786,"136":5.4567,"137":-3.6368,"138":3.4996,"139":-0.0685}}';

var initGeneRaw = JSON.parse(initGeneJSON);

var initGene = convnetjs.zeros(Object.keys(initGeneRaw.gene).length); // Float64 faster.
for (var i = 0; i < initGene.length; i++) {
  initGene[i] = initGeneRaw.gene[i];
}

//initGene = null;

// html elements
var myCanvas;
var canvasWidth, canvasHeight;
var sizeScaleFactor = 1;

var textColor = 0;
var frame = 0;
var starPos = [];
var colorTop1, colorTop2, colorBottom1, colorBottom2;

var handSymbolDisplayed = true;

/*
var intro = {
  text: null,
};
*/

// declare objects
var game = {
  ball: null,
  deadball: null,
  ground: null,
  fence: null,
  fenceStub: null,
  agent1: null,
  agent2: null
};

// deal with mobile device nuances
var mobileMode = false;
var md = null;

// conversion to pixels
function toX(x) {
  return (x+ref_w/2)*factor;
}
function toP(x) {
  return (x)*factor * sizeScaleFactor;
}
function toY(y) {
  return height-y*factor;
}

var delayScreen = {
  life: initDelayFrames,
  init: function(life) {
    this.life = life;
  },
  status: function() {
    if (this.life === 0) {
      return true;
    }
    this.life -= 1;
    return false;
  }
};

// objects
function Particle(loc, v, r, c) { // location p5.Vector, velocity p5.Vector, r float, color
  "use strict";
  this.loc = loc || createVector(random(-ref_w*1/4, ref_w*1/4), random(ref_w/4, ref_w*3/4));
  //console.log(this.loc);
  this.prevLoc = this.loc.copy();
  this.v = v || createVector(random(-20, 20), random(10, 25));
  this.r = r || random(0.5, 1.5);
  this.c = c || getRandomColor(128);
  this.ang = 0;
  this.angAcc = 0.0;
}
Particle.prototype.move = function() {
  this.prevLoc = this.loc.copy();
  this.loc.add(p5.Vector.mult(this.v, timeStep));
  this.v.mult(1-(1-windDrag)*timeStep);
};
Particle.prototype.applyAcceleration = function(acceleration) {
  this.v.add(p5.Vector.mult(acceleration, timeStep));
};
Particle.prototype.checkEdges = function() {
  if (this.loc.x<=this.r-ref_w/2) {
    this.v.x *= -friction;
    this.loc.x = this.r-ref_w/2+nudge*timeStep;
  }
  if (this.loc.x >= (ref_w/2-this.r)) {
    this.v.x *= -friction;
    this.loc.x = ref_w/2-this.r-nudge*timeStep;
  }
  if (this.loc.y<=this.r+ref_u) {
    this.v.y *= -friction;
    this.loc.y = this.r+ref_u+nudge*timeStep;
    if (this.loc.x <= 0) {
      return -1;
    } else {
      return 1;
    }
  }
  if (this.loc.y >= (ref_h-this.r)) {
    this.v.y *= -friction;
    this.loc.y = ref_h-this.r-nudge*timeStep;
  }
  // fence:
  if ((this.loc.x <= (ref_wallwidth/2+this.r)) && (this.prevLoc.x > (ref_wallwidth/2+this.r)) && (this.loc.y <= ref_wallheight)) {
    this.v.x *= -friction;
    this.loc.x = ref_wallwidth/2+this.r+nudge*timeStep;
  }
  if ((this.loc.x >= (-ref_wallwidth/2-this.r)) && (this.prevLoc.x < (-ref_wallwidth/2-this.r)) && (this.loc.y <= ref_wallheight)) {
    this.v.x *= -friction;
    this.loc.x = -ref_wallwidth/2-this.r-nudge*timeStep;
  }
  return 0;
};
Particle.prototype.getDist2 = function(p) { // returns distance squared from p
  var dy = p.loc.y - this.loc.y;
  var dx = p.loc.x - this.loc.x;
  return (dx*dx+dy*dy);
};
Particle.prototype.isColliding = function(p) { // returns true if it is colliding w/ p
  var r = this.r + p.r;
  return (r*r > this.getDist2(p)); // if distance is less than total radius, then colliding.
};
Particle.prototype.bounce = function(p) { // bounce two balls that have collided (this and that)
  var ab = createVector();
  //debugger;
  ab.set(this.loc);
  ab.sub(p.loc);
  ab.normalize();
  ab.mult(nudge);

  this.angAcc += 0.5*ab.x;

  
  while(this.isColliding(p)) {
    this.loc.add(ab);
  }
  

  var n = p5.Vector.sub(this.loc, p.loc);
  n.normalize();
  var u = p5.Vector.sub(this.v, p.v);
  var un = p5.Vector.mult(n, u.dot(n)*2); // added factor of 2
  u.sub(un);
  //u.mult(0.5);
  this.v = p5.Vector.add(u, p.v);

  //p.v = p5.Vector.add(un, p.v); // don't move the agent.
};
Particle.prototype.limitSpeed = function(minSpeed, maxSpeed) {
  var mag2 = this.v.magSq();
  if (mag2 > (maxSpeed*maxSpeed) ) {
    this.v.normalize();
    this.v.mult(maxSpeed);
  }
  if (mag2 < (minSpeed*minSpeed) ) {
    this.v.normalize();
    this.v.mult(minSpeed);
  }
  return;
};

let ballHeight = 0;

Particle.prototype.display = function() {
  "use strict";
  noStroke();
  stroke(0,50);
  fill(this.c);
  //noFill();
  //ellipse(toX(this.loc.x), toY(this.loc.y)-ballHeight, toP(this.r)*2, toP(this.r)*2);
  ellipse(toX(this.loc.x), toY(this.loc.y)-toP(4.8), toP(this.r*2)*2, toP(this.r*2)*2);
  push();
  translate(toX(this.loc.x), toY(this.loc.y)-toP(4.8));
  rotate(this.ang);
  this.ang += this.angAcc;
  tint(255, 220);
  //image(abe, -toP(this.r*2), -toP(this.r*2), toP(this.r*2)*2, toP(this.r*2)*2);
  image(volleyball, -toP(this.r*2), -toP(this.r*2), toP(this.r*2)*2, toP(this.r*2)*2);
  pop();
};

// design agent's brain using neural network
function Brain() {
  "use strict";
  this.nGameInput = 12; // 8 states for agent, plus 4 state for opponent
  this.nGameOutput = 3; // 3 buttons (forward, backward, jump)
  this.nRecurrentState = 4; // extra recurrent states for feedback.
  this.nOutput = this.nGameOutput+this.nRecurrentState;
  this.nInput = this.nGameInput+this.nOutput;

  // store current inputs and outputs
  this.inputState = convnetjs.zeros(this.nInput);
  this.convInputState = new convnetjs.Vol(1, 1, this.nInput); // compatible with convnetjs lib input.
  this.outputState = convnetjs.zeros(this.nOutput);
  this.prevOutputState = convnetjs.zeros(this.nOutput);

  // setup neural network:
  this.layer_defs = [];
  this.layer_defs.push({
    type: 'input',
    out_sx: 1,
    out_sy: 1,
    out_depth: this.nInput
  });
  this.layer_defs.push({
    type: 'fc',
    num_neurons: this.nOutput,
    activation: 'tanh'
  });

  this.net = new convnetjs.Net();
  this.net.makeLayers(this.layer_defs);

  var chromosome = new convnetjs.Chromosome(initGene);

  chromosome.pushToNetwork(this.net);

  //convnetjs.randomizeNetwork(this.net); // set init settings to be random.
}
Brain.prototype.populate = function (chromosome) { // populate network with a given chromosome.
  chromosome.pushToNetwork(this.net);
};
Brain.prototype.arrayToString = function(x, precision) {
  "use strict";
  var result = "[";
  for (var i = 0; i < x.length; i++) {
    result += Math.round(precision*x[i])/precision;
    if (i < x.length-1) {
      result += ",";
    }
  }
  result += "]";
  return result;
};
Brain.prototype.getInputStateString = function() {
  "use strict";
  return this.arrayToString(this.inputState, 100);
};
Brain.prototype.getOutputStateString = function() {
  "use strict";
  return this.arrayToString(this.outputState, 100);
};
// get current input for nn
Brain.prototype.setCurrentInputState = function (agent, opponent) {
  "use strict";
  var i;
  var scaleFactor = 10; // scale inputs to be in the order of magnitude of 10.
  var scaleFeedback = 1; // to scale back up the feedback.
  this.inputState[0] = agent.state.x/scaleFactor;
  this.inputState[1] = agent.state.y/scaleFactor;
  this.inputState[2] = agent.state.vx/scaleFactor;
  this.inputState[3] = agent.state.vy/scaleFactor;
  this.inputState[4] = agent.state.bx/scaleFactor;
  this.inputState[5] = agent.state.by/scaleFactor;
  this.inputState[6] = agent.state.bvx/scaleFactor;
  this.inputState[7] = agent.state.bvy/scaleFactor;
  this.inputState[8] = 0*opponent.state.x/scaleFactor;
  this.inputState[9] = 0*opponent.state.y/scaleFactor;
  this.inputState[10] = 0*opponent.state.vx/scaleFactor;
  this.inputState[11] = 0*opponent.state.vy/scaleFactor;
  for (i = 0; i < this.nOutput; i++) { // feeds back output to input
    this.inputState[i+this.nGameInput] = this.outputState[i]*scaleFeedback*1;
  }

  for (i = 0; i < this.nInput; i++) { // copies input state into convnet cube object format to be used later.
    this.convInputState.w[i] = this.inputState[i];
  }

};
Brain.prototype.forward = function () {
  "use strict";
  // get output from neural network:
  var a = this.net.forward(this.convInputState);
  for (var i = 0; i < this.nOutput; i++) {
    this.prevOutputState[i] = this.outputState[i]; // backs up previous value.
    this.outputState[i] = a.w[i];
  }
};

function matchFunction(chromosome1, chromosome2) { // this function is passed to trainer.
  var result = 0;
  var oldInitDelayFrames = initDelayFrames;
  initDelayFrames = 1;
  trainingMode = true;
  initGame();
  // put chromosomes into brains before getting them to duel it out.
  game.agent1.brain.populate(chromosome1);
  game.agent2.brain.populate(chromosome2);
  result = update(trainingFrames); // the dual
  trainingMode = false;
  initDelayFrames = oldInitDelayFrames;
  return result; // -1 means chromosome1 beat chromosome2, 1 means vice versa, 0 means tie.
}

function Trainer(brain, initialGene) {
  // trainer for neural network interface.  must pass in an initial brain so it knows the net topology.
  // the constructor won't modify the brain object passed in.

  this.net = new convnetjs.Net();
  this.net.makeLayers(brain.layer_defs);

  this.trainer = new convnetjs.GATrainer(this.net, {
      population_size: 100*1,
      mutation_size: 0.3,
      mutation_rate: 0.05,
      num_match: 4*2,
      elite_percentage: 0.20
    }, initialGene);

}
Trainer.prototype.train = function() {
  this.trainer.matchTrain(matchFunction);
};
Trainer.prototype.getChromosome = function(n) {
  // returns a copy of the nth best chromosome (if not provided, returns first one, which is the best one)
  n = n || 0;
  return this.trainer.chromosomes[n].clone();
};

function Agent(dir, loc, c, id) {
  "use strict";
  this.id = id;
  this.dir = dir; // -1 means left, 1 means right player for symmetry.
  this.img = this.dir == -1 ? girl : boy;
  this.facing = 1;
  this.loc = loc || createVector(ref_w/4, 1.5);
  this.v = createVector(0, 0);
  this.desiredVelocity = createVector(0, 0);
  this.r = 1.5;
  this.c = c;
  this.opponent = null;
  this.score = 0;
  this.emotion = "happy"; // hehe...
  this.scoreSize = baseScoreFontSize; // font size for score.
  this.action = { // the current set of actions the agent wants to take
    forward : false, // this set of actions can be set either by neural net, or keyboard
    backward : false,
    jump : false
  };
  this.actionIntensity = [0, 0, 0];
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
Agent.prototype.setOpponent = function(opponent) { // sets the opponent into this agent
  "use strict";
  this.opponent = opponent;
};
Agent.prototype.setAction = function(forward, backward, jump) {
  "use strict";
  this.action.forward = forward;
  this.action.backward = backward;
  this.action.jump = jump;
};
Agent.prototype.setBrainAction = function() {
  "use strict"; // this function converts the brain's output layer into actions to move forward, backward, or jump
  var forward = this.brain.outputState[0] > 0.75; // sigmoid decision.
  var backward = this.brain.outputState[1] > 0.75; // sigmoid decision.
  var jump = this.brain.outputState[2] > 0.75; // sigmoid decision.
  this.setAction(forward, backward, jump);
};
Agent.prototype.processAction = function() { // convert action into real movement
  "use strict";
  var forward = this.action.forward;
  var backward = this.action.backward;
  var jump = this.action.jump;
  this.desiredVelocity.x = 0;
  this.desiredVelocity.y = 0;

  if (forward && !backward) {
    this.desiredVelocity.x = -playerSpeedX;
  }
  if (backward && !forward) {
    this.desiredVelocity.x = playerSpeedX;
  }

  if (jump) {
    this.desiredVelocity.y = playerSpeedY;
  }
};
Agent.prototype.move = function() {
  "use strict";
  this.loc.add(p5.Vector.mult(this.v, timeStep));
};
Agent.prototype.getState = function() { // returns game state for this agent
  "use strict";
  this.state = { // complete game state for this agent.  used by neural network.
    x: this.loc.x*this.dir, // normalized to side, appears different for each agent's perspective
    y: this.loc.y,
    vx: this.v.x*this.dir,
    vy: this.v.y,
    bx: game.ball.loc.x*this.dir,
    by: game.ball.loc.y,
    bvx: game.ball.v.x*this.dir,
    bvy: game.ball.v.y
  };
  return this.state;
};
Agent.prototype.printState = function() {
  // prints the state of the agent on the side of the screen the agent is on
  // uses p5.js text functions
  "use strict";
  // print fps
  var r = 10;
  var stateText = '';
  var state = this.getState();
  stateText += 'X: '+Math.round(state.x*r)/r+'\n';
  stateText += 'Y: '+Math.round(state.y*r)/r+'\n';
  stateText += 'vx: '+Math.round(state.vx*r)/r+'\n';
  stateText += 'vy: '+Math.round(state.vy*r)/r+'\n';
  stateText += 'bx: '+Math.round(state.bx*r)/r+'\n';
  stateText += 'by: '+Math.round(state.by*r)/r+'\n';
  stateText += 'bvx: '+Math.round(state.bvx*r)/r+'\n';
  stateText += 'bvy: '+Math.round(state.bvy*r)/r+'\n';
  fill(this.c);
  stroke(this.c);
  textFont("Courier New");
  textSize(16);
  text(stateText, toX(this.dir*ref_w/4), toP(ref_u));
};
Agent.prototype.drawState = function(human) { // illustrates inputState and output actions on p5 canvas
  "use strict";
  var brain = this.brain;
  var r = red(this.c);
  var g = green(this.c);
  var b = blue(this.c);
  var i, j = 0;
  var temp;
  var radius = ref_w/2/((brain.nGameInput-4)+4);
  var factor = 3/4;
  var startX = ref_w/4 - radius*((brain.nGameInput-4)/2);
  var ballFactor = 1.0;
  var startX2 = ref_w/4 - ballFactor*radius*(brain.nGameOutput/2);
  var secondLayerY = Math.max(height*1/8+toP(radius)+0.5*toP(radius), height*3/16);

  this.actionIntensity[0] += (this.action.forward ? 16 : 0);
  this.actionIntensity[1] += (this.action.jump ? 16 : 0);
  this.actionIntensity[2] += (this.action.backward ? 16 : 0);

  if (!human) {
    for (i = 0; i < (brain.nGameInput-4); i++) {

      noStroke();
      fill(r, g, b, brain.inputState[i]*32+8);
      ellipse(toX((startX+i*radius)*this.dir), height*1/8+toP(radius), toP(radius*factor), toP(radius*factor));

      for (j = 0; j < brain.nGameOutput; j++) {

        if (this.actionIntensity[j] > 64) {
          stroke(r, g, b, brain.inputState[i]*32);
          line(toX((startX+i*radius)*this.dir), height*1/8+toP(radius), toX((startX2+ballFactor*j*radius)*this.dir), secondLayerY+(ballFactor+0)*toP(radius));
        }
      }

    }
  }

  for (j = 0; j < brain.nGameOutput; j++) {

      this.actionIntensity[j] -= 4;
      this.actionIntensity[j] = Math.min(this.actionIntensity[j], 128);
      this.actionIntensity[j] = Math.max(this.actionIntensity[j], 16);

      noStroke();
      fill(r, g, b, (this.actionIntensity[j]));
      ellipse(toX((startX2+ballFactor*j*radius)*this.dir), secondLayerY+(ballFactor+0)*toP(radius), toP(radius*factor)*ballFactor, toP(radius*factor)*ballFactor);

  }


};
Agent.prototype.update = function() {
  "use strict";
  this.v.add(p5.Vector.mult(gravity, timeStep));
  if (this.loc.y <= ref_u + nudge*timeStep) {
    this.v.y = this.desiredVelocity.y;
  }
  this.v.x = this.desiredVelocity.x*this.dir;
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
  if (this.loc.x*this.dir <= (ref_wallwidth/2+this.r) ) {
    this.v.x = 0;
    this.loc.x = this.dir*(ref_wallwidth/2+this.r);
  }
  if (this.loc.x*this.dir >= (ref_w/2-this.r) ) {
    this.v.x = 0;
    this.loc.x = this.dir*(ref_w/2-this.r);
  }
};
Agent.prototype.display = function() {
  "use strict";
  var x = this.loc.x;
  var y = this.loc.y;
  var r = this.r;
  var angle = 60;
  var eyeX = 0;
  var eyeY = 0;

  if (this.dir === 1) angle = 135;
  noStroke();
  fill(this.c);
  //ellipse(toX(x), toY(y), toP(r)*2, toP(r)*2);
  
  
  //arc(toX(x), toY(y), toP(r)*2, toP(r)*2, Math.PI, 2*Math.PI);

    push();
    if (this.facing == -1) {
      //translate(toX(x) + 60, toY(y)-ballHeight-toP(r));
      translate(toX(x) + toP(2.8)/2, toY(y) - toP(6));
      scale(-1.0, 1.0);
    } else {
      //translate(toX(x) - 60, toY(y)-ballHeight-toP(r));
      translate(toX(x) - toP(2.8)/2, toY(y)- toP(6));
      scale(1.0, 1.0);
    }
    //image(this.img, 0, 0, 120, 300);
    image(this.img, 0, 0, toP(2.8), toP(7.7));
    pop();
    
    
    //text(this.v.x, toX(x)-50, toY(y)-ballHeight-toP(r) - 200);
    //image(girl, toX(x)-50, toY(y)-ballHeight-toP(r), 120, 300);
    
  

  /*
  fill(255);
  rect(toX(x-r), toY(y), 2*r*factor, r*factor);
  */

  // track ball with eyes (replace with observed info later):
  var ballX = game.ball.loc.x-(x+(0.6)*r*fastCos(angle));
  var ballY = game.ball.loc.y-(y+(0.6)*r*fastSin(angle));
  if (this.emotion === "sad") {
    ballX = -this.dir;
    ballY = -3;
  }
  var dist = Math.sqrt(ballX*ballX+ballY*ballY);
  eyeX = ballX/dist;
  eyeY = ballY/dist;

  fill(255);
  //ellipse(toX(x+(0.6)*r*fastCos(angle)), toY(y+(0.6)*r*fastSin(angle)), toP(r)*0.6, toP(r)*0.6);
  fill(0);
  //ellipse(toX(x+(0.6)*r*fastCos(angle)+eyeX*0.15*r), toY(y+(0.6)*r*fastSin(angle)+eyeY*0.15*r), toP(r)*0.2, toP(r)*0.2);

};
Agent.prototype.drawScore = function() {
  "use strict";
  var r = red(this.c);
  var g = green(this.c);
  var b = blue(this.c);
  var size = this.scoreSize;
  var factor = 0.95;
  this.scoreSize = baseScoreFontSize + (this.scoreSize-baseScoreFontSize) * factor;

  if (this.score > 0) {
    textFont("Courier New");
    textSize(size);
    //stroke(255);
    stroke(r, g, b, 128*(baseScoreFontSize/this.scoreSize));
    fill(r, g, b, 64*(baseScoreFontSize/this.scoreSize));
    textAlign(this.dir === -1? LEFT:RIGHT);
    text(this.score, this.dir === -1? size*3/4 : width-size/4, size/2+height/3);
  }

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

Wall.prototype.display = function() {
  "use strict";
  if (this.isCactus) {
    var ww = toP(this.h) * (cactus.width / cactus.height);
    image(cactus, toX(this.x-this.w/2), toY(sizeScaleFactor*(this.y+this.h/2)), ww, toP(this.h*1.05+0.45));
  } else {
    noStroke();
    fill(255);
    rect(toX(this.x-this.w/2), toY(this.y+this.h/2), toP(this.w), toP(this.h));
    fill(this.c);
    rect(toX(this.x-this.w/2), toY(this.y+this.h/2), toP(this.w), toP(this.h));
  }
};

function initGame() {
  game.ball = new Particle(createVector(0, ref_w/4));
  game.ball.r = ballRadius;
  game.ball.ang = 0;

  game.agent1 = game.agent1 || new Agent(-1, createVector(-ref_w, 20), color(240, 75, 0, 255));
  game.agent2 = game.agent2 || new Agent(1, createVector(ref_w, 20), color(0, 150, 255, 255));

  game.agent1.setOpponent(game.agent2); // point agent to the other agent as an opponent.
  game.agent2.setOpponent(game.agent1);

  human1 = false;
  human2 = false;

  delayScreen.init(initDelayFrames);
}

let girl, boy, abe, cactus, volleyball, rr;

function preload() {
  girl = loadImage('/images/volleyball/unicycle_girl.png');
  boy = loadImage('/images/volleyball/unicycle_boy.png');
  //abe = loadImage('/images/abraham_small.png');
  volleyball = loadImage('/images/volleyball/volleyball.png');
  cactus = loadImage('/images/volleyball/cactus.png');
  //rr = loadImage('/images/volleyball/roadrunner_transparent.png');
}

function setup() {
  "use strict";

  colorTop1 = color(170, 170, 245);
  colorBottom1 = color(235, 235, 255);

  colorTop2 = color(30, 30, 150);
  colorBottom2 = color(45, 45, 165);

  // deal with mobile device nuances
  // md = new MobileDetect(window.navigator.userAgent);
  /*
  if (md.mobile()) {
      mobileMode = true;
      console.log('mobile: '+md.mobile());
  } else {
      theFrameRate /= 2;
      console.log('not mobile');
  }
  */  

  calculateCanvasSize();
  myCanvas = createCanvas(canvasWidth,canvasHeight);
  factor = canvasWidth / ref_w;
  ref_h = ref_w;
  myCanvas.parent('volleyball_demo');
  frameRate(theFrameRate);

  if (!mobileMode) {
  }

  // create html elements
  //http://otoro.net/slimevolley/

  //intro.text = createA("http://blog.otoro.net/2015/03/28/neural-slime-volleyball/", "neural slime volleyball", "_blank");
  //intro.text.position(32+width/32, height/32);

  gravity = createVector(0, theGravity);

  // setup game objects
  game.ground = new Wall(0, 0.75, ref_w, ref_u);

  var ww = (ref_wallheight-1.5+4.5) * (cactus.width / cactus.height);

  game.fence = new Wall(0, 0.75 + ref_wallheight, ww, (ref_wallheight-1.5+4.5));
  game.fence.isCactus = true;
  game.fence.c = color(70, 200, 100, 255);
  game.ground.c = color(240, 210, 130, 255);
  game.fenceStub = new Particle(createVector(0, ref_wallheight), createVector(0, 0), ref_wallwidth/2, color(240, 210, 130, 255));

  initGame();

  trainer = new Trainer(game.agent1.brain, initGene);
  game.agent1.brain.populate(trainer.getChromosome()); // best one
  game.agent2.brain.populate(trainer.getChromosome()); // best one

  calcStarPos(width, height);
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

    // get human keyboard control
    if (!trainingMode) {
      if (!trainingVersion) {
        //keyboardControl(); // may want to disable this for speed.
        //touchControl(); // mobile device
      }
      //betweenGameControl();
    }

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
      // make graphics for dead ball
      if (!trainingMode) {
        game.deadball = new Particle(game.ball.loc.copy());
        game.deadball.r = 0.5;
        game.deadball.life = initDelayFrames;
      }
      initGame();
      if (!trainingMode) {
      //  console.log('player '+(result > 0? '1' : '2')+' won.');
        if (result > 0) {
          game.agent1.score += 1;
          game.agent1.scoreSize *= 4;
          game.agent1.emotion = "happy";
          game.agent2.emotion = "sad";
        } else {
          game.agent2.score += 1;
          game.agent2.scoreSize *= 4;
          game.agent2.emotion = "happy";
          game.agent1.emotion = "sad";
        }
      }
      return result;
    }

  }

  return result; // 0 means tie, -1 means landed on left side, 1 means landed on right side.
}

function drawScenery() {
  // draws the scenery
  var n = getNextNoise();
  for (var i = 0; i < 24; i++) {
    noStroke();
    fill(50, 100, 240, (24+12*n)*(24-i)/24);
    rect(0, i*height/(24), width, height/(24));
  }
  fill(255, 230, 10, 96-16*n);
  noStroke();
  ellipse(toX(-0.75*ref_w/4), (1+0.125*n)*height/2, (2.0-0.125*n)*factor*2, (2.0-0.125*n)*factor*2);
  fill(50, 255, 50, 24+8*n);
  ellipse(toX(ref_w/8), toY(-1.5), (24-2*n)*factor*1, (24-2*n)*factor*1);
  /*
  fill(50, 255, 50, 16);
  ellipse(toX(-ref_w/8), toY(-1.5), (16-1*n)*factor*1, (16-1*n)*factor*1);
  */
  fill(50, 255, 50, 32-12*n);
  ellipse(toX(ref_w/3), toY(-1.5), (16+2*n)*factor*1, (16+2*n)*factor*1);
}

function keyboardControl() {
  // player 1:
  var a1_forward = 68; // 'd' key
  var a1_backward = 65; // 'a' key
  var a1_jump = 87; // 'w' key
  // player 2:
  var a2_forward = LEFT_ARROW;
  var a2_backward = RIGHT_ARROW;
  var a2_jump = UP_ARROW;

  if (keyIsDown(a1_forward) || keyIsDown(a1_backward) || keyIsDown(a1_jump)) {
    human1 = true;
    humanHasControlled = true;
  }
  if (human1) {
    game.agent1.setAction(keyIsDown(a1_forward), keyIsDown(a1_backward), keyIsDown(a1_jump));
  }

  if (keyIsDown(a2_forward) || keyIsDown(a2_backward) || keyIsDown(a2_jump)) {
    human2 = true;
    humanHasControlled = true;
  }
  if (human2) {
    game.agent2.setAction(keyIsDown(a2_forward), keyIsDown(a2_backward), keyIsDown(a2_jump));
  }
}

function touchControl() {
  "use strict";
  var paddingY = height/64;
  var paddingX = width/64;
  var dx = 0;
  var dy = 0;
  var x = 0;
  var y = 0;
  var agentX = toX(game.agent2.loc.x);
  var agentY = toY(game.agent2.loc.y);
  var jumpY = toY(ref_wallheight*2);
  var gestureEvent = false;

  if (touchIsDown) {
    x = touchX;
    y = touchY;
    dx = touchX-ptouchX;
    dy = touchY-ptouchY;
    gestureEvent = true;
  }

  if (mouseIsPressed) {
    x = mouseX;
    y = mouseY;
    dx = mouseX-pmouseX;
    dy = mouseY-pmouseY;
    gestureEvent = true;
  }

  if (gestureEvent) {
    human2 = true;
    humanHasControlled = true;
    game.agent2.setAction((x - agentX) < -paddingX, (x - agentX) > paddingX, dy < -paddingY);
  }

}

// between end of this match to the next match.  guy wins jumps, guy who loses regrets...
function betweenGameControl() {
  "use strict";
  var agent = [game.agent1, game.agent2];
  if (delayScreen.life > 0) {
    for (var i = 0; i < 2; i++) {
      if (agent[i].emotion === "happy") {
        agent[i].action.jump = true;
      } else {
        agent[i].action.jump = false;
      }
    }
  } else {
    agent[0].emotion = "happy";
    agent[1].emotion = "happy";
  }
}

function getNNDebugString() {
  "use strict";
  var result = "";
  result += "agent1:\n";
  result += "input1: "+JSON.stringify(game.agent1.brain.getInputStateString())+"\n";
  result += "output1: "+JSON.stringify(game.agent1.brain.getOutputStateString())+"\n";
  result += "agent2:\n";
  result += "input2: "+JSON.stringify(game.agent2.brain.getInputStateString())+"\n";
  result += "output2: "+JSON.stringify(game.agent2.brain.getOutputStateString())+"\n";
  return result;
}

function arrayToString(x, precision) {
  "use strict";
  precision = precision || 1000;
  var result = "[";
  for (var i = 0; i < x.length; i++) {
    result += Math.round(precision*x[i])/precision;
    if (i < x.length-1) {
      result += ",";
    }
  }
  result += "]";
  return result;
}

// cool p5.js functions to draw p-noise bouncy keyboard control graphics.
var pNoiseSeed = 0;
var pNoiseSeed2 = 0;

function getNextNoise() {
  var pFactor = 1000;
  var f = 5;
  pNoiseSeed2 = pNoiseSeed2 || 0;
  pNoiseSeed2 += 1;
  return (noise(pNoiseSeed2 / pFactor)-0.5)*f;
}

function drawArrowKeyboard(x, y, s1, c, intensity, theColor) {
  "use strict";

  var rc = red(theColor);
  var gc = green(theColor);
  var bc = blue(theColor);

  function nextNoise() {
    var pFactor = 10;
    var f = 5;
    pNoiseSeed = pNoiseSeed || 0;
    pNoiseSeed += 1;
    return (noise(pNoiseSeed / pFactor)-0.5)*f;
  }

  function drawArrowKey(x, y, s, r) {


    var f = 5;
    //console.log(nextNoise());
    stroke(rc, gc, bc, intensity);
    noFill();
    beginShape();
    var x1offset = nextNoise();
    var y1offset = nextNoise();
    var x2offset = nextNoise();
    var y2offset = nextNoise();
    var x3offset = nextNoise();
    var y3offset = nextNoise();
    curveVertex(x-s+x1offset, y+s-r+y1offset);
    curveVertex(x-s+x2offset, y-s+r+y2offset);
    curveVertex(x-s+r+x3offset, y-s+y3offset);
    curveVertex(x+s-r+nextNoise(), y-s+nextNoise());
    curveVertex(x+s+nextNoise(), y-s+r+nextNoise());
    curveVertex(x+s+nextNoise(), y+s-r+nextNoise());
    curveVertex(x+s-r+nextNoise(), y+s+nextNoise());
    curveVertex(x-s+r+nextNoise(), y+s+nextNoise());
    curveVertex(x-s+x1offset, y+s-r+y1offset);
    curveVertex(x-s+x2offset, y-s+r+y2offset);
    curveVertex(x-s+r+x3offset, y-s+y3offset);
    endShape();
    noStroke();
  }

  var s2 = s1 * 0.8;
  var r1 = s1 * 0.2;
  var r2 = s2 * 0.2;
  var fontSize = 32;

  function drawFullKey(x, y, c) {
    drawArrowKey(x, y, s1/2, r1);
    drawArrowKey(x, y, s2/2, r2);

    stroke(rc, gc, bc, intensity);
    fill(rc, gc, bc, intensity);

    text(c, x+nextNoise()/1-fontSize/2, y+nextNoise()/1+fontSize/4);
  }

  textFont("monospace");
  textSize(fontSize);
  drawFullKey(x-s1, y, c[0]);
  drawFullKey(x, y-s1, c[1]);
  drawFullKey(x+s1, y, c[2]);

}

// n = 1, first agent, n = 2, second agent.
function drawAgentKeyboard(x, y, s, n, intensity, theColor) {
  var c = ['ａ', 'ｗ', 'ｄ'];
  if (n == 2) c = ['◀', '▲', '▶'];
  drawArrowKeyboard(x, y, s, c, intensity, theColor);
}

function calcStarPos(maxw, maxh) {
  starPos = [];
  for (var s=0; s<numStars; s++) {
    starPos.push([maxw * Math.random(), maxh * Math.random()]);
  }
}

function drawStars(maxalpha) {
  fill(255, maxalpha);
  noStroke();
  for (var s=0; s<numStars; s++) {
    ellipse(starPos[s][0], starPos[s][1], 3, 3);
  }
}

function setGradient(x, y, w, h, c1, c2, margin) {
  push();
  noStroke();
  for (let i = y; i <= y + h; i+=margin) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    fill(c, 150);
    rect(x, i, x + w, margin);
  }
  pop();
}


function draw() {
  "use strict";
  var result = 0;
  frame += 1;

  var sunHeight = map(cos(sunspeed*frame), -1, 1, 40, 5);
  
  var dayLerp = pow(constrain(map(sunHeight, 5, 33, 0, 1), 0, 1), 3);
  var colorTop = lerpColor(colorTop1, colorTop2, dayLerp);
  var colorBottom = lerpColor(colorBottom1, colorBottom2, dayLerp);

  clear(255,0);
  setGradient(0, 0, width, height, colorTop, colorBottom, skyMargin);
  
  result = update(1);

  if (result !== 0 && trainingVersion) { // someone has lost
    var genStep = 50;
    console.log('training generation #'+(generationCounter+genStep));
    for (var i = 0; i < genStep; i++) {
      trainer.train();
    }
    // print results
    for (i = 0; i < 4; i++) {
      console.log('#'+i+':'+Math.round(100*trainer.getChromosome(i).fitness)/100);
    }
    var N = trainer.trainer.population_size;
    for (i = N-4; i < N; i++) {
      console.log('#'+i+':'+Math.round(100*trainer.getChromosome(i).fitness)/100);
    }
    if (trainingVersion) {
      $("#nn_gene").text(JSON.stringify(trainer.getChromosome()));
      console.log('--- start trained gene ---');
      console.log(JSON.stringify(trainer.getChromosome()));
      console.log('--- end of trained gene---');
    }
    generationCounter += genStep;
    initGame();
    game.agent1.brain.populate(trainer.getChromosome(0)); // best one
    game.agent2.brain.populate(trainer.getChromosome(1)); // second best one
  }

  // draw the game objects
  //drawScenery();

  // draw stars
  var maxalpha = constrain(map(sunHeight, 30, 40, 0, 255), 0, 255);
  if (maxalpha > 5) {
    drawStars(maxalpha);
  }

  // update text color
  /*
  var dp = document.getElementById("description").querySelectorAll("p");
  var da = document.getElementById("description").querySelectorAll("a");
  var na = document.getElementById("navbar").querySelectorAll("a");
  textColor = lerp(textColor, sunHeight > 30 ? 255 : 0, 0.1);
  for (var i=0; i<dp.length; i++) {
    dp[i].style.color = color(textColor);
  }
  for (var i=0; i<da.length; i++) {
    da[i].style.color = color(textColor);
    da[i].style.borderBottomColor = color(textColor);
  }
  for (var i=0; i<na.length; i++) {
    na[i].style.color = color(textColor);
    na[i].style.borderBottomColor = color(textColor);
  }
  */

  // draw sun
  var sunY = map(sunHeight, 5, 40, sunRad+10, height+sunRad+10);
  if (sunY < height+sunRad) {
    push();
    noStroke();
    for (var i=0; i<5; i++) {
      fill(255, 177, 43, 50 + 13*i);
      ellipse(int(0.75*width), sunY, sunRad-i*5, sunRad-i*5);
    }
    pop();
  }

  // draw game
  game.ground.display();


  // road runneer
  
  //image(rr, -200+(6*frameCount)%(width+8*width), yy, toP(5.6), toP(5.5));

  game.fence.display();

  game.agent1.display();
  game.agent2.display();

  if (!mobileMode && showArrowKeys & !humanHasControlled) {
    var intensity = 64*Math.min(16*(delayScreen.life/initDelayFrames)*(initDelayFrames-delayScreen.life)/initDelayFrames, 64);
    drawAgentKeyboard(width/4, toY(ref_wallheight*1), width/12, 1, intensity, game.agent1.c);
    drawAgentKeyboard(3*width/4, toY(ref_wallheight*1), width/12, 2, intensity, game.agent2.c);
  }

  game.ball.c = color(70, 110, 200, 255*Math.max((initDelayFrames-delayScreen.life)/initDelayFrames, 0));
  game.ball.display();
  //game.fenceStub.display();

  // prints agent states (used for nn input)
  if (trainingVersion) {
    game.agent1.printState();
    game.agent2.printState();
  }

  //game.agent1.drawState(human1);
  //game.agent2.drawState(human2);

  //game.agent1.drawScore();
  //game.agent2.drawScore();

  // draw dead ball
  if (game.deadball) {
    game.deadball.life -= 1;
    game.deadball.c = color(250, 0, 0, 128*(game.deadball.life/initDelayFrames));
    //game.deadball.display();
    if (game.deadball.life <= 0) {
      game.deadball = null;
    }
  }

}

function windowResized() {
  "use strict";
  calculateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  //myCanvas.size(canvasWidth, canvasHeight);
  factor = canvasWidth / ref_w;
  calcStarPos(width, height);
}

function calculateCanvasSize() {
  var divWidth = document.getElementById('volleyball_demo').clientWidth;
  canvasWidth = int(divWidth);
  var widthScale = constrain(map(canvasWidth, 1440, 400, 0.45, 0.7), 0.45, 0.7);
  canvasHeight = int(canvasWidth * widthScale);
  sizeScaleFactor = constrain(map(canvasWidth, 1440, 400, 1, 2), 1, 2);
  sunRad = int(constrain(map(canvasWidth, 400, 1440, 50, 150), 50, 150));
}



// When the mouse is released
/*
var deviceReleased = function() {
  "use strict";
};

// When the mouse is pressed we. . .
var devicePressed = function(x, y) {
  "use strict";
};

var deviceDragged = function(x, y) {
  "use strict";
};

var mousePressed = function() {
  "use strict";
  devicePressed(mouseX, mouseY);
  return false;
};

var touchStarted = function() {
  "use strict";
  devicePressed(touchX, touchY);
  return false;
};

// interaction with touchpad and mosue:

var mouseDragged = function() {
  "use strict";
  deviceDragged(mouseX, mouseY);
  return false;
};

var touchMoved = function() {
  "use strict";
  return false;
};

var mouseReleased = function() {
  "use strict";
  return false;
};

var touchEnded = function() {
  "use strict";
  return false;
};
*/


