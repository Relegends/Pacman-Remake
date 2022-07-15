/**
 * Defines the player.
 */

class Pacman extends Actor {

  // Last sprite shown
  previousShownSprite;

  // Last taken and validated action
  previousValidAction;

  constructor(spritesArray, xPos, yPos, velocity) {
    super(spritesArray, xPos, yPos, velocity);

    this.shownSprite = 0;
    this.previousShownSprite = 8;

    this.state = States.VULNERABLE;
  }

  updateSpriteAnimation(direction) {
    if (this.previousShownSprite % 2 == 0) {
      this.shownSprite = 8;
      this.previousShownSprite = 1;
    } else {
      switch (direction) {
        case Actions.UP:
          if (this.previousShownSprite == 8) {
            this.shownSprite = 4;
            this.previousShownSprite = 5;
          } else {
            this.previousShownSprite = this.shownSprite;
            this.shownSprite = 5;
          }
          break;
        case Actions.DOWN:
          if (this.previousShownSprite == 8) {
            this.shownSprite = 6;
            this.previousShownSprite = 7;
          } else {
            this.previousShownSprite = this.shownSprite;
            this.shownSprite = 7;
          }
          break;
        case Actions.LEFT:
          if (this.previousShownSprite == 8) {
            this.shownSprite = 2;
            this.previousShownSprite = 3;
          } else {
            this.previousShownSprite = this.shownSprite;
            this.shownSprite = 3;
          }
          break;
        case Actions.RIGHT:
          if (this.previousShownSprite == 8) {
            this.shownSprite = 0;
            this.previousShownSprite = 1;
          } else {
            this.previousShownSprite = this.shownSprite;
            this.shownSprite = 1;
          }
          break;
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

    if (nextTile.y == 14) {
      if (nextTile.x == -2) {
        nextTile.x = 27;
        nextXPos = 27 * 8;
      } else if (nextTile.x == 29) {
        nextTile.x = 0;
        nextXPos = 0;
      }
    }

    if (!level.isWall(nextTile.x, nextTile.y) && !this.isMoving) {
      this.xDes = nextXPos;
      this.yDes = nextYPos;
      this.isMoving = true;
      level.updateDotArrayMap(nextTile.x, nextTile.y);
      this.previousValidAction = direction;
      this.checkCollisionWithGhost(nextTile, level);
    } else {
      switch (this.previousValidAction) {
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
        level.updateDotArrayMap(nextTile.x, nextTile.y);
        this.checkCollisionWithGhost(nextTile, level);
      }
    }
  }

  /**
   * Checks if there're any collision any ghost and updates the actors' states.
   */
  checkCollisionWithGhost(nextTile, level) {
    var actors = level.getLevelActors();
    for (let i = 1; i < actors.length; i++) {
      var ghostPos = level.calculateTile(actors[i].getX(), actors[i].getY());
      if (nextTile.x == ghostPos.x && nextTile.y == ghostPos.y) {
        if (actors[i].getActorState() == States.INVINCIBLE) {
          this.state = States.DEAD;
          this.shownSprite = 8;
          loseGame();
        } else if (
          this.state == States.INVINCIBLE &&
          actors[i].getActorState() == States.VULNERABLE
        ) {
          actors[i].setActorState(States.DEAD);
          this.s.playEatGhostAudio();
          level.addPointsToScore(200);
          setSirenSound(6);
        }
      }
    }
  }

  playDeathAnimation() {
    this.shownSprite++;
    if (this.shownSprite == 20) {
      this.xPos = 8;
      this.yPos = 8;
      this.shownSprite = 0;
      this.state = States.VULNERABLE;
    }
  }

  resurrect() {
    this.setActorState(States.VULNERABLE);
  }
}
