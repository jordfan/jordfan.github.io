//set up all the variables
var xMark;
var yMark;
var xSpeed;
var ySpeed;
var x;
var y;

var randSpeed;
var randR;
var randG;
var randB;

var constRandSpeed;
var constR;
var constG;
var constB;

var change;
var radius;

var speedMin;
var speedMax;

var pauseButton;
var resumeButton;
var pause;

var muteButton;
var mute;
var dingSound;

var i;
var p;

var balls = [];
var ballsNum = 15;
var prevBallsNum;
var currentBallsNum;

//preload sound
function preload() {
    soundFormats('wav');
    dingSound = loadSound('/projects/resources/ding.wav');
}

function setup() {
    //make the canvas the size of the
    //browser window
    createCanvas(windowWidth, windowHeight);

    //set the initial speed mins and maxes
    speedMin = 5;
    speedMax = 15;

    //set radius of sphere
    radius = 20;

    //this tells the code to set initial 
    //values that would be set if a change 
    //were activated
    change = true;

    //create radius slider
    radiusSlider = createSlider(1, 200, 20);
    radiusSlider.position(140, 97);

    //create speed min slider
    speedMinSlider = createSlider(1, 100, 5);
    speedMinSlider.position(140, 117);

    //create speed max slider
    speedMaxSlider = createSlider(2, 100, 15);
    speedMaxSlider.position(140, 137);

    //create speed max slider
    ballsNumSlider = createSlider(1, 200, 15);
    ballsNumSlider.position(140, 77);

    //set first random values
    constRandSpeed = Math.floor(random(speedMax - speedMin) + 1);

    //pause button
    pause = false;
    pauseButton = createButton('Pause');
    pauseButton.position(40, 42);
    pauseButton.mousePressed(pauseFunction);

    //resume button
    resumeButton = createButton('Resume');
    resumeButton.position(103, 42);
    resumeButton.mousePressed(resumeFunction);

    //mute button
    mute = true;
    muteButton = createButton('Mute/Unmute');
    muteButton.position(175, 42);
    muteButton.mousePressed(muteFunction);

    for (var i = 0; i < ballsNum; i++) {
        balls.push(new drawSphere());
    }
}

function pauseFunction() {
    pause = true;
}

function resumeFunction() {
    pause = false;
}

function muteFunction() {
    mute = !mute;
}

function draw() {
    //set the background color
    background(200, 100);

    //set radius to slider value
    radius = radiusSlider.value();

    //set speed scale to slider value
    speedMin = speedMinSlider.value();

    //set speed range to slider value
    speedMax = speedMaxSlider.value();

    //set speed range to slider value
    ballsNum = ballsNumSlider.value();

    if (prevBallsNum > ballsNum) {
        for (var p = 0; p < (prevBallsNum - ballsNum); p++) {
            balls = shorten(balls);
        }
    }

    if (prevBallsNum < ballsNum) {
        for (var g = 0; g < (ballsNum - prevBallsNum); g++) {
            balls.push(new drawSphere());
        }
    }

    //fix for errors in sliders
    if (speedMin >= speedMax) {
        speedMin = speedMax;
    }

    for (var i = 0; i < balls.length; i++) {
        balls[i].move();
    }

    prevBallsNum = ballsNum;
    infoOverlays();
}

function drawSphere() {
    //set initial random positions for sphere
    this.x = Math.floor(random(1, width));
    this.y = Math.floor(random(1, height));
    //set initial speeds
    this.xSpeed = Math.floor(random(5, 15));
    this.ySpeed = Math.floor(random(5, 15));
    this.change = true;
    this.xMark = 1;
    this.yMark = 1;
    this.constR = randR;
    this.constG = randG;
    this.constB = randB;

    this.move = function () {
        //checks if paused
        //random number generators
        //note that the floor function rounds to the nearest 1, and the random function generates a random decimal 0-1, exlusive
        this.randSpeed = Math.floor(random(speedMin, speedMax) + 1)
        this.randR = Math.floor(random(0, 255));
        this.randG = Math.floor(random(0, 255));
        this.randB = Math.floor(random(0, 255));
        if (pause == false) {
            //things to do when the ball hits a wall
            if (this.change == true) {
                this.constR = this.randR;
                this.constG = this.randG;
                this.constB = this.randB;
                this.constRandSpeed = this.randSpeed;
                this.change = false;
                if (mute == false) {
                    dingSound.setVolume(0.1);
                    dingSound.play();
                }
            }

            //x movement
            this.x = this.x + this.xSpeed;
            if (this.x > (width - radius)) {
                this.x = width - radius;
                this.xMark = -this.xMark;
                this.xSpeed = this.constRandSpeed * this.xMark;
                this.change = true;
            }
            if (this.x < radius) {
                this.x = radius;
                this.xMark = -this.xMark;
                this.xSpeed = this.constRandSpeed * this.xMark;
                this.change = true;
            }

            //y movement
            this.y = this.y + this.ySpeed
            if (this.y > (height - radius)) {
                this.y = height - radius;
                this.yMark = -this.yMark;
                this.ySpeed = this.constRandSpeed * this.yMark;
                this.change = true;
            }
            if (this.y < radius) {
                this.y = radius;
                this.yMark = -this.yMark;
                this.ySpeed = this.constRandSpeed * this.yMark;
                this.change = true;

            }
        }
        fill(this.constR, this.constG, this.constB);
        noStroke();
        ellipse(this.x, this.y, radius * 2);
    }
}

function infoOverlays() {
    //info overlays
    fill('rgba(0,0,0,.1)')
    stroke(1)
    rect(20, 20, 260, 150, 10);

    noStroke()
    fill(255);
    text("# of Balls: " + balls.length, 30, 90);
    text("Ball Radius: " + radius, 30, 110);
    text("Speed Min: " + speedMin, 30, 130);
    text("Speed Max: " + speedMax, 30, 150);

}

//resizes the canvas when the browser window
//changes
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}