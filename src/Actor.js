/*
Abstract class to create the different types of character in the game.
*/

class Actor {

  // Sprites of the actor
  spritesArray;

  // Position in the canvas
  xPos;
  yPos;

  // Velocity of the actor
  velocity;

  // Determines if the actor is moving
  isMoving;

  // Destination in the canvas
  xDes;
  yDes;

  // The sprite that is shown to the player
  shownSprite;

  // State of the actor
  state;

  // Sounds
  s;

  constructor(spritesArray, xPos, yPos, velocity) {
    if (this.constructor == Actor)
      throw new Error('Class "Actor" cannot be instantiated!');

    this.spritesArray = spritesArray;
    this.xPos = xPos;
    this.yPos = yPos;

    this.xDes = xPos;
    this.yDes = this.yPos;

    this.velocity = velocity;

    this.s = new Sounds();
  }

  /*
  Updates the sprite shown to the player depending on the chosen action.
   */
  updateSpriteAnimation(direction) {
    throw new Error('Method "updateSpriteAnimation()" must be implemented!');
  }

  /*
  Checks if the chosen action performs a valid move and sets a new destination for the actor.
   */
  validateMove(direction, level) {
    throw new Error('Method "validateMove()" must be implemented!');
  }

  /*
  Returns if the movement of the actor has finished.
   */
  hasFinishMovement() {
    if (this.xPos == this.xDes && this.yPos == this.yDes) {
      this.isMoving = false;
      return true;
    } else return false;
  }

  /*
  Changes the position of the actor in the canvas and sets the action chosen.
   */
  move() {
    if (this.isMoving) {
      if (this.xPos == -8) this.xPos = 27 * 8;
      else if (this.xPos == 28 * 8) this.xPos = 0;

      if (this.xPos < this.xDes) {
        this.xPos += this.velocity;
        if (this.xPos > this.xDes) this.xPos = this.xDes;
        this.updateSpriteAnimation(Actions.RIGHT);
      } else if (this.xPos > this.xDes) {
        this.xPos -= this.velocity;
        if (this.xPos < this.xDes) this.xPos = this.xDes;
        this.updateSpriteAnimation(Actions.LEFT);
      } else if (this.yPos > this.yDes) {
        this.yPos -= this.velocity;
        if (this.yPos < this.yDes) this.yPos = this.yDes;
        this.updateSpriteAnimation(Actions.UP);
      } else if (this.yPos < this.yDes) {
        this.yPos += this.velocity;
        if (this.yPos > this.yDes) this.yPos = this.yDes;
        this.updateSpriteAnimation(Actions.DOWN);
      } else this.isMoving = false;
    }
  }

  getX() {
    return this.xPos;
  }

  getY() {
    return this.yPos;
  }

  getShownSprite() {
    return this.spritesArray[this.shownSprite];
  }

  getActorSprites() {
    return this.spritesArray;
  }

  getActorState() {
    return this.state;
  }

  setActorState(newState) {
    this.state = newState;
  }

  /*
  Checks if the state of the actor is not dead.
   */
  isAlive() {
    return this.state != States.DEAD;
  }

  /*
  Change the state of the actor to vulnerable or invincible.
   */
  resurrect() {
    throw new Error('Method "resurrect()" must be implemented!');
  }

  riseVelocity() {
    this.velocity += 0.3;
  }

  isInvicible() {
    return this.state == States.INVINCIBLE;
  }
}
