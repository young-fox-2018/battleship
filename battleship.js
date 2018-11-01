// Your code here
var board = []
var column = 10
var row = 10
var ships = [ {
        name : "Destroyer",
        size: 2,
        label: "D"
    },
    {
        name : "Cruiser",
        size: 3,
        label: "C"
    },
    {
        name : "BattleShip",
        size: 4,
        label: "B"
    },
    {
        name : "AircraftCarrier",
        size: 5,
        label: "A"
    }]

function createBoard() {
    let board =[]
    
    for ( let i = 0; i < row; i++) {
        innerArr = []
    for (let j = 0; j < column; j++) {
            innerArr[j] = '-'
        }

        board.push(innerArr)
    }

    return board
}


function gameStart() {
    board = createBoard()
    for (let i = 0; i < ships.length; i++) {
        shipPlacement(ships[i])
    }
    
    console.log(board)
}

function summary() {
    for (let i = 0; i < ships.size; i++) {
    console.log("Jumlah "+ ships[i].name + " yg tersisa adalah " + ships[i].size)
    }
}

// function bombSetter() {
//     const argv = proces.argv.slice(2)
//     let bomb = argv[0]

//     for (let i = 0; i < bomb; i++) {
//         let xCordinate = randomInt(10)
//         let yCordinate = randomInt(10)

//         if (board[y][x] != "-") {
//             if(board[y][x] == 'D') {
//                 ships[0].size --
//             } if(board[y][x] == 'C') {
//                 ships[1].size --
//             } if(board[y][x] == 'B') {
//                 ships[2].size --
//             } if(board[y][x] == 'A') {
//                 ships[3].size --
//             }
//         }
//     }
// }

function shipPlacement(ships) {
    let headX = 0
    let headY = 0
    let bodyX = 0
    let bodyY = 0
    let increment = 0
    let safeToDeploy = 0
    let botRandomizer = 0
    let rightRandomizer = 0
    let bot = false
    let right = false

    while (safeToDeploy <  ships.size) {
        if (safeToDeploy == 0) {
            increment = 0
            bot = false
            right = false
            headX = randomInt(10)
            headY = randomInt(10)
            botRandomizer = randomInt(20) 
            rightRandomizer = randomInt(20)
        }

        if (board[headY][headX] != "-") {
            break
        }

        if (rightRandomizer > botRandomizer  && headX + ships.size < column) {
            if (board[headY][headX + increment] == "-") {
                console.log(headX, "headX")
                right = true
                increment += 1
                safeToDeploy += 1
            } else {
                safeToDeploy = 0
                break
            }

        } else if (botRandomizer > rightRandomizer && headY + ships.size  < column){
            console.log(ships.size, "ships size")
            console.log(headY, "headY")
            if (board[headY + increment][headX] == "-") {
                bot = true
                increment+= 1
                safeToDeploy+= 1
            } else {
                safeToDeploy = 0
                break
            }
        } else {
            safeToDeploy = 0
        }
    }

    bodyX = headX
    bodyY = headY

    if (right) {
        for (let i = 0; i < ships.size; i++) {
            if (i == 0) {
                bodyX += 0
            } else {
                bodyX += 1
            }

            board[bodyY][bodyX] = ships.label
        }
    } else if (bot) {
        for (let i = 0; i < ships.size; i++) {
            if (i == 0) {
                bodyY += 0
             } else {
                bodyY += 1
            }
            board[bodyY][bodyX] = ships.label
        }
    }
}

function randomInt(number) {
    return Math.floor(Math.random() * Math.floor(number))
}

gameStart()