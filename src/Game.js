import Player from "./Player.js";
import Board from "./Board.js";
import SoundEffects from "./SoundEffects.js";

export default class Game {
  constructor(names) {
    if (names.some((name) => name === "")) throw "Name cannot be blank";
    this.winningLimit = 10000;
    this.players = this.setPlayers(names);
    this.board = new Board(this);
    this.winContainer = document.getElementById("win-container");
    this.soundEffects = new SoundEffects();
  }

  startGame() {
    this.soundEffects.startGame();
    this.players[0].activate();
    this.board.render();
  }

  endGame() {
    this.soundEffects.endGame();
    this.board.remove();
  }

  winGame() {
    this.soundEffects.winGame();
    this.winContainer.innerHTML = `<h1>${this.activePlayer.name} wins with a score of ${this.activePlayer.totalScore}!</h1>`;
    this.winContainer.classList.remove("hidden");
    this.endGame();
  }

  endTurn() {
    this.soundEffects.endTurn();
    this.activePlayer.totalScore += this.activePlayer.turnScore;
    if (this.activePlayer.totalScore >= this.winningLimit) {
      this.winGame();
      return;
    }
    this.board.farkle = false;
    this.board.ready = true;
    this.board.resetDice();
    this.nextPlayer();
  }

  rollDice() {
    if (this.board.activeDice.length === 0) {
      this.soundEffects.error();
      this.board.messageContainer.textContent = "No dice to roll.";
      return;
    }
    if (this.board.farkle) {
      this.soundEffects.error();
      this.board.printFarkleMessage();
      return;
    }
    if (!this.board.ready) {
      this.soundEffects.error();
      this.board.messageContainer.textContent =
        "You must select at least one die.";
      return;
    }
    if (
      this.board.selectedDice.length > 0 &&
      this.activePlayer.turnScore <= this.activePlayer.previousTurnScore
    ) {
      this.soundEffects.error();
      this.board.messageContainer.textContent =
        "You must select scoring dice before rolling again.";
      return;
    }
    this.soundEffects.roll();
    this.board.activeDice.forEach((die) => {
      die.roll();
    });
    let farkle =
      this.board.calculatePotentialScore(this.board.activeDice) === 0;
    if (farkle) {
      return this.farkle();
    }
    this.board.addSelectedDiceGroup();
    this.board.ready = false;
  }

  farkle() {
    this.soundEffects.farkle();
    this.board.farkle = true;
    this.board.ready = false;
    this.board.messageContainer.textContent = "You got a farkle!";
    this.activePlayer.turnScore = 0;
  }

  setPlayers(names) {
    let players = [];
    names.forEach((name, index) => {
      players.push(new Player(name, index));
    });

    return players;
  }

  getPlayer(i) {
    return this.players[i];
  }

  get numberOfPlayers() {
    return this.players.length;
  }

  get activePlayer() {
    return this.players.find((player) => player.active);
  }

  get activePlayerIndex() {
    return this.activePlayer.index;
  }

  nextPlayer() {
    let nextIndex = (this.activePlayerIndex + 1) % this.numberOfPlayers;
    this.activePlayer.deactivate();
    this.players[nextIndex].activate();
    this.activePlayer.previousTurnScore = 0;
    this.activePlayer.turnScore = 0;
  }
}
