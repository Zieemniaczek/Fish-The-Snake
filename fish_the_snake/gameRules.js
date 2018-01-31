function gameLevel(){
  background(100,250,200);
  square.itemColision(snake1);
  square.draw();
  snake1.update();
  snake1.draw();
  ui.show();
}

function textConfig(size){
  fill(103, 65, 114);
  strokeWeight(0);
  textStyle(ITALIC);
  textSize(size);
}

function UI(){
  this.points = 0;
  this.incrementPoints = function(value){
    this.points+=value;
  }
  this.show = function(){
    textConfig(16);
    textAlign(LEFT);
    text("points: " + this.points,5,15);
  }
}


function showMainMenu(){
  mainMenuText();
  if (startGame()){ //mechanizm czekania 5 sekund aby zmienić poziom
    if (isGameRunning == false){
      time = millis();
    }
    isGameRunning = true;
    if (millis() - time > 500 ) {
      level =  1;
    }
  }
}
function mainMenuText(){
  textConfig(20);
  text("welcome in the best snake game",width/2,height/2-40);
  text("collect yellow squares",width/2,height/2-20);
  text("don't eat your tail",width/2,height/2);
  text("don't go outside the board",width/2,height/2+20);
  text("hit space to play",width/2,height/2+60);
  text("have fun :3",width/2,height/2+80);
}

function startGame(){
  if(isGameRunning || (keyIsPressed && keyCode == 32)){
    return true;
  } else {
    return false;
  }
}

function isGameLost(){
  if (snake1.isTouchingBorder() || snake1.tailEating()) {//1==2){
    isGameRunning = false;
    level = 2;
  }
}

function endingScreen(){
  textConfig(20);
  textAlign(CENTER);
  text("you have lost",width/2,height/2-30)
  text("but it doesn't matter",width/2,height/2-10);
  text("you will die anyway",width/2,(height/2+10));
  text("_______________",width/2,height/2+2)
  text("you can always start again by pressing space :>",width/2,height/2+30)
  if(startGame() == true){
    setup();
    level = 1;
  }
}
