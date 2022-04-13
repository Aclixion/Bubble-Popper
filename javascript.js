const allBubbles = document.querySelectorAll(".bubble");
const playBtn = document.querySelector(".play-btn");
const messageDisplay = document.querySelector(".message-display");

let score;
let secondsLeft;

let timerId;

// Starts the game
function startGame() {
    // Disables play button
    playBtn.disabled = true;
    playBtn.classList.add("disabled");
    // Resets score and timer
    score = 0;
    secondsLeft = 10;
    // Enables all bubbles
    for (bubble of allBubbles) {
        if (bubble.disabled) {
            bubble.disabled = false;
        }
        if (bubble.classList.contains("popped")) {
            bubble.classList.remove("popped");
        }
    }
    // Starts timer
    messageDisplay.textContent = `${secondsLeft}`;
    timerId = setInterval(decreaseTimer, 1000);
}

// Ends the game
function endGame() {
    // Stops timer
    clearInterval(timerId);
    timerId = null;
    // Disables all bubbles
    for (bubble of allBubbles) {
        if (!bubble.disabled) {
            bubble.disabled = true;
        }
    }
    // Update message to display score
    messageDisplay.textContent = `You have popped ${score} bubbles!`;
    // Enables play button
    playBtn.disabled = false;
    playBtn.classList.remove("disabled");
}

// Subtracts from the timer
function decreaseTimer() {
    // Decreases seconds left until zero
    if (secondsLeft > 1) {
        secondsLeft--;
        messageDisplay.textContent = `${secondsLeft}`;
    } else {
        endGame();
    }
}

// Clicking play button starts game
playBtn.addEventListener("click", startGame);

// If a bubble is clicked, it gets popped and the score increases by 1
allBubbles.forEach((bubble) => {
    bubble.addEventListener("click", function() {
        score++;
        bubble.classList.add("popped");
        bubble.disabled = true;
    });
});