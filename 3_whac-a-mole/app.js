const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')

const timeLeft = document.querySelector('#time')
const resultDisplay = document.querySelector('#result')

let timerId
let result = 0
let currentTime = 10
let hitPosition

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole')
        square.querySelectorAll('img').forEach(elem => {
            square.removeChild(elem)
        })
    })

    const randomPosition = Math.floor(Math.random() * 9)
    let randomSquare = squares[randomPosition]

    randomSquare.classList.add('mole')
    if (false) {
        const img = document.createElement('img')
        img.setAttribute('src', 'src/mole.png')
        img.setAttribute('height', '200px')
        img.setAttribute('id', 'img')
        randomSquare.appendChild(img)
    }

    hitPosition = randomSquare.id
}

let handler = function () {
    if (this.id == hitPosition) {
        ++result
        resultDisplay.innerHTML = result
        hitPosition = null
    }
}

squares.forEach(square => {
    // square.addEventListener('mousedown', () => {
    //     if (square.id == hitPosition) {
    //         ++result
    //         console.log(result)
    //         resultDisplay.innerHTML = result
    //         hitPosition = null
    //     }
    // })
    square.addEventListener('mousedown', handler)
})

function moveMole() {
    timerId = setInterval(randomSquare, 500)
}

function countDown() {
    timeLeft.innerHTML = --currentTime

    if (currentTime == 0) {
        clearInterval(countDownTimerId)
        clearInterval(timerId)
        alert(`GAME OVER! Your final score is: ${result}`)
        squares.forEach(square => {
            square.removeEventListener('mousedown', handler)
        })
    }
}

moveMole()
timeLeft.innerHTML = currentTime
let countDownTimerId = setInterval(countDown, 1000)
