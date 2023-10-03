const cards = document.querySelectorAll('.card');

// Game state

let flippedCard = false;
let firstCard;
let secondCard;
let pendingMove = false;

function turnCard() {
    if (pendingMove) return;
    this.classList.add('turn');

    if (!flippedCard) {
        flippedCard = true;
        firstCard = this;
    } else {
        // Prevent double-clicking the same card
        if (this === firstCard) {
            return;
        }

        secondCard = this;
        checkForMatch();
    }
}

function checkForMatch() {
    // Check for match
    if (firstCard.dataset.name === secondCard.dataset.name) {
        // It's a match
        disableCards();
    } else {
        // Not a match
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', turnCard);
    secondCard.removeEventListener('click', turnCard);
    resetBoard();
}

function unflipCards() {
    pendingMove = true;
    setTimeout(function () {
        firstCard.classList.remove('turn');
        secondCard.classList.remove('turn');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    flippedCard = false;
    pendingMove = false;
    firstCard = null;
    secondCard = null;
}

for (const card of cards) {
    card.addEventListener('click', turnCard);
}
