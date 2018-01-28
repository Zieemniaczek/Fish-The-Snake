function Item(value){
  this.size = 20;
  this.coords = [random(0,width-this.size),random(0,height-this.size)];
  this.value = value;
  this.draw = function(){
    fill(255,200,100);
    rect(this.coords[0],this.coords[1],this.size,this.size)
  }
}
//tworzy tablice nowych przedmiotów
itemsSetup = function(array,amount,value){
  for(let i =0; i<amount;i++){
    array.push(new Item(value));
  }
}
//rysuje tablce przedmiotów
itemsDraw= function(array){
  for(let i =0; i<array.length;i++){
    array[i].draw();
  }
}

//sprawdza czy przedmiot zderza się z głową węża, jeżeli tak to usuwa przedmiot z tablicy
//wiem, chujowo zaimplementowane ale nie wiedziałem jak zmienić zawartość tablicy w innym obiekcie więc musze ją zwracać i zawsze zamieniać
itemColision = function(snake,itemsArray){
  for(let i =0; i<itemsArray.length;i++){
    if(snake.areSegmentsTouching(snake.Segments[0],itemsArray[i].coords)){
      snake.addSegments(itemsArray[i].value);
      itemsSetup(itemsArray,1,itemsArray[i].value) //dodaje nowy przedmiot na plansze
      ui.incrementPoints(1);
      const index = itemsArray.indexOf(itemsArray[i]);
      if (index !== -1) {
        itemsArray.splice(index, 1); //usuwanie przedmiotu z listy
      }
    }
  }
return itemsArray;
}
