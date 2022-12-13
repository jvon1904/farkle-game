export default class Player {
  constructor(name, index) {
    this.name = name;
    this.index = index;
    this.active = false;
    this.previousTurnScore = 0;
    this.turnScore = 0;
    this.totalScore = 0;
    this.nameContainer = this.drawNameContainer();
    this.nameDisplay = this.setNameDisplay();
    this.turnScoreContainer = this.drawTurnScoreContainer();
    this.turnScoreDisplay = this.setTurnScore();
    this.totalScoreContainer = this.drawTotalScoreContainer();
    this.totalScoreDisplay = this.setTotalScore();
    this.infoContainer = this.drawInfoContainer();
    this.drawName();
    this.drawTurnScore(this.turnScore);
    this.drawTotalScore(this.totalScore);
  }

  activate() {
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }

  setNameDisplay() {
    return document.getElementById(`player-${this.index}-name`);
  }

  drawName() {
    this.setNameDisplay().textContent = this.name;
  }

  setTurnScore() {
    return document.getElementById(`player-${this.index}-turn-score`);
  }

  drawTurnScore(score) {
    this.setTurnScore().textContent = score;
  }

  setTotalScore() {
    return document.getElementById(`player-${this.index}-total-score`);
  }

  drawTotalScore(score) {
    this.setTotalScore().textContent = score;
  }

  drawNameContainer() {
    let container = document.createElement("div");
    container.classList.add("player-name-container");
    let display = document.createElement("span");
    display.classList.add("player-name-display");
    display.id = `player-${this.index}-name`;
    container.appendChild(display);

    return container;
  }

  drawTurnScoreContainer() {
    let container = document.createElement("div");
    container.innerHTML = "Turn score: ";
    let display = document.createElement("span");
    display.id = `player-${this.index}-turn-score`;
    container.appendChild(display);

    return container;
  }

  drawTotalScoreContainer() {
    let container = document.createElement("div");
    container.innerHTML = "Total score: ";
    let display = document.createElement("span");
    display.id = `player-${this.index}-total-score`;
    container.appendChild(display);

    return container;
  }

  drawInfoContainer() {
    let container = document.createElement("div");
    container.classList.add("player-info");
    container.setAttribute("player", this.index);
    container.appendChild(this.nameContainer);
    container.appendChild(this.turnScoreContainer);
    container.appendChild(this.totalScoreContainer);
    let footer = document.getElementById("footer");
    footer.appendChild(container);

    return container;
  }
}
