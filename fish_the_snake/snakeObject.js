function Snake() {
  this.x = 400;
  this.y = 400;
  this.speed = 4;
  this.size = 20;
  this.xspeed = 1;
  this.yspeed = 0;
  this.Segments = [[this.x,this.y],[this.x-this.size,this.y]];

  //dodaje segment do tablicy, dodany segment ma pozycje ostatniego dodanego segmentu([this.Segments.length-1]) - kierunek(speed) pomożony przez wielkość(size)
  this.addSegment = function(){
    print("added");
    append(this.Segments,
          [this.Segments[this.Segments.length-1][0]+(this.xspeed*this.speed)],
          [this.Segments[this.Segments.length-1][1]+(this.yspeed*this.speed)]);
  }
//poruszanie pierwszego segmentu, oraz kopiowanie kolejnych segmentów od końca
  this.update = function(){
    this.tailEating();
    this.changeDir();
    this.Segments[0][0] += this.xspeed*this.speed;
    this.Segments[0][1] += this.yspeed*this.speed;
    for(let i = this.Segments.length-1;i>0;i--){
      this.Segments[i][0] = this.Segments[i-1][0];
      this.Segments[i][1] = this.Segments[i-1][1];
    }
  }
  //rysuje wszystkie segmenty w pętli
  this.draw = function(){
    fill(0,0,0);
    for(let i = 0;i<this.Segments.length;i++){
      rect(this.Segments[i][0],this.Segments[i][1],this.size,this.size)
    }
  }
  //zmienia kierunek poruszania
  this.direction = function(x,y){
    this.xspeed = x;
    this.yspeed = y;
  }

  this.segmentsTouching = function(seg1,seg2){
    if (seg1[0] + this.size > seg2[0] && seg1[0] < seg2[0] + this.size &&
        seg1[1] + this.size > seg2[1] && seg1[1] < seg2[1] + this.size){
          return true;
        } else {
          return false;
        }
      }
  this.tailEating = function(){
    if(this.Segments.length > 10){
      for(let i = 10; i<this.Segments.length;i++){
        if (this.segmentsTouching(this.Segments[0],this.Segments[i])) {
          this.Segments = this.Segments.slice(0,i);
        }
      }
    }
  }
  this.timeFromLastTurn = function(time){
    if(millis() - time < 90){
      return false;
    } else {
      return true;
    }
  }

  //zmienia kierunek poruszania i sprawie że nie można skręcić przed upływem pewnego czasu
  this.time = 0;
  this.changeDir = function(){
    if(keyIsPressed && keyCode == DOWN_ARROW && this.yspeed != -1 && this.timeFromLastTurn(this.time)){
      this.direction(0,1);
      this.time = millis()
    }
    if(keyIsPressed && keyCode == UP_ARROW && this.yspeed != 1 && this.timeFromLastTurn(this.time)){
      this.direction(0,-1);
      this.time = millis()
    }
    if(keyIsPressed && keyCode == LEFT_ARROW && this.xspeed != 1 && this.timeFromLastTurn(this.time)){
      this.direction(-1,0);
      this.time = millis()
    }
    if(keyIsPressed && keyCode == RIGHT_ARROW && this.xspeed != -1 && this.timeFromLastTurn(this.time)){
      this.direction(1,0);
      this.time = millis()
    }
  }
}
