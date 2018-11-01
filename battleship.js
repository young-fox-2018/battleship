// BattleShip --> Bomb the Nation ⛔️
// this game is played in 10 x 10 board

var nation = [
    {
        name: "China",
        size: 5, 
        coordinates: [],
        flag: "🐼",
        victim: false
    },
    {
        name: "USA",
        size: 4,
        coordinates: [],
        flag: '🦁',
        victim: false
    },
    {
        name: "Japan",
        size: 3,
        coordinates: [],
        flag: '🐭',
        victim: false
    },
    {
        name: "Indonesia",
        size: 2,
        coordinates: [],
        flag: '🦊',
        victim: false
    }
]

function randomNumberGenerator(max) { // if max = 5 then it will generate value between 0 to 4
    return Math.floor(Math.random() * max)
}

function randomCoordinatesGenerator(data) { // input "enemy" refers to array of object  
        let output = []
        for (let i = 0; i < data.length; i++) {
            let x = randomNumberGenerator(10) // refers to x coordinate
            let y = randomNumberGenerator(10) // refers to y coordinate
            // Let's generate one in eight direction randomly based on points of compass from x & y above
            let direction  = randomNumberGenerator(8)
            let temp = []
            for (let j = 0; j < data[i].size; j++) {
                if (direction == 0) { // North
                    x += 0; y += 1;
                }
                else if (direction == 1) { // North East
                    x += 1; y += 1;
                }
                else if (direction == 2) { // East
                    x += 1; y += 0; 
                }
                else if (direction == 3) { // South East
                    x += 1; y -= 1; 
                }
                else if (direction == 4) { // South
                    x += 0; y -= 1; 
                }
                else if (direction == 5) { // South West
                    x -= 1; y -= 1; 
                }
                else if (direction == 6) { // West
                    x -= 1; y += 0; 
                }
                else if (direction == 7) { // North West
                    x -= 1; y += 1; 
                } 
                temp.push([x,y])
            }    
            output.push(temp)      
            if (checkCoordinates(output) == false) {
                output.pop()
                i--
            } 
        }
        return output
}

function checkCoordinates(coordinates) { 
    // Check if coordinates < 0 OR coordinates > 9. #Bablas
    let flattened = [] 
    for (let i = 0; i < coordinates.length; i++) {
        let current = coordinates[i]
        for (let j = 0; j < current.length; j++) {
            if (current[j][0] < 0 || current[j][0] > 9 || current[j][1] < 0 || current[j][1] > 9) { // #Bablas
                return false
            } flattened.push(current[j])
        }
    }
    // Nabrak
    for (let i = 0; i < flattened.length-1; i++) {
        for (let j = i + 1; j < flattened.length; j++) {
            if ((flattened[i][0] == flattened[j][0]) && (flattened[i][1] == flattened[j][1])) {
                return false
            }
        }
    }
    return true
}

// Rules: Player win if playern DO NOT hit Indonesian ship.
function play(target1, target2) {
    let enemy_coordinates = randomCoordinatesGenerator(nation)
    for (let i = 0; i < enemy_coordinates.length; i++) {
        let current = enemy_coordinates[i]
        for (let j = 0; j < current.length; j++) {
            nation[i].coordinates.push(current[j])
        }
    }
    // nation coordinate has been filled
    // generate board
    let board = []
    for (let i = 0; i < 10; i++) {
        let temp = []
        for (let j = 0; j < 10; j++) {
            temp.push("💧")
        }
        board.push(temp)
    }
    // fill board with nation, Shoot your nation
    let col_dict = "ABCDEFGHIJ"
    target1 = target1.split("")
    target2 = target2.split("")
    let index_1 = col_dict.indexOf(target1[0])
    let index_2 = col_dict.indexOf(target2[0])
    target_coordinate = [[index_1, Number(target1[1])],[index_2, Number(target2[1])]]


    for (let i = 0; i < nation.length; i++) {
        for (let j = 0; j < nation[i].coordinates.length; j++) {
            let x = nation[i].coordinates[j][0]
            let y = nation[i].coordinates[j][1]
            if ((target_coordinate[0][0] == x && target_coordinate[0][1] == y)) { // ada yang ketembak nih...
                board[x][y] = "🔥"
                nation[i].victim = true
                nation[i].size -= 1

            } else if ((target_coordinate[1][0] == x && target_coordinate[1][1] == y)) {
                board[x][y] = "🔥"
                nation[i].victim = true
                nation[i].size -= 1
            }
            else {
                board[x][y] = nation[i].flag // nation[i].flag
            }
        }
    }
    // display board
    console.log(board)
    // indonesia win

    if (nation[3].victim == false) {
        let country_down = "List of Country that you taken down: "
        let count = 0
        for (let i = 0; i < nation.length; i++) {
            if (nation[i].victim == true) {
                country_down += nation[i].name + " "
                count += 1
            } 
        }
        if (count == 0) {
            console.log("not so bad....")
        } else if (count > 0) {
            console.log("You Make Your Country Proud 🇮🇩🇮🇩 ")
            console.log(country_down)
        }
    } else {
        console.log("Oops you shoot your own country, try again ✌️. Mehh Performance.")
    }
    //console.log(nation)

}

//play("A6", "B3")
play(process.argv[2], process.argv[3])
