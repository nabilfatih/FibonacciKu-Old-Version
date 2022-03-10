const s = ( sketch ) => {
  
    sketch.setup = () => {
        sketch.createCanvas(400, 400);
        sketch.angleMode(DEGREES);
    };
  
    sketch.draw = () => {
        sketch.background(33, 36, 61);
        sketch.translate(200, 200);
        sketch.rotate(-90); 

        let hr = sketch.hour();
        let mn = sketch.minute();
        let sc = sketch.second();

        sketch.strokeWeight(8);
        sketch.stroke(255, 124, 124);
        sketch.noFill();
        let second = sketch.map(sc, 0, 60, 0, 360);
        sketch.arc(0, 0, 385, 385, 0, second);

        sketch.push();
        sketch.rotate(second)
        sketch.stroke(255, 124, 124);
        sketch.line(0, 0, 150, 0)
        sketch.pop()

        sketch.stroke(255, 208, 130);
        let minute = sketch.map(mn, 0, 60, 0, 360);
        sketch.arc(0, 0, 365, 365, 0, minute);

        sketch.push();
        sketch.rotate(minute)
        sketch.stroke(255, 208, 130);
        sketch.line(0, 0, 125, 0)
        sketch.pop()

        sketch.stroke(136, 225, 242);
        let hour = sketch.map(hr % 12, 0, 12, 0, 360)
        sketch.arc(0, 0, 345, 345, 0, hour);

        sketch.push();
        sketch.rotate(hour)
        sketch.stroke(136, 225, 242);
        sketch.line(0, 0, 100, 0)
        sketch.pop()

        sketch.stroke(255);
        sketch.point(0, 0)
    };
  };
  
let myp5 = new p5(s, 'waktu');