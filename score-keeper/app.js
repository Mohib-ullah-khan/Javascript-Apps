// Global variables keeping count of score
let playerOneCount = 0;
let playerTwoCount = 0;

const buttonOne = document.querySelector('#buttonOne');
const buttonTwo = document.querySelector('#buttonTwo');
const buttonReset = document.querySelector('#buttonReset');
const scoreSelect = document.querySelector('#score-select');
const score1 = document.querySelector('#score span:first-child');
const score2 = document.querySelector('#score span:last-child');

function showScore() {
    score1.innerText = `${playerOneCount}`;
    score2.innerText = `${playerTwoCount}`;
}

function parseMaxScore(scoreSelect) {
    return parseInt(scoreSelect[scoreSelect.options.selectedIndex].value) + 1;
}

function gameOverCheck() {
    if ((playerOneCount >= toWin) || (playerTwoCount >= toWin)) {
        // disabling the buttons and add the necessary style changes 
        buttonOne.classList.add('disabled');
        buttonTwo.classList.add('disabled');

        // change colors of score board depending on winner
        switch(toWin) {
            case playerOneCount:
                score1.classList.add('success');
                score2.classList.add('loss');
                break;

            case playerTwoCount:
                score2.classList.add('success');
                score1.classList.add('loss');
                break;
        }
    }
}

function resetGame() {
    // Remove disable behavior
    buttonOne.classList.remove('disabled');
    buttonTwo.classList.remove('disabled');

    // Reinitialize Count
    playerOneCount = 0;
    playerTwoCount = 0;

    // change score card to default colors
    score1.className = '';
    score2.className = '';
}

// Let us also introduce a "Deuce" Feature
// i.e. if both players reach to a score one less than the maximum,
// both the scores will be reduced.

function deuce() {
    if ((playerOneCount == toWin-1) && (playerTwoCount == toWin-1)) {
        playerOneCount -= 3;
        playerTwoCount -= 3;
    }
}

// Every time user changes the option, update the variable
let toWin = parseMaxScore(scoreSelect) + 1; // by default
scoreSelect.addEventListener('input', () => toWin = parseMaxScore(scoreSelect));

// score increase, show and checking when game is over
buttonOne.addEventListener('click', () => playerOneCount += 1);
buttonOne.addEventListener('click', gameOverCheck);
buttonOne.addEventListener('click', deuce);
buttonOne.addEventListener('click', showScore);

buttonTwo.addEventListener('click', () => playerTwoCount += 1);
buttonTwo.addEventListener('click', gameOverCheck);
buttonTwo.addEventListener('click', deuce);
buttonTwo.addEventListener('click', showScore);


// reset game
buttonReset.addEventListener('click', resetGame);
buttonReset.addEventListener('click', showScore);


