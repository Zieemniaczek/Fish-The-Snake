function gameLevel(){
  background(100,250,200);
  ui.show();
  vodka.itemColision(leszcz);
  vodka.draw();
  leszcz.update();
  leszcz.draw();
}

function UI(){
  this.points = 0;
  this.incrementPoints = function(value){
    this.points+=value;
  }
  this.show = function(){
    fill(210, 82, 120);
    textStyle(ITALIC);
    textAlign(LEFT);
    textSize(16);
    text("points: " + this.points,5,15);
  }
}

function showMainMenu(level){
  mainMenu();
  if (startGame(gameStarted) == true ){ //mechanizm czekania 5 sekund aby zmienić poziom
    if (gameStarted == false){
      time = millis();
    }
    gameStarted = true;
    if (millis() - time > 1000 ) {
      return 1;
    }
  }
  return 0;
}
function mainMenu(){
  fill(210, 82, 120);
  textStyle(ITALIC);
  textSize(20);
  text("welcome in the best snake game",width/2,height/2-40);
  text("collect yellow squares",width/2,height/2-20);
  text("don't eat your tail",width/2,height/2);
  text("don't go outside the board",width/2,height/2+20);
  text("hit space to play",width/2,height/2+60);
  text("have fun :3",width/2,height/2+80);
}

function startGame(HaveGameAlreadyStarted){
  if(HaveGameAlreadyStarted || (keyIsPressed && keyCode == 32)){
    return true;
  } else {
    return false;
  }
}

function isGameLost(){
  if (leszcz.isTouchingBorder() || leszcz.tailEating()) {//1==2){
    return true;
  } else {
    //print("not lost")
    return false;
  }
}

function endingScreen(){
  fill(210, 82, 120);
  textAlign(CENTER);
  textStyle(ITALIC);
  textSize(20)
  text("you have lost",width/2,height/2-30)
  text("but it doesn't matter",width/2,height/2-10);
  text("you will die anyway",width/2,(height/2+10));
  text("_______________",width/2,height/2+2)
  text("you can always start again by pressing space :>",width/2,height/2+30)
  if(startGame() == true){
    setup();
    return 1;
  }
  return 2;
}
