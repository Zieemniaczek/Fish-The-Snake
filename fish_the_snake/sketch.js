
function setup() {
    frameRate(60);
    createCanvas(800,600);
    background(100,255,200);
    leszcz = new Snake();
    ui = new UI();
    vodka = new Items(5);//ustalenie wartośći
    vodka.addItems(5);
    level = 0;
    time = 0;
    gameStarted = false;//umożliwia stworzenie przerwy między kliknięciem a rozpoczęciem gry (kwestia estetyczna)
}

function draw() {
  if (level == 1){
    gameLevel();
    if (isGameLost() == true){
      gameStarted = false;
      level = 2;
    }
  } else if (level == 0){
    level = showMainMenu(level);
  } else if (level == 2){
    level = endingScreen(level);
  }
}

function mouseClicked(){
  leszcz.segmentsToAdd+=1000;
  ui.points += 100;
}
