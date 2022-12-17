export default class Player {
  constructor(name, index) {
    this.name = name;
    this.index = index;
    this.active = false;
    this.previousTurnScore = 0;
    this.turnScore = 0;
    this.bonusScore = 0;
    this.totalScore = 0;
    this.nameContainer = this.drawNameContainer();
    this.nameDisplay = this.setNameDisplay();
    this.turnScoreContainer = this.drawTurnScoreContainer();
    this.totalScoreContainer = this.drawTotalScoreContainer();
    this.infoContainer = this.drawInfoContainer();
    this.drawName();
    this.setTotalScore(0);
    this.setTurnScore(0);
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
    let display = document.getElementById(`player-${this.index}-turn-score`);
    display.textContent = this.turnScore + this.bonusScore;
  }

  setTotalScore() {
    let display = document.getElementById(`player-${this.index}-total-score`);
    display.textContent = this.totalScore;
    this.turnScore = 0;
    this.bonusScore = 0;
    this.setTurnScore();
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
