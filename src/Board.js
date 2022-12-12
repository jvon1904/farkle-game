import Die from "./Die.js";
import Parser from "./Parser.js";

export default class Board {
  constructor(game) {
    this.ready = true;
    this.farkle = false;
    this.farkleMessage = "Farkle! Please end your turn.";
    this.game = game;
    this.dice = this.setDice();
    this.messageContainer = document.getElementById("message-container");
    this.startWrapper = document.getElementById("start-wrapper");
    this.activeDiceContainer = document.getElementById("active-dice-container");
    this.selectedDiceContainer = document.getElementById(
      "selected-dice-container"
    );
    this.selectedDiceGroups = [];
    this.buttonWrapper = document.getElementById("btn-wrapper");
    this.endGameButton = this.setEndGameButton();
    this.endTurnButton = this.setEndTurnButton();
    this.rollDiceButton = this.setRollDiceButton();
    this.playerName = this.setPlayerName();
    this.turnScore = this.setTurnScore();
    this.totalScore = this.setTotalScore();
  }

  render() {
    this.startWrapper.classList.add("hidden");
    this.updatePlayerName();
    this.updateTurnScore();
    this.updateTotalScore();
    this.activeDice.forEach((die) => {
      this.activeDiceContainer.appendChild(die.element);
    });
  }

  remove() {
    this.dice = [];
    this.activeDiceContainer.innerHTML = "";
    this.selectedDiceContainer.innerHTML = "";
    this.endGameButton.remove();
    this.endTurnButton.remove();
    this.rollDiceButton.remove();
    this.playerName.textContent = "";
    this.turnScore.textContent = "";
    this.totalScore.textContent = "";
    this.startWrapper.classList.remove("hidden");
  }

  setDice() {
    let dice = [];
    for (let i = 0; i < 6; i++) {
      dice.push(new Die(i, this));
    }

    return dice;
  }

  resetDice() {
    this.dice = [];
    this.activeDiceContainer.innerHTML = "";
    this.selectedDiceContainer.innerHTML = "";
    this.updatePlayerName();
    this.updateTurnScore();
    this.updateTotalScore();
    this.dice = this.setDice();
    this.activeDice.forEach((die) => {
      this.activeDiceContainer.appendChild(die.element);
    });
  }

  addSelectedDiceGroup() {
    let element = document.createElement("div");
    element.classList.add("selected-dice-group");
    element.setAttribute("number", this.selectedDiceGroups.length + 1);
    this.selectedDiceGroups.push(element);
    this.selectedDiceContainer.appendChild(element);
  }

  calculatePotentialScore(dice) {
    return new Parser(dice).calculate();
  }

  get activeDice() {
    return this.dice.filter((die) => die.active);
  }

  get selectedDice() {
    return this.dice.filter((die) => die.selected);
  }

  get activeSelectedDiceGroup() {
    return this.selectedDiceGroups[this.selectedDiceGroups.length - 1];
  }

  // Link buttons to HTML elements

  // End Game
  setEndGameButton() {
    let element = document.createElement("button");
    element.textContent = "End Game";
    element.addEventListener("click", () => {
      this.messageContainer.textContent = "";
      this.game.endGame();
    });
    this.buttonWrapper.appendChild(element);

    return element;
  }

  // End Turn
  setEndTurnButton() {
    let element = document.createElement("button");
    element.textContent = "End Turn";
    element.addEventListener("click", () => {
      this.messageContainer.textContent = "";
      this.game.endTurn();
    });
    this.buttonWrapper.appendChild(element);

    return element;
  }

  // Roll Dice
  setRollDiceButton() {
    let element = document.createElement("button");
    element.textContent = "Roll Dice";
    element.addEventListener("click", () => {
      this.messageContainer.textContent = "";
      this.game.rollDice();
    });
    this.buttonWrapper.appendChild(element);

    return element;
  }

  // Render player & score information in footer

  // Active Player Name
  setPlayerName() {
    let element = document.getElementById("player-name-display");

    return element;
  }

  updatePlayerName() {
    this.playerName.textContent = this.game.activePlayer.name;
  }

  // Active Player Turn Score
  setTurnScore() {
    let element = document.getElementById("turn-score-display");

    return element;
  }

  updateTurnScore() {
    this.turnScore.textContent = this.game.activePlayer.turnScore;
  }

  // Active Player Total Score
  setTotalScore() {
    let element = document.getElementById("total-score-display");

    return element;
  }

  updateTotalScore() {
    this.totalScore.textContent = this.game.activePlayer.totalScore;
  }

  clearMessage() {
    this.messageContainer.textContent = "";
  }

  printFarkleMessage() {
    this.messageContainer.textContent = this.farkleMessage;
  }
}
