function Segment(x,y){
  this.x = x;
  this.y = y;
  this.isOnTurn = false;
  this.size = 25;
  this.color = color(108, 122, 137);
  this.draw = function(){
    fill(this.color);
    stroke(this.color);//220,50,50)
    rect(this.x,this.y,this.size,this.size);
  }
}
function Snake() {
  this.size = 25;
  this.speed = 5;
  this.xspeed = 1;
  this.yspeed = 0;
  this.segmentsToAdd = 0; //potrzebny do sprawienia że segmenty dodają się płynnie
  this.Segments = [new Segment(400,400),new Segment(380,400)];

  //dodaje segment do tablicy, dodany segment ma pozycje ostatniego dodanego segmentu([this.Segments.length-1]) - kierunek(speed) pomożony przez wielkość(size)
  this.addSegment = function(){
    this.Segments.push(new Segment(
      this.Segments[this.Segments.length-1].x,
      this.Segments[this.Segments.length-1].y));
  }

  //dodaje wybraną ilość segmentów
  this.addSegments = function(){
    if(frameCount%13==0 && this.segmentsToAdd > 0){
      this.addSegment();
      this.segmentsToAdd-=1;
      }
  }
//poruszanie pierwszego segmentu, oraz kopiowanie kolejnych segmentów od końca
  this.moveSegments = function(){
    this.Segments[0].x += this.xspeed*this.speed;
    this.Segments[0].y += this.yspeed*this.speed;
    for(let i = this.Segments.length-1;i>0;i--){
      this.Segments[i].x = this.Segments[i-1].x;
      this.Segments[i].y = this.Segments[i-1].y;
    }
  }

  this.update = function(){
    this.tailEating();
    this.changeDir();
    this.addSegments();
    this.incrementTurningSegment();
    this.moveSegments();
  }
  //rysuje wszystkie segmenty w pętli
  this.draw = function(){
    for(let i=0; i<this.Segments.length; i++){
      if(i%5 == 0 || this.Segments[i].isOnTurn == true) {
        this.Segments[i].draw();
      }
    }
  }


  this.areSegmentsTouching = function(seg1,seg2){
    if (seg1.x + this.size > seg2.x && seg1.x < seg2.x + this.size &&
        seg1.y + this.size > seg2.y && seg1.y < seg2.y + this.size){
          return true;
        } else {
          return false;
        }
      }

  this.tailEating = function(){
    if(this.Segments.length > 10){
      for(let i = 10; i<this.Segments.length;i++){
        if (this.areSegmentsTouching(this.Segments[0],this.Segments[i])) {
          //this.Segments = this.Segments.slice(0,i); //skracanie ogona
          return true;
        }
      }
    }
  }


this.isTouchingBorder = function(){
  if(this.Segments[0].x + this.size >= width ||
     this.Segments[0].y + this.size >= height ||
     this.Segments[0].x <= 0 ||
     this.Segments[0].y <= 0){
       return true;
     } else {
       return false;
     }

}


  this.delayBetweenTurns = function(time){
    if(millis() - time < 70){
      return false;
    } else {
      return true;
    }
  }

  //zmienia kierunek poruszania
  this.direction = function(x,y){
    this.xspeed = x;
    this.yspeed = y;
  }

  this.incrementTurningSegment = function(){
    for(i=this.Segments.length-1;i>=0;i-=1){
      if(this.Segments[i].isOnTurn==true && i!= this.Segments.length-1 ){
        this.Segments[i].isOnTurn=false;
        this.Segments[i+1].isOnTurn=true;
      }
    }
  }
    //zmienia kierunek poruszania,this.time słóży do sprawiania że nie można skręcić przed upływem pewnego czasu
    //this.Segments[1].isOnTurn = true mówi o tym że segment jest podczas skręcania i trzeba go zawsze wyświetlić  this.time = 0;
  this.changeDir = function(){
    if(this.delayBetweenTurns(this.time)){
      if(keyIsDown(DOWN_ARROW) && this.yspeed == 0 ){
        this.direction(0,1);
        this.time = millis()
        this.Segments[1].isOnTurn = true;
      }
      else if( keyIsDown(UP_ARROW) && this.yspeed == 0 ){
        this.direction(0,-1);
        this.time = millis()
        this.Segments[1].isOnTurn = true;
      }
      else if(keyIsDown(LEFT_ARROW) && this.xspeed == 0 ){
        this.direction(-1,0);
        this.time = millis()
        this.Segments[1].isOnTurn = true;
      }
      else if(keyIsDown(RIGHT_ARROW) && this.xspeed == 0 ){
        this.direction(1,0);
        this.time = millis()
        this.Segments[1].isOnTurn = true;
      }
    }
  }
}
