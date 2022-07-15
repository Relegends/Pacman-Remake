/**
 * Creates the level of Pacman and helps to define win and defeat conditions.
 */

class Level {
  mapSprite;
  dotSprite;
  superDotSprite;

  // Remaining dots in the maze
  remainingDots = 244;

  // Score obtain by the player
  score = 0;

  dotArrayMap;
  collisionMap;

  actors;

  s;

  constructor(
    mapSprite,
    dotSprite,
    superDotSprite,
    dotArrayMap,
    collisionMap,
    actors
  ) {
    this.mapSprite = mapSprite;
    this.dotSprite = dotSprite;
    this.superDotSprite = superDotSprite;
    this.dotArrayMap = dotArrayMap;
    this.collisionMap = collisionMap;
    this.actors = actors;
    this.s = new Sounds();
  }

  drawLevel(ctxCanvas, canvas) {
    this.drawMap(ctxCanvas);
    this.drawDots(ctxCanvas);
    this.drawScore(ctxCanvas, canvas);
  }

  /**
   * Draws the maze.
   */
  drawMap(ctxCanvas) {
    this.mapSprite.drawSprite(ctxCanvas, 1, 2);
  }

  /**
   * Draws the dots in their positions using the dot array map.
   */
  drawDots(ctxCanvas) {
    for (let y = 0; y < this.dotArrayMap.length; y++) {
      for (let x = 0; x < this.dotArrayMap[0].length; x++) {
        if (this.dotArrayMap[y][x] == 1)
          this.dotSprite.drawSprite(ctxCanvas, x * 8, y * 8);
        else if (this.dotArrayMap[y][x] == 2)
          this.superDotSprite.drawSprite(ctxCanvas, x * 8, y * 8);
      }
    }
  }

  /**
   * Draws the score in the bottom of the canvas.
   */
  drawScore(ctxCanvas, canvas) {
    canvasCtx.fillStyle = "black";
    canvasCtx.fillRect((28 * 8) / 2, 32 * 8, canvas.width, canvas.height);
    ctxCanvas.font = "16px Comic Sans MS";
    ctxCanvas.fillStyle = "white";
    ctxCanvas.fillText(this.score, 150, 270);
  }

  /**
   * Calculates the tile given a position in the canvas.
   */
  calculateTile(x, y) {
    var tileX = Math.floor(x / 8);
    var tileY = Math.floor(y / 8);
    return { x: tileX, y: tileY };
  }

  /**
   * Checks if the tile position correspond to a not walkable space.
   */
  isWall(x, y) {
    var a = this.collisionMap[y][x];
    if (this.collisionMap[y][x] == 0) return true;
    else return false;
  }

  /**
   * Update de dot array matrix and counts how many dots remains.
   */
  updateDotArrayMap(x, y) {
    switch (this.dotArrayMap[y][x]) {
      case 1:
        this.dotArrayMap[y][x] = 0;
        this.remainingDots--;
        this.score += 10;
        this.s.playEatingDotsAudio();
        break;
      case 2:
        this.dotArrayMap[y][x] = 0;
        this.remainingDots--;
        this.score += 50;
        this.makePacmanInvincible();
        setInvincibleTimer();
        break;
    }

    if (this.remainingDots == 0) {
      winGame();
    }
  }

  getCollisionMap() {
    return this.collisionMap;
  }

  getScore() {
    return this.score;
  }

  getLevelActors() {
    return this.actors;
  }

  makePacmanInvincible() {
    this.actors[0].setActorState(States.INVINCIBLE);
    for (let i = 1; i < this.actors.length; i++)
      if (this.actors[i].isAlive())
        this.actors[i].setActorState(States.VULNERABLE);
    setSirenSound(7);
  }

  makeGhostsInvincible() {
    this.actors[0].setActorState(States.VULNERABLE);
    for (let i = 1; i < this.actors.length; i++)
      if (this.actors[i].isAlive())
        this.actors[i].setActorState(States.INVINCIBLE);
    setSirenSound(getDificultyLvl());
  }

  areAllGhostsAlive() {
    for (let i = 1; i < this.actors.length; i++) {
      if (!this.actors[i].isAlive) return false;
    }
    return true;
  }

  areAllGhostsInvincible() {
    for (let i = 1; i < this.actors.length; i++) {
      if (!this.actors[i].isInvicible()) return false;
    }
    return true;
  }

  addPointsToScore(addScore) {
    this.score += addScore;
  }
}
