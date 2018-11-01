let gameModel = {
    boardSize: 10,
    fleetClass: [
        { name: "a", location: [], size: 5, type: 1 },
        { name: "b", location: [], size: 4, type: 2 },
        { name: "c", location: [], size: 3, type: 2 },
        { name: "d", location: [], size: 2, type: 2 },
    ],
    numShip: function () {
        return this.fleetClass.length
    },
    registeredArray: [],
}
let col = []

//__________________________________________________________________________



console.log(generateShipLoc());


//PRINT BOARD
function printBoard(num) {
    buildBoard()

    let row = []
    let counter = 0
    for (let i = 0; i < num; i++) {
        while (row.length < num) {
            counter++
            if (gameModel.registeredArray.indexOf(counter) != -1) {
                row.push(print(counter))
            } else if (gameModel.registeredArray.indexOf(counter == -1)) {
                row.push("_")
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
    return col
}

// 1. GENERATE SHIP LOCATION
function generateShipLoc() {

    for (let i = 0; i < gameModel.fleetClass.length; i++) {
            switch (gameModel.fleetClass[i].type) {
                case 2:
                    generateHorizontal(gameModel.fleetClass[i].name)
                    buildBoard()
                    break;

                case 1:
                    generateVertical(gameModel.fleetClass[i].name)
                    buildBoard()
                    break;
            }
        
    }

    //MAKING HORIZONTAL OR VERTICAL
    //MAKE CORDINATE HORIZONTAL
    function generateHorizontal(fleetName) {
        let check = false
        //GET FIRST COORDINATE
        let init = 0
        let size = 0

        init = Math.floor(Math.random() * 99) + 1
        while (check == false) {
            let counter = 0
            for (let i = 0; i < gameModel.boardSize; i++) {
                for (let j = 1; j <= gameModel.boardSize; j++) {
                    counter++
                    if (counter == init) {
                        if (j > gameModel.boardSize - j) {
                            init = init = Math.floor(Math.random() * 99) + 1
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
                            return generateHorizontal(fleetName)
                        } else if (gameModel.registeredArray.indexOf(init) == -1) {
                            gameModel.fleetClass[j].location.push(init)
                            init++
                        }
                        
                    }
                }
            }
        }        
    }

    //MAKE CORDINATE VERTICAL
    function generateVertical(fleet) {
        let check = false
        //GET FIRST COORDINATE
        let init = 0
        let size = 0

        init = Math.floor(Math.random() * 99) + 1
        while (check == false) {
            let counter = 0
            for (let i = 0; i < gameModel.boardSize; i++) {
                for (let j = 1; j <= gameModel.boardSize; j++) {
                    counter++
                    if (counter == init) {
                        if (j > gameModel.boardSize - j) {
                            init = init = Math.floor(Math.random() * 99) + 1
                        } else if (j <= gameModel.boardSize - j) {
                            check = true
                            break;
                        }
                    }
                }
            }
        }

        for (let i = 0; i < gameModel.fleetClass.length; i++) {
            if (check == true && gameModel.fleetClass[i].name == fleet) {
                size = gameModel.fleetClass[i].size
            }
        }
        
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < gameModel.fleetClass.length; j++) {
                if (gameModel.fleetClass[j].name == fleet) {
                    if (gameModel.fleetClass[j].location.length < size) {
                        buildBoard()
                        if (gameModel.registeredArray.indexOf(init) != -1) {
                            gameModel.fleetClass[j].location = []
                            return generateHorizontal(fleet)
                        } else if (gameModel.registeredArray.indexOf(init) == -1) {
                            gameModel.fleetClass[j].location.push(init)
                            init+= size
                        }
                        
                    }
                }
            }
        }        


    }
    
    function check(a) {
        
    }


    return printBoard(gameModel.boardSize)

}



// 2. GENERATE REGISTERED ARRAY
function buildBoard(params) {
    for (let k = 0; k < gameModel.fleetClass.length; k++) {
        for (let l = 0; l < gameModel.fleetClass[k].location.length; l++) {
            gameModel.registeredArray.push(gameModel.fleetClass[k].location[l])
        }
    }
}





