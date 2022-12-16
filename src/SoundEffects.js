export default class SoundEffects {
  constructor() {
    this.rollEffect = new Audio("../assets/roll-dice.wav");
    this.farkleEffect = new Audio("../assets/farkle.mp3");
    this.endTurnEffect = new Audio("../assets/end-turn.mp3");
    this.selectDeselectEffect = new Audio("../assets/select-deselect.mp3");
    this.errorEffect = new Audio("../assets/error.mp3");
    this.startGameEffect = new Audio("../assets/start-game.mp3");
    this.winGameEffect = new Audio("../assets/win-game.mp3");
    this.endGameEffect = new Audio("../assets/end-game.mp3");
  }

  roll() {
    this.rollEffect.currentTime = 0;
    this.rollEffect.play();
  }

  farkle() {
    this.farkleEffect.currentTime = 0;
    this.farkleEffect.play();
  }

  endTurn() {
    this.endTurnEffect.currentTime = 0;
    this.endTurnEffect.play();
  }

  select() {
    this.selectDeselectEffect.currentTime = 0;
    this.selectDeselectEffect.play();
  }

  deselect() {
    this.selectDeselectEffect.currentTime = 0;
    this.selectDeselectEffect.play();
  }

  error() {
    this.errorEffect.currentTime = 0;
    this.errorEffect.play();
  }

  startGame() {
    this.startGameEffect.currentTime = 0;
    this.startGameEffect.play();
  }

  winGame() {
    this.winGameEffect.currentTime = 0;
    this.winGameEffect.play();
  }

  endGame() {
    this.endGameEffect.currentTime = 0;
    this.endGameEffect.play();
  }

  bonus() {
    this.startGameEffect.currentTime = 0;
    this.startGameEffect.play();
  }
}
