const points = JSON.parse(localStorage.getItem("points")) || {
  wins: 0,
  lose: 0,
  draw: 0,
};

let result = document.querySelector(".js-result");
let moves = document.querySelector(".js-moves");

let rocky = "&#9994";
let paper = "&#128400";
let scissor = "&#9996";

updateScore();

function game(player) {
  let com = Com();
  if (player == "rock") {
    if (com == "rock") {
      points.draw++;
      result.innerHTML = "you draw.";
      moves.innerHTML = `you ${rocky} vs ${rocky} computer`;
    } else if (com == "scissors") {
      points.wins++;
      result.innerHTML = "you win.";
      moves.innerHTML = `you ${rocky} vs ${scissor} computer`;
    } else if (com == "paper") {
      points.lose++;
      result.innerHTML = "you lose.";
      moves.innerHTML = `you ${rocky} vs ${paper} computer`;
    }
  } else if (player == "paper") {
    if (com == "rock") {
      points.wins++;
      result.innerHTML = "you win.";
      moves.innerHTML = `you ${paper} vs ${rocky} computer`;
    } else if (com == "scissors") {
      points.lose++;
      result.innerHTML = "you lose.";
      moves.innerHTML = `you ${paper} vs ${scissor} computer`;
    } else if (com == "paper") {
      points.draw++;
      result.innerHTML = "you draw.";
      moves.innerHTML = `you ${paper} vs ${paper} computer`;
    }
  } else if (player == "scissors") {
    if (com == "rock") {
      points.lose++;
      result.innerHTML = "you lose.";
      moves.innerHTML = `you ${scissor} vs ${rocky} computer`;
    } else if (com == "scissors") {
      points.draw++;
      result.innerHTML = "you draw.";
      moves.innerHTML = `you ${scissor} vs ${scissor} computer`;
    } else if (com == "paper") {
      points.wins++;
      result.innerHTML = "you win.";
      moves.innerHTML = `you ${scissor} vs ${paper} computer`;
    }
  }
  localStorage.setItem("points", JSON.stringify(points));
  updateScore();
}

function Com() {
  r = Math.random() * 10;
  if (r >= 0 && r < 3) {
    return "rock";
  } else if (r >= 3 && r < 7) {
    return "scissors";
  } else {
    return "paper";
  }
}

function reset() {
  points.wins = 0;
  points.lose = 0;
  points.draw = 0;
  localStorage.removeItem("points");
  result.innerHTML = "POINTS RESETS";
  moves.innerHTML = "";
  updateScore();
}
function updateScore() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `wins ${points.wins} lose ${points.lose} draw ${points.draw}`;
}

let isAutoplay = false;
let interval;

function autoplay(){
  if(!isAutoplay){
    interval = setInterval(() => {
      const player = Com();
      game(player);
    },800);
    isAutoplay = true;
    document.querySelector('.js-autoplay-btn').innerHTML = 'off autoplay';
    document.querySelector('.js-autoplay-btn').style.border = '1px solid red';
  }
  else{
    clearInterval(interval);
    isAutoplay = false;
    document.querySelector('.js-autoplay-btn').innerHTML = 'on autoplay';
    document.querySelector('.js-autoplay-btn').style.border = 'none';
  }
}
