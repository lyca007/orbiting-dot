let angle = 0;
let speed = 2;
let direction = 1;
let paused = false;
let dotX = 0;
let dotY = 0;

const RADIUS = 100;
const DOT_SIZE = 28;
const WORKED_ANGLE = 60;

let centerX;
let centerY;

function setup() {
  createCanvas(600, 400);
  angleMode(DEGREES);
  centerX = width / 2; // half of the canvas width = middle
  centerY = 160;
  textFont('monospace');
}

function draw() {
  background(20, 24, 38);
  updateAngle();
  calculateDotPosition();
  drawGuides();
  drawDot();
  drawReadout();
  drawInstructions();
}

function updateAngle() {
  if (!paused) {
    angle = angle + speed * direction; // add speed each frame (direction makes it + or -)
    angle = (angle % 360 + 360) % 360; // keep the angle between 0 and 360
  }
}

function calculateDotPosition() {
  dotX = centerX + RADIUS * cos(angle); // cos = left/right amount, scaled by radius
  dotY = centerY + RADIUS * sin(angle); // sin = up/down amount, scaled by radius
}

function drawGuides() {
  noFill();
  stroke(80, 90, 120);
  strokeWeight(1);
  circle(centerX, centerY, RADIUS * 2); // diameter = 2 x radius
  line(centerX - RADIUS - 20, centerY, centerX + RADIUS + 20, centerY);
  line(centerX, centerY - RADIUS - 20, centerX, centerY + RADIUS + 20);

  stroke(255, 255, 255, 150);
  line(centerX, centerY, dotX, dotY);

  strokeWeight(3);
  stroke(255, 150, 90);
  line(centerX, centerY, dotX, centerY);
  stroke(90, 200, 255);
  line(dotX, centerY, dotX, dotY);
}

function drawDot() {
  noStroke();
  fill(200);
  circle(centerX, centerY, 8);
  fill(255, 220, 90);
  circle(dotX, dotY, DOT_SIZE);
}

function drawReadout() {
  noStroke();
  fill(255);
  textSize(15);
  textAlign(LEFT, TOP);
  text('angle = ' + nf(angle, 1, 1) + ' deg', 15, 15);
  text('cos(angle) = ' + nf(cos(angle), 1, 3), 15, 35);
  text('sin(angle) = ' + nf(sin(angle), 1, 3), 15, 55);
  text('x = ' + nf(dotX, 1, 1) + '   y = ' + nf(dotY, 1, 1), 15, 75);
}

function drawInstructions() {
  noStroke();
  fill(190, 200, 220);
  textSize(14);
  textAlign(LEFT, TOP);
  text('SPACE: pause/resume', 15, height - 100);
  text('UP / DOWN: speed up / slow down  (speed = ' + nf(speed, 1, 1) + ')', 15, height - 80);
  text('CLICK: reverse direction', 15, height - 60);
  text('W: jump to ' + WORKED_ANGLE + ' deg and pause (worked example)', 15, height - 40);
  text(paused ? 'PAUSED' : 'RUNNING', 15, height - 20);
}

function keyPressed() {
  if (key === ' ') {
    paused = !paused;
  } else if (keyCode === UP_ARROW) {
    speed = min(speed + 0.5, 10); // add 0.5, but never above 10
  } else if (keyCode === DOWN_ARROW) {
    speed = max(speed - 0.5, 0.5); // subtract 0.5, but never below 0.5
  } else if (key === 'w' || key === 'W') {
    angle = WORKED_ANGLE;
    paused = true;
  }
  return false;
}

function mousePressed() {
  direction = direction * -1; // multiply by -1 to flip between 1 and -1
}
