var argument = process.argv.slice(2)
var dimensi =  10
var huruf = ['A','B','C','D','E','F','G','H','I','J']
var board = []
var indexFireRow, indexFireColumn

var listShip = [
    {
        name: "carrier",
        size: 5,
        code: "S",
        arah: "",
        index: 0,
        row: 0,
        column: 0,
        kondisi: "sehat"
    },
    {
        name: "battle",
        size: 4,
        code: "A",
        arah: "",
        index: 0,
        row: 0,
        column: 0,
        kondisi: "sehat"
    },
    {
        name: "cruiser",
        size: 3,
        code: "E",
        arah: "",
        index: 0,
        row: 0,
        column: 0,
        kondisi: "sehat"
    },
    {
        name: "destroyer",
        size: 2,
        code: "Z",
        arah: "",
        index: 0,
        row: 0,
        column: 0,
        kondisi: "sehat"
    }
]

function generateBoard(){
    
    for(let i = 0; i < dimensi; i++){
        let boardRow = []
        for(let j = 0; j < dimensi; j++){
            boardRow.push(" ")
        }
        board.push(boardRow)
    }
    return (board)
}

function randomPosition(ship){ //parameter: objek ke-i pada array listShip
    var randomVertHorz = Math.round(Math.random()) //0 = vertical, 1 = horizontal
    var randomPositionRow = Math.floor(Math.random() * 10 ) // random 0-9
    var randomPositionCol = Math.floor(Math.random() * 10 ) // random 0-9

    for(let i = 0; i < listShip.length; i++){
        ship.index = huruf[randomPositionRow]+randomPositionCol
        ship.row = randomPositionRow
        ship.column = randomPositionCol

        if(randomVertHorz === 0){ //set horizontal
            ship.arah = "horizontal"
        } else { //set vertical
            ship.arah = "vertical"
        }
    }

    return ship
}

function checkPosition(objKapal){
    var check = true

    if(objKapal.arah === "horizontal"){
        for(let i = 0; i < objKapal.size; i++){
            if(objKapal.row + objKapal.size <= dimensi){
                if(board[objKapal.row][objKapal.column+i] !== " "){
                    return false
                }
            } else {
                return false
            }
        }
        // return check
    } else { //vertical
        for(let i = 0; i < objKapal.size; i++){
            if(objKapal.row + objKapal.size <= dimensi){
                if(board[objKapal.row+i][objKapal.column] !== " "){
                    return false
                }
            } else {
                return false
            }
        }
        // return check
    }
    return check
}

function changeBoard(kapal){
    
    if(kapal.arah === "horizontal"){
        for(let i = 0; i < kapal.size; i++){
            board[kapal.row][kapal.column+i] = kapal.code
        }
    } else {
        for(let i = 0; i < kapal.size; i++){
            board[kapal.row+i][kapal.column] = kapal.code
        }
    }

}

function main(){
    generateBoard()

    for(let i = 0; i < listShip.length; i++){
        var kapal = randomPosition(listShip[i])
        
        while(checkPosition(kapal) === false){
            kapal = randomPosition(listShip[i])
        }

        changeBoard(kapal)
    }
    return "----- Battleship Game -----" + "\n"
}

function fire(){
    // generateBoard()
    var hit = 0
    var miss = 0
    for(let i = 0; i < argument.length; i++){
        for(let j = 0; j < huruf.length; j++){
            if(argument[i][0] === huruf[j]){
                indexFireRow = j
                indexFireColumn = Number(argument[i][1])
                // console.log(indexFireRow+"-"+indexFireColumn)
                // console.log("board hit:",board[indexFireRow][indexFireColumn])
                break
            }
        }
        switch(board[indexFireRow][indexFireColumn]){
            case "S":
                listShip[0].kondisi = "damaged"
                board[indexFireRow][indexFireColumn] = "X"
                hit++
                break;
            case "A":
                listShip[1].kondisi = "damaged"
                board[indexFireRow][indexFireColumn] = "X"
                hit++
                break;
            case "E":
                listShip[2].kondisi = "damaged"
                board[indexFireRow][indexFireColumn] = "X"
                hit++
                break;
            case "Z":
                listShip[3].kondisi = "damaged"
                board[indexFireRow][indexFireColumn] = "X" //fire tepat sasaran
                hit++
                break;
            default:
                // board[indexFireRow][indexFireColumn] = "O" //fire tidak tepat sasaran
                miss++
        }
    }
    console.log(`target ${argument}` +"\n")
    console.log(board)
    for(let i = 0; i < listShip.length; i++){
        console.log(`kondisi kapal ${listShip[i].name}(${listShip[i].code}) ${listShip[i].kondisi} `)
    }
    return (`Total tembakan: ${argument.length}, Tepat sasaran: ${hit}, Miss: ${miss}`)
}

console.log(main())
console.log(fire())
