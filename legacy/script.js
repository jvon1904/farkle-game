"use strict";
let oneScore = 0;
let twoScore = 0;
let threeScore = 0;
let fourScore = 0;
let fiveScore = 0;
let sixScore = 0;
let runningScore = 0;
let holdScore = 0;
let totalScore = 0;
let score = 0;
const runningScoreDisp = document.querySelector("#running-score-display");
const totalScoreDisp = document.querySelector("#total-score-display");

const playArea = document.querySelector(".play-area");

const diceA = document.getElementById("dice-a");
const diceB = document.getElementById("dice-b");
const diceC = document.getElementById("dice-c");
const diceD = document.getElementById("dice-d");
const diceE = document.getElementById("dice-e");
const diceF = document.getElementById("dice-f");

const diceArr = [diceA, diceB, diceC, diceD, diceE, diceF];
let diceANumber,
  diceBNumber,
  diceCNumber,
  diceDNumber,
  diceENumber,
  diceFNumber;

const viewScore = document.querySelector(".view-score");

const message = document.getElementById("message");

const rollButton = document.getElementById("roll-button");
const beginButton = document.getElementById("begin-button");
const holdButton = document.getElementById("hold-button");

const rollSound = new Audio("Roll-dice.wav");

let diceAClass;
let diceBClass;
let diceCClass;
let diceDClass;
let diceEClass;
let diceFClass;

let scoreArr = [];
let freqArr = [];

let scoreSix = 0;
let scoreFive = 0;
let scoreFour = 0;
let scoreThree = 0;
let scoreTwo = 0;
let scoreOne = 0;

let freqScoreArr;

let usedAll = false;

//random number function
const getRandNum = function () {
  let randNum;
  randNum = Math.trunc(Math.random() * 6) + 1;
  return randNum;
};

function farkle() {
  runningScore = 0;
  holdScore = 0;
  runningScoreDisp.textContent = 0;
  message.textContent = "Farkle!";
  playArea.style.backgroundColor = "red";
  holdButton.classList.add("hide");
  rollButton.style.backgroundColor = "orange";
  console.log("farkle");
}

//remove active class function
const removeActive = function (e) {
  e.classList.remove("active");
};

//add active class function
const addActive = function (e) {
  e.classList.add("active");
};

//add score function
const addScore = function (s) {};

//convert class to number
let numberofClass = function (c) {
  let classNumber;
  if (c === "dice-1") {
    classNumber = 1;
  } else if (c === "dice-2") {
    classNumber = 2;
  } else if (c === "dice-3") {
    classNumber = 3;
  } else if (c === "dice-4") {
    classNumber = 4;
  } else if (c === "dice-5") {
    classNumber = 5;
  } else if (c === "dice-6") {
    classNumber = 6;
  } else {
    classNumber = "not active";
  }
  return classNumber;
};

const changeDice = function (e) {
  getRandNum();
  e.classList.remove(
    "dice-1",
    "dice-2",
    "dice-3",
    "dice-4",
    "dice-5",
    "dice-6"
  );
  e.classList.add(`dice-${getRandNum()}`);
};
const changeDiceToSix = function (e) {
  getRandNum();
  e.classList.remove("dice-1", "dice-2", "dice-3", "dice-4", "dice-5");
  e.classList.add(`dice-6`);
};

beginButton.addEventListener("click", function () {
  rollButton.style.backgroundColor = "cadetblue";
  diceArr.forEach(function (e) {
    changeDiceToSix(e);
  });
  diceArr.forEach(function (e) {
    e.classList.add("active");
  });
  message.textContent = "Play Farkle!";
  playArea.style.backgroundColor = "#072936";
  runningScore = 0;
  runningScoreDisp.textContent = runningScore;
  totalScore = 0;
  totalScoreDisp.textContent = totalScore;
});

/*     Everything that happens
        When you roll the Dice!!! :)
        |
        |
        |
        |
    \   |     /
     \  |    /
      \     /
       \   /
        \ /
         /
     
*/
let diceRolls = 0;
let threeOfAKind = 0;
let fourOfAKind = 0;
let fiveOfAKind = 0;
let sixOfAKind = 0;
let allSix = 0;

