'use strict';

var font;

var textTyped = 'Advertising\nis';
var drawMode = 1;
var fontSize = 200;
var padding = 10;
var nOff = 0;
var pointDensity = 8;

var colors;

var paths;
var textImg;

function preload() {
  font = loadFont('data/Helvetica-BoldOblique-04.ttf');
}

function setup() {
  createCanvas(1300, 800);
  frameRate(50);
  rectMode(CENTER);

  colors = [color(0, 200, 200), color(255, 255, 0), color(0, 0, 255)];
  pixelDensity(1);

  setupText();
}

function setupText() {
  // create an offscreen graphics object to draw the text into
  textImg = createGraphics(width, height);
  textImg.pixelDensity(1);
  textImg.background(255);
  textImg.textFont(font);
  textImg.textSize(fontSize);
  textImg.text(textTyped, 0, fontSize + 50);
  textImg.loadPixels();
}

function draw() {
  background(255, 30);

  nOff++;

  for (var x = 0; x < textImg.width; x += pointDensity) {
    for (var y = 0; y < textImg.height; y += pointDensity) {
      // Calculate the index for the pixels array from x and y
      var index = (x + y * textImg.width) * 4;
      // Get the red value from image
      var r = textImg.pixels[index];

      if (r < 128) {



          if (drawMode == 1){
            strokeWeight(5);

            var noiseFac = map(10, 0, width, 0, 1);
            var lengthFac = map(10, 0, height, 0.01, 1);

            var num = noise((x + nOff) * noiseFac, y * noiseFac);
            if (num < 0.6) {
              stroke(colors[0]);
            } else if (num < 0.7) {
              stroke(colors[1]);
            } else {
              stroke(colors[2]);
            }

            push();
            translate(x, y);
            rotate(radians(frameCount));
            line(10, 10, fontSize * lengthFac, 0);
            pop();
          }

      }
    }
  }

}

function keyPressed() {
  if (keyCode === CONTROL) saveCanvas(gd.timestamp(), 'png');

  if (keyCode === DELETE || keyCode === BACKSPACE) {
    textTyped = textTyped.substring(0,max(0,textTyped.length - 1));
    setupText();
  }
  if (keyCode === ENTER || keyCode === RETURN) {
    textTyped += '\n';
    setupText();
  }

  if (keyCode === DOWN_ARROW) {
    pointDensity--;
    if (pointDensity < 4) pointDensity = 4;
  }
  if (keyCode === UP_ARROW) {
    pointDensity++;
  }

}

function keyTyped() {
  if (keyCode >= 32){
    textTyped += key;
    setupText();
  }
}
