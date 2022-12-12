import Game from "./Game.js";

const body = document.querySelector("body");
const toggleSwitch = document.querySelector(".switch");
const toggleCircle = document.querySelector(".circle");
const messageContainer = document.getElementById("message-container");
const nameInput = document.getElementById("name-input");
const startButton = document.getElementById("btn-start");

startButton.addEventListener("click", () => {
  try {
    messageContainer.textContent = "";
    const names = nameInput.value;
    const game = new Game([names]);
    nameInput.value = "";
    game.startGame();
  } catch (e) {
    console.log(e);
    messageContainer.textContent = e;
  }
});

toggleSwitch.addEventListener("click", () => {
  toggleCircle.classList.toggle("circleOn");
  toggleSwitch.classList.toggle("switchOn");
  body.classList.toggle("dark");
});
