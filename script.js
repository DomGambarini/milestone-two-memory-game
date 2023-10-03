const cards = document.querySelectorAll('.card');

//Game state

let flippedCard = false;
let firstCard;
let secondCard;
let pendingMove = false;

function turnCard() {
    if (pendingMove) return;
    this.classList.add('turn');

    //first click
    if(!flippedCard) {
        flippedCard = true;
        firstCard = this;
        
    } else {
        //second card
        flippedCard = false;
        secondCard = this;
        
        checkForMatch()
    }
};

function checkForMatch() {
    //check for match
    if (firstCard.dataset.name === secondCard.dataset.name) {
        //it's a match
        disableCards()
    } else {
        //not a match
        unflipCards()
    };
};

function disableCards() {
    firstCard.removeEventListener('click', turnCard);
    secondCard.removeEventListener('click', turnCard);
};

function unflipCards() {
    pendingMove = true;
    setTimeout(function () {
        firstCard.classList.remove('turn');
        secondCard.classList.remove('turn');
        pendingMove = false;
    }, 1000);
};


for (const card of cards) {
    card.addEventListener('click', turnCard);
};