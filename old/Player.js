class Player {
  constructor(name, game) {
    this.ready = true;
    this.game = game;
    this.rolled = false;
    this.level = 0;
    this.name = name;
    this.turnScore = 0;
    this.score = 0;
    this.totalScoreDisplay = document.getElementById("total-score-display");
    this.turnScoreDisplay = document.getElementById("turn-score-display");
    this.potentialScoreDisplay = document.getElementById(
      "potential-score-display"
    );
  }

  rollDice() {
    this.level += 1;
    this.createArea();
    this.ready = false;
  }

  createArea() {
    const area = document.createElement("div");
    area.classList.add(`selected-dice`, `selected-dice-${this.level}`);
    this.game.diceAreas.appendChild(area);
    this.game.selectedDiceArea = area;
  }

  postTurnScore(score) {
    this.ready = true;
    this.turnScore += score;
    this.turnScoreDisplay.textContent = this.turnScore;
  }

  clearTurnScore() {
    this.turnScore = 0;
    this.turnScoreDisplay.textContent = this.turnScore;
  }

  postPotentialScore(score) {
    this.potentialScoreDisplay.textContent = score;
  }

  postTotalScore(score) {
    this.score += score;
    this.totalScoreDisplay.textContent = this.score;
  }

  rollOver() {
    this.ready = true;
    this.rolled = false;
    this.level = 0;
    this.postTotalScore(this.turnScore);
    this.turnScore = 0;
    this.turnScoreDisplay.textContent = this.turnScore;
  }

  endTurn() {
    this.rollOver();
    this.game.resetGame();
    this.potentialScore = 0;
    this.potentialScoreDisplay.textContent = this.potentialScore;
  }

  farkle() {
    this.potentialScore = 0;
    this.potentialScoreDisplay.textContent = this.potentialScore;
    this.turnScore = 0;
    this.turnScoreDisplay.textContent = "Farkle!";
    this.ready = true;
    this.rolled = false;
    this.level = 0;
  }

  clearScore() {
    this.turnScoreDisplay.textContent = "0";
    this.totalScoreDisplay.textContent = "0";
    this.potentialScoreDisplay.textContent = "0";
  }
}
