export default class Parser {
  constructor(dice) {
    this.dice = dice;
    this.scoringDice = 0;
    this.frequecyMap = this.getFrequencyMap();
    this.frequecies = this.getFrequencies();
    this.timesFive = null;
    this.timesFour = null;
    this.timesThree = null;
    this.threeOfAKindMap = new Map([
      [1, 300],
      [2, 200],
      [3, 300],
      [4, 400],
      [5, 500],
      [6, 600],
    ]);
  }

  calculate() {
    switch (this.dice.length) {
      case 6:
        return this.calculateSix();
      case 5:
        return this.calculateFive();
      case 4:
        return this.calculateFour();
      case 3:
        return this.calculateThree();
      default:
        return this.calculateTwoOrOne();
    }
  }

  // This method is shared with the normal score flow, as well as a way to
  // see if all six dice are scored to allow the user another turn.
  calculateSix() {
    if (this.sixOfAKind()) {
      this.scoringDice += 6;
      return 3000;
    }
    if (this.twoTriplets()) {
      this.scoringDice += 6;
      return 2500;
    }
    if (this.threePairs()) {
      this.scoringDice += 6;
      return 1500;
    }
    if (this.straight()) {
      this.scoringDice += 6;
      return 1500;
    }
    if (this.fourAndTwo()) {
      this.scoringDice += 6;
      return 1500;
    }

    return this.calculateFive();
  }

  calculateFive() {
    if (this.fiveOfAKind()) {
      this.scoringDice += 5;
      let leftOverDice = this.diceOtherThan(this.timesFive);
      let leftOverAmount = 0;
      leftOverDice.forEach((die) => {
        let amount = new Parser([die]).calculate();
        if (amount > 0) {
          this.scoringDice += 1;
        }
        leftOverAmount += amount;
      });

      return 2000 + leftOverAmount;
    }

    return this.calculateFour();
  }

  calculateFour() {
    if (this.fourOfAKind()) {
      this.scoringDice += 4;
      let leftOverDice = this.diceOtherThan(this.timesFour);
      let leftOverAmount = 0;
      leftOverDice.forEach((die) => {
        let amount = new Parser([die]).calculate();
        if (amount > 0) {
          this.scoringDice += 1;
        }
        leftOverAmount += amount;
      });

      return 1000 + leftOverAmount;
    }

    return this.calculateThree();
  }

  calculateThree() {
    if (this.threeOfAKind()) {
      this.scoringDice += 3;
      let leftOverDice = this.diceOtherThan(this.timesThree);
      let leftOverAmount = 0;
      leftOverDice.forEach((die) => {
        let amount = new Parser([die]).calculate();
        if (amount > 0) {
          this.scoringDice += 1;
        }
        leftOverAmount += amount;
      });

      return this.threeOfAKindMap.get(this.timesThree) + leftOverAmount;
    }

    return this.calculateTwoOrOne();
  }

  calculateTwoOrOne() {
    let numberOfOnes = this.frequecyMap.get(1);
    let numberOfFives = this.frequecyMap.get(5);
    this.scoringDice += numberOfOnes + numberOfFives;
    return numberOfOnes * 100 + numberOfFives * 50;
  }

  diceOtherThan(num) {
    return this.dice.filter((die) => die.number !== num);
  }

  getFrequencyMap() {
    let frequecyMap = new Map();
    frequecyMap.set(1, 0).set(2, 0).set(3, 0).set(4, 0).set(5, 0).set(6, 0);
    this.dice.forEach((die) => {
      let freq = frequecyMap.get(die.number);
      frequecyMap.set(die.number, freq + 1);
    });

    return frequecyMap;
  }

  getFrequencies() {
    return Array.from(this.frequecyMap.values());
  }

  sixOfAKind() {
    return this.frequecies.includes(6);
  }

  twoTriplets() {
    return this.frequecies.filter((n) => n === 3).length === 2;
  }

  threePairs() {
    return this.frequecies.filter((n) => n === 2).length === 3;
  }

  straight() {
    return !this.frequecies.includes(0);
  }

  fourAndTwo() {
    return this.frequecies.includes(4) && this.frequecies.includes(2);
  }

  fiveOfAKind() {
    let resp = false;
    [1, 2, 3, 4, 5, 6].forEach((num) => {
      if (this.frequecyMap.get(num) === 5) {
        this.timesFive = num;
        resp = true;
      }
    });

    return resp;
  }

  fourOfAKind() {
    let resp = false;
    [1, 2, 3, 4, 5, 6].forEach((num) => {
      if (this.frequecyMap.get(num) === 4) {
        this.timesFour = num;
        resp = true;
      }
    });

    return resp;
  }

  threeOfAKind() {
    let resp = false;
    [1, 2, 3, 4, 5, 6].forEach((num) => {
      if (this.frequecyMap.get(num) === 3) {
        this.timesThree = num;
        resp = true;
      }
    });

    return resp;
  }
}
