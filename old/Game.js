class Game {
  constructor() {
    this.activeDice = [];
    this.selectedDice = [];
    this.inactiveDice = [];
    this.currentPlayer = undefined;
    this.diceAreas = document.getElementById("dice-areas");
    this.activeDiceArea = document.querySelector(".active-dice");
    this.selectedDiceArea = undefined;
    this.playerNameDisplay = document.getElementById("player-name-display");
    this.holdingScore = 0;
  }

  startGame(playerName) {
    this.currentPlayer = new Player(playerName, this);
    this.playerNameDisplay.textContent = this.currentPlayer.name;
    for (let i = 0; i < 6; i++) {
      const dice = new Dice(i, this);
      this.activeDice.push(dice);
      this.activeDiceArea.appendChild(dice.element);
    }
  }

  clearGame() {
    this.activeDice.forEach((dice) => {
      this.activeDiceArea.removeChild(dice.element);
    });
    this.inactiveDice.forEach((dice) => {
      dice.element.parentNode.removeChild(dice.element);
    });
    document.querySelectorAll(".selected-dice").forEach((div) => {
      div.parentElement.removeChild(div);
    });
    this.activeDice = [];
    this.inactiveDice = [];
    this.currentPlayer.clearScore();
    this.currentPlayer = undefined;
  }

  resetGame() {
    this.activeDice.forEach((dice) => {
      this.activeDiceArea.removeChild(dice.element);
    });
    this.inactiveDice.forEach((dice) => {
      dice.element.parentNode.removeChild(dice.element);
    });
    document.querySelectorAll(".selected-dice").forEach((div) => {
      div.parentElement.removeChild(div);
    });
    this.activeDice = [];
    this.selectedDice = [];
    this.inactiveDice = [];
    for (let i = 0; i < 6; i++) {
      const dice = new Dice(i, this);
      this.activeDice.push(dice);
      this.activeDiceArea.appendChild(dice.element);
    }
  }

  rollDice() {
    if (this.currentPlayer.ready === true) {
      this.currentPlayer.rolled = true;
      this.activeDice.forEach((dice) => {
        dice.rollDie();
      });
      this.parseDice(this.activeDice, "a");
      this.selectedDice.forEach((dice) => {
        this.inactiveDice.push(dice);
        dice.old = true;
        console.log(this.inactiveDice);
      });
      this.selectedDice = [];
      this.currentPlayer.rollDice();
    }
  }

  parseDice(dice, flag) {
    let numberMap = new Map();
    numberMap.set(1, 0).set(2, 0).set(3, 0).set(4, 0).set(5, 0).set(6, 0);
    for (let i = 0; i < dice.length; i++) {
      let q = numberMap.get(dice[i].number);
      numberMap.set(dice[i].number, q + 1);
    }
    console.log("numberMap", numberMap);
    const values = Array.from(numberMap.values());
    console.log("values (array)", values);
    this.checkForSixFiveFour(values, numberMap, flag);
  }

  checkForSixFiveFour(array, map, flag) {
    if (array.includes(6)) {
      // 6 of a kind
      this.currentPlayer.postTurnScore(3000);
      this.currentPlayer.rollOver();
    } else if (array.filter((num) => num === 3).length === 2) {
      // two triplets
      this.currentPlayer.postTurnScore(2500);
      this.currentPlayer.rollOver();
    } else if (
      // 1-6 straight
      array.length === 6 &&
      array.filter((num) => num !== 1).length === 0
    ) {
      this.currentPlayer.postTurnScore(1500);
      this.currentPlayer.rollOver();
    } else if (array.filter((num) => num == 2).length === 3) {
      // three pairs
      this.currentPlayer.postTurnScore(1500);
      this.currentPlayer.rollOver();
    } else if (array.includes(5)) {
      // 5 of a kind
      flag === "a"
        ? this.currentPlayer.postPotentialScore(2000)
        : this.currentPlayer.postTurnScore(2000);
      this.checkForOnesOrFives(map, flag);
    } else if (array.includes(4) && array.includes(2)) {
      // 4 of a kind and a pair
      flag === "a"
        ? this.currentPlayer.postPotentialScore(1500)
        : this.currentPlayer.postTurnScore(1500);
    } else if (array.includes(4)) {
      // 4 of a kind
      flag === "a"
        ? this.currentPlayer.postPotentialScore(1000)
        : this.currentPlayer.postTurnScore(1000);
      this.checkForOnesOrFives(map, flag);
    } else {
      this.parseThree(array, map, flag);
    }
  }

  parseThree(array, map, flag) {
    if (array.includes(3)) {
      for (let [key, value] of map) {
        if (value === 3) {
          switch (key) {
            case 1:
              flag === "a"
                ? this.currentPlayer.postPotentialScore(300)
                : this.currentPlayer.postTurnScore(300);
              this.checkForOnesOrFives(map, "o", flag);
              break;
            case 2:
              flag === "a"
                ? this.currentPlayer.postPotentialScore(200)
                : this.currentPlayer.postTurnScore(200);
              this.checkForOnesOrFives(map, "y", flag);
              break;
            case 3:
              flag === "a"
                ? this.currentPlayer.postPotentialScore(300)
                : this.currentPlayer.postTurnScore(300);
              this.checkForOnesOrFives(map, "y", flag);
              break;
            case 4:
              flag === "a"
                ? this.currentPlayer.postPotentialScore(400)
                : this.currentPlayer.postTurnScore(400);
              this.checkForOnesOrFives(map, "y", flag);
              break;
            case 5:
              flag === "a"
                ? this.currentPlayer.postPotentialScore(500)
                : this.currentPlayer.postTurnScore(500);
              this.checkForOnesOrFives(map, "f", flag);
              break;
            case 6:
              flag === "a"
                ? this.currentPlayer.postPotentialScore(600)
                : this.currentPlayer.postTurnScore(600);
              this.checkForOnesOrFives(map, "y", flag);
              break;
          }
          break;
        }
      }
    } else {
      this.checkForOnesOrFives(map, "n", flag);
    }
  }

  checkForOnesOrFives(map, flag, _flag) {
    let o = flag !== "o" ? map.get(1) : 0;
    let f = flag !== "f" ? map.get(5) : 0;

    if (o || f) {
      _flag === "a"
        ? this.currentPlayer.postPotentialScore(o * 100 + f * 50)
        : this.currentPlayer.postTurnScore(o * 100 + f * 50);
    } else if (flag === "n" && _flag === "a") {
      this.farkle();
    } else if (flag === "n" && _flag === "s") {
      this.currentPlayer.clearTurnScore(0);
    }
  }

  farkle() {
    this.currentPlayer.farkle();
  }
}
