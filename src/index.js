import Game from "./Game.js";
import SoundEffects from "./SoundEffects.js";

const soundEffect = new SoundEffects();
const body = document.querySelector("body");
const toggleSwitch = document.querySelector(".switch");
const toggleCircle = document.querySelector(".circle");
const messageContainer = document.getElementById("message-container");
const namesContainer = document.getElementById("names-container");
const nameInput = document.getElementById("name-input");
const addPlayerButton = document.getElementById("btn-add-player");
const startButton = document.getElementById("btn-start");

addPlayerButton.addEventListener("click", () => {
  soundEffect.select();
  let numPlayers = namesContainer.children.length;
  let container = document.createElement("div");
  container.classList.add("name-input-container");
  let input = document.createElement("input");
  input.classList.add("input-added");
  input.setAttribute("type", "text");
  input.id = `name-input-${numPlayers + 1}`;
  input.setAttribute("placeholder", `player ${numPlayers + 1} name...`);
  let btnDelete = document.createElement("button");
  btnDelete.classList.add("btn-delete");
  btnDelete.textContent = "X";
  container.appendChild(input);
  container.appendChild(btnDelete);
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
    soundEffect.error();
    messageContainer.textContent = e;
    console.log(e);
  }
});

toggleSwitch.addEventListener("click", () => {
  toggleCircle.classList.toggle("circleOn");
  toggleSwitch.classList.toggle("switchOn");
  body.classList.toggle("dark");
});
