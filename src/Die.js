export default class Die {
  constructor(i, board) {
    this.board = board;
    this.active = true;
    this.selected = false;
    this.index = i;
    this.number = 0;
    this.element = this.drawDie();
    this.dots = this.drawDots();
  }

  roll() {
    const num = Math.floor(Math.random() * 6) + 1;
    for (let dot of this.dots) {
      dot.classList.remove("dice-1");
      dot.classList.remove("dice-2");
      dot.classList.remove("dice-3");
      dot.classList.remove("dice-4");
      dot.classList.remove("dice-5");
      dot.classList.remove("dice-6");
      dot.classList.add(`dice-${num}`);
    }
    this.number = num;
    this.element.setAttribute("number", this.number);
  }

  select() {
    this.board.clearMessage();
    if (this.board.farkle) {
      this.board.game.soundEffects.error();
      this.board.printFarkleMessage();
      return;
    }
    this.board.game.soundEffects.select();
    this.active = false;
    this.selected = true;
    this.board.activeSelectedDiceGroup.append(this.element);
    this.board.activeSelectedDiceObjectGroup.push(this);
    this.element.classList.add("selected");
    this.updateScore();
    this.board.ready = true;
  }

  deselect() {
    this.board.clearMessage();
    if (this.board.farkle) {
      this.board.game.soundEffects.error();
      this.board.printFarkleMessage();
      return;
    }
    this.board.game.soundEffects.deselect();
    this.active = true;
    this.selected = false;
    let newGroup = this.board.activeSelectedDiceObjectGroup.filter(
      (die) => die.index !== this.index
    );
    this.board.selectedDiceObjectGroups[
      this.board.selectedDiceObjectGroups.length - 1
    ] = newGroup;
    this.element.classList.remove("selected");
    this.board.activeDiceContainer.append(this.element);
    this.updateScore();
    if (this.board.selectedDice.length === 0) {
      this.board.ready = false;
    }
  }

  updateScore() {
    this.board.game.activePlayer.turnScore = this.board.calculateTurnScore();
    this.board.game.activePlayer.setTurnScore();
  }

  drawDie() {
    let element = document.createElement("div");
    element.classList.add("dice");
    element.setAttribute("number", this.number);
    element.addEventListener("click", () => {
      this.handleSelection();
    });

    return element;
  }

  handleSelection() {
    if (this.number === 0) {
      return;
    }

    if (this.selected) {
      if (this.activeSelected) {
        this.deselect();
        return;
      } else {
        return;
      }
    }

    this.select();
  }

  get activeSelected() {
    return this.element.parentElement === this.board.activeSelectedDiceGroup;
  }

  drawDots() {
    const dots = [];

    const topRow = document.createElement("div");
    topRow.classList.add("row");

    const topLeftDot = document.createElement("div");
    topLeftDot.classList.add("dot", "dice-6", "dot-top-left");
    dots.push(topLeftDot);
    topRow.appendChild(topLeftDot);

    const topMiddleDot = document.createElement("div");
    topMiddleDot.classList.add("dot", "dice-6", "dot-top-middle");
    dots.push(topMiddleDot);
    topRow.appendChild(topMiddleDot);

    const topRightDot = document.createElement("div");
    topRightDot.classList.add("dot", "dice-6", "dot-top-right");
    dots.push(topRightDot);
    topRow.appendChild(topRightDot);

    const middleRow = document.createElement("div");
    middleRow.classList.add("row");

    const middleLeftDot = document.createElement("div");
    middleLeftDot.classList.add("dot", "dice-6", "dot-middle-left");
    dots.push(middleLeftDot);
    middleRow.appendChild(middleLeftDot);

    const middleMiddleDot = document.createElement("div");
    middleMiddleDot.classList.add("dot", "dice-6", "dot-middle-middle");
    dots.push(middleMiddleDot);
    middleRow.appendChild(middleMiddleDot);

    const middleRightDot = document.createElement("div");
    middleRightDot.classList.add("dot", "dice-6", "dot-middle-right");
    dots.push(middleRightDot);
    middleRow.appendChild(middleRightDot);

    const bottomRow = document.createElement("div");
    bottomRow.classList.add("row");

    const bottomLeftDot = document.createElement("div");
    bottomLeftDot.classList.add("dot", "dice-6", "dot-bottom-left");
    dots.push(bottomLeftDot);
    bottomRow.appendChild(bottomLeftDot);

    const bottomMiddleDot = document.createElement("div");
    bottomMiddleDot.classList.add("dot", "dice-6", "dot-bottom-middle");
    dots.push(bottomMiddleDot);
    bottomRow.appendChild(bottomMiddleDot);

    const bottomRightDot = document.createElement("div");
    bottomRightDot.classList.add("dot", "dice-6", "dot-bottom-right");
    dots.push(bottomRightDot);
    bottomRow.appendChild(bottomRightDot);

    this.element.appendChild(topRow);
    this.element.appendChild(middleRow);
    this.element.appendChild(bottomRow);

    return dots;
  }
}
