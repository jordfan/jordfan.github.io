var mouseCat;
var cats = [];
var move = false;
var randDir = [1, -1];
var imgScale = 1/8;

function setup() {
    createCanvas(windowWidth, windowHeight);
    mouseCat = loadImage("cat.jpg");
}

function draw() {
    background(255);
    for (i = 0; i < cats.length; i++) {
        cats[i].display();
        cats[i].move();
    }
    x = mouseX - (mouseCat.width * imgScale/2);
    y = mouseY - (mouseCat.height * imgScale/2);
    image(mouseCat, x, y, (mouseCat.width * imgScale), (mouseCat.height * imgScale));
    if (mouseIsPressed) cats.push(new brushStroke());
    if (key = 'g') {
        move = true;
    }
    else {
        move = false;
    }

}

function brushStroke() {
    this.x = mouseX - (mouseCat.width * imgScale/2)
    this.y = mouseY - (mouseCat.height * imgScale/2)

    this.speedX = 5 * random(randDir);
    this.speedY = 5 * random(randDir);

    this.display = function () {
        image(mouseCat, this.x, this.y, (mouseCat.width * imgScale), (mouseCat.height * imgScale));
    }

    this.move = function () {
        if (keyIsPressed) {
            this.x += this.speedX;
            this.y += this.speedY;
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

