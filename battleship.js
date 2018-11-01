// Your code here

const boardLength = 10;
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const number = [1,2,3,4,5,6,7,8,9,10];
const ship = [
    {
        name: "Aircraft carrier",
        size: 5,
        graphic: "!!",
    },
    {
        name: "Battleship",
        size: 4,
        graphic: "@@",
    },
    {
        name: "Cruiser",
        size: 3,
        graphic: "##",
    },
    {
        name: "Destroyer",
        size: 2,
        graphic: "%%",
    }
]

var bomb = process.argv.slice(2);

console.log(bomb)

function printboard(){
    var board = [];

    for(var i = 0; i < (boardLength + 1)*2; i++){
        var temp = [];
        for(var j = 0; j < (boardLength + 1); j++){
            if ( j === 0 && i === 0){
                temp.push("   ")
            }
            else if(i === 0 && j > 0 ){
                temp.push (`  ${alphabet[j-1]} `);
            }
            else if ( j === 0 && i === 20){
                temp.push(`${number[i/2-1]} |`);
            }
            else if ( (j === 0 && i > 0) && i%2 == 0 ){
                temp.push( ` ${number[i/2-1]} |`);
            }
            else if (i%2 === 1 && j > 0){
                temp.push( `---|`)
            }
            else{
                temp.push( "   |")
            }
        }
        console.log(temp[0])
        board.push(temp.join(""))
    }
    return board.join('\n')
}

// console.log(printboard())

function coordinate (){
    result  = [];

    for(let i = 0; i < boardLength ; i++ ){
        let temp = []
        for(let j = 0; j < boardLength; j++){
            // temp.push(`${j}${i}`)
            temp.push(`  `)
        }
        result.push(temp)
    }

    for(let k = 0; k < ship.length; k++){

        let placed = false
        
            while(placed == false){
                let column = random(9);
                let row = random(9);
                var clear = true;

                if(randomOrientation() === "horizontal"){

                    for(let l = 0; l < ship[k]["size"]; l++){
                        if(result[row][column+l] == undefined  ){
                            clear = false;
                            break;
                        }
                        else if(result[row][column+l].match(/[!@#$%]/gi)){
                            console.log ('validated!')
                            clear = false;
                            break;
                        }
                    }
                    if(clear == true){
                        for(let l = 0; l < ship[k]["size"]; l++){
                            result[row][column+l] = ship[k]["graphic"]
                        }   
                        placed = true
                    }
                }
                else{
                    for(let l = 0; l < ship[k]["size"]; l++){
                        if(row+l > 9){
                            clear = false;
                            break;

                        }
                        else if(result[row+l][column] == undefined ){
                            clear = false;
                            break;
                        }
                        else if(result[row+l][column].match(/[!@#$%]/gi)){
                            console.log ('validated!')
                            clear = false;
                            break;
                        }
                    }
                    if(clear == true){
                        for(let l = 0; l < ship[k]["size"]; l++){
                            result[row+l][column] = ship[k]["graphic"]
                        }   
                        placed = true
                    }
                }
            }
  

    }


    return result
}


function random(max){
    return Math.floor(Math.random()* max)
}

function randomOrientation(){
    if(Math.round(Math.random()) == 0){
        return "horizontal"
    }
    else{
        return "vertical"
    }
}

function attack(placement){
    coor =[];
    for(let i = 0; i < placement.length; i++){
        let column = JSON.stringify(alphabet.indexOf(placement[i][0]))
        let row = placement[i][1]
        coor.push(column+row)
    }
    return coor;
}



function aftermath(){
    counterA = 0;
    counterB = 0;
    counterC = 0;
    counterD = 0;

    for(var i = 0 ; i < coor.length; i++){

        if (result[coor[i][1]][coor[i][0]] == "!!"){
            result[coor[i][1]][coor[i][0]] = "XX"
            counterA++
        }
        else if (result[coor[i][1]][coor[i][0]] == "@@"){
            result[coor[i][1]][coor[i][0]] = "XX"
            counterB++
        }
        else if (result[coor[i][1]][coor[i][0]] == "##"){
            result[coor[i][1]][coor[i][0]] = "XX"
            counterC++
        }
        if (result[coor[i][1]][coor[i][0]] == "$$"){
            result[coor[i][1]][coor[i][0]] = "XX"
            counterD++
        }
        else{
            result[coor[i][1]][coor[i][0]] = "//"
        }
    }
}

function mulaigame(){
    coordinate();
    attack(bomb);
    aftermath();
    console.log(result)
    console.log(`Aircraft Carrier yang tertembak ${counterA}`)
    console.log(`Battleship yang tertembak ${counterB}`)
    console.log(`Cruiser yang tertembak ${counterC}`)
    console.log(`Destroyer yang tertembak ${counterD}`)
}

mulaigame()