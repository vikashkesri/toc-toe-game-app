const boxes = document.querySelectorAll(".box");
const msgContainer = document.querySelector(".msg-container");
const msg = document.getElementById("msg");

let turn = "X";
let isGameOver = false;

const winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function checkWinner() {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (
      boxes[a].textContent &&
      boxes[a].textContent === boxes[b].textContent &&
      boxes[a].textContent === boxes[c].textContent
    ) {
      // Add win class to highlight
      boxes[a].classList.add("win");
      boxes[b].classList.add("win");
      boxes[c].classList.add("win");

      showMessage(`Player ${boxes[a].textContent} Wins!`);
      isGameOver = true;
      return;
    }
  }

  // Check for draw (if all boxes are filled and no winner)
  const isDraw = [...boxes].every(box => box.textContent !== "");
  if (isDraw) {
    showMessage("It's a Draw!");
    isGameOver = true;
  }
}

function showMessage(message) {
  msg.textContent = message;
  msgContainer.classList.remove("hide");
}

function resetGame() {
  boxes.forEach(box => {
    box.textContent = "";
    box.classList.remove("win");
  });
  turn = "X";
  isGameOver = false;
  msgContainer.classList.add("hide");
}

// Add event listeners
boxes.forEach(box => {
  box.addEventListener("click", () => {
    if (!box.textContent && !isGameOver) {
      box.textContent = turn;
      checkWinner();
      if (!isGameOver) {
        turn = turn === "X" ? "O" : "X";
      }
    }
  });
});

document.getElementById("reset-btn").addEventListener("click", resetGame);
document.getElementById("new-btn").addEventListener("click", resetGame);
