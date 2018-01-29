function Snake() {
  this.x = 400;
  this.y = 400;
  this.speed = 5;
  this.size = 25;
  this.xspeed = 1;
  this.yspeed = 0;
  this.segmentsInDebt = 0; //potrzebny do sprawienia że segmenty dodają się płynnie
  this.Segments = [[this.x,this.y,false],[this.x-this.size,this.y,false]]; //3 wartość wyznacza czy segment jest na skręcie

  //dodaje segment do tablicy, dodany segment ma pozycje ostatniego dodanego segmentu([this.Segments.length-1]) - kierunek(speed) pomożony przez wielkość(size)
  this.addSegment = function(){
    append(this.Segments,
          [this.Segments[this.Segments.length-1][0]+(this.xspeed*this.speed)],
          [this.Segments[this.Segments.length-1][1]+(this.yspeed*this.speed)],true);
  }

  //dodaje wybraną ilość segmentów
  this.addSegments = function(){
    if(frameCount%13==0 && this.segmentsInDebt > 0){
      this.addSegment();
      this.segmentsInDebt-=1;
      }
  }
//poruszanie pierwszego segmentu, oraz kopiowanie kolejnych segmentów od końca
  this.update = function(){
    this.tailEating();
    this.changeDir();
    this.addSegments();
    this.incrementTurningSegment();
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
      if(i%5==0 ||this.Segments[i][2] == true) {
        rect(this.Segments[i][0],this.Segments[i][1],this.size,this.size)
      }
    }
  }


  this.areSegmentsTouching = function(seg1,seg2){
    if (seg1[0] + this.size > seg2[0] && seg1[0] < seg2[0] + this.size &&
        seg1[1] + this.size > seg2[1] && seg1[1] < seg2[1] + this.size){
          return true;
        } else {
          return false;
        }
      }


this.isTouchingBorder = function(){
  if(this.Segments[0][0] + this.size >= width ||
     this.Segments[0][1] + this.size >= height ||
     this.Segments[0][0] <= 0 ||
     this.Segments[0][1] <= 0){
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
        if(this.Segments[i][2]==true && i!= this.Segments.length-1 ){
          this.Segments[i][2]=false;
          this.Segments[i+1][2]=true;
        }
      }
    }
    //zmienia kierunek poruszania,this.time słóży do sprawiania że nie można skręcić przed upływem pewnego czasu
    //this.Segments[1][2] = true mówi o tym że segment jest podczas skręcania i trzeba go zawsze wyświetlić  this.time = 0;
  this.changeDir = function(){
    if(keyIsPressed && this.delayBetweenTurns(this.time)){
      if( keyCode == DOWN_ARROW && this.yspeed == 0 ){
        this.direction(0,1);
        this.time = millis()
        this.Segments[1][2] = true;
      }
      else if( keyCode == UP_ARROW && this.yspeed == 0 ){
        this.direction(0,-1);
        this.time = millis()
        this.Segments[1][2] = true;
      }
      else if( keyCode == LEFT_ARROW && this.xspeed == 0 ){
        this.direction(-1,0);
        this.time = millis()
        this.Segments[1][2] = true;
      }
      else if( keyCode == RIGHT_ARROW && this.xspeed == 0 ){
        this.direction(1,0);
        this.time = millis()
        this.Segments[1][2] = true;
      }
    }
  }
}
