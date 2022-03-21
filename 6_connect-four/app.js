document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const result = document.querySelector('#result')
    const currentPlayerDisplay = document.querySelector('#current-player')

    let currentPlayer = 1
    const winningArray = [
        [35, 36, 37, 38],
        [36, 37, 38, 39],
        [37, 38, 39, 40],
        [38, 39, 40, 41],
        [42, 43, 44, 45],
        [43, 45, 46, 47],
        [44, 46, 47, 48],
        [46, 47, 48, 49],
    ]

    function checkBoard() {
        for (let i = 0; i < winningArray.length; ++i) {
            const square1 = squares[winningArray[i][0]]
            const square2 = squares[winningArray[i][1]]
            const square3 = squares[winningArray[i][2]]
            const square4 = squares[winningArray[i][3]]
            // Check if squares have class value of player-n
            if (
                square1.classList.contains('player-one') &&
                square2.classList.contains('player-one') &&
                square3.classList.contains('player-one') &&
                square4.classList.contains('player-one')
            ) {
                result.innerHTML = 'Player One Wins!'
            }
            if (
                square1.classList.contains('player-two') &&
                square2.classList.contains('player-two') &&
                square3.classList.contains('player-two') &&
                square4.classList.contains('player-two')
            ) {
                result.innerHTML = 'Player Two Wins!'
            }
        }
    }

    for (let i = 0; i < squares.length; ++i) {
        squares[i].onclick = () => {
            // alert(`You have clicked square ${i}`)
            // Check if move is valid
            if (squares[i + 7].classList.contains('taken') && !squares[i].classList.contains('taken')) {
                if (currentPlayer === 1) {
                    squares[i].classList.add('taken')
                    squares[i].classList.add('player-one')
                    currentPlayer = 2
                    currentPlayerDisplay.innerHTML = currentPlayer
                } else if (currentPlayer === 2) {
                    squares[i].classList.add('taken')
                    squares[i].classList.add('player-two')
                    currentPlayer = 1
                    currentPlayerDisplay.innerHTML = currentPlayer
                } else {
                    alert('Invalid move')
                }
                checkBoard()
            }
        }
    }
})