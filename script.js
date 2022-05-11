//FISRT INIT STEPS
let infoCanvas = document.getElementById("infoCanvas");
let infoCanvasContext = infoCanvas.getContext("2d");

let gamePlayCanvas = document.getElementById("gamePlayCanvas");
let gamePlayCanvasContext = gamePlayCanvas.getContext("2d");

let gameOverCanvas = document.getElementById("gameOverCanvas");
let gameOverCanvasContext = gameOverCanvas.getContext("2d");

let restartButton = document.getElementById("restartButton");



//CONSTANTS
const IMG_SIZE = 50;
const FLOOR_GAME_Y = gamePlayCanvas.height - IMG_SIZE;

const GRAVITY_SPEED = 1.1;
const JUMP_SPEED = 10;

const CACTUS_START_X_POS = gamePlayCanvas.width;
const CACTUS_X_SPEED = 5;

//VARS
let dino = new Image();
let dinoY;


let cactus = new Image();
let cactusX;

let score;

let isAlive;

function drawGame() {

    //CLEAR CANVAS
    //TOP BLOCK
    infoCanvasContext.clearRect(0, 0, infoCanvas.width, infoCanvas.height);
    //BOTTOM BLOCK
    gamePlayCanvasContext.clearRect(0, 0, gamePlayCanvas.width, gamePlayCanvas.height);
    //GAME OVER BLOCK
    gameOverCanvasContext.clearRect(0, 0,  gameOverCanvas.width, gameOverCanvas.height);
    

    if (dinoY < IMG_SIZE && cactusX < IMG_SIZE && cactusX > 0 - IMG_SIZE) {
        isAlive = false;
        restartButton.style.display = "inline-block";
    }


    if(isAlive) {
        score +=1;

        //GAME PLAY
        if (dinoY > 0) {
            dinoY -= GRAVITY_SPEED;
        }
        else {
            dinoY = 0;
        }

        //SPEED CACTUS
        if(cactusX + IMG_SIZE > 0){
            cactusX -= CACTUS_X_SPEED;
        }
        else {
            cactusX = CACTUS_START_X_POS;
        }
        
    }
    else {
        //GAME OVER BLOCK DRAW
        gameOverCanvasContext.fillText("GAME OVER", 120, 100);
    }

    
    //TOP BLOCK DRAW
    infoCanvasContext.fillText("Счёт:" + score, 450, 25);
    
    //BOTTOM BLOCK DRAW
    gamePlayCanvasContext.drawImage(dino, 0, FLOOR_GAME_Y - dinoY, IMG_SIZE, IMG_SIZE);
    gamePlayCanvasContext.drawImage(cactus, cactusX, FLOOR_GAME_Y, IMG_SIZE, IMG_SIZE);

    window.requestAnimationFrame(drawGame);
}

function jump() {

    let id = setInterval( function() {
        if (dinoY > IMG_SIZE * 1.5) {
            clearInterval(id);
        }
        else{
            dinoY += JUMP_SPEED;
        }
    }, 5)

}

function init(){
    dino.src = "images/dino.png";
    cactus.src = "images/cactus.png";

    setDefaults();

    window.requestAnimationFrame(drawGame);
}

function setDefaults() {

    dinoY = 0;
    cactusX = CACTUS_START_X_POS;
    score = 0;
    isAlive = true;

    restartButton.style.display = "none";
}


gameOverCanvasContext.fillStyle = "#000";
gameOverCanvasContext.font = '65px Courier New';

infoCanvasContext.fillStyle = "#000";
infoCanvasContext.font = '25px Courier New';

restartButton.addEventListener("click", setDefaults);
document.addEventListener("keydown", jump);
init()

