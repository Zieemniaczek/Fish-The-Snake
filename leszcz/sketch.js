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

function Snake() {
  this.x = 400;
  this.y = 400;
  this.speed = 4;
  this.size = 20;
  this.xspeed = 1;
  this.yspeed = 0;

  this.Segments = [[this.x,this.y],[this.x-this.size,this.y]];

  this.Segment = function(x,y){
    return [x,y]
  }
  //dodaje segment do tablicy,
  //dodany segment ma pozycje ostatniego dodanego segmentu([this.Segments.length-1]) - kierunek(speed) pomożony przez wielkość(size)
  this.addSegment = function(){
    append(
      this.Segments,
      this.Segment(
        this.Segments[this.Segments.length-1][0]+(this.xspeed*this.speed),
        this.Segments[this.Segments.length-1][1]+(this.yspeed*this.speed)));
  }

  //kopiowanie segmentów od końca do początku
  this.updateSegments = function(){
    for(let i = this.Segments.length-1;i>0;i--){
      this.Segments[i][0] = this.Segments[i-1][0] ;
      this.Segments[i][1] = this.Segments[i-1][1];
    }
  }
//poruszanie pierwszego segmentu
  this.update = function(){
    this.changeDir();
    this.Segments[0][0] += this.xspeed*this.speed;
    this.Segments[0][1] += this.yspeed*this.speed;
    this.updateSegments();
  }

  //rysuje wszystkie segmenty w pętli
    this.drawSegments = function(){
      for(let i = 0;i<this.Segments.length;i++){
        rect(this.Segments[i][0],this.Segments[i][1],this.size,this.size)
      }
    }

  this.draw = function(){
    fill(0,0,0);
    this.drawSegments();
  }
  //zmienia kierunek poruszania
  this.direction = function(x,y){
    this.xspeed = x;
    this.yspeed = y;
}
  this.changeDir = function(){
    if(keyIsPressed && keyCode == DOWN_ARROW && this.yspeed != -1 ){
      this.direction(0,1);
    }
    if(keyIsPressed && keyCode == UP_ARROW && this.yspeed != 1 ){
      this.direction(0,-1);
    }
    if(keyIsPressed && keyCode == LEFT_ARROW && this.xspeed != 1){
      this.direction(-1,0);
    }
    if(keyIsPressed && keyCode == RIGHT_ARROW && this.xspeed != -1){
      this.direction(1,0);
    }
  }
}
