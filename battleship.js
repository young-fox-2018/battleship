"use strict"
const argv = process.argv.slice(2)

let dimensi = 10

const shipType = ['🐷 ','🐶 ','🦊 ','🐱 ']
let ship = [{
    shipName : 'Aircraft carrier',
    size : 5,
    status: 'sehat'
},
{
    shipName : 'Battleship',
    size : 4,
    status: 'sehat'
},
{
    shipName : 'Cruiser',
    size : 3,
    status: 'sehat'
},
{
    shipName : 'Destroyer',
    size : 2,
    status: 'sehat'
}]

function printBoard() {
    let board = []

    // console.log(' A B C D E F G H I J')
    // console.log('=====================')
    for ( let i = 0; i < dimensi; i++ ) {
        board.push([])
        for ( let j = 0; j < dimensi; j++) {
            board[i].push('🌊 ')
        }
    }

    // return board
    // console.log(board)
    // console.log(randomShip(board))
    return randomShip(board)

    // console.log('=====================')
}

function randomShip(board) {
    

    // console.log(board)
    // return board
    let boardTemp = board

    for ( let i = 0; i < ship.length; i++) {
        let posType = Math.round(Math.random())

        boardTemp = setShipLocation(boardTemp, posType, ship[i], shipType[i])
        // console.log('1 or 0 =', posType)
        // console.log(boardTemp)
        // break
        // console.log(ship[i].shipName)
        // console.log(ship[i].size)
    }

    return boardTemp
}

function setShipLocation(board, posType, ship, shipType){
    // posType 0 = horizontal
    // posType 1 = vertical

    let finded = false
    let objBattleship = {}

    // console.log(ship)
    while ( !finded ) {
        let randomRow = Math.floor(Math.random() * dimensi)
        let randomColumn = Math.floor(Math.random() * dimensi)
        // console.log(randomRow + ' and ' + randomColumn)

        // for(let i = 0; i < ship.size; i++){
        //     if ( posType === 0 && board[randomRow][randomColumn+i] !== ' ') {
        //         console.log('*')
        //     }
        // }

        objBattleship.board = board
        objBattleship.posType = posType
        objBattleship.randomRow = randomRow
        objBattleship.randomColumn = randomColumn
        objBattleship.shipSize = ship.size

        // console.log(checkAvailable (objBattleship))
        if(checkAvailable (objBattleship)){
            for ( let i = 0; i < ship.size; i++) {
                if( posType === 0){
                    board[randomRow][randomColumn+i] = shipType
                } else {
                    board[randomRow+i][randomColumn] = shipType
                }
            }
            finded = true
        }

    
    }

    return board
}

function checkAvailable (objBattleship) {

    let board = objBattleship.board
    let randomRow = objBattleship.randomRow
    let randomColumn = objBattleship.randomColumn
    let posType = objBattleship.posType
    let shipSize = objBattleship.shipSize
    // console.log(`row : ${randomRow} & column : ${randomColumn}`)
    // board[randomRow-1][randomColumn] = '<>'
    // console.log(board)
    // console.log('board error',board[10][5])

    for ( let i = 0;i < shipSize; i++ ) {
        if(posType === 0 && board[randomRow][randomColumn+i] !== '🌊 '){
            return false
        } else if (posType === 1 && board[randomRow+i] !== undefined) {
            // console.log(randomRow+i)
            if ( board[randomRow+i][randomColumn] !== '🌊 ') {
                return false
            }
            // objBattleship.board[randomRow+i][randomColumn] !== ' '
        } else if ( posType === 1 && board[randomRow+i] === undefined) {
            return false
        }
    }
    // console.log(`${randomRow} & ${randomColumn}`)
    // console.log(board)

    return true
}

function attack (board, targetTembak) {
    let rowType = ['A','B','C','D','E','F','G','H','I','J']

    for ( let i = 0; i < targetTembak.length; i++ ) {
        let targetSplit = targetTembak[i].split(',')
        let targetRow = rowType.indexOf(targetSplit[0].toUpperCase())
        let targetColumn = JSON.parse(targetSplit[1]) - 1
        // console.log('serang ' + targetRow + ' & ' + targetColumn)

        if(board[targetRow][targetColumn] === '🌊 '){
            board[targetRow][targetColumn] = '❌ '
        }else{
            for( let j =0; j < shipType.length; j++){
                // console.log('test loop')
                // console.log('from board ',board[targetRow][targetColumn])
                // console.log('from ship type', shipType[j])
                // console.log(board[targetRow][targetColumn] === shipType[j])
                if ( board[targetRow][targetColumn] === shipType[j]) {
                    ship[j].status = 'hancur'
                }
            }
            board[targetRow][targetColumn] = '🔥'
        }
    }
    // console.log(ship)
    return board
}

function shipStatus () {
    // console.log('from ship status')
    // console.log(ship)
    for ( let i = 0; i < ship.length; i ++) {

        console.log(`Kapal ${ship[i].shipName} => ${shipType[i]} => ${ship[i].status}`)
        // if ( ship[leng]) {

        // }
    }
}

function shipDestroyed (board) {
    for ( let i = 0; i < board.length; i++) {
        for ( let j = 0; j< board.length; j++){
            if (board[i][j] === 'XX') {
                return true
            }
        }
    }
    return false

}

function runBattleship(){
    let targetTembak = argv
    let board = attack(printBoard(), targetTembak)

    // console.log(printBoard())
    // console.log(printBoard())
    // for ( let i = 0; i < targetTembak.length; i++ ) {
    //     let targetSplit = targetTembak[i].split(',')
    //     let targetRow = rowType.indexOf(targetSplit[0].toUpperCase())
    //     let targetColumn = JSON.parse(targetSplit[1]) - 1
    //     console.log('serang ' + targetRow + ' & ' + targetColumn)
    // }
    // console.log(attack(printBoard(), targetTembak))

    console.log(board)
    console.log('\n\n')
    shipStatus()
    if(shipDestroyed(board)){
        console.log('\nberhasil menenggelamkan kapal')
    }else {
        console.log('\ntidak ada kapal yang tenggelam')
    }
}

runBattleship()