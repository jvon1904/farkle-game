export default class Player {
  constructor(name, index) {
    this.name = name;
    this.index = index;
    this.active = false;
    this.previousTurnScore = 0;
    this.turnScore = 0;
    this.totalScore = 0;
  }

  activate() {
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }
}
