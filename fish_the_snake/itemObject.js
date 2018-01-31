function Item(){
  this.size = snake1.size;
  this.x = random(0,width-this.size);
  this.y = random(0,height-this.size);
  this.color = color(255,100,100);
  this.draw = function(){
    fill(this.color);
    stroke(this.color);
    rect(this.x,this.y,this.size,this.size);
  }
}
function Items(value){
  this.items = [];
  this.value = value;
  this.minDistanceBetweenItems = 150;

  this.areTwoItemsInProximity = function(item1,item2,x){
    if (item1.x + item1.size + x > item2.x && item1.x  < item2.x + item2.size + x &&
        item1.y + item1.size + x > item2.y && item1.y < item2.y + item2.size + x ){
          return true;
        } else {
          return false;
        }
      }


//dodaje przedmiot, potem sprawdza czy pokrywa się z którymś z segmentów węża jeżeli tak to usuwa, a potem sprawdza czy nie jest zbyt blisko innych przedmiotów
//jeżeli w tablicy nie ma żadnych przedmiotów to dodaje go bez sprawdzania
  this.addItems = function(amount){
    if(this.items.length == 0){
      this.items.push(new Item());
      amount -=1;
    }
    index = 0;
    while(index < amount){

      this.items.push(new Item());

      for(i=0; i<snake1.Segments.length; i++){
        if(snake1.areSegmentsTouching(this.items[this.items.length-1],snake1.Segments[i])){
          //print("hehe");
          this.items.pop();
          index--;
          break;
        }
      }

      for(i=0;i<this.items.length-1;i++){
        if(this.areTwoItemsInProximity(this.items[this.items.length-1],this.items[i],this.minDistanceBetweenItems)){
          //print("xD");
          this.items.pop();
          index--;
          break;
        }
      }
      index++;
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
        //print(snake1.segmentsToAdd);
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
