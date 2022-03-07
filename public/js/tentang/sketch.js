const density = "        _.,-=+:;cba!?|}{0123456789$W#@Ñ";
// const density = "𐌀	𐌁	𐌂	𐌃	𐌄	𐌅	𐌆	𐌇	𐌈	𐌉	𐌊	𐌋	𐌌	𐌍	𐌎	𐌏	𐌐	𐌑	𐌒	𐌓	𐌔	𐌕	𐌖	𐌗	𐌘	𐌙	𐌚";
// const density = "Ñ@#W$9876543210?!abc;:+=-,._                ";
let nabil;
let video;
let asciidiv;
let keyed;

function setup() {
    noCanvas()
    // var canvas = createCanvas(382, 475);
    // canvas.parent('canva');
    video = createCapture(VIDEO);
    video.size(56, 56);
    video.parent('canva')
    asciidiv = createDiv();
    asciidiv.parent('canva')
}

function draw() {
    // image(nabil, 0, 0, width, height);
    let asciiImage = '';
    video.loadPixels()
    for(let j = 0; j < video.width; j++) {
        for(let i = 0; i < video.height; i++) {
            const pixelIndex = (i + j * video.width) * 4;
            const r = video.pixels[pixelIndex + 0];
            const g = video.pixels[pixelIndex + 1];
            const b = video.pixels[pixelIndex + 2];
            const avg = (r + g + b) / 3;
            const len = density.length;
            const charIndex = floor(map(avg, 0, 255, 0, len));

            const c = density.charAt(charIndex);
            if(c == ' ') asciiImage += '&nbsp;'
            else asciiImage += c
        }
        asciiImage += '<br/>'
    }
    asciidiv.html(asciiImage);
}

//green screen
function Key(image, color, level=50) {
    image.loadPixels();
    let out = new p5.Image(image.width, image.height)
    out.loadPixels();
    let keyVec = createVector(...color)
    for (y = 0; y < image.height; y++) {
      for (x = 0; x < image.width; x++) {
        let col = image.get(x, y)
        let colVec = createVector(...col)
        let d = colVec.dist(keyVec)
        let newCol = [...col]
        if(d < level){
          newCol[3] = 0
        }
        out.set(x, y, newCol)
      }
    }
    out.updatePixels()
    return out
  }