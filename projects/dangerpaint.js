var blobs = [];
var move = new Boolean(false);
var randDir = [1, -1];
var brushSize = 1;
var dangerbox = [];
var brush;
var brushSize;
var saveStep1 = false
var skipFrame = false
var textBrush = false
var textInput;

function setup() {
    //load images

    createCanvas(windowWidth, windowHeight);
    alex = loadImage("dangerpaint/alex.png");
    charlie = loadImage("dangerpaint/charlie.png");
    chloe = loadImage("dangerpaint/chloe.png");
    jordan = loadImage("dangerpaint/jordan.png");
    lisha = loadImage("dangerpaint/lisha.png");
    liz = loadImage("dangerpaint/liz.png");
    mahayla = loadImage("dangerpaint/mahayla.png");
    malik = loadImage("dangerpaint/malik.png");
    sharayha = loadImage("dangerpaint/sharayha.png");
    eraser = loadImage("dangerpaint/eraser.png");
    randomBrush = loadImage("dangerpaint/random.png");

    //set dangerbox array and default brush
    var dangerbox = [alex, charlie, chloe, jordan, lisha, liz, mahayla, malik, sharayha];
    brush = random(dangerbox);

    //create button/slider elements
    alexButton = createButton('Alex');
    charlieButton = createButton('Charlie');
    chloeButton = createButton('Chloe');
    jordanButton = createButton('Jordan');
    lishaButton = createButton('Lisha');
    lizButton = createButton('Liz');
    mahaylaButton = createButton('Mahayla');
    malikButton = createButton('Malik');
    sharayhaButton = createButton('Sharayha');
    eraserButton = createButton('Eraser');
    saveButton = createButton('Save Masterpiece');
    randomButton = createButton('Random');
    textButton = createButton('Create Text');
    brushSizeSlider = createSlider(1, 200, 100);

    //set button styles
    col = color(50);
    alexButton.style('background-color: rgb(50,50,50); color: white; font-size: 16px; padding: 3px 7px;');
    charlieButton.style('background-color: rgb(50,50,50); color: white; font-size: 16px; padding: 3px 7px;');
    chloeButton.style('background-color: rgb(50,50,50); color: white; font-size: 16px; padding: 3px 7px;');
    jordanButton.style('background-color: rgb(50,50,50); color: white; font-size: 16px; padding: 3px 7px;');
    lishaButton.style('background-color: rgb(50,50,50); color: white; font-size: 16px; padding: 3px 7px;');
    lizButton.style('background-color: rgb(50,50,50); color: white; font-size: 16px; padding: 3px 7px;');
    mahaylaButton.style('background-color: rgb(50,50,50); color: white; font-size: 16px; padding: 3px 7px;');
    malikButton.style('background-color: rgb(50,50,50); color: white; font-size: 16px; padding: 3px 7px;');
    sharayhaButton.style('background-color: rgb(50,50,50); color: white; font-size: 16px; padding: 3px 7px;');
    eraserButton.style('background-color: rgb(50,50,50); color: white; font-size: 16px; padding: 3px 7px;');
    saveButton.style('background-color: rgb(50,50,50); color: white; font-size: 16px; padding: 3px 7px;');
    randomButton.style('background-color: rgb(50,50,50); color: white; font-size: 16px; padding: 3px 7px;');
    textButton.style('background-color: rgb(50,50,50); color: white; font-size: 16px; padding: 3px 7px;');


    //set button functions
    alexButton.mousePressed(alexChangeBrush);
    charlieButton.mousePressed(charlieChangeBrush);
    chloeButton.mousePressed(chloeChangeBrush);
    jordanButton.mousePressed(jordanChangeBrush);
    lishaButton.mousePressed(lishaChangeBrush);
    lizButton.mousePressed(lizChangeBrush);
    mahaylaButton.mousePressed(mahaylaChangeBrush);
    malikButton.mousePressed(malikChangeBrush);
    sharayhaButton.mousePressed(sharayhaChangeBrush);
    eraserButton.mousePressed(eraserChangeBrush);
    saveButton.mousePressed(saveButtonFunction);
    randomButton.mousePressed(randomChangeBrush);
    textButton.mousePressed(textChangeBrush);

    //set button/slider positions
    alexButton.position(10, height - 110);
    charlieButton.position(60, height - 110);
    chloeButton.position(130, height - 110);
    jordanButton.position(191, height - 110);

    lishaButton.position(10, height - 76);
    lizButton.position(72, height - 76);
    mahaylaButton.position(118, height - 76);
    malikButton.position(203, height - 76);

    sharayhaButton.position(10, height - 41);
    randomButton.position(106, height - 41);
    eraserButton.position(195, height - 41);

    brushSizeSlider.position(284, height - 108);
    saveButton.position(280, height - 41);
    textButton.position(302, height - 76);
}

