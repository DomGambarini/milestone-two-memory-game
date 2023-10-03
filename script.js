const cards = document.querySelectorAll('.card');

//Game state

let flippedCard = false;
let firstCard;
let secondCard;

function turnCard() {
    this.classList.add('turn');

    //first click
    if(!flippedCard) {
        flippedCard = true;
        firstCard = this;
        
    } else {
        //second card
        flippedCard = false;
        secondCard = this;
        console.log({flippedCard, secondCard})

        //check for match
        if (firstCard.dataset.name === secondCard.dataset.name) {
            //it's a match
            firstCard.removeEventListener('click', turnCard);
            secondCard.removeEventListener('click', turnCard);
        } else {
            //not a match
            setTimeout(() => {
                firstCard.classList.remove('turn');
                secondCard.classList.remove('turn');
            }, 1000);
        }
        console.log('Completed')
    }
};




for (const card of cards) {
    card.addEventListener('click', turnCard);
};