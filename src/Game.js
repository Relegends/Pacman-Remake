const canvas = document.getElementById("map");
const canvasCtx = canvas.getContext("2d");


canvasCtx.scale(2, 2);
canvasCtx.fillStyle = "black";
canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

var selectedAction = Actions.NOACTION;

var tilemap = new Tilemap(canvasCtx);

// Time that the player has been playing
var timeAlive = 0;

var s = new Sounds();

// Sound of the ghosts to be play
var ghostSirenSound = 1;

// Time that the player has been invincible
var timeInvincible = 0;

// Timer that counts the seconds 
var invincibleTimer;

// Dificulty level
var dificultyLvl = 1;

// Defines if the game is in a valid state to be play
var playing = true;

/*
0 = empty space
1 = dot
2 = super dot
 */
var dotArrayMap = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
  [0,2,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,2,0],
  [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
  [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
  [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
  [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
  [0,2,1,1,0,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,0,0,1,1,2,0],
  [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
  [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
  [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
  [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
  [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

/*
0 = collision
1 = empty space
2 = empty space and teleport
 */

var collisionMap = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
  [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
  [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
  [0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0],
  [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0],
  [2,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,2],
  [0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
  [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0],
  [0,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,0],
  [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
  [0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
  [0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0],
  [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
  [0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

var actors = new Array();

actors.push(new Pacman(tilemap.getPacmanSprites(), 13 * tilemap.TILE_WIDTH, 23 * tilemap.TILE_HEIGHT, 2));
actors.push(new Ghost(tilemap.getRGhostSprites(), 11 * tilemap.TILE_WIDTH, 11 * tilemap.TILE_HEIGHT, 0.8));
actors.push(new Ghost(tilemap.getBGhostSprites(), 13 * tilemap.TILE_WIDTH, 11 * tilemap.TILE_HEIGHT, 1));
actors.push(new Ghost(tilemap.getPGhostSprites(), 15 * tilemap.TILE_WIDTH, 11 * tilemap.TILE_HEIGHT, 1.2));
actors.push(new Ghost(tilemap.getOGhostSprites(), 17 * tilemap.TILE_WIDTH, 11 * tilemap.TILE_HEIGHT, 0.9));

var level = new Level(
  tilemap.getMapSprite(),
  tilemap.getDotSprite(),
  tilemap.getSuperDotSprite(),
  dotArrayMap,
  collisionMap,
  actors
);

//countDots();

setInterval(moveActors, 33);
setInterval(countTimeAlive, 1000);

requestAnimationFrame(updateCanvas);

window.addEventListener("keydown", handleInput, false);

/**
 * Handles the input of the player
 */
function handleInput(e) {
  if (e.type == "keydown") {
    switch (e.keyCode) {
      case 38:
        selectedAction = Actions.UP;
        break;
      case 40:
        selectedAction = Actions.DONW;
        break;
      case 37:
        selectedAction = Actions.LEFT;
        break;
      case 39:
        selectedAction = Actions.RIGHT;
        break;
    }
  }
  e.preventDefault();
}

function updateCanvas() {
  if (tilemap.spritesLoadComplete) {
    updateInputs();
    canvasCtx.fillStyle = "black";
    canvasCtx.fillRect(0, 0, canvas.width, 31 * 8);
    drawGraphics();
  } 
  requestAnimationFrame(updateCanvas);
}

function drawGraphics() {
  level.drawLevel(canvasCtx, canvas);
  for (let i = 1; i < actors.length; i++) {
    actors[i]
      .getShownSprite()
      .drawSprite(canvasCtx, actors[i].getX(), actors[i].getY());
  }
  actors[0]
      .getShownSprite()
      .drawSprite(canvasCtx, actors[0].getX(), actors[0].getY());
}

function moveActors() {
  if (!playing) return;
  s.playSiren(ghostSirenSound);
  for (let i = 0; i < actors.length; i++) {
    actors[i].move();
    if (i > 0) {
      if (actors[i].getActorState() == States.DEAD)
        actors[i].updateGhostPath(level, 13 * tilemap.TILE_WIDTH, 11 * tilemap.TILE_HEIGHT);
      else if (actors[i].getActorState() == States.INVINCIBLE) {
        if (actors[0].getX() > 0 && actors[0].getX() < tilemap.MAP_HEIGHT * 8)
          actors[i].updateGhostPath(level, actors[0].getX(), actors[0].getY());
      }
      else {
        do {
          var xDes = selectRandomTilePos(tilemap.MAP_WIDTH);
          var yDes = selectRandomTilePos(tilemap.MAP_HEIGHT);
          var tileDes = level.calculateTile(xDes, yDes);
        } while (level.isWall(tileDes.x, tileDes.y));
        actors[i].updateGhostPath(level, xDes, yDes);
      }
    } 
  }   
}

function updateInputs() {
  if (selectedAction != Actions.NOACTION && actors[0].hasFinishMovement()) {
    actors[0].validateMove(selectedAction, level);
  }  
}

function selectRandomTilePos(max) {
  return Math.floor(Math.random() * max) * tilemap.TILE_HEIGHT;
}

function countTimeAlive() {
  timeAlive++;
  if (timeAlive % 30 == 0)
    changeDificulty();
}

function countTimeInvincible() {
  timeInvincible++;
  if (timeInvincible == 10) {
    level.makeGhostsInvincible();
    clearInterval(invincibleTimer);
    timeInvincible = 0;
    setSirenSound(dificultyLvl);
  }
}

function changeDificulty() {
  switch (timeAlive) {
    case 30:
      for (let i = 1; i < actors.length; i++)
        actors[i].riseVelocity();
        dificultyLvl = 2;
      ghostSirenSound = 2;
      break;
    case 60:
      for (let i = 1; i < actors.length; i++)
        actors[i].riseVelocity();
        dificultyLvl = 3;
      ghostSirenSound = 3;
      break;
    case 90:
      for (let i = 1; i < actors.length; i++)
        actors[i].riseVelocity();
        dificultyLvl = 4;
      ghostSirenSound = 4;
      break;
    case 120:
      for (let i = 1; i < actors.length; i++)
        actors[i].riseVelocity();
        dificultyLvl = 5;
      ghostSirenSound = 5;

      break;
  }
}

function setSirenSound(siren) {
  ghostSirenSound = siren;
}

function setInvincibleTimer() {
  timeInvincible = 0;
  invincibleTimer = setInterval(countTimeInvincible, 1000);
}

function getTimeInvicible() {
  return timeInvincible;
}

function getDificultyLvl() {
  return dificultyLvl;
}

function winGame() {
  playing = false;
  s.playWinAudio();
  canvasCtx.fillStyle = "black";
  canvasCtx.fillRect(0, 31 * 8, canvas.width / 2, canvas.height);
  canvasCtx.font = "16px Comic Sans MS";
  canvasCtx.fillStyle = "white";
  canvasCtx.fillText("YOU WIN", 10, 270);
}

function loseGame() {
  playing = false;
  s.playLoseAudio();
  canvasCtx.fillStyle = "black";
  canvasCtx.fillRect(0, 31 * 8, canvas.width / 2, canvas.height);
  canvasCtx.font = "16px Comic Sans MS";
  canvasCtx.fillStyle = "white";
  canvasCtx.fillText("YOU LOSE", 10, 270);
}

function countDots() {
  var sum = 0;
  for (let i = 0; i < dotArrayMap.length; i++) {
    for (let j = 0; j < dotArrayMap[0].length; j++) {
      if (dotArrayMap[i][j] > 0){
        sum++;
      }
      
    }
    
  }
  console.log(sum);
}
