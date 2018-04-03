var rects = [];
var randDir = [1,-1]

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (var i = 0; i < 200; i++) {
        rects.push(new randomRect());
    }
    var initWindowWidth = width;
    var initWindowHeight = height;
}

function draw() {
    background(255);
    for (var i = 0; i < rects.length; i++) {
        rects[i].move();
        rects[i].display();
    }
}

function randomRect() {
    this.r = random(0, 255);
    this.g = random(0, 255);
    this.b = random(0, 255);
    this.x = random(-100, width);
    this.y = random(-100, height);
    this.rectWidth = random(100, width/3);
    this.rectHeight = random(100, height/3);
    this.xSpeed = 5 * random(randDir);
    this.ySpeed = 5 * random(randDir);
    
    this.move = function () {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        if (this.x > width) {
            this.x = 0 - this.rectWidth;
        }
        if (this.y > height) {
            this.y = 0 - this.rectHeight;
        }
        if (this.x < 0 - this.rectWidth) {
            this.x = width
        }
        if (this.y < 0 - this.rectHeight) {
            this.y = height;
        }
    }

    this.display = function () {
        fill(this.r, this.g, this.b);
        rect(this.x, this.y, this.rectWidth, this.rectHeight);
    }
    
    this.changeDirection = function () {
        this.xSpeed = -this.xSpeed;
        this.ySpeed = -this.ySpeed;
    }
    
    this.changeSize = function () {
        this.rectWidth = this.rectWidth / initWindowWidth;
    }
}

function mousePressed() {
    for (i = 0; i < rects.length; i++) rects[i].changeDirection();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  for (i = 0; i < rects.length; i++) rects[i].changeSize();
}