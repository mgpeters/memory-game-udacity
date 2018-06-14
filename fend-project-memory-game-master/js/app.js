/*
 * An array that holds all the cards
 */
const   cards = [ "fa-diamond", "fa-diamond",
                "fa-paper-plane-o", "fa-paper-plane-o",
                "fa-anchor", "fa-anchor",
                "fa-bolt", "fa-bolt",
                "fa-cube", "fa-cube",
                "fa-leaf", "fa-leaf",
                "fa-bicycle", "fa-bicycle",
                "fa-bomb", "fa-bomb"],

        domCardLi = document.getElementsByClassName("card"),
        deckList = document.querySelector(".deck"); 
        

// Randomizes cards on the DOM

function shuffleCards(){
    let shuffledCards = shuffle(cards);

    for(let i = 0; i < domCardLi.length; i += 1){
        domCardLi[i].innerHTML = `<i class="fa ${shuffledCards[i]}"></i>`;
    }
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, 
    temporaryValue, 
    randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

function cardReveal(){

}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

deckList.addEventListener("click", function(){
    console.log("Works");
});

shuffleCards();