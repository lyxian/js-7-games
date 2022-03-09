function getImgArray(nameArray) {
    let imgArray = []
    nameArray.forEach(name => {
        imgArray.push({
            name: name, img: `src/${name}.png`
        })
        imgArray.push({
            name: name, img: `src/${name}.png`
        })
    })
    return imgArray
}

nameArray = [
    // 'fries', 'pizza', 'burger', 'a', 'b', 'c', 'd', 'e', 'f'
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'
    // 'a', 'b', 'c'
]

const cardArray = getImgArray(nameArray)
let cardsChosen = []
let cardsChosenIds = []
const cardsWon = []

// Random sort array
cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')

function createBoard() {
    for (let i = 0; i < cardArray.length; ++i) {
        const card = document.createElement('img');
        card.setAttribute('src', 'src/tmp.png')
        card.setAttribute('data-id', i)
        card.setAttribute('style', 'height: 150px;')
        card.addEventListener('click', flipCard)
        gridDisplay.appendChild(card)
    }
    resultDisplay.innerHTML = 0
}

function checkMatch() {
    const cards = document.querySelectorAll('#grid img')
    const cardId_1 = cardsChosen[0]
    const cardId_2 = cardsChosen[1]
    if (cardId_1 == cardId_2) {
        cardsWon.push(cardsChosen)

        if (cardsWon.length == cardArray.length / 2) {
            alert('You win!')
            resultDisplay.innerHTML = cardsWon.length + ' (You win!)'
        }
        else {
            alert('A match')
            resultDisplay.innerHTML = cardsWon.length
        }
        cardsChosenIds.forEach(cardId => {
            cards[cardId].setAttribute('src', 'src/win.png')
            cards[cardId].removeEventListener('click', flipCard)
        })
    }
    else {
        alert('No match')
        cardsChosenIds.forEach(cardId => {
            cards[cardId].setAttribute('src', 'src/tmp.png')
        })
    }
    cardsChosen = []
    cardsChosenIds = []
}

function flipCard() {
    const cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId)

    this.setAttribute('src', `src/${cardArray[cardId].name}.png`)
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500)
        // cardsChosen.pop()
        // cardsChosen.pop()
        // cardsChosenIds.pop()
        // cardsChosenIds.pop()
    }
    console.log(cardsChosen)
    console.log(cardsChosenIds)
}

createBoard()