import Game from "./Game.js";

const body = document.querySelector("body");
const toggleSwitch = document.querySelector(".switch");
const toggleCircle = document.querySelector(".circle");
const messageContainer = document.getElementById("message-container");
const namesContainer = document.getElementById("names-container");
const nameInput = document.getElementById("name-input");
const addPlayerButton = document.getElementById("btn-add-player");
const startButton = document.getElementById("btn-start");

addPlayerButton.addEventListener("click", () => {
  let numPlayers = namesContainer.children.length;
  let container = document.createElement("div");
  container.classList.add("name-input-container");
  let label = document.createElement("label");
  label.textContent = "Name: ";
  label.setAttribute("for", `name-input-${numPlayers + 1}`);
  label.setAttribute("maxlength", "20");
  let input = document.createElement("input");
  input.setAttribute("type", "text");
  input.id = `name-input-${numPlayers + 1}`;
  container.appendChild(label);
  container.appendChild(input);
  namesContainer.appendChild(container);
  if (namesContainer.children.length >= 4) {
    addPlayerButton.classList.add("hidden");
  }
});

startButton.addEventListener("click", () => {
  try {
    messageContainer.textContent = "";
    // const names = nameInput.value;
    const names = [];
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => names.push(input.value));
    const game = new Game(names);
    inputs.forEach((input) => (input.value = ""));
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
