// global variables
const cards = ['diamond','paper-plane-o','anchor','leaf','bicycle','bomb','bolt','cube'];
let lastTarget;
let moves = 0;
let matchsFound = 0;

// get card target
const getTarget = event => event.target.nodeName === 'I' 
    ? event.target.parentElement : event.target; 

// css manipulation methods
const openCard = target => target.className = 'card open show';
const closeCard = target => { 
    setTimeout(() => target.className = 'card open show shake', 1000);
    setTimeout(() => target.className = 'card', 2000);
}

// when card is matched
const matchCard = target => target.className = 'card open match';
const matched = (last, current) => last.className === current.className;

// show updated moves
const setMoves = moves => document.querySelector('.moves').textContent = moves;

// change ratings based on moves
const processStarRating = () => {
    // for every (cards.length) + 1 moves decrease star rating
    if(moves%(2*cards.length) === 0) {
        const stars = document.querySelectorAll('.fa-star');
        if(stars.length) {
            stars[stars.length - 1].className = 'fa fa-star-o';
        }
    }
}

// when game is done
const processDone = () => {
    if(matchsFound === cards.length) {
        document.querySelector('.container').className = 'container hide';
        const stars = document.querySelectorAll('.fa-star');
        document.querySelector('.message').textContent = `With ${moves} moves and ${stars.length} Stars` ;
        document.querySelector('.finishcontainer').className = 'finishcontainer';
        const again = document.querySelector('.again');
        again.addEventListener('click', restart);
    }
}

/**
 * main processor for this game
 * @param {*} event 
 */
const processGame = event => {
    const target = getTarget(event)
    if (target) {
        setMoves(++moves);
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

        processStarRating();
        processDone();
        console.log(target);
    }
}

// to display the cards
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

// when user choses to play again
const restart = () => {
    document.querySelector('.finishcontainer').className = 'finishcontainer hide';
    document.querySelector('.container').className = 'container';

    const openStars = document.querySelectorAll('.fa-star-o');
    openStars.forEach(star => star.className = 'fa fa-star');

    const openCards = document.querySelectorAll('.open');
    openCards.forEach(card => card.className = 'card');

    matchsFound = 0;
    moves = 0;
    setMoves(moves);
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

displayCards();
setReset();