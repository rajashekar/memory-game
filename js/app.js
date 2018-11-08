/*
 * Create a list that holds all of your cards
 */
const cards = ['diamond','paper-plane-o','anchor','leaf','bicycle','bomb','bolt','cube'];
let lastTarget;
let moves = 0;
let matchsFound = 0;

const getTarget = event => event.target.nodeName === 'I' 
    ? event.target.parentElement : event.target; 

// css manipulation methods
const openCard = target => target.className = 'card open show';
const closeCard = target => { 
    setTimeout(() => target.className = 'card open show shake', 1000);
    setTimeout(() => target.className = 'card', 2000);
}
const matchCard = target => target.className = 'card open match';

const matched = (last, current) => last.className === current.className;
const setMoves = moves => document.querySelector('.moves').textContent = moves;

const processGame = event => {
    const target = getTarget(event)
    if (target) {
        setMoves(moves++);
        if(target.className === 'card') {
            openCard(target);
            if(lastTarget)  {
                 // match found   
                if(matched(lastTarget.firstElementChild, target.firstElementChild)) {
                    matchCard(lastTarget);
                    matchCard(target);
                    matchsFound++;
                } else { // no match
                    closeCard(lastTarget);
                    closeCard(target);
                }
                // reset last target
                lastTarget = undefined;
            } else {
                lastTarget = target
            }
        } else if(target.className === 'card open show') {
            closeCard(target);
        }
        console.log(target);
    }
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const displayCards = () => {
    const unorderedList = document.querySelector('.deck');
    unorderedList.addEventListener('click', processGame);
    // Note: cards.concat(cards) is for duplicating cards. 
    shuffle(cards.concat(cards)).forEach(object => {
        const list = document.createElement('li');
        list.className = 'card';
        const italic = document.createElement('i');
        italic.className = `fa fa-${object}`;
        list.appendChild(italic);
        unorderedList.appendChild(list);
    });
}

const restart = () => {
    const openCards = document.querySelectorAll('.open');
    openCards.forEach(card => card.className = 'card');
    setMoves(0);
}

const setReset = () => {
    const reset = document.querySelector('.restart');
    reset.addEventListener('click',restart);
}

// Shuffle function from http://stackoverflow.com/a/2450976
const shuffle = array => {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
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
displayCards();
setReset();