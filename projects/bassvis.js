var mic;

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Create an Audio input
    mic = new p5.AudioIn();

    // start the Audio Input.
    // By default, it does not .connect() (to the computer speakers)
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);
}

function draw() {
    background(255);

    // Get the overall volume (between 0 and 1.0)
    var vol = mic.getLevel();
    
    var spectrum = fft.analyze();
    noFill();
    beginShape();
    for (i = 0; i < spectrum.length; i++) {
        fill(255);
        vertex(i, map(spectrum[i], 0, 255, height, 0));
    }
    endShape();
    fill(0);
    stroke(0);

    // Draw an ellipse with height based on volume
    var h = map(vol * 2, 1, 0, height, 0);
    ellipse(width / 2, height / 2, h);
}
