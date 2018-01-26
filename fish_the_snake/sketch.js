function setup() {
    createCanvas(800,800);
    background(100,255,200);
    leszcz = new Snake();
    vodka = [];
    itemsSetup(vodka,10,10); //zmiana ilośći i wartości wudeczek 
}

function draw() {
  background(100,250,200);
  vodka = itemColision(leszcz,vodka);//
  itemsDraw(vodka);
  leszcz.update();
  leszcz.draw();
  frameRate(50)
}

mouseClicked = function() {
  leszcz.addSegments(5)
}
