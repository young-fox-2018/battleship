// Your code here

// A sample board for visualization/testing purposes:

//      A   B   C   D   E   F   G   H   I   J
    12345678912345678912345678912345678912345678 
//    +---------------------------------------+1
//  1 |   |   |   |   |   |   |   |   |   |   |2
//    |---|---|---|---|---|---|---|---|---|---|3
//  2 |   |   |   |   |   |   |   |   |   |   |4
//    |---|---|---|---|---|---|---|---|---|---|5
//  3 |   |   |   |   |   |   |   |   |   |   |6
//    |---|---|---|---|---|---|---|---|---|---|7
//  4 |   |   |   |   |   |   |   |   |   |   |8
//    |---|---|---|---|---|---|---|---|---|---|9
//  5 |   |   |   |   |   |   |   |   |   |   |10
//    |---|---|---|---|---|---|---|---|---|---|11
//  6 |   |   |   |   |   |   |   |   |   |   |12
//    |---|---|---|---|---|---|---|---|---|---|13
//  7 |   |   |   |   |   |   |   |   |   |   |14
//    |---|---|---|---|---|---|---|---|---|---|15
//  8 |   |   |   |   |   |   |   |   |   |   |16
//    |---|---|---|---|---|---|---|---|---|---|17
//  9 |   |   |   |   |   |   |   |   |   |   |18
//    |---|---|---|---|---|---|---|---|---|---|19
// 10 |   |   |   |   |   |   |   |   |   |   |20
//    +---------------------------------------+21

let boardGame = []

function printBoard(size) {
    
    
    for(var i = 0 ; i < size; i++ ){
        var sub = []

        for(var j = 0 ; j < size; j++){
           sub.push(" ")
        }

        boardGame.push(sub)
    }
    return boardGame
}

function checkCoordinates(){
   
    let ships = generateship()
    var Loci = RandomRowCol()
    var Locj = RandomRowCol()
    var condition = false;
    var isprint = true;
    if( boardGame[Loci] === undefined){
        return condition 
    }
    if(boardGame[Loci][Locj] === " "){
        condition = true
    }
    
    for(let i = 0 ; i < ships.length; i++){
        for(let j = 0; j < ships[i].size ; j++){
            var arr = []
            if(ships[i].position === 0){
                if(condition === false){
                    isprint = false
                }else{
                    arr.push(Loci +j , Locj)
                    ships[i].coordinates.push(arr)
                    // console.log(arr)
                }
            }else if(ships[i].position === 1){
                if(condition === false){
                    isprint = false
                }{
                    arr.push(Loci, Locj+j)
                    ships[i].coordinates.push(arr)
                    // console.log(arr)
                }
            }
            
        }
        
    }
    
    return isprint
}


function generateship(){
    const ship = [
        { name:"Aircraft carrier", size:5 ,position: RandomVerHor() ,print:"A",coordinates:[]},
        { name:"Battleship", size:4, position: RandomVerHor(),print:"B",coordinates:[]},
        { name:"Cruiser", size:3 , position: RandomVerHor(),print:"C",coordinates:[]},
        { name: "Destroyer", size:2 ,position: RandomVerHor(), print:"D", coordinates:[]}]

    // for(var i  = 0 ; i < ship.length; i++){
    //    console.log(ship[i])
    // }
    return ship
}

function battleShip(){
    let boardGame = printBoard(10)
    let ship = generateship()
    console.log(ship)
    for(let i = 0; i < boardGame.length; i++) {
        for(let j = 0; j < boardGame.length; j++) {
            // console.log(j,"tercetak")
            for(let s = 0; s < ship.length; s++) {
                
                if(i === ship[s].locI && j === ship[s].LocJ){
                    
                    
                }
            }
        }
    }
    return boardGame

}
// random row dan col
function RandomRowCol() {
    var Random = Math.floor(Math.random()*10)
    
   return Random
}

function RandomVerHor(){
    var VerHor = ["vertikal","Horizontal"]
    var Random = Math.floor(Math.random()*Math.floor(VerHor.length))
    return Random
}


// console.log(RandomRowCol())


//console.log(generateship())
console.log(battleShip())
console.log(checkCoordinates())