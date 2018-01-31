
function setup() {
    frameRate(60);
    createCanvas(800,600);
    background(100,255,200);

    snake1 = new Snake();
    ui = new UI();
    square = new Items(5);//ustalenie wartośći
    level = 0;
    time = 0;
    isGameRunning = false;//umożliwia stworzenie przerwy między kliknięciem a rozpoczęciem gry (kwestia estetyczna)

    square.addItems(5);
}


function draw() {
  switch(level){
    case 0:
      showMainMenu();
      break;

    case 1:
      gameLevel();
      isGameLost();
      break;

    case 2:
      endingScreen();
      break;
  }
}

/*function mouseClicked(){
  snake1.segmentsToAdd+=1000;
  ui.points += 100;
}*/
