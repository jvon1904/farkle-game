import Player from "./Player.js";
import Board from "./Board.js";

export default class Game {
  constructor(names) {
    console.log(names);
    if (names.some((name) => name === "")) throw "Name cannot be blank";
    this.players = this.setPlayers(names);
    this.board = new Board(this);
  }

  startGame() {
    this.players[0].activate();
    this.board.render();
    console.log(this);
  }

  endGame() {
    this.board.remove();
  }

  endTurn() {
    this.activePlayer.totalScore += this.activePlayer.turnScore;
    this.board.farkle = false;
    this.board.ready = true;
    this.board.resetDice();
    this.nextPlayer();
    this.board.updateTurnScore();
    this.board.updateTotalScore();
    this.board.updatePlayerName();
  }

  rollDice() {
    if (this.board.activeDice.length === 0) {
      this.board.messageContainer.textContent = "No dice to roll.";
      return;
    }
    if (this.board.farkle) {
      this.board.printFarkleMessage();
      return;
    }
    if (!this.board.ready) {
      this.board.messageContainer.textContent =
        "You must select at least one die.";
      return;
    }
    if (
      this.board.selectedDice.length > 0 &&
      this.activePlayer.turnScore <= this.activePlayer.previousTurnScore
    ) {
      this.board.messageContainer.textContent =
        "You must select scoring dice before rolling again.";
      return;
    }
    this.board.activeDice.forEach((die) => {
      die.roll();
    });
    console.log(this.board.calculatePotentialScore(this.board.activeDice));
    let farkle =
      this.board.calculatePotentialScore(this.board.activeDice) === 0;
    if (farkle) {
      return this.farkle();
    }
    this.board.addSelectedDiceGroup();
    this.board.ready = false;
  }

  farkle() {
    this.board.farkle = true;
    this.board.ready = false;
    this.board.messageContainer.textContent = "You got a farkle!";
    this.activePlayer.turnScore = 0;
    this.board.updateTurnScore();
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
