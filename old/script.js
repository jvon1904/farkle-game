const chance = new Chance();
const game = new Game();
const toggleSwitch = document.querySelector(".switch");
const toggleCircle = document.querySelector(".circle");
const body = document.querySelector("body");
const dice = document.querySelectorAll(".dice");
const numberInput = document.getElementById("diceNumber");
const startButton = document.getElementById("btn-start");
const clearButton = document.getElementById("btn-clear");
const rollButton = document.getElementById("btn-roll");
const endButton = document.getElementById("btn-end");
const startWrapper = document.getElementById("start-wrapper");
const nameInput = document.getElementById("playerName");

window.onload = () => {
  nameInput.placeholder = chance.first();
};

toggleSwitch.addEventListener("click", () => {
  toggleCircle.classList.toggle("circleOn");
  toggleSwitch.classList.toggle("switchOn");
  body.classList.toggle("dark");
});

startButton.addEventListener("click", () => {
  game.startGame(nameInput.value ? nameInput.value : nameInput.placeholder);
  startWrapper.classList.toggle("hidden");
  clearButton.classList.toggle("hidden");
  rollButton.classList.toggle("hidden");
  endButton.classList.toggle("hidden");
});

clearButton.addEventListener("click", () => {
  game.clearGame();
  startWrapper.classList.toggle("hidden");
  clearButton.classList.toggle("hidden");
  rollButton.classList.toggle("hidden");
  endButton.classList.toggle("hidden");
});

rollButton.addEventListener("click", () => {
  game.rollDice();
});

endButton.addEventListener("click", () => {
  game.currentPlayer.endTurn();
});
