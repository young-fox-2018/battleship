// Your code here
let x = 0;
let y = 0;
let num = 10;


function generateBoard(num) {
    let board = []
    for (let i = 0; i < num; i++) {
        let tmp = []
        for (let j = 0; j < num; j++) {
            tmp.push(' ')
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
            board[x][y] = 'a'
            board[x][y + 1] = 'a'
            board[x][y + 2] = 'a'
            board[x][y + 3] = 'a'
            board[x][y + 4] = 'a'
            bisa = true
            break

        }
        else if (x <= num - 5) {
            board[x][y] = 'a'
            board[x + 1][y] = 'a'
            board[x + 2][y] = 'a'
            board[x + 3][y] = 'a'
            board[x + 4][y] = 'a'
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
            board[x][y] = 'b'
            board[x][y + 1] = 'b'
            board[x][y + 2] = 'b'
            board[x][y + 3] = 'b'
            bisa = true
            break

        }
        else if (x <= num - 4) {
            board[x][y] = 'b'
            board[x + 1][y] = 'b'
            board[x + 2][y] = 'b'
            board[x + 3][y] = 'b'
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
            board[x][y] = 'c'
            board[x + 1][y] = 'c'
            board[x + 2][y] = 'c'
            bisa = true
            break
        }
        else if (y <= num - 3) {
            board[x][y] = 'c'
            board[x][y + 1] = 'c'
            board[x][y + 2] = 'c'
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
            board[x][y] = 'd'
            board[x + 1][y] = 'd'
            bisa = true
            break
        }
        else if (y <= num - 3) {
            board[x][y] = 'd'
            board[x][y + 1] = 'd'
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
                if (board[i][j] === 'a') {
                    a++
                }
                if (board[i][j] === 'b') {
                    b++
                }
                if (board[i][j] === 'c') {
                    c++
                }
                if (board[i][j] === 'd') {
                    d++
                }
            }
        }
        if (a === 5 && b === 4 && c === 3 && d === 2) {
            return board
        }
    }
}

let coordinate = process.argv
let bom1 = coordinate[2]
let bom2 = coordinate[3]
let bom3 = coordinate[4]
let board = validation()

board[bom1[0]][bom1[1]] = 'x'
board[bom2[0]][bom2[1]] = 'x'
board[bom3[0]][bom3[1]] = 'x'
console.log(board)

