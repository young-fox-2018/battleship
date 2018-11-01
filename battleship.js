// Your code here
let x = 0;
let y = 0;
let num = 10;


function generateBoard(num) {
    let board = []
    for (let i = 0; i < num; i++) {
        let tmp = []
        for (let j = 0; j < num; j++) {
            tmp.push('~')
        }
        board.push(tmp)
    }
    return board
}
function randomCoordinate(num) {
    return Math.floor(Math.random() * num)
}

function aircraftCarrier(boardBattleship) {
    let board = boardBattleship
    let bisa = false
    while (bisa === false) {
        x = randomCoordinate(num)
        y = randomCoordinate(num)
        if (y <= num - 5) {
            board[x][y] = 'A'
            board[x][y + 1] = 'A'
            board[x][y + 2] = 'A'
            board[x][y + 3] = 'A'
            board[x][y + 4] = 'A'
            bisa = true
            break

        }
        else if (x <= num - 5) {
            board[x][y] = 'A'
            board[x + 1][y] = 'A'
            board[x + 2][y] = 'A'
            board[x + 3][y] = 'A'
            board[x + 4][y] = 'A'
            bisa = true
            break
        }

    }
    return board
}

function battleShip(boardBattleship) {
    let board = boardBattleship
    let bisa = false
    while (bisa === false) {
        x = randomCoordinate(num)
        y = randomCoordinate(num)
        if (y <= num - 4) {
            board[x][y] = 'B'
            board[x][y + 1] = 'B'
            board[x][y + 2] = 'B'
            board[x][y + 3] = 'B'
            bisa = true
            break

        }
        else if (x <= num - 4) {
            board[x][y] = 'B'
            board[x + 1][y] = 'B'
            board[x + 2][y] = 'B'
            board[x + 3][y] = 'B'
            bisa = true
            break
        }
    }
    return board
}

function cruiser(boardBattleship) {
    let board = boardBattleship
    let bisa = false
    while (bisa === false) {
        x = randomCoordinate(num)
        y = randomCoordinate(num)
        if (x <= num - 3) {
            board[x][y] = 'C'
            board[x + 1][y] = 'C'
            board[x + 2][y] = 'C'
            bisa = true
            break
        }
        else if (y <= num - 3) {
            board[x][y] = 'C'
            board[x][y + 1] = 'C'
            board[x][y + 2] = 'C'
            bisa = true
            break

        }
    }
    return board
}

function destroyer(boardBattleship) {
    let board = boardBattleship
    let bisa = false
    while (bisa === false) {
        x = randomCoordinate(num)
        y = randomCoordinate(num)
        if (x <= num - 3) {
            board[x][y] = 'D'
            board[x + 1][y] = 'D'
            bisa = true
            break
        }
        else if (y <= num - 3) {
            board[x][y] = 'D'
            board[x][y + 1] = 'D'
            bisa = true
            break

        }
    }
    return board
}

function validation() {
    let isTrue = false
    while (isTrue === false) {
        let boardBattleship = generateBoard(num)
        let a = 0
        let b = 0
        let c = 0
        let d = 0
        aircraftCarrier(boardBattleship)
        battleShip(boardBattleship)
        cruiser(boardBattleship)
        destroyer(boardBattleship)
        let board = boardBattleship
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j] === 'A') {
                    a++
                }
                if (board[i][j] === 'B') {
                    b++
                }
                if (board[i][j] === 'C') {
                    c++
                }
                if (board[i][j] === 'D') {
                    d++
                }
            }
        }
        if (a === 5 && b === 4 && c === 3 && d === 2) {
            return board
        }
    }
}

function shipDestroyed(board) {
    let a = 0; b = 0; c = 0; d = 0
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            switch (board[i][j]) {
                case 'A':
                    a++
                    break;
                case 'B':
                    b++
                    break;
                case 'C':
                    c++
                    break;
                case 'D':
                    d++
                    break;
            }
        }
    }
    if (a <= 5) {
        console.log("Aircraft Carrier destroyed")
    }
}

let coordinate = process.argv
let bomb = [coordinate[2], coordinate[3], coordinate[4]]

let board = validation()

for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
        for (let k = 0; k < bomb.length; k++) {
            if (i === Number(bomb[k][0]) && j === Number(bomb[k][1])) {
                if (board[i][j] === '~') {
                    board[i][j] = '*'
                }
                else {
                    switch (board[i][j]) {
                        case 'A':
                        console.log('Aircraft Carrier has been destroyed')
                        board[i][j] = 'X'
                            break;
                        case 'B':
                        console.log('Battleship has been destroyed')
                        board[i][j] = 'X'
                            break;
                        case 'C':
                        console.log('Cruiser has been destroyed')
                        board[i][j] = 'X'
                            break;
                        case 'D':
                        console.log('Destroyer has been destroyed')
                        board[i][j] = 'X'
                            break;
                    }
                }
            }
        }

    }
}
console.log(board)

