const computerChoiceDisplay = document.getElementById('computer-choice')
const userChoiceDisplay = document.getElementById('user-choice')
const resultDisplay = document.getElementById('result')
const possibleChoices = document.querySelectorAll('button')

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    userChoice = e.target.id
    userChoiceDisplay.innerHTML = userChoice
    computerChoiceDisplay.innerHTML = generateComputerChoice()
    resultDisplay.innerHTML = getResult()
}))

function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * possibleChoices.length)
    computerChoice = possibleChoices[randomNumber].id
    return computerChoice
}

function getResult() {
    if (computerChoice == userChoice) {
        result = 'DRAW'
    }
    else {
        const key = userChoice + computerChoice
        const possibleResults = {
            'RockScissors': 'WIN',
            'ScissorsPaper': 'WIN',
            'PaperRock': 'WIN',
            'ScissorsRock': 'LOSE',
            'PaperScissors': 'LOSE',
            'RockPaper': 'LOSE'
        }
        result = possibleResults[key]
    }
    return result
}