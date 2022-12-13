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
    this.rollEffect.play();
  }

  farkle() {
    this.farkleEffect.play();
  }

  endTurn() {
    this.endTurnEffect.play();
  }

  select() {
    this.selectDeselectEffect.play();
  }

  deselect() {
    this.selectDeselectEffect.play();
  }

  error() {
    this.errorEffect.play();
  }

  startGame() {
    this.startGameEffect.play();
  }

  winGame() {
    this.winGameEffect.play();
  }

  endGame() {
    this.endGameEffect.play();
  }
}
