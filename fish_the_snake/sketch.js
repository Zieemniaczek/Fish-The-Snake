function setup() {
    createCanvas(800,800);
    background(100,250,200);
    leszcz = new Snake();
}

function draw() {
  background(100,250,200);
  leszcz.update();
  leszcz.draw();
  frameRate(50)
}

mouseClicked = function() {
  for(let i=0;i<4;i++){
    leszcz.addSegment();
  }
}
