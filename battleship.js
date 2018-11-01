// Your code here
/*
     A   B   C   D   E   F   G   H   I   J
   +---------------------------------------+
 1 |   |   |   |   |   |   |   |   |   |   |
   |---|---|---|---|---|---|---|---|---|---|
 2 |   |   |   |   |   |   |   |   |   |   |
   |---|---|---|---|---|---|---|---|---|---|
 3 |   |   |   |   |   |   |   |   |   |   |
   |---|---|---|---|---|---|---|---|---|---|
 4 |   |   |   |   |   |   |   |   |   |   |
   |---|---|---|---|---|---|---|---|---|---|
 5 |   |   |   |   |   |   |   |   |   |   |
   |---|---|---|---|---|---|---|---|---|---|
 6 |   |   |   |   |   |   |   |   |   |   |
   |---|---|---|---|---|---|---|---|---|---|
 7 |   |   |   |   |   |   |   |   |   |   |
   |---|---|---|---|---|---|---|---|---|---|
 8 |   |   |   |   |   |   |   |   |   |   |
   |---|---|---|---|---|---|---|---|---|---|
 9 |   |   |   |   |   |   |   |   |   |   |
   |---|---|---|---|---|---|---|---|---|---|
10 |   |   |   |   |   |   |   |   |   |   |
   +---------------------------------------+

*/
// function battleship(){

// }
function generateBoard() {
    let input = 10
    let board = []
    for (let i = 0; i < input; i++) {
        let row = []
        for (let j = 0; j < input; j++) {
            row.push('🌊')
        }
        board.push(row)
    }
    return board
}



let ships = [
    A = { name: 'speeder', size: 2, coordinates: [] },
    B = { name: 'spear head', size: 3, coordinates: [] },
    C = { name: 'heavy flanker', size: 4, coordinates: [] },
    D = { name: 'aircraft carrier', size: 5, coordinates: [] }
]

function generateCoordinates() {
    let station = []
    let check = true
    while (check === true) {
        temporaryStation = []
        // console.log(temporaryStation)
        for (let i = 0; i < ships.length; i++) {
            let randDir = Math.floor((Math.random() * 4) + 1)
            let direction = randDir
            let randCoordY = Math.floor(Math.random() * 10)
            let randCoordX = Math.floor(Math.random() * 10)
            let anchor = [randCoordX, randCoordY]
            temporaryStation.push(anchor)
            for (let j = 0; j < ships[i].size - 1; j++) {
                if (direction === 1) {
                    // going up
                    temporaryStation.push([randCoordX, randCoordY + (j + 1)])
                } else if (direction === 2) {
                    // going right
                    temporaryStation.push([randCoordX + (j + 1), randCoordY])
                } else if (direction === 3) {
                    //going down
                    temporaryStation.push([randCoordX, randCoordY - (j + 1)])
                } else {
                    //going left
                    temporaryStation.push([randCoordX - (j + 1), randCoordY])
                }
            }

            // ngecek semua koordinat yang gue masukin available apa engga? 
            // 1. ga tabrakan dengan kapal lain
            // 2. antara 0 sampai 9

            // aman available -> lanjut
            // ga -> ulang diirnua sendiri
        }
        let checkKondisi = true
        for (let k = 0; k < temporaryStation.length; k++) {
            if (temporaryStation[k][0] < 0 || temporaryStation[k][0] > 9 || temporaryStation[k][1] < 0 || temporaryStation[k][1] > 9) {
                checkKondisi = false
            }
            for (let m = k + 1; m < temporaryStation.length; m++) {
                if (temporaryStation[k][0] == temporaryStation[m][0] && temporaryStation[k][1] == temporaryStation[m][1]) {
                    checkKondisi = false
                }
            }
        }

        if (checkKondisi === true) {
            station = temporaryStation
            break;
        }
        sleep(50)
        // clearScreen()
    }
    return station
}

function clearScreen() {
    // Un-comment this line if you have trouble with console.clear();
    // return process.stdout.write('\033c');
    console.clear();
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function insertCoordinates() {
    generateBoard()
    let coordinates = generateCoordinates()
    let board = generateBoard()

    for (let j = 0; j < board.length; j++) {
        for (let k = 0; k < board[j].length; k++) {
            for (let i = 0; i < coordinates.length; i++) {
                if (j === coordinates[i][0] && k === coordinates[i][1]) {
                    if (i < 2) {
                        board[j][k] = '🛶'
                    } else if (i < 5) {
                        board[j][k] = '🚤'
                    } else if (i < 9) {
                        board[j][k] = '🛳'
                    } else if (i < 14) {
                        board[j][k] = '🚢'
                    }
                }
            }
        }
    }
    return board
}


function attack() {
    let rollI = Math.floor(Math.random() * 10)
    let rollJ = Math.floor(Math.random() * 10)
    let attack = [rollI, rollJ]
    return attack
}

function play() {
    let laut = insertCoordinates()
    let counter = 0
    while(counter < 14){
        for (let i = 0; i < laut.length; i++) {
            for (let j = 0; j < laut[i].length; j++) {
                let move = attack()
                if (i === move[0] && j === move[1]) {
                if (laut[i][j] !== '🌊' && laut[i][j] !== '🌀') {
                    laut[i][j] = '💀'
                    counter += 1
                    sleep(300)
                    clearScreen()
                    console.log(laut)
                } else if(laut[i][j] === '🌊'){
                    laut[i][j] = '🌀'
                    sleep(300)
                    clearScreen()
                    console.log(laut)
                } else {
                    
                }
            }

        }
    }
    }
}
// console.log(insertCoordinates());
console.log(play())
