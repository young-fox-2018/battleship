// Your code here
const atk = process.argv.splice(2)
const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

let atkAddress = []
let board = []
const shipList = 
[
    {
        name: "I",
        size: 5,
        quantity: 1,
        coordinates: []
    },
    {
        name: "V",
        size: 4,
        quantity: 1,
        coordinates: []
    },
    {
        name: "%",
        size: 3,
        quantity: 1,
        coordinates: []
    },
    {
        name: "#",
        size: 2,
        quantity: 1,
        coordinates: []
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
                console.log(data1, rowCoor, " ======= ", data2,colCoor, shipList[iShipList]["name"])
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

        //CHECK ADA ISI APA GA
        // while(checkCoor(rowRandom, colRandom) === false){
        //     colRandom = randomPosition()
        //     rowRandom = randomPosition()
        //     break;
        // }
        
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
                        if (!checkCoor(rowRandom,colRandom+i)) {
                            flag = false
                            break
                        }
                    }
                    else if(orientation === "X"){
                        if (!checkCoor(rowRandom+i,colRandom)) {
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
                // break;
            }
    
        }

        //PLACED THE SHIP ACCORDING THEIR ORIENTATION FOR AS LONG AS IT'S EMPTY
        
        for(let len = 0 ; len < shipList[iShipList]["size"] ; len++){
            if(orientation === "X" ){
                board[rowRandom][colRandom+len] = shipList[iShipList]["name"]
                shipList[iShipList]["coordinates"].push([rowRandom,colRandom+len])
            }
            else if(orientation === "Y"){
                board[rowRandom+len][colRandom] = shipList[iShipList]["name"]
                shipList[iShipList]["coordinates"].push([rowRandom+len,colRandom])
            }
        }
    }
}

// console.log(generateShip())

function createBoard (){
    for(let row = 0 ; row < 10 ; row++){
        let inner = []
        for(let col = 0 ; col < 10 ; col++){
            inner.push(" ")
        }
        board.push(inner)
    }
    generateShip()
    return board
}
console.log(createBoard())



// function attack(row, col){
//     for(let iAtkAddress = 0 ; iAtkAddress < atkAddress.length ; iAtkAddress++){
//         if(row === atkAddress[iAtkAddress]["row"] && col === atkAddress[iAtkAddress]["col"]){
//             board[row][col] = ["X"]            
//         }
//     }
// }