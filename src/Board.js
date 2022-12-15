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
    this.selectedDiceObjectGroups = [];
    this.buttonWrapper = document.getElementById("btn-wrapper");
    this.endGameButton = this.setEndGameButton();
    this.endTurnButton = this.setEndTurnButton();
    this.rollDiceButton = this.setRollDiceButton();
    this.footer = document.getElementById("footer");
  }

  render() {
    this.startWrapper.classList.add("hidden");
    this.activeDice.forEach((die) => {
      this.activeDiceContainer.appendChild(die.element);
    });
  }

  remove() {
    this.dice = [];
    this.activeDiceContainer.innerHTML = "";
    this.selectedDiceContainer.innerHTML = "";
    this.footer.innerHTML = "";
    this.endGameButton.remove();
    this.endTurnButton.remove();
    this.rollDiceButton.remove();
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
    this.selectedDiceObjectGroups = [];
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

  addSelectedDiceObjectGroup() {
    this.selectedDiceObjectGroups.push([]);
  }

  calculatePotentialScore(dice) {
    return new Parser(dice).calculate();
  }

  calculateTurnScore() {
    let score = 0;
    this.selectedDiceObjectGroups.forEach((group) => {
      score += new Parser(group).calculate();
    });

    return score;
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

  get activeSelectedDiceObjectGroup() {
    return this.selectedDiceObjectGroups[
      this.selectedDiceObjectGroups.length - 1
    ];
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

  clearMessage() {
    this.messageContainer.textContent = "";
  }

  printFarkleMessage() {
    this.messageContainer.textContent = this.farkleMessage;
  }
}
