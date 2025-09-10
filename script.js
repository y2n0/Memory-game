
const symbols = ["🍎", "🍎", "🍌", "🍌", "🍇", "🍇", "🍒", "🍒"];
let moves = 0;
let matches = 0;
let flippedCards = [];
let gameEnded = false;

const game = document.getElementById("game");
const result = document.getElementById("result");


function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

let cards = shuffle([...symbols]);


cards.forEach(symbol => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.symbol = symbol;
  card.textContent = "?"; 
  game.appendChild(card);

  card.addEventListener("click", () => flipCard(card));
});


function flipCard(card) {
  if (card.classList.contains("flipped") || flippedCards.length === 2 || gameEnded) {
    return;
  }

  card.classList.add("flipped");
  card.textContent = card.dataset.symbol;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    checkMatch();
  }
}


function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.symbol === card2.dataset.symbol) {
    matches++;
    flippedCards = [];

    if (matches === symbols.length / 2) {
      endGame();
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.textContent = "?";
      card2.textContent = "?";
      flippedCards = [];
    }, 800);
  }
}


function getStars() {
  let perfectMoves = symbols.length / 2; // أقل عدد ممكن من الحركات
  if (moves <= perfectMoves) return "⭐⭐⭐⭐⭐";
  if (moves <= perfectMoves + 2) return "⭐⭐⭐⭐";
  if (moves <= perfectMoves + 4) return "⭐⭐⭐";
  if (moves <= perfectMoves + 6) return "⭐⭐";
  return "⭐";
}


function endGame() {
  gameEnded = true;
  clearInterval(timerInterval);
  result.innerHTML = `
    <p>انتهت اللعبة ✅</p>
    <p>عدد الحركات: ${moves}</p>
    <p>تقييمك: <span class="stars">${getStars()}</span></p>
  `;
}


let time = 5 * 60; 
const timerElement = document.getElementById("timer");

function updateTimer() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  
  timerElement.textContent =  `الوقت: ${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  if (time <= 0) {
    clearInterval(timerInterval);
    endGame();
    return;
  }
  time--;
}

let timerInterval = setInterval(updateTimer, 1000);
updateTimer();