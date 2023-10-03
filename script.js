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

//Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Get all the card elements and convert them into an array
const cardElements = Array.from(document.querySelectorAll('.card'));

// Shuffle the card elements
shuffleArray(cardElements);

// Get the grid container
const gridContainer = document.getElementById('grid-container');

// Clear the grid container
gridContainer.innerHTML = '';

// Append the shuffled card elements back to the grid container
cardElements.forEach((card) => {
    gridContainer.appendChild(card);
});

for (const card of cards) {
    card.addEventListener('click', turnCard);
}
