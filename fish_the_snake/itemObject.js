function Item(){
  this.size = leszcz.size;
  this.x = random(0,width-this.size);
  this.y = random(0,height-this.size);
  this.draw = function(){
    fill(255,200,100);
    rect(this.x,this.y,this.size,this.size);
  }
}
function Items(value){
  this.items = [];
  this.value = value;

  this.addItems = function(amount){
    for(let i = 0; i < amount; i+=1){
      this.items.push(new Item());
    }
  }
  this.draw = function(){
    for(let i = 0; i<this.items.length; i+=1){
      this.items[i].draw();
    }
  }
//sprawdza czy przedmiot zderza się z głową węża, jeżeli tak to usuwa przedmiot z tablicy
  this.itemColision = function(snake){
    for(let i =0; i<this.items.length;i++){
      if(snake.areSegmentsTouching(snake.Segments[0],this.items[i])){
        snake.segmentsToAdd+=this.value;
        print(leszcz.segmentsToAdd);
        this.addItems(1) //dodaje nowy przedmiot na plansze
        ui.incrementPoints(1);
        const index = this.items.indexOf(this.items[i]);
        if (index !== -1) {
          this.items.splice(index, 1); //usuwanie przedmiotu z listy
        }
      }
    }
  }
}
