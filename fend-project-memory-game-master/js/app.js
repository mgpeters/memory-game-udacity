/*
 * An array that holds all the cards
 */
const   cards = ["fa-diamond", "fa-diamond",
                "fa-paper-plane-o", "fa-paper-plane-o",
                "fa-anchor", "fa-anchor",
                "fa-bolt", "fa-bolt",
                "fa-cube", "fa-cube",
                "fa-leaf", "fa-leaf",
                "fa-bicycle", "fa-bicycle",
                "fa-bomb", "fa-bomb"],

        domCardLi = document.getElementsByClassName("card"),
        deckList = document.querySelector(".deck"),
        restartButton = document.getElementById("restartButton"),
        restart = document.querySelector(".restart"),
        starCounter = document.querySelector(".stars");

let cardQueue = [],
    cardOriginQueue = [],
    winningNumber = 0,
    moves = 0;
        

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
}

function cardReveal(evt){
        evt.target.classList.add("open");
        evt.target.classList.add("show");
        cardQueue.push(evt.target.children);
        cardOriginQueue.push(evt.target);
        console.log(cardQueue);
        console.log(cardOriginQueue);
}

function cardMatch(evt){
    evt.classList.add("match");
    evt.classList.remove("open");
    evt.classList.remove("show");
}

function cardReverse(evt){
    evt.classList.remove("open");
    evt.classList.remove("show");
}
function gameRestart(){
    console.log("Restart Clicked");
    for(i = 0; i < domCardLi.length; i += 1){
        domCardLi[i].classList.remove("match");
        domCardLi[i].classList.remove("show");
        domCardLi[i].classList.remove("open");
    }
    moves = 0;
    shuffleCards();
    const winner = document.querySelector(".winners-screen").style.visibility='hidden';
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

deckList.addEventListener("click", function(event){ //this is all fucked start here//
    if(event.target.classList.contains("open")){
        console.log("already open");
        return;
    } else if(cardQueue.length > 2){
        cardQueue = [];
        cardOriginQueue = [];
        return;
    } else{
        cardReveal(event);
    }

    if(cardQueue.length > 1){
        if(cardQueue[0][0].className == cardQueue[1][0].className){   
            console.log("Matched");  
            setTimeout(function matchedTimeout(){
                for(let i = 0; i < cardOriginQueue.length; i += 1){
                cardMatch(cardOriginQueue[i]);
                }
                cardQueue = [];
                cardOriginQueue = [];
                winningNumber += 1;
                moves += 1;
                if (winningNumber == 8){
                    console.log("YOU WON");
                    const winner = document.querySelector(".winners-screen").style.visibility='visible';
                }
            }, 1000);
        }
        else{
            console.log("no match");
            setTimeout(function reverseTimeout(){
                for(let i = 0; i < cardOriginQueue.length; i += 1){
                cardReverse(cardOriginQueue[i]);
                }
                cardQueue = [];
                cardOriginQueue = [];
                moves += 1;
            }, 1000);
        }
    }
});

    
restartButton.addEventListener('click', gameRestart);
restart.addEventListener('click', gameRestart);

shuffleCards();