
function setup() {
    createCanvas(800,600);
    background(100,255,200);
    leszcz = new Snake();
    ui = new UI();
    vodka = [];
    itemsSetup(vodka,10,10); //zmiana ilośći i wartości wudeczek
    level = 0;
    time = 0;
    gameStarted = false;//umożliwia stworzenie przerwy między kliknięciem a rozpoczęciem gry (kwestia estetyczna)
}

function draw() {
  if (level == 0){
    level = showMainMenu(level);
  } else if (level == 1){
    gameLevel();
    if (isGameLost() == true){
      gameStarted = false;
      level = 2;
    }
  } else if (level == 2){
    level = endingScreen(level);
  }
}
