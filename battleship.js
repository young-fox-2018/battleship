// Your code here
const coorLibrary = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
let battleShipInit = [
    {
        name: 'Aircraft Carrier',
        emblem: '&',
        size: 5,
    },
    {
        name: 'Battleship',
        emblem: '*',
        size: 4
    },
    {
        name: 'Cruiser',
        emblem: '#',
        size: 3
    },
    {
        name: 'Destroyer',
        emblem: '@',
        size: 2
    }
]
function generateBoard(num) {
    let board = []
    for (let i = 0; i <= num; i++) {
        board.push([])
        for (let j = 0; j <= num; j++) {
            if (!i) {
                if (!j) {
                    board[i].push(coorLibrary[i])
                } else {
                    board[i].push(String(j))
                }
            } else {
                if (!j) {
                    board[i].push(coorLibrary[i])
                } else {
                    board[i].push(' ')
                }
            }
        }
    }
    return board
}

function placeShip(num) {
    let board = generateBoard(num)
    for (let i = 0; i < battleShipInit.length; i++) {
        let randomX = Math.floor(Math.random() * 9 + 1)
        let randomY = Math.floor(Math.random() * 9 + 1)
        board[randomX][randomY] = battleShipInit[i].emblem
        battleShipInit[i].position = [randomX, randomY]
    }
    for (let i = 0; i < battleShipInit.length; i++) {
        let randomShip = Math.floor(Math.random() * 2)
        for (let j = 0; j < battleShipInit[i].size; j++) {
            if (battleShipInit[i].position[0] <= board.length - 1
                && battleShipInit[i].position[1] <= board.length - 1) {
                board[battleShipInit[i].position[0]][battleShipInit[i].position[1]] = battleShipInit[i].emblem
                battleShipInit[i].position[randomShip]++
            }

        }
    }
    console.log(battleShipInit)
    return board
}




function checkCoordinate(input) {

}




console.log(placeShip(10))

// console.log(generateBoard(10))