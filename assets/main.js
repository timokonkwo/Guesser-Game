/*
    Game Function
    - Player must guess a number between a min and max
    - Player gersa certain a amount of guesses
    - Notify player of guesses remaining
    - Notify the player of the correct answer if loose
    - Let player decide to play again
*/

// Game values

let min = getMin(),
    max = min + 10,
    winingNumber = getRandomNumber(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('.game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessInput = document.querySelector('#guess-input'),
    guessBtn = document.querySelector('#guess-btn'),
    message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mouseup', (e) => {
    if (e.target.className === 'play-again') {
       window.location.reload()
    }
})

// Guess function
validate = () => {
    let guess = parseInt(guessInput.value);

    // validate input
    if (isNaN(guess) || guess < min || guess > max) {
        sendMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // Check Win
    if (!guess) {
        sendMessage('Please enter a number')
    } else if (guess === winingNumber) {
        // Game Over - Won
        gameOver(true, `${winingNumber} is correct!. YOU WIN!`)
    }
    else {
        // Wrong Number
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            // Game Over - Lost
            gameOver(false, `Game Over! You lost. The correct number was ${winingNumber}`)

        } else {
            // Game continues - answer wrong

            // Change border color
            guessInput.style.borderColor = 'red'

            // Clear Input
            guessInput.value = ''

            // Show not correct
            sendMessage(`${guess} is not correct. ${guessesLeft} guesses left!`, 'red')

        }
    }
}

// Error message
sendMessage = (msg, color) => {
    message.style.color = color;
    message.textContent = msg;
}

// Listen for guess
guessBtn.addEventListener('click', validate)

// Game Over

gameOver = (won, msg) => {
    let color;
    won === true ? color = 'green' : color = 'red';
    // Disable input
    guessInput.disabled = true;
    // Change border color   
    guessInput.style.borderColor = color
    // Change text color
    message.style.color = color
    sendMessage(msg)

    // Play again
    guessBtn.value = 'Play again'
    guessBtn.className += 'play-again'
}

function getMin() {
    return Math.floor((Math.random() * 10) + 1);
}

// Get Winning number
function getRandomNumber(min, max){
    winning = Math.floor(Math.random() * (max-min+1) + min)
    return winning
}

