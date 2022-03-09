const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('#result')
const pauseButton = document.querySelector('#pause-btn')
const resumeButton = document.querySelector('#resume-btn')
const gridWidth = 560
const gridHeight = 300
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
const ballSpeed = 15
const userSpeed = 20

let gameStart = false
let result = 0


let timerId

const userStart = [230, 10]
let currentPosition = userStart

const ballStart = [270, 40]
let ballPosition = ballStart

COLUMNS = 5
ROWS = 4
TOTAL_BLOCKS = COLUMNS * ROWS

START_X = 10
START_Y = 270
CHANGE_X = 110
CHANGE_Y = -30

const blocks = []

class Block {
    constructor(id, left, bottom) {
        this.id = id
        this.bottomLeft = [left, bottom]
        this.bottomRight = [left + blockWidth, bottom]
        this.topLeft = [left, bottom + blockHeight]
        this.topRight = [left + blockWidth, bottom + blockHeight]
    }
}

for (let i = 0; i < ROWS; ++i) {
    for (let j = 0; j < COLUMNS; ++j) {
        blocks.push(new Block(j + i * COLUMNS, START_X + CHANGE_X * j, START_Y + CHANGE_Y * i))
    }
}

resultDisplay.innerHTML = result

// const blocks = [
//     new Block(10, 270),
//     new Block(120, 270),
//     new Block(230, 270),
//     new Block(340, 270),
//     new Block(450, 270),
// ]

function addBlocks() {
    for (let i = 0; i < blocks.length; ++i) {
        const block = document.createElement('div')
        block.classList.add('block')

        block.style.left = `${blocks[i].bottomLeft[0]}px`
        block.style.bottom = `${blocks[i].bottomLeft[1]}px`
        block.setAttribute('data-id', blocks[i].id)
        grid.appendChild(block)
    }
}

addBlocks()

const user = document.createElement('div')
user.classList.add('user')
grid.appendChild(user)

// Add User
function drawUser() {
    user.style.left = `${currentPosition[0]}px`
    user.style.bottom = `${currentPosition[1]}px`
}

drawUser()

// Move User
function moveUser(e) {
    switch (e.key) {
        case 'a':
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                if (!gameStart) {
                    ballPosition[0] -= userSpeed
                    drawBall()
                }
                currentPosition[0] -= userSpeed
                drawUser()
            }
            break
        case 'd':
        case 'ArrowRight':
            if (currentPosition[0] < gridWidth - blockWidth) {
                if (!gameStart) {
                    ballPosition[0] += userSpeed
                    drawBall()
                }
                currentPosition[0] += userSpeed
                drawUser()
            }
            break
        case ' ':
            if (!gameStart) {
                timerId = setInterval(moveBall, ballSpeed)
                gameStart = true
            } else {
                clearInterval(timerId)
                gameStart = false
            }
            break
    }
}

document.addEventListener('keydown', moveUser)

// Add Ball
function drawBall() {
    ball.style.left = `${ballPosition[0]}px`
    ball.style.bottom = `${ballPosition[1]}px`
}

// Add Ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

let xDirection = 2
let yDirection = 2

// Move Ball
function moveBall() {
    ballPosition[0] += xDirection
    ballPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}

// timerId = setInterval(moveBall, ballSpeed)

function ballWithinBlock(ballPositions, blockBottomPositions, blockTopPositions) {
    for (let i = 0; i < ballPositions.length; ++i) {
        if (
            ballPositions[0] <= blockBottomPositions[0] || ballPositions[1] <= blockBottomPositions[1]
            ||
            ballPositions[0] >= blockTopPositions[0] || ballPositions[1] >= blockTopPositions[1]
        ) { return false; }
    }
    return true
}

