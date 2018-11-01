
let hor = process.argv[2]
let ver = process.argv[3]
let alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
let jmlArgv = true
let str = ''


let gameModel = {
    boardSize: 10,
    fleetClass: [
        { name: "A", location: [], size: 5, type: randomType() },
        { name: "B", location: [], size: 4, type: randomType() },
        { name: "C", location: [], size: 3, type: randomType() },
        { name: "D", location: [], size: 2, type: randomType() },
    ],
    numShip: function () {
        return this.fleetClass.length
    },
    registeredArray: [],
}
let col = []

function resetData() {
    gameModel = {
        boardSize: 10,
        fleetClass: [
            { name: "A", location: [], size: 5, type: randomType() },
            { name: "B", location: [], size: 4, type: randomType() },
            { name: "C", location: [], size: 3, type: randomType() },
            { name: "D", location: [], size: 2, type: randomType() },
        ],
        numShip: function () {
            return this.fleetClass.length
        },
        registeredArray: [],
    }
    col = []
}

console.log(generateShipLoc());
console.log("YOU HIT: "+ str + "\n" + "Hint: Only 1 Parameter");


//________________________FUNCTION BELOW__________________________________________________

function randomType() {
    return Math.floor(Math.random() * 2) + 1
}

//PRINT BOARD
function printBoard(num) {
    let row = []
    let counter = 0
    for (let i = 0; i < num; i++) {
        while (row.length < num) {
            counter++
            if (gameModel.registeredArray.indexOf(counter) != -1) {
                row.push(print(counter))
            } else if (gameModel.registeredArray.indexOf(counter == -1)) {
                row.push(" ")
            }
        }
        col.push(row)
        row = []
    }
    function print(c) {
        for (let i = 0; i < gameModel.fleetClass.length; i++) {
            for (let j = 0; j < gameModel.fleetClass[i].location.length; j++) {
                if (gameModel.fleetClass[i].location[j] === c) {
                    return gameModel.fleetClass[i].name
                }
            }
        }
    }
    let jml = 0
    let jml2 = 0
    for (let i = 0; i < col.length; i++) {
        for (let j = 0; j < col[i].length; j++) {
            if (col[i][j] == undefined) {
                resetData()
                return generateShipLoc()
            } else if (col[i][j] != ' ') {
                jml++
            }
        }
    }
    for (let i = 0; i < gameModel.fleetClass.length; i++) {
        jml2 += gameModel.fleetClass[i].size
    }

    if (jml != jml2) {
        resetData()
        return generateShipLoc()
    } else if (jml == jml2) {
        return display()
    }

}

// 1. GENERATE SHIP LOCATION
function generateShipLoc() {

    for (let i = 0; i < gameModel.fleetClass.length; i++) {
        switch (gameModel.fleetClass[i].type) {
            case 2:
                geeneratePosition(gameModel.fleetClass[i].name, gameModel.fleetClass[i].type)
                buildBoard()
                break;

            case 1:
                geeneratePosition(gameModel.fleetClass[i].name, gameModel.fleetClass[i].type)
                buildBoard()
                break;
        }

    }
    return printBoard(gameModel.boardSize)

}

function geeneratePosition(fleetName, pos) {
    let check = false
    //GET FIRST COORDINATE
    let init = 0
    let size = 0

    while (check == false) {
        let counter = 0
        init = init = Math.floor(Math.random() * 99) + 1
        for (let i = 0; i < gameModel.boardSize; i++) {
            for (let j = 1; j <= gameModel.boardSize; j++) {
                counter++
                if (counter == init) {
                    if (j > gameModel.boardSize - j) {
                        resetData()
                        return geeneratePosition(fleetName,pos)
                    } else if (j <= gameModel.boardSize - j) {
                        check = true
                        break;
                    }
                }
            }
        }
    }

    for (let i = 0; i < gameModel.fleetClass.length; i++) {
        if (check == true && gameModel.fleetClass[i].name == fleetName) {
            size = gameModel.fleetClass[i].size
        }
    }

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < gameModel.fleetClass.length; j++) {
            if (gameModel.fleetClass[j].name == fleetName) {
                if (gameModel.fleetClass[j].location.length < size) {
                    buildBoard()
                    if (gameModel.registeredArray.indexOf(init) != -1) {
                        gameModel.fleetClass[j].location = []
                        resetData()
                        return geeneratePosition(fleetName,pos)
                    } else if (gameModel.registeredArray.indexOf(init) == -1) {
                        gameModel.fleetClass[j].location.push(init)
                        if (pos == 2) {
                            init++
                        } else if (pos == 1) {
                            init += gameModel.boardSize
                        }
                    }
                }
            }
        }
    }
}

// 2. GENERATE REGISTERED ARRAY
function buildBoard(params) {
    for (let k = 0; k < gameModel.fleetClass.length; k++) {
        for (let l = 0; l < gameModel.fleetClass[k].location.length; l++) {
            gameModel.registeredArray.push(gameModel.fleetClass[k].location[l])
        }
    }
}

function display() {
    
    for (let i = 0; i < col.length; i++) {
        for (let j = 0; j < col[i].length; j++) {
            
            if (alph[i] == process.argv[2][0] && j == process.argv[2][1] && col[i][j] !== ' ') {
                str = col[i][j]
                col[i][j] = 'O'
            } else if (alph[i] == process.argv[2][0] && j == process.argv[2][1]) {
                col[i][j] = 'O'
            }
            
        }
        
    }
    
    return col
     
}

function prompt() {
    return "HANYA MENERIMA SEKALI NGE-BOM AJA YAAA.."
}




