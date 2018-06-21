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
        moveSelector = document.querySelectorAll(".moves"),
        starCounter = document.querySelectorAll(".stars li"),
        timerDisplay = document.querySelectorAll(".timer");

let cardQueue = [],
    cardOriginQueue = [],
    winningNumber = 0,
    moves = 0,
    starRating = 3,
    seconds = 0,
    minutes = 0,
    hours = 0,
    time;
    
    console.log(time);

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
}

function cardMatch(evt){
    setTimeout(function matchedTimeout(){
        evt.classList.add("match");
        evt.classList.remove("open");
        evt.classList.remove("show");
    }, 1000);    
}

function cardReverse(evt){
    setTimeout(function reverseTimeout(){
        evt.classList.remove("open");
        evt.classList.remove("show");
    }, 1000)
}

function gameRestart(){
    console.log("Restart Clicked");
    for(i = 0; i < domCardLi.length; i += 1){
        domCardLi[i].classList.remove("match");
        domCardLi[i].classList.remove("show");
        domCardLi[i].classList.remove("open");
    }

    moves = 0;

    winningNumber = 0;

    for(i = 0; i < moveSelector.length; i += 1){
        moveSelector[i].textContent = moves;
    }
    timerDisplay[1].textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
    clearTimeout(time);
    time = undefined;
    starReplenish();
    shuffleCards();
    const winner = document.querySelector(".winners-screen").style.visibility='hidden';
}

function movesIncrease(){
    moves += 1;

    console.log("Moves: " + moves);

    for(i = 0; i < moveSelector.length; i += 1){
        moveSelector[i].textContent = moves;
    }
}

// Hiding Stars Function - Based off example from: https://matthewcranford.com/memory-game-walkthrough-part-5-moves-stars/  - June 20, 2018
function starHide(){
    for (star of starCounter){
        if(star.style.display !== 'none'){
            star.style.display = "none";
            starRating -= 1;
            break;
        }
    }
}

function starReplenish(){
    let starCounter = document.querySelectorAll(".stars li");
    console.log("star replenish active");
    for (star of starCounter){
        star.style.display = "";      
    }
    starRating = 3;
}

//Javascript Timer Functions from: https://jsfiddle.net/Daniel_Hug/pvk6p/// - June 20, 2018
function addTime() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    timerDisplay[1].textContent =   (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + 
                                    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" 
                                    + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}
function timer() {
    time = setTimeout(addTime, 1000);
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

deckList.addEventListener("click", function(event){
    if(typeof time === 'undefined'){
        timer();
    }

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
            movesIncrease();  
                for(let i = 0; i < cardOriginQueue.length; i += 1){
                cardMatch(cardOriginQueue[i]);
                }
                cardQueue = [];
                cardOriginQueue = [];
                winningNumber += 1;
                if (winningNumber == 8){
                    clearTimeout(time);

                    const   winningStarsDisplay = document.getElementById("winning-stars"),
                            winner = document.querySelector(".winners-screen").style.visibility='visible';

                            winningStarsDisplay.innerHTML = starRating;

                            timerDisplay[0].textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + 
                            (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" 
                            + (seconds > 9 ? seconds : "0" + seconds);
                }

                if(moves === 10 || moves === 20){
                    starHide();
                }
        }
        else{
            movesIncrease();

            for(let i = 0; i < cardOriginQueue.length; i += 1){
            cardReverse(cardOriginQueue[i]);
            }                
            cardQueue = [];
            cardOriginQueue = [];

            if(moves === 10 || moves === 20){
                starHide();
            }
        }
    }
});

    
restartButton.addEventListener('click', gameRestart);
restart.addEventListener('click', gameRestart);

shuffleCards();