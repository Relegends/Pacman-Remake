/**
 * Defines an enemy in the game.
 */

class Ghost extends Actor {
  
  // Path to the destination tile.
  path;

  constructor(spritesArray, xPos, yPos, velocity) {
    super(spritesArray, xPos, yPos, velocity);

    this.shownSprite = 7;

    this.state = States.INVINCIBLE;
    this.previousSelectedAction = Actions.NOACTION;
  }

  updateSpriteAnimation(direction) {
    switch (direction) {
      case Actions.UP:
        switch (this.state) {
          case States.INVINCIBLE:
            if (this.shownSprite % 2 == 0) this.shownSprite = 5;
            else this.shownSprite = 4;
            break;
          case States.VULNERABLE:
            if (this.shownSprite % 2 == 0) this.shownSprite = 9;
            else this.shownSprite = 8;
            break;
          case States.DEAD:
            this.shownSprite = 14;
            break;
        }

        break;
      case Actions.DOWN:
        switch (this.state) {
          case States.INVINCIBLE:
            if (this.shownSprite % 2 == 0) this.shownSprite = 7;
            else this.shownSprite = 6;
            break;
          case States.VULNERABLE:
            if (this.shownSprite % 2 == 0) this.shownSprite = 9;
            else this.shownSprite = 8;
            break;
          case States.DEAD:
            this.shownSprite = 15;
            break;
        }
        break;
      case Actions.LEFT:
        switch (this.state) {
          case States.INVINCIBLE:
            if (this.shownSprite % 2 == 0) this.shownSprite = 3;
            else this.shownSprite = 2;
            break;
          case States.VULNERABLE:
            if (this.shownSprite % 2 == 0) this.shownSprite = 9;
            else this.shownSprite = 8;
            break;
          case States.DEAD:
            this.shownSprite = 13;
            break;
        }

        break;
      case Actions.RIGHT:
        switch (this.state) {
          case States.INVINCIBLE:
            if (this.shownSprite % 2 == 0) this.shownSprite = 1;
            else this.shownSprite = 0;
            break;
          case States.VULNERABLE:
            if (this.shownSprite % 2 == 0) this.shownSprite = 9;
            else this.shownSprite = 8;
            break;
          case States.DEAD:
            this.shownSprite = 12;
            break;
        }
        break;
    }
  }

  /**
   * Updates the ghost's path using the A* alghorithm and selects the best action to be taken.
   */
  updateGhostPath(level, newXPos, newYPos) {
    var collisionMapGraph = new Graph(level.getCollisionMap());
    var tileDes = level.calculateTile(newXPos, newYPos);
    var tileGhost = level.calculateTile(this.xPos, this.yPos);

    var end = collisionMapGraph.grid[tileDes.y][tileDes.x];
    var init = collisionMapGraph.grid[tileGhost.y][tileGhost.x];

    this.path = astar.search(collisionMapGraph, init, end);

    if (this.path.length > 0) {
      if (this.path[0].y < tileGhost.x) {
        this.validateMove(Actions.LEFT, level);
      } else if (this.path[0].y > tileGhost.x) {
        this.validateMove(Actions.RIGHT, level);
      } else if (this.path[0].x < tileGhost.y) {
        this.validateMove(Actions.UP, level);
      } else if (this.path[0].x > tileGhost.y) {
        this.validateMove(Actions.DONW, level);
      }
    } else {
      if (!this.isAlive()) {
        this.resurrect(level);
      }
    }
  }

  validateMove(direction, level) {
    switch (direction) {
      case Actions.UP:
        var nextXPos = this.xPos;
        var nextYPos = this.yPos - 8;
        break;
      case Actions.DONW:
        var nextXPos = this.xPos;
        var nextYPos = this.yPos + 8;
        break;
      case Actions.LEFT:
        var nextXPos = this.xPos - 8;
        var nextYPos = this.yPos;
        break;
      case Actions.RIGHT:
        var nextXPos = this.xPos + 8;
        var nextYPos = this.yPos;
        break;
    }

    var nextTile = level.calculateTile(nextXPos, nextYPos);

    if (!level.isWall(nextTile.x, nextTile.y) && !this.isMoving) {
      this.xDes = nextXPos;
      this.yDes = nextYPos;
      this.isMoving = true;
      this.previousSelectedAction = direction;
      this.checkCollisionWithPacman(nextTile, level);
    }
  }

  /**
   * Checks if there're any collision with Pacman and updates the actors' states.
   */
  checkCollisionWithPacman(nextTile, level) {
    var actors = level.getLevelActors();

    var pacmanPos = level.calculateTile(actors[0].getX(), actors[0].getY());
    if (nextTile.x == pacmanPos.x && nextTile.y == pacmanPos.y) {
      if (this.state == States.VULNERABLE) {
        this.state = States.DEAD;
        this.s.playEatGhostAudio();
        level.addPointsToScore(200);
        setSirenSound(6);
      } else if (this.state == States.INVINCIBLE) {
        actors[0].setActorState(States.DEAD);
        loseGame();
      }
    }
  }

  /**
   * Changes the actor state to invincible and updates the sounds.
   */
  resurrect(level) {
    this.setActorState(States.INVINCIBLE);
    if (level.areAllGhostsAlive()) {
      if (!level.areAllGhostsInvincible()) {
        setSirenSound(7);
      } else setSirenSound(getDificultyLvl());
    }
  }
}
