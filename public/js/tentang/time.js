const s = ( sk ) => {
  
    sk.setup = () => {
        sk.createCanvas(400, 400);
        sk.angleMode(DEGREES);
    };
  
    sk.draw = () => {
        sk.background(33, 36, 61);
        sk.translate(200, 200);
        sk.rotate(-90); 

        let hr = sk.hour();
        let mn = sk.minute();
        let sc = sk.second();

        sk.strokeWeight(8);
        sk.stroke(255, 124, 124);
        sk.noFill();
        let second = sk.map(sc, 0, 60, 0, 360);
        sk.arc(0, 0, 385, 385, 0, second);

        sk.push();
        sk.rotate(second)
        sk.stroke(255, 124, 124);
        sk.line(0, 0, 150, 0)
        sk.pop()

        sk.stroke(255, 208, 130);
        let minute = sk.map(mn, 0, 60, 0, 360);
        sk.arc(0, 0, 365, 365, 0, minute);

        sk.push();
        sk.rotate(minute)
        sk.stroke(255, 208, 130);
        sk.line(0, 0, 125, 0)
        sk.pop()

        sk.stroke(136, 225, 242);
        let hour = sk.map(hr % 12, 0, 12, 0, 360)
        sk.arc(0, 0, 345, 345, 0, hour);

        sk.push();
        sk.rotate(hour)
        sk.stroke(136, 225, 242);
        sk.line(0, 0, 100, 0)
        sk.pop()

        sk.stroke(255);
        sk.point(0, 0)
    };
  };
  
let myp5 = new p5(s, 'waktu');