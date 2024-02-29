// Icons
const xIcon = '<i class="fa-solid fa-x"></i>';
const circleIcon = '<i class="fa-regular fa-circle"></i>';

// General Functions
function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

// Counter functions
function resetCounter() {
  document.getElementById("counterNumber").innerHTML = 0;
}

function increaseCounter() {
  document.getElementById("counterNumber").innerHTML++;
}

function decreaseCounter() {
  document.getElementById("counterNumber").innerHTML--;
}

// TicTacToe functions
let circle = true;
let multiplayer = true;
let boxes = [];

function endgameDialog(winner) {
  if (winner != "draw") {
    alert("The " + winner + " team wins!");
    resetTicTacToe();
    return;
  }

  if (winner == "draw") alert("The result is a Draw!");
  resetTicTacToe();
}

function checkWin(team) {
  if (team == boxes[0]) {
    if (team == boxes[1]) {
      if (team == boxes[2]) {
        endgameDialog(team);
      }
    }
    if (team == boxes[3]) {
      if (team == boxes[6]) {
        endgameDialog(team);
      }
    }
    if (team == boxes[4]) {
      if (team == boxes[8]) {
        endgameDialog(team);
      }
    }
  }
  if (team == boxes[1]) {
    if (team == boxes[4]) {
      if (team == boxes[7]) {
        endgameDialog(team);
      }
    }
  }
  if (team == boxes[2]) {
    if (team == boxes[4]) {
      if (team == boxes[6]) {
        endgameDialog(team);
      }
    }
    if (team == boxes[5]) {
      if (team == boxes[8]) {
        endgameDialog(team);
      }
    }
  }
  if (team == boxes[3]) {
    if (team == boxes[4]) {
      if (team == boxes[5]) {
        endgameDialog(team);
      }
    }
  }
  if (team == boxes[6]) {
    if (team == boxes[7]) {
      if (team == boxes[8]) {
        endgameDialog(team);
      }
    }
  }
}

function drawCircle(boxNumber) {
  document.getElementById("box" + boxNumber).innerHTML = circleIcon;
  boxes[boxNumber] = "O";
  circle = !circle;
  checkWin("O");
  return;
}

function drawCross(boxNumber) {
  document.getElementById("box" + boxNumber).innerHTML = xIcon;
  boxes[boxNumber] = "X";
  circle = !circle;
  checkWin("X");
  return;
}

function resetTicTacToe() {
  let n = 0;
  while (n <= 8) {
    document.getElementById("box" + n).innerHTML = "";
    n++;
  }
  boxes = [];
  circle = true;
}

function tileClicked(box) {
  // Control element to make sure you are not able to change the symbol once is setted
  if (document.getElementById(box).innerHTML) return;

  // let's get the number on the array (from 0 to 8):
  boxNumber = box.slice(3, 4);

  // Multiplayer behaviour
  if (multiplayer) {
    if (circle) {
      drawCircle(boxNumber);
      return;
    }
    drawCross(boxNumber);
    return;
  }

  // in case One Player Mode Is Active the AI uses randomness to play (Yes it is a very affordable opponent xd):
  if (circle) {
    drawCircle(boxNumber);
    checkWin("O");
    // Quick check to not draw the 'X' if the games has just ended
    if (boxes.length == 0) return;
    let n = 1;
    while (n < 12) {
      //The max number 'n' is to rpotect from an endless while, the littlest the more eficient, but if too low can create a bug that does not show the last plays
      const randomBox = getRandomNumber(9);
      if (!document.getElementById("box" + randomBox).innerHTML) {
        drawCross(randomBox);
        return;
      }
      n++;
    }
    // In case of draw
    endgameDialog("draw");
  }
}

// Set tyoe of game
function activeIA(gameMode) {
  if (gameMode == "multiPlayer") {
    multiplayer = true;
    document.getElementById("onePlayer").classList.remove("gamemodeActive");
  }
  if (gameMode == "onePlayer") {
    multiplayer = false;
    document.getElementById("multiPlayer").classList.remove("gamemodeActive");
  }
  document.getElementById(gameMode).classList.add("gamemodeActive");
  resetTicTacToe();
  return;
}