rollButton.addEventListener("click", function () {
  //play sound
  // rollSound.play();

  usedAll = false;
  diceRolls++;
  console.log(`dice rolls: ${diceRolls}`);
  //only active dice change!
  let activeDice = document.querySelectorAll(".active");
  activeDice.forEach(function (e) {
    changeDice(e);
  });

  //clear the running score
  holdScore += runningScore;
  runningScoreDisp.textContent = holdScore;
  runningScore = 0;

  //clear the score array
  scoreArr = [];

  //clear the number frequncy variables for the score array
  scoreSix = 0;
  scoreFive = 0;
  scoreFour = 0;
  scoreThree = 0;
  scoreTwo = 0;
  scoreOne = 0;
  //convert classes to number variables
  diceANumber = numberofClass(diceA.classList[2]);

  diceBNumber = numberofClass(diceB.classList[2]);

  diceCNumber = numberofClass(diceC.classList[2]);

  diceDNumber = numberofClass(diceD.classList[2]);

  diceENumber = numberofClass(diceE.classList[2]);

  diceFNumber = numberofClass(diceF.classList[2]);

  //store the rolled dice numbers into an array for future analysis
  let diceArr = [
    diceANumber,
    diceBNumber,
    diceCNumber,
    diceDNumber,
    diceENumber,
    diceFNumber,
  ];

  let six = 0;
  let five = 0;
  let four = 0;
  let three = 0;
  let two = 0;
  let one = 0;

  let diceRoll = new Map();

  for (let i = 0; i < 6; i++) {
    if (diceArr[i] === 6) {
      six++;
      diceRoll.set(6, six);
    } else if (diceArr[i] === 5) {
      five++;
      diceRoll.set(5, five);
    } else if (diceArr[i] === 4) {
      four++;
      diceRoll.set(4, four);
    } else if (diceArr[i] === 3) {
      three++;
      diceRoll.set(3, three);
    } else if (diceArr[i] === 2) {
      two++;
      diceRoll.set(2, two);
    } else if (diceArr[i] === 1) {
      one++;
      diceRoll.set(1, one);
    }
  }
  console.log(diceRoll.size);

  if (diceRoll.size === 1) {
    message.textContent = "Six of a kind!";
    sixOfAKind++;
    console.log(`6 of a kind: ${sixOfAKind}`);
  } else if (diceRoll.size === 6) {
    message.textContent = "All six numbers!";
    allSix++;
    console.log(`All six: ${allSix}`);
  } else if (Array.from(diceRoll.values()).includes(5)) {
    message.textContent = "Five of a kind!";
    fiveOfAKind++;
    console.log(`5 of a kind: ${fiveOfAKind}`);
  } else if (Array.from(diceRoll.values()).includes(4)) {
    message.textContent = "Four of a kind!";
    fourOfAKind++;
    console.log(`4 of a kind: ${fourOfAKind}`);
  } else if (Array.from(diceRoll.values()).includes(3)) {
    message.textContent = "Three of a kind!";
    threeOfAKind++;
    console.log(`3 of a kind: ${threeOfAKind}`);
  } else {
    message.textContent = "Play Farkle!";
  }
});

