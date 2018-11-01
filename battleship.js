const emoji = ["","😀","😮","😁","😐"]
const dictionary = " ABCDEFGHIJ" // dictionary index 0 adalah KOSONG

function normalBoard(){
    let board = []
    for (let i = 0; i <= 10; i++) {
        let line = []
        for (let j = 0; j <= 10; j++) {
            if(i === 0 && j === 0) line.push(` `)
            else if (i > 0 && j === 0) line.push(dictionary[i])
            else if (i === 0 && j > 0) line.push(j)
            else line.push(` `)
        }
        board.push(line)
    }
    return board
}

function enemyShip (board) {

    for(let shipType = 4; shipType > 0; shipType--){
        let row = Math.ceil(Math.random() * 10)
        let col = Math.ceil(Math.random() * 10)
        let horizontalEmpty = 0
        let verticalEmpty = 0
        let diagonalEmpty = 0
        
        if(row + shipType < 10 && col + shipType < 10){
            
            for(let enemyLength = 0; enemyLength <= shipType; enemyLength++){
                if (board[row][col+enemyLength] === " ") horizontalEmpty++
                if (board[row+enemyLength][col] === " ") verticalEmpty++
                if (board[row+enemyLength][col+enemyLength] === " ") diagonalEmpty++
            } 

            let counter = [] 
            if(horizontalEmpty === shipType+1 ) counter.push(1)
            if(verticalEmpty === shipType+1) counter.push(2)
            if(diagonalEmpty === shipType+1) counter.push(3)
            else counter.push(4)

            let random = counter[Math.floor(Math.random()*counter.length)]
            if(random === 1) board = horizontal(board, row, col, shipType)
            else if(random === 2) board = vertical(board, row, col, shipType)
            else if(random === 3) board = diagonal(board, row, col, shipType)
            else shipType++

        }else{
            shipType++
        }        
    }

    return board
}

function horizontal(board, row, col, shipType){
    for(let enemyLength = 0; enemyLength <= shipType; enemyLength++){
        board[row][col+enemyLength] = emoji[shipType]
    }
    return board
}

function vertical(board, row, col, shipType){
    for(let enemyLength = 0; enemyLength <= shipType; enemyLength++){
        board[row+enemyLength][col] = emoji[shipType]
    }
    return board
}

function diagonal(board, row, col, shipType){
    for(let enemyLength = 0; enemyLength <= shipType; enemyLength++){
        board[row+enemyLength][col+enemyLength] = emoji[shipType]
    }
    return board
}

function enemyShoot(){
    let oldBoard = normalBoard()
    let board = enemyShip(oldBoard)

    let argv = process.argv.slice(2)
    let hitTarget = []
    argv.forEach(item => {
        let iPosition = 0
        let jPosition = 0
        if(item.length === 3) jPosition = 10
        else jPosition = item[1]
        for(let i = 0; i < dictionary.length; i++){
            if(item[0] === dictionary[i]) iPosition = i
        }
        
        if(board [iPosition] [jPosition] === " ") board [iPosition] [jPosition] = "😞"
        else{
            let obj = {}
            obj.positionArgv = [item[0], jPosition]
            obj.positionBoard = [iPosition, jPosition]
            obj.charOri = board [iPosition] [jPosition]
            hitTarget.push(obj)
            board [iPosition] [jPosition] = "😸"            
        }
    })
    if(hitTarget.length === 0) console.log(" You don't hit any ship! Sorry~~")
    else {
        hitTarget.forEach(item => {
            let charOriCounter = 0
            board.forEach(element => {
                element.forEach(innerElement => {
                    if(innerElement === item.charOri) charOriCounter++
                })
            })
            console.log(`Kamu menembak ${item.charOri}  pada koordinat ${item.positionArgv[0]}${item.positionArgv[1]}, sisa di board sebanyak: ${charOriCounter}`)
        })
        
        let airCraftCarrier = 0 // 😐
        let battleship = 0 // 😁
        let cruiser = 0 // 😮
        let destroyer = 0 // 😀

        board.forEach(item => {
            item.forEach(innerElement =>{
                if(innerElement === "😐") airCraftCarrier++
                if(innerElement === "😁") battleship++
                if(innerElement === "😮") cruiser++
                if(innerElement === "😀") destroyer++
            })
        })

        console.log("")
        console.log(`Air Craft Carrier 😐  yang tersisa ${airCraftCarrier}`)
        console.log(`Battleship 😁  yang tersisa ${battleship}`)
        console.log(`Cruiser 😮  yang tersisa ${cruiser}`)
        console.log(`Destroyer 😀  yang tersisa ${destroyer}`)
        console.log("")
    }

    return board.forEach(item => {
        console.log(item.join(" | "))
    })
}

enemyShoot()