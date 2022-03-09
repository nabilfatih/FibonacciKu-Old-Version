const density = "        _.,-=+:;cba!?|}{0123456789$W#@Ñ";
let sourceText;
let poem;
let nabil;
let startIndex = 0;

function preload() {
  nabil = loadImage("/img/tentang/nabil.png");
  sourceText = loadStrings("/img/tentang/nabil.txt");
}

function setup() {
  createCanvas(1385, 825).parent('matrix'); 
  poem = sourceText.join(' ');
  textFont("Courier-Bold");
}

function draw() {
  background(0);
  frameRate(10);
  
  let charIndex = startIndex;
  let w = width / nabil.width;
  let h = height / nabil.height;
  nabil.loadPixels();
  for (let j = 0; j < nabil.height; j++) {
    for (let i = 0; i < nabil.width; i++) {
        const pixelIndex = (i + j * nabil.width) * 4;
        const r = nabil.pixels[pixelIndex + 0];
        const g = nabil.pixels[pixelIndex + 1];
        const b = nabil.pixels[pixelIndex + 2];
        const avg = (r + g + b) / 3;
        
        noStroke();
        fill(avg);      
        textSize(w*1.2);
        textAlign(CENTER, CENTER);
        
        text(poem.charAt(charIndex % poem.length), i * w + w * 0.5, j * h + h * 0.5);
        charIndex++;
      }
  }
  startIndex++;
}