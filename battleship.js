// Your code here
const atk = process.argv.splice(2)
const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

let atkAddress = []
let board = []
const shipList = 
[
    {
        name: "Aircraft Carrier",
        code: "+",
        size: 5,
        quantity: 1,
        coordinates: [],
        damage: 0
    },
    {
        name: "Battleship",
        code: "$",
        size: 4,
        quantity: 1,
        coordinates: [],
        damage: 0
    },
    {
        name: "Cruiser", 
        code: "%",
        size: 3,
        quantity: 1,
        coordinates: [],
        damage: 0
    },
    {
        name: "Destroyer",
        code: "#",
        size: 2,
        quantity: 1,
        coordinates: [],
        damage: 0
    }
]

// OBJECT OF ATTACK ADDRESSES
for(let i = 0 ; i < atk.length ; i++ ){
    let obj = {}
    for(let iAbc = 0 ; iAbc < abc.length ; iAbc++){
        if(atk[i][0] === abc[iAbc]){
            obj.col = iAbc
        }
    }
    obj.row = Number(atk[i][1])
    atkAddress.push(obj)   
}

function shipOrientation(){
    const orientation = "XY"
    let posisi = Math.floor(Math.random() * 2)
    return orientation[posisi]
}

function randomPosition(){
    return Math.round(Math.random() * 9)
}

function checkCoor(rowCoor, colCoor){
    for(let iShipList = 0 ; iShipList < shipList.length ; iShipList++){
        for(let iCoor = 0 ; iCoor < shipList[iShipList]["coordinates"].length; iCoor++) {
            let data1 = shipList[iShipList]["coordinates"][iCoor][0]
            let data2 = shipList[iShipList]["coordinates"][iCoor][1]
            if(data1 === rowCoor && data2 === colCoor){
                return false
            }
        }
    }
    return true
}

function generateShip(){
    for(let iShipList = 0 ; iShipList < shipList.length ; iShipList++){
        let orientation = shipOrientation()
        let rowRandom = randomPosition()
        let colRandom = randomPosition()
        
        //CHECK TO SEE IF THE RANDOM POSITION IS BIGGER THAN THE BOX OR SOMETHING IS ALREADY THERE
        let check = false 
        while(check === false){
            if(((rowRandom + shipList[iShipList]["size"]) >= 10 || (colRandom + shipList[iShipList]["size"]) >= 10)){
                rowRandom = randomPosition()
                colRandom = randomPosition()
            }
            else{
                let flag = true
                for (let i = 0 ; i < shipList[iShipList]["size"] ; i++){
                    if(orientation === "Y"){
                        if (board[rowRandom+i][colRandom] !== " ") {
                            flag = false
                            break
                        }
                    }
                    else if(orientation === "X"){
                        if (board[rowRandom][colRandom+i] !== " "){
                            flag = false
                            break
                        }
                    }
                }

                if (flag) check = true
                else {
                    rowRandom = randomPosition()
                    colRandom = randomPosition()
                }
            }
    
        }
        //PLACED THE SHIP ACCORDING THEIR ORIENTATION FOR AS LONG AS IT'S EMPTY
        
        for(let len = 0 ; len < shipList[iShipList]["size"] ; len++){
            if(orientation === "X" ){
                shipList[iShipList]["coordinates"].push([rowRandom,colRandom+len])
                board[rowRandom][colRandom+len] = shipList[iShipList]["code"]
            }
            else if(orientation === "Y"){
                shipList[iShipList]["coordinates"].push([rowRandom+len,colRandom])
                board[rowRandom+len][colRandom] = shipList[iShipList]["code"]
            }
        }
    }
}



// DMG CALCULATOR
function attack(atkRow, atkCol){
    for(let iShipList = 0 ; iShipList < shipList.length ; iShipList++ ){
        for(let iCoor = 0 ; iCoor < shipList[iShipList]["coordinates"].length; iCoor++) {
            if(atkRow === shipList[iShipList]["coordinates"][iCoor][0] && atkCol === shipList[iShipList]["coordinates"][iCoor][1]){
                shipList[iShipList]["damage"]++
                shipList[iShipList]["size"]--          
                board[atkRow][atkCol] = "X"
            }
            else{
                board[atkRow][atkCol] = "X"
            }
        }
    }
}

//DMG SUMMARY
function summary(){
    for(let iShipList = 0 ; iShipList < shipList.length ; iShipList++){
        console.log("\n", shipList[iShipList]["code"], "got hit for", shipList[iShipList]["damage"], "many of times")
        console.log("",shipList[iShipList]["code"],"got", shipList[iShipList]["size"], "life left")
    }
}



function createBoard (){
    for(let row = 0 ; row < 10 ; row++){
        let inner = []
        for(let col = 0 ; col < 10 ; col++){
            inner.push(" ")
        }
        board.push(inner)
    }
    generateShip()
    for(let numAtk = 0 ; numAtk < atkAddress.length ; numAtk++){
        attack(atkAddress[numAtk]["row"], atkAddress[numAtk]["col"])
    }
    console.log(board)
    return summary()
}




return createBoard()


