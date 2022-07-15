/*
  Creates the sprites of the game by cropping the image.
*/

class Tilemap {
  ctxCanvas;

  TILE_WIDTH = 8;
  TILE_HEIGHT = 8;
  MAP_WIDTH = 28;
  MAP_HEIGHT = 31;

  mapSprite;
  dotSprite;
  superDotSprite;

  // Determines if all the necessary graphics in the game has been loaded.
  spritesLoadComplete = false;

  pacmanSprites = new Array();
  rGhostSprites = new Array();
  bGhostSprites = new Array();
  pGhostSprites = new Array();
  oGhostSprites = new Array();
  scaredGhostSprites = new Array();
  eyeGhostSprites = new Array();

  // Image to by cropped.
  tilemapImage = new Image();

  constructor(ctxCanvas) {
    this.ctxCanvas = ctxCanvas;
    this.tilemapImage.src = "images/sprites.png";
    this.tilemapImage.onload = this.getSpritesFromTilemap();
  }

  /*
  Process the differents sprites in the tilemap.
   */
  getSpritesFromTilemap() {
    this.createMapSprite();
    this.createDotSprite();
    this.createSuperDotSprite();
    this.createPacmanSprites();
    this.createGhostsSprites();
  }

  createMapSprite() {
    this.mapSprite = new Sprite(
      this.tilemapImage,
      228,
      0,
      this.TILE_WIDTH * this.MAP_WIDTH,
      this.TILE_HEIGHT * this.MAP_HEIGHT
    );
  }

  createDotSprite() {
    this.dotSprite = new Sprite(
      this.tilemapImage,
      639,
      28,
      this.TILE_WIDTH,
      this.TILE_HEIGHT
    );
  }

  createSuperDotSprite() {
    this.superDotSprite = new Sprite(
      this.tilemapImage,
      630,
      28,
      this.TILE_WIDTH,
      this.TILE_HEIGHT
    );
  }

  createPacmanSprites() {
    for (var ySprite = 0; ySprite < 64; ySprite += this.TILE_HEIGHT * 2) {
      for (var xSprite = 456; xSprite < 488; xSprite += this.TILE_WIDTH * 2) {
        this.addSpriteToList(this.pacmanSprites, xSprite, ySprite);
      }
    }

    for (var xSprite = 488; xSprite < 680; xSprite += this.TILE_WIDTH * 2) {
      this.addSpriteToList(this.pacmanSprites, xSprite, 0);
    }
  }

  createGhostsSprites() {
    for (var ySprite = 64; ySprite < 128; ySprite += this.TILE_HEIGHT * 2) {
      for (var xSprite = 456; xSprite < 584; xSprite += this.TILE_WIDTH * 2) {
        switch (ySprite) {
          case 64:
            this.addSpriteToList(this.rGhostSprites, xSprite, ySprite);
            break;
          case 80:
            this.addSpriteToList(this.pGhostSprites, xSprite, ySprite);
            break;
          case 96:
            this.addSpriteToList(this.bGhostSprites, xSprite, ySprite);
            break;
          case 112:
            this.addSpriteToList(this.oGhostSprites, xSprite, ySprite);
            break;
        }
      }
    }

    for (var ySprite = 64; ySprite < 96; ySprite += this.TILE_HEIGHT * 2) {
      for (var xSprite = 584; xSprite < 648; xSprite += this.TILE_WIDTH * 2) {
        for (let i = 0; i < 4; i++) {
          switch (i) {
            case 0:
              this.addSpriteToList(this.rGhostSprites, xSprite, ySprite);
              break;
            case 1:
              this.addSpriteToList(this.pGhostSprites, xSprite, ySprite);
              break;
            case 2:
              this.addSpriteToList(this.bGhostSprites, xSprite, ySprite);
              break;
            case 3:
              this.addSpriteToList(this.oGhostSprites, xSprite, ySprite);
              break;
          }
        }
      }
    }

    this.spritesLoadComplete = true;
  }

  addSpriteToList(spriteList, xSprite, ySprite) {
    spriteList.push(
      new Sprite(
        this.tilemapImage,
        xSprite,
        ySprite,
        this.TILE_WIDTH * 2,
        this.TILE_HEIGHT * 2
      )
    );
  }

  getPacmanSprites() {
    return this.pacmanSprites;
  }

  getBGhostSprites() {
    return this.bGhostSprites;
  }

  getRGhostSprites() {
    return this.rGhostSprites;
  }

  getPGhostSprites() {
    return this.pGhostSprites;
  }

  getOGhostSprites() {
    return this.oGhostSprites;
  }

  getScaredGhostSprites() {
    return this.scaredGhostSprites;
  }

  getMapSprite() {
    return this.mapSprite;
  }

  getDotSprite() {
    return this.dotSprite;
  }

  getSuperDotSprite() {
    return this.superDotSprite;
  }
}
