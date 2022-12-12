class Dice {
  constructor(i, game) {
    this.game = game;
    this.id = `dice-${i}`;
    this.element = this.drawDice();
    this.dots = this.createDots();
    this.number = 6;
    this.active = true;
    this.old = false;
  }

  drawDice() {
    const dice = document.createElement("div");
    dice.classList.add("dice", "dice-6");
    dice.attributes.id = this.id;
    dice.addEventListener("click", () => {
      if (this.game.currentPlayer.rolled === true) {
        if (!this.old) {
          if (this.active === true) {
            this.selectDie();
          } else if (this.active === false) {
            this.deselectDie();
          }
        }
      }
    });
    return dice;
  }

  createDots() {
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

  rollDie() {
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
  }

  changeColor() {
    const num1 = Math.floor(Math.random() * 255) + 1;
    const num2 = Math.floor(Math.random() * 255) + 1;
    const num3 = Math.floor(Math.random() * 255) + 1;
    this.element.style.backgroundColor = `rgb(${num1}, ${num2}, ${num3})`;
  }

  selectDie() {
    this.game.selectedDice = [];
    this.active = false;
    const i = this.game.activeDice.indexOf(this);
    this.game.activeDice.splice(i, 1);
    this.game.selectedDice.push(this);
    this.element.classList.add("selected");
    this.game.selectedDiceArea.appendChild(this.element);
    this.game.parseDice(this.game.selectedDice, "s");
  }

  deselectDie() {
    this.active = true;
    this.game.activeDice.push(this);
    const i = this.game.selectedDice.indexOf(this);
    this.game.selectedDice.splice(i, 1);
    this.element.classList.remove("selected");
    this.game.activeDiceArea.appendChild(this.element);
    console.log(this.game.inactiveDice);
    console.log(this.game.selectedDice);
    console.log(this.game.selectedDice.concat(this.game.inactiveDice));
    this.game.currentPlayer.postTurnScore(0);
    this.game.parseDice(
      this.game.selectedDice.concat(this.game.inactiveDice),
      "s"
    );
  }
}
