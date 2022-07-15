/**
 * Sounds of the game and the methods to play them.
 */

class Sounds {
  munch1 = document.getElementById("munch_1");
  munch2 = document.getElementById("munch_2");
  eatGhostSound = document.getElementById("eat_ghost");
  siren1 = document.getElementById("siren_1");
  siren2 = document.getElementById("siren_2");
  siren3 = document.getElementById("siren_3");
  siren4 = document.getElementById("siren_4");
  siren5 = document.getElementById("siren_5");
  retreatingAudio = document.getElementById("retreating");
  powerPelletAudio = document.getElementById("power_pellet");
  intermission = document.getElementById("intermission");
  death = document.getElementById("death");

  previousMunch;

  constructor() {
    this.previousMunch = 1;
  }

  playEatingDotsAudio() {
    switch (this.previousMunch) {
      case 0:
        this.munch2.currentTime = 0;
        this.munch2.play();
        this.previousMunch = 1;
        break;
      case 1:
        this.munch1.currentTime = 0;
        this.munch1.play();
        this.previousMunch = 0;
        break;
    }
  }

  playEatGhostAudio() {
    this.eatGhostSound.play();
  }

  playSiren(sirenId) {
    switch (sirenId) {
      case 1:
        this.siren1.play();
        break;
      case 2:
        this.siren2.play();
        break;
      case 3:
        this.siren3.play();
        break;
      case 4:
        this.siren4.play();
        break;
      case 5:
        this.siren5.play();
        break;
      case 6:
        this.retreatingAudio.play();
        break;
      case 7:
        this.powerPelletAudio.play();
        break;
    }
  }

  playWinAudio() {
    this.intermission.play();
  }

  playLoseAudio() {
    this.death.play();
  }
}