// Check for Collisions
function checkForCollisions() {
    // Check Block
    ballTop = [ballPosition[0] + ballDiameter / 2, ballPosition[1] + ballDiameter]
    ballLeft = [ballPosition[0], ballPosition[1] + ballDiameter / 2]
    ballRight = [ballPosition[0] + ballDiameter, ballPosition[1] + ballDiameter / 2]
    ballBottom = [ballPosition[0] + ballDiameter / 2, ballPosition[1]]
    blockCollision = false
    for (let i = 0; i < blocks.length; ++i) {
        block = blocks[i]
        if (ballWithinBlock(ballTop, block.bottomLeft, block.topRight)) {
            yDirection *= -1
            blockCollision = true
        }
        if (ballWithinBlock(ballLeft, block.bottomLeft, block.topRight)) {
            xDirection *= -1
            blockCollision = true
        }
        if (ballWithinBlock(ballRight, block.bottomLeft, block.topRight)) {
            xDirection *= -1
            blockCollision = true
        }
        if (ballWithinBlock(ballBottom, block.bottomLeft, block.topRight)) {
            yDirection *= -1
            blockCollision = true
        }
        if (blockCollision) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            result += 1
            resultDisplay.innerHTML = result
            if (result === TOTAL_BLOCKS) {
                alert('You win!')
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUser)
            }
            break
            clearInterval(timerId)
        }
    }
    // for (let i = 0; i < blocks.length; ++i) {
    //     // hit top
    //     // hit left
    //     // hit right
    //     // hit bottom

    //     if (
    //         (ballPosition[0] + ballDiameter > blocks[i].bottomLeft[0] && ballPosition[0] + ballDiameter < blocks[i].bottomRight[0])
    //         &&
    //         (ballPosition[1] + ballDiameter > blocks[i].bottomLeft[1] && ballPosition[1] + ballDiameter < blocks[i].topLeft[1])
    //     ) {
    //         const allBlocks = Array.from(document.querySelectorAll('.block'))
    //         // console.log(allBlocks)
    //         allBlocks[i].classList.remove('block')
    //         if (ballPosition[0] + ballDiameter > blocks[i].bottomLeft[0] && ballPosition[0] + ballDiameter < blocks[i].bottomRight[0]) {
    //             yDirection *= -1
    //         }
    //         else if (ballPosition[1] + ballDiameter > blocks[i].bottomLeft[1] && ballPosition[1] + ballDiameter < blocks[i].topLeft[1]) {
    //             xDirection *= -1
    //         }
    //         blocks.splice(i, 1)
    //         break
    //     }
    //     else if (
    //         (ballPosition[0] - ballDiameter > blocks[i].bottomLeft[0] && ballPosition[0] - ballDiameter < blocks[i].bottomRight[0])
    //         &&
    //         (ballPosition[1] > blocks[i].bottomLeft[1] && ballPosition[1] < blocks[i].topLeft[1])
    //     ) {
    //         const allBlocks = Array.from(document.querySelectorAll('.block'))
    //         // console.log(allBlocks)
    //         allBlocks[i].classList.remove('block')
    //         if (ballPosition[0] - ballDiameter > blocks[i].bottomLeft[0] && ballPosition[0] - ballDiameter < blocks[i].bottomRight[0]) {
    //             yDirection *= -1
    //         }
    //         else if (ballPosition[1] > blocks[i].bottomLeft[1] && ballPosition[1] < blocks[i].topLeft[1]) {
    //             xDirection *= -1
    //         }
    //         blocks.splice(i, 1)
    //         break
    //     }
    // }
    // Check Wall
    if (ballPosition[0] >= (gridWidth - ballDiameter)) {
        changeDirection('left')
    }
    else if (ballPosition[0] <= 0) {
        changeDirection('right')
    }
    else if (ballPosition[1] >= (gridHeight - ballDiameter)) {
        changeDirection('down')
    }
    else if (ballPosition[1] <= 0) {
        // clearInterval(timerId)
        // resultDsiplay.innerHTML = 'You lose!'
        // document.removeEventListener('keydown', moveUser)
        changeDirection('top')
    }
    // Check User
    userBottomLeft = [currentPosition[0], currentPosition[1]]
    userTopRight = [currentPosition[0] + blockWidth, currentPosition[1] + blockHeight]
    if (ballWithinBlock(ballBottom, userBottomLeft, userTopRight)) {
        changeDirection('top')
    }
}

function changeDirection(x) {
    switch (x) {
        case 'left':
            xDirection *= -1
            return
        case 'right':
            xDirection *= -1
            return
        case 'down':
            yDirection *= -1
            return
        case 'top':
            yDirection *= -1
            return
    }
    // if (xDirection === 2 && yDirection === 2) {
    //     xDirection = -2
    //     return
    // }
    // if (xDirection === -2 && yDirection === 2) {
    //     yDirection = -2
    //     return
    // }
}

pauseButton.addEventListener('click', () => {
    clearInterval(timerId)
})

resumeButton.addEventListener('click', () => {
    timerId = setInterval(moveBall, ballSpeed)
    gameStart = true
})