function deleteFromScoreArr(n) {
  console.log(n);
  if (n === 6) {
    scoreSix--;
  } else if (n === 5) {
    scoreFive--;
  } else if (n === 4) {
    scoreFour--;
  } else if (n === 3) {
    scoreThree--;
  } else if (n === 2) {
    scoreTwo--;
  } else scoreOne--;

  freqScoreArr = [
    scoreSix,
    scoreFive,
    scoreFour,
    scoreThree,
    scoreTwo,
    scoreOne,
  ];

  console.log(freqScoreArr);

  for (let i = 0; i < freqScoreArr.length; i++) {
    playArea.style.backgroundColor = "#072936";
    if (freqScoreArr[i] === 6) {
      message.textContent = `Wow! six of a kind`;
      runningScore = 3000;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (
      freqScoreArr[i] === 1 &&
      freqScoreArr[i + 1] === 1 &&
      freqScoreArr[i + 2] === 1 &&
      freqScoreArr[i + 3] === 1 &&
      freqScoreArr[i + 4] === 1 &&
      freqScoreArr[i + 5] === 1
    ) {
      message.textContent = `Wow! all the numbers 1-6!`;
      runningScore = 1500;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (freqScoreArr[i] === 5 && scoreOne === 1) {
      message.textContent = `Wow! five of a kind and a 1!`;
      runningScore = 2100;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (freqScoreArr[i] === 5 && scoreFive === 1) {
      message.textContent = `Wow! five of a kind and a 5!`;
      runningScore = 2050;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (
      (freqScoreArr[i] === 2 &&
        freqScoreArr[i + 1] === 2 &&
        freqScoreArr[i + 2] === 2) ||
      (freqScoreArr[i] === 2 &&
        freqScoreArr[i + 1] === 2 &&
        freqScoreArr[i + 3] === 2) ||
      (freqScoreArr[i] === 2 &&
        freqScoreArr[i + 1] === 2 &&
        freqScoreArr[i + 4] === 2) ||
      (freqScoreArr[i] === 2 &&
        freqScoreArr[i + 1] === 2 &&
        freqScoreArr[i + 5] === 2) ||
      (freqScoreArr[i] === 2 &&
        freqScoreArr[i + 2] === 2 &&
        freqScoreArr[i + 3] === 2) ||
      (freqScoreArr[i] === 2 &&
        freqScoreArr[i + 2] === 2 &&
        freqScoreArr[i + 4] === 2) ||
      (freqScoreArr[i] === 2 &&
        freqScoreArr[i + 2] === 2 &&
        freqScoreArr[i + 5] === 2) ||
      (freqScoreArr[i] === 2 &&
        freqScoreArr[i + 3] === 2 &&
        freqScoreArr[i + 4] === 2) ||
      (freqScoreArr[i] === 2 &&
        freqScoreArr[i + 3] === 2 &&
        freqScoreArr[i + 5] === 2) ||
      (freqScoreArr[i] === 2 &&
        freqScoreArr[i + 4] === 2 &&
        freqScoreArr[i + 5] === 2)
    ) {
      message.textContent = `Wow! Three pairs!`;
      runningScore = 1500;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (freqScoreArr[i] === 5) {
      message.textContent = `Wow! five of a kind`;
      runningScore = 2000;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (
      (freqScoreArr[i] === 4 && freqScoreArr[i + 1] === 2) ||
      (freqScoreArr[i] === 4 && freqScoreArr[i + 2] === 2) ||
      (freqScoreArr[i] === 4 && freqScoreArr[i + 3] === 2) ||
      (freqScoreArr[i] === 4 && freqScoreArr[i + 4] === 2) ||
      (freqScoreArr[i] === 4 && freqScoreArr[i + 5] === 2)
    ) {
      message.textContent = "Wow! A group of four and a pair!";
      runningScore = 1500;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (freqScoreArr[i] === 4 && scoreOne === 1) {
      message.textContent = `Wow! four of a kind and a 1!`;
      runningScore = 1100;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (freqScoreArr[i] === 4 && scoreFive === 1) {
      message.textContent = `Wow! four of a kind and a 5!`;
      runningScore = 1050;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (freqScoreArr[i] === 4) {
      message.textContent = `Wow! four of a kind`;
      runningScore = 1000;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (
      (freqScoreArr[i] === 3 && freqScoreArr[i + 1] === 3) ||
      (freqScoreArr[i] === 3 && freqScoreArr[i + 2] === 3) ||
      (freqScoreArr[i] === 3 && freqScoreArr[i + 3] === 3) ||
      (freqScoreArr[i] === 3 && freqScoreArr[i + 4] === 3) ||
      (freqScoreArr[i] === 3 && freqScoreArr[i + 5] === 3)
    ) {
      message.textContent = `Wow! Two groups of three!`;
      runningScore = 1500;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreSix === 3 && scoreOne == 2 && scoreFive == 1) {
      message.textContent = `Wow! three 6s, two 1s, and a 5!`;
      runningScore = 850;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreFour === 3 && scoreOne == 2 && scoreFive == 1) {
      message.textContent = `Wow! three 4s, two 1s, and a 5!`;
      runningScore = 650;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreThree === 3 && scoreOne == 2 && scoreFive == 1) {
      message.textContent = `Wow! three 3s, two 1s, and a 5!`;
      runningScore = 550;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreTwo === 3 && scoreOne == 2 && scoreFive == 1) {
      message.textContent = `Wow! three 2s, two 1s, and a 5!`;
      runningScore = 450;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreSix === 3 && scoreOne == 1 && scoreFive == 2) {
      message.textContent = `Wow! three 6s, a 1, and two 5s!`;
      runningScore = 800;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreFour === 3 && scoreOne == 1 && scoreFive == 2) {
      message.textContent = `Wow! three 4s, a 1, and two 5s!`;
      runningScore = 600;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreThree === 3 && scoreOne == 1 && scoreFive == 2) {
      message.textContent = `Wow! three 3s, a 1, and two 5s!`;
      runningScore = 500;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreTwo === 3 && scoreOne == 1 && scoreFive == 2) {
      message.textContent = `Wow! three 2s, a 1, and two 5s!`;
      runningScore = 400;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreSix === 3 && scoreOne === 2) {
      message.textContent = `Wow! three 6s and two 1s!`;
      runningScore = 800;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreFive === 3 && scoreOne === 2) {
      message.textContent = `Wow! three 5s and two 1s!`;
      runningScore = 700;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreFour === 3 && scoreOne === 2) {
      message.textContent = `Wow! three 4s and two 1s!`;
      runningScore = 600;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreThree === 3 && scoreOne === 2) {
      message.textContent = `Wow! three 3s and two 1s!`;
      runningScore = 500;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreTwo === 3 && scoreOne === 2) {
      message.textContent = `Wow! three 2s and two 1s!`;
      runningScore = 400;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreSix === 3 && scoreFive == 2) {
      message.textContent = `Wow! three 6s and two 5s`;
      runningScore = 700;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreFour === 3 && scoreFive == 2) {
      message.textContent = `Wow! three 4s and two 5s`;
      runningScore = 500;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreThree === 3 && scoreFive == 2) {
      message.textContent = `Wow! three 3s and two 5s`;
      runningScore = 400;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreTwo === 3 && scoreFive == 2) {
      message.textContent = `Wow! three 2s and two 5s`;
      runningScore = 300;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreOne === 3 && scoreFive == 2) {
      message.textContent = `Wow! three 1s and two 5s`;
      runningScore = 400;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreSix === 3 && scoreOne === 1 && scoreFive === 1) {
      message.textContent = `Wow! three 6s, a 1, and a 5!`;
      runningScore = 750;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreFour === 3 && scoreOne === 1 && scoreFive === 1) {
      message.textContent = `Wow! three 4s, a 1, and a 5!`;
      runningScore = 550;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreThree === 3 && scoreOne === 1 && scoreFive === 1) {
      message.textContent = `Wow! three 3s, a 1, and a 5!`;
      runningScore = 450;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreTwo === 3 && scoreOne === 1 && scoreFive === 1) {
      message.textContent = `Wow! three 2s, a 1, and a 5!`;
      runningScore = 350;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreSix === 3 && scoreOne === 1) {
      message.textContent = `Wow! three 6s, and a 1!`;
      runningScore = 700;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreFive === 3 && scoreOne === 1) {
      message.textContent = `Wow! three 5s, and a 1!`;
      runningScore = 600;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreFour === 3 && scoreOne === 1) {
      message.textContent = `Wow! three 4s, and a 1!`;
      runningScore = 500;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreThree === 3 && scoreOne === 1) {
      message.textContent = `Wow! three 3s, and a 1!`;
      runningScore = 400;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreTwo === 3 && scoreOne === 1) {
      message.textContent = `Wow! three 2s, and a 1!`;
      runningScore = 300;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreSix === 3 && scoreFive === 1) {
      message.textContent = `Wow! three 6s and a 5!`;
      runningScore = 650;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreFour === 3 && scoreFive === 1) {
      message.textContent = `Wow! three 4s and a 5!`;
      runningScore = 450;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreThree === 3 && scoreFive === 1) {
      message.textContent = `Wow! three 3s and a 5!`;
      runningScore = 350;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreTwo === 3 && scoreFive === 1) {
      message.textContent = `Wow! three 2s and a 5!`;
      runningScore = 250;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreOne === 3 && scoreFive === 1) {
      message.textContent = `Wow! three 1s and a 5!`;
      runningScore = 350;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreSix === 3) {
      message.textContent = `Wow! three 6s`;
      runningScore = 600;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreFive === 3) {
      message.textContent = `Wow! three 5s`;
      runningScore = 500;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreFour === 3) {
      message.textContent = `Wow! three 4s`;
      runningScore = 400;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreThree === 3) {
      message.textContent = `Wow! three 3s`;
      runningScore = 300;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreTwo === 3) {
      message.textContent = `Wow! three 2s`;
      runningScore = 200;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreOne === 3) {
      message.textContent = `Wow! three 1s`;
      runningScore = 300;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreOne === 2 && scoreFive === 2) {
      message.textContent = `You got two 5s and two 1s!`;
      runningScore = 300;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreOne === 2 && scoreFive === 1) {
      message.textContent = `You got two 1s and a 5!`;
      runningScore = 250;
      runningScoreDisp.textContent = holdScore + runningScore;
    } else if (scoreOne === 1 && scoreFive === 2) {
      message.textContent = `You got a 1 and two 5s!`;
      runningScore = 200;
      runningScoreDisp.textContent = holdScore + runningScore;
    } else if (scoreOne === 2) {
      message.textContent = `You got two 1s!`;
      runningScore = 200;
      runningScoreDisp.textContent = holdScore + runningScore;
    } else if (scoreOne === 1 && scoreFive === 1) {
      message.textContent = `You got a 1 and a 5!`;
      runningScore = 150;
      runningScoreDisp.textContent = holdScore + runningScore;
    } else if (scoreFive === 2) {
      message.textContent = `You got two 5s!`;
      runningScore = 100;
      runningScoreDisp.textContent = holdScore + runningScore;
    } else if (scoreFive === 1) {
      message.textContent = `You got a 5!`;
      runningScore = 50;
      runningScoreDisp.textContent = holdScore + runningScore;
    } else if (scoreOne === 1) {
      message.textContent = `You got a 1!`;
      runningScore = 100;
      runningScoreDisp.textContent = holdScore + runningScore;
    } else {
      runningScore = 0;
      runningScoreDisp.textContent = holdScore + runningScore;
      message.textContent = "";
    }
  }
}
function addToScoreArr(n) {
  //A loop then tallies up the frequency of times numbers appear on the score array

  if (n === 6) scoreSix++;
  else if (n === 5) scoreFive++;
  else if (n === 4) scoreFour++;
  else if (n === 3) scoreThree++;
  else if (n === 2) scoreTwo++;
  else scoreOne++;

  freqScoreArr = [
    scoreSix,
    scoreFive,
    scoreFour,
    scoreThree,
    scoreTwo,
    scoreOne,
  ];

  console.log(freqScoreArr);

  for (let i = 0; i < freqScoreArr.length; i++) {
    playArea.style.backgroundColor = "#072936";
    if (freqScoreArr[i] === 6) {
      message.textContent = `Wow! six of a kind`;
      runningScore = holdScore + 3000;
      runningScoreDisp.textContent = holdScore + runningScore;
      usedAll = true;
      break;
    } else if (
      freqScoreArr[i] === 1 &&
      freqScoreArr[i + 1] === 1 &&
      freqScoreArr[i + 2] === 1 &&
      freqScoreArr[i + 3] === 1 &&
      freqScoreArr[i + 4] === 1 &&
      freqScoreArr[i + 5] === 1
    ) {
      message.textContent = `Wow! all the numbers 1-6!`;
      runningScore = 1500;
      runningScoreDisp.textContent = holdScore + runningScore;
      usedAll = true;
      break;
    } else if (freqScoreArr[i] === 5 && scoreOne === 1) {
      message.textContent = `Wow! five of a kind and a 1!`;
      runningScore = 2100;
      runningScoreDisp.textContent = holdScore + runningScore;
      usedAll = true;
      break;
    } else if (freqScoreArr[i] === 5 && scoreFive === 1) {
      message.textContent = `Wow! five of a kind and a 5!`;
      runningScore = 2050;
      runningScoreDisp.textContent = holdScore + runningScore;
      usedAll = true;
      break;
    } else if (
      (freqScoreArr[i] === 2 &&
        freqScoreArr[i + 1] === 2 &&
        freqScoreArr[i + 2] === 2) ||
      (freqScoreArr[i] === 2 &&
        freqScoreArr[i + 1] === 2 &&
        freqScoreArr[i + 3] === 2) ||
      (freqScoreArr[i] === 2 &&
        freqScoreArr[i + 1] === 2 &&
        freqScoreArr[i + 4] === 2) ||
      (freqScoreArr[i] === 2 &&
        freqScoreArr[i + 1] === 2 &&
        freqScoreArr[i + 5] === 2) ||
      (freqScoreArr[i] === 2 &&
        freqScoreArr[i + 2] === 2 &&
        freqScoreArr[i + 3] === 2) ||
      (freqScoreArr[i] === 2 &&
        freqScoreArr[i + 2] === 2 &&
        freqScoreArr[i + 4] === 2) ||
      (freqScoreArr[i] === 2 &&
        freqScoreArr[i + 2] === 2 &&
        freqScoreArr[i + 5] === 2) ||
      (freqScoreArr[i] === 2 &&
        freqScoreArr[i + 3] === 2 &&
        freqScoreArr[i + 4] === 2) ||
      (freqScoreArr[i] === 2 &&
        freqScoreArr[i + 3] === 2 &&
        freqScoreArr[i + 5] === 2) ||
      (freqScoreArr[i] === 2 &&
        freqScoreArr[i + 4] === 2 &&
        freqScoreArr[i + 5] === 2)
    ) {
      message.textContent = `Wow! Three pairs!`;
      runningScore = 1500;
      runningScoreDisp.textContent = holdScore + runningScore;
      usedAll = true;
      break;
    } else if (freqScoreArr[i] === 5) {
      message.textContent = `Wow! five of a kind`;
      runningScore = 2000;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (
      (freqScoreArr[i] === 4 && freqScoreArr[i + 1] === 2) ||
      (freqScoreArr[i] === 4 && freqScoreArr[i + 2] === 2) ||
      (freqScoreArr[i] === 4 && freqScoreArr[i + 3] === 2) ||
      (freqScoreArr[i] === 4 && freqScoreArr[i + 4] === 2) ||
      (freqScoreArr[i] === 4 && freqScoreArr[i + 5] === 2)
    ) {
      message.textContent = "Wow! A group of four and a pair!";
      runningScore = 1500;
      runningScoreDisp.textContent = holdScore + runningScore;
      usedAll = true;
      break;
    } else if (freqScoreArr[i] === 4 && scoreOne === 1) {
      message.textContent = `Wow! four of a kind and a 1!`;
      runningScore = 1100;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (freqScoreArr[i] === 4 && scoreFive === 1) {
      message.textContent = `Wow! four of a kind and a 5!`;
      runningScore = 1050;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (freqScoreArr[i] === 4) {
      message.textContent = `Wow! four of a kind`;
      runningScore = 1000;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (
      (freqScoreArr[i] === 3 && freqScoreArr[i + 1] === 3) ||
      (freqScoreArr[i] === 3 && freqScoreArr[i + 2] === 3) ||
      (freqScoreArr[i] === 3 && freqScoreArr[i + 3] === 3) ||
      (freqScoreArr[i] === 3 && freqScoreArr[i + 4] === 3) ||
      (freqScoreArr[i] === 3 && freqScoreArr[i + 5] === 3)
    ) {
      message.textContent = `Wow! Two groups of three!`;
      runningScore = 1500;
      runningScoreDisp.textContent = holdScore + runningScore;
      usedAll = true;
      break;
    } else if (scoreSix === 3 && scoreOne == 2 && scoreFive == 1) {
      message.textContent = `Wow! three 6s, two 1s, and a 5!`;
      runningScore = 850;
      runningScoreDisp.textContent = holdScore + runningScore;
      usedAll = true;
      break;
    } else if (scoreFour === 3 && scoreOne == 2 && scoreFive == 1) {
      message.textContent = `Wow! three 4s, two 1s, and a 5!`;
      runningScore = 650;
      runningScoreDisp.textContent = holdScore + runningScore;
      usedAll = true;
      break;
    } else if (scoreThree === 3 && scoreOne == 2 && scoreFive == 1) {
      message.textContent = `Wow! three 3s, two 1s, and a 5!`;
      runningScore = 550;
      runningScoreDisp.textContent = holdScore + runningScore;
      usedAll = true;
      break;
    } else if (scoreTwo === 3 && scoreOne == 2 && scoreFive == 1) {
      message.textContent = `Wow! three 2s, two 1s, and a 5!`;
      runningScore = 450;
      runningScoreDisp.textContent = holdScore + runningScore;
      usedAll = true;
      break;
    } else if (scoreSix === 3 && scoreOne == 1 && scoreFive == 2) {
      message.textContent = `Wow! three 6s, a 1, and two 5s!`;
      runningScore = 800;
      runningScoreDisp.textContent = holdScore + runningScore;
      usedAll = true;
      break;
    } else if (scoreFour === 3 && scoreOne == 1 && scoreFive == 2) {
      message.textContent = `Wow! three 4s, a 1, and two 5s!`;
      runningScore = 600;
      runningScoreDisp.textContent = holdScore + runningScore;
      usedAll = true;
      break;
    } else if (scoreThree === 3 && scoreOne == 1 && scoreFive == 2) {
      message.textContent = `Wow! three 3s, a 1, and two 5s!`;
      runningScore = 500;
      runningScoreDisp.textContent = holdScore + runningScore;
      usedAll = true;
      break;
    } else if (scoreTwo === 3 && scoreOne == 1 && scoreFive == 2) {
      message.textContent = `Wow! three 2s, a 1, and two 5s!`;
      runningScore = 400;
      runningScoreDisp.textContent = holdScore + runningScore;
      usedAll = true;
      break;
    } else if (scoreSix === 3 && scoreOne === 2) {
      message.textContent = `Wow! three 6s and two 1s!`;
      runningScore = 800;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreFive === 3 && scoreOne === 2) {
      message.textContent = `Wow! three 5s and two 1s!`;
      runningScore = 700;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreFour === 3 && scoreOne === 2) {
      message.textContent = `Wow! three 4s and two 1s!`;
      runningScore = 600;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreThree === 3 && scoreOne === 2) {
      message.textContent = `Wow! three 3s and two 1s!`;
      runningScore = 500;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreTwo === 3 && scoreOne === 2) {
      message.textContent = `Wow! three 2s and two 1s!`;
      runningScore = 400;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreSix === 3 && scoreFive == 2) {
      message.textContent = `Wow! three 6s and two 5s`;
      runningScore = 700;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreFour === 3 && scoreFive == 2) {
      message.textContent = `Wow! three 4s and two 5s`;
      runningScore = 500;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreThree === 3 && scoreFive == 2) {
      message.textContent = `Wow! three 3s and two 5s`;
      runningScore = 400;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreTwo === 3 && scoreFive == 2) {
      message.textContent = `Wow! three 2s and two 5s`;
      runningScore = 300;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreOne === 3 && scoreFive == 2) {
      message.textContent = `Wow! three 1s and two 5s`;
      runningScore = 400;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreSix === 3 && scoreOne === 1 && scoreFive === 1) {
      message.textContent = `Wow! three 6s, a 1, and a 5!`;
      runningScore = 750;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreFour === 3 && scoreOne === 1 && scoreFive === 1) {
      message.textContent = `Wow! three 4s, a 1, and a 5!`;
      runningScore = 550;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreThree === 3 && scoreOne === 1 && scoreFive === 1) {
      message.textContent = `Wow! three 3s, a 1, and a 5!`;
      runningScore = 450;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreTwo === 3 && scoreOne === 1 && scoreFive === 1) {
      message.textContent = `Wow! three 2s, a 1, and a 5!`;
      runningScore = 350;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreSix === 3 && scoreOne === 1) {
      message.textContent = `Wow! three 6s, and a 1!`;
      runningScore = 700;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreFive === 3 && scoreOne === 1) {
      message.textContent = `Wow! three 5s, and a 1!`;
      runningScore = 600;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreFour === 3 && scoreOne === 1) {
      message.textContent = `Wow! three 4s, and a 1!`;
      runningScore = 500;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreThree === 3 && scoreOne === 1) {
      message.textContent = `Wow! three 3s, and a 1!`;
      runningScore = 400;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreTwo === 3 && scoreOne === 1) {
      message.textContent = `Wow! three 2s, and a 1!`;
      runningScore = 300;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreSix === 3 && scoreFive === 1) {
      message.textContent = `Wow! three 6s and a 5!`;
      runningScore = 650;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreFour === 3 && scoreFive === 1) {
      message.textContent = `Wow! three 4s and a 5!`;
      runningScore = 450;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreThree === 3 && scoreFive === 1) {
      message.textContent = `Wow! three 3s and a 5!`;
      runningScore = 350;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreTwo === 3 && scoreFive === 1) {
      message.textContent = `Wow! three 2s and a 5!`;
      runningScore = 250;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreOne === 3 && scoreFive === 1) {
      message.textContent = `Wow! three 1s and a 5!`;
      runningScore = 350;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreSix === 3) {
      message.textContent = `Wow! three 6s`;
      runningScore = 600;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreFive === 3) {
      message.textContent = `Wow! three 5s`;
      runningScore = 500;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreFour === 3) {
      message.textContent = `Wow! three 4s`;
      runningScore = 400;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreThree === 3) {
      message.textContent = `Wow! three 3s`;
      runningScore = 300;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreTwo === 3) {
      message.textContent = `Wow! three 2s`;
      runningScore = 200;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreOne === 3) {
      message.textContent = `Wow! three 1s`;
      runningScore = 300;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreOne === 2 && scoreFive === 2) {
      message.textContent = `You got two 5s and two 1s!`;
      runningScore = 300;
      runningScoreDisp.textContent = holdScore + runningScore;
      break;
    } else if (scoreOne === 2 && scoreFive === 1) {
      message.textContent = `You got two 1s and a 5!`;
      runningScore = 250;
      runningScoreDisp.textContent = holdScore + runningScore;
    } else if (scoreOne === 1 && scoreFive === 2) {
      message.textContent = `You got a 1 and two 5s!`;
      runningScore = 200;
      runningScoreDisp.textContent = holdScore + runningScore;
    } else if (scoreOne === 2) {
      message.textContent = `You got two 1s!`;
      runningScore = 200;
      runningScoreDisp.textContent = holdScore + runningScore;
    } else if (scoreOne === 1 && scoreFive === 1) {
      message.textContent = `You got a 1 and a 5!`;
      runningScore = 150;
      runningScoreDisp.textContent = holdScore + runningScore;
    } else if (scoreFive === 2) {
      message.textContent = `You got two 5s!`;
      runningScore = 100;
      runningScoreDisp.textContent = holdScore + runningScore;
    } else if (scoreFive === 1) {
      message.textContent = `You got a 5!`;
      runningScore = 50;
      runningScoreDisp.textContent = holdScore + runningScore;
    } else if (scoreOne === 1) {
      message.textContent = `You got a 1!`;
      runningScore = 100;
      runningScoreDisp.textContent = holdScore + runningScore;
    } else {
      message.textContent = "";
    }
  }
}

diceA.addEventListener("click", function () {
  if (holdButton.classList.contains("hide")) {
    holdButton.classList.remove("hide");
  }
  if (diceA.classList.contains("active")) {
    removeActive(diceA);
    addToScoreArr(diceANumber);
  } else {
    addActive(diceA);
    deleteFromScoreArr(diceANumber);
  }
});
diceB.addEventListener("click", function () {
  if (holdButton.classList.contains("hide")) {
    holdButton.classList.remove("hide");
  }
  if (diceB.classList.contains("active")) {
    removeActive(diceB);
    addToScoreArr(diceBNumber);
  } else {
    addActive(diceB);
    deleteFromScoreArr(diceBNumber);
  }
});
diceC.addEventListener("click", function () {
  if (holdButton.classList.contains("hide")) {
    holdButton.classList.remove("hide");
  }
  if (diceC.classList.contains("active")) {
    removeActive(diceC);
    addToScoreArr(diceCNumber);
  } else {
    addActive(diceC);
    deleteFromScoreArr(diceCNumber);
  }
});
diceD.addEventListener("click", function () {
  if (holdButton.classList.contains("hide")) {
    holdButton.classList.remove("hide");
  }
  if (diceD.classList.contains("active")) {
    removeActive(diceD);
    addToScoreArr(diceDNumber);
  } else {
    addActive(diceD);
    deleteFromScoreArr(diceDNumber);
  }
});
diceE.addEventListener("click", function () {
  if (holdButton.classList.contains("hide")) {
    holdButton.classList.remove("hide");
  }
  if (diceE.classList.contains("active")) {
    removeActive(diceE);
    addToScoreArr(diceENumber);
  } else {
    addActive(diceE);
    deleteFromScoreArr(diceENumber);
  }
});
diceF.addEventListener("click", function () {
  if (holdButton.classList.contains("hide")) {
    holdButton.classList.remove("hide");
  }
  if (diceF.classList.contains("active")) {
    removeActive(diceF);
    addToScoreArr(diceFNumber);
  } else {
    addActive(diceF);
    deleteFromScoreArr(diceFNumber);
  }
});

//Hold Button Function

holdButton.addEventListener("click", function () {
  totalScore = runningScore + holdScore + totalScore;
  totalScoreDisp.textContent = totalScore;
  runningScore = 0;
  holdScore = 0;
  runningScoreDisp.textContent = 0;
  diceArr.forEach(function (e) {
    changeDiceToSix(e);
  });
  diceArr.forEach(function (e) {
    e.classList.add("active");
  });
  message.textContent = "Play Farkle";
});