function draw() {
    background(255);

    brushSize = brushSizeSlider.value() / 100;

    //create and move objects
    for (i = 0; i < blobs.length; i++) {
        blobs[i].display();
        blobs[i].move();
    }
    
    //center the brush on the mouse
    x = mouseX - (brush.width * brushSize / 2);
    y = mouseY - (brush.height * brushSize / 2);
    
    //if your mouse isn't over the menu section
    if (mouseY < height - 150) {
        //what to do if you're placing text
        if (textBrush) {
            textSizeArg = brushSizeSlider.value()/3;
            fill(0);
            textSize(textSizeArg)
            text(textInput, mouseX, mouseY);
            if (mouseIsPressed) {
                blobs.push(new textPlace());
            }
            console.log("Placed text");
        }
        
        //if you aren't placing text
        else {
            image(brush, x, y, (brush.width * brushSize), (brush.height * brushSize));
        if (skipFrame) {
            if (mouseIsPressed) {
            blobs.push(new brushStroke());
            console.log("Placed brushstroke");
            }
            skipFrame = false;
            //makes sure objects are placed every other fra,e
        } else {
            skipFrame = true;
        }
        }
    }
    if (keyIsPressed) {
        move = true;
    } else {
        move = false;
    }

    //menu
    if (saveStep1 === false) {
        noStroke();
        fill(0);
        rect(0, height - 150, width, 150);
        fill(255);
        textSize(20);
        text('Select Brush:', 10, height - 120);
        text('Brush Size:', 280, height - 120);
    } else if (saveStep1) {
        saveFunction();
    }
}

function brushStroke() {
    var dangerbox = [alex, charlie, chloe, jordan, lisha, liz, mahayla, malik, sharayha];

    this.brush = brush;

    if (this.brush == randomBrush) {
        this.brush = random(dangerbox);
    }
    
    this.brushSize = brushSize;
    this.x = x;
    this.y = y;

    this.speedX = 5 * random(randDir);
    this.speedY = 5 * random(randDir);

    this.display = function () {
        image(this.brush, this.x, this.y, (100 * this.brushSize), (100 * this.brushSize));
    }

    this.move = function () {
        if (move === true) {
            this.x += this.speedX;
            this.y += this.speedY;
        }
    }
}

function textPlace() {

    this.textSizeArg = textSizeArg;
    this.x = mouseX;
    this.y = mouseY;
    this.textInput = textInput;

    this.speedX = 5 * random(randDir);
    this.speedY = 5 * random(randDir);

    this.display = function () {
        fill(0);
        textSize(this.textSizeArg)
        text(this.textInput, this.x, this.y);
    }

    this.move = function () {
        if (move === true) {
            this.x += this.speedX;
            this.y += this.speedY;
        }
    }
}

function alexChangeBrush() {
    textBrush = false;
    brush = alex;
}

function charlieChangeBrush() {
    textBrush = false;
    brush = charlie;
}

function chloeChangeBrush() {
    textBrush = false;
    brush = chloe;
}

function jordanChangeBrush() {
    textBrush = false;
    brush = jordan;
}

function lishaChangeBrush() {
    textBrush = false;
    brush = lisha;
}

function lizChangeBrush() {
    textBrush = false;
    brush = liz;
}

function mahaylaChangeBrush() {
    textBrush = false;
    brush = mahayla;
}

function malikChangeBrush() {
    textBrush = false;
    brush = malik;
}

function sharayhaChangeBrush() {
    textBrush = false;
    brush = sharayha;
}

function eraserChangeBrush() {
    textBrush = false;
    brush = eraser;
}

function randomChangeBrush() {
    textBrush = false;
    brush = randomBrush;
}

function textChangeBrush() {
    sleep(500)
    textInput = prompt("What text would you like to draw?", "Awesome text here!");
    textBrush = true;
}

function saveButtonFunction() {
    saveStep1 = true;
    resizeCanvas(windowWidth, windowHeight - 150);
}

function saveFunction() {
    var filename = prompt("Please title your masterpiece", "My DangerPaint Project");
    save(filename + '.jpg');
    saveStep1 = false;
    resizeCanvas(windowWidth, windowHeight);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    alexButton.position(10, height - 110);
    charlieButton.position(60, height - 110);
    chloeButton.position(130, height - 110);
    jordanButton.position(191, height - 110);

    lishaButton.position(10, height - 76);
    lizButton.position(72, height - 76);
    mahaylaButton.position(118, height - 76);
    malikButton.position(203, height - 76);

    sharayhaButton.position(10, height - 41);
    randomButton.position(106, height - 41);
    eraserButton.position(195, height - 41);

    brushSizeSlider.position(284, height - 108);
    saveButton.position(280, height - 41);
    textButton.position(302, height - 76);
}
