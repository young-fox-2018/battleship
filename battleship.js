
function boardShip(size){

    let board = [];
    for(let i = 0; i < size; i++){
        board.push([]);
        for(let j = 0; j < size; j++){
            board[i].push(" ");
        }
    }
    return board;
}


function battleshipGame() {
    let ships = [{
        name : "aircraft carrier",
        flock : 5,
        graphic: 'A',
        location : [randomLocation(), randomLocation()] // si coordinate yg habis di random, simpen kesini 
    },
    {
        name : "battleship",
        flock : 4,
        graphic: 'B',
        location : [randomLocation(), randomLocation()]
    },
    {
        name : "cruiser",
        flock : 3,
        graphic: 'C',
        location : [randomLocation(), randomLocation()]
    },
    {
        name : "destroyer",
        flock : 2,
        graphic: 'D',
        location : [randomLocation(), randomLocation()]
    }]

    return ships
}

function horizontalVertical(){
    
    let positions = ["Horizontal", "Vertical"];
    let randomizeX = positions[Math.floor(Math.random() * Math.floor(positions.length))];

    return randomizeX;
}

function randomLocation(){

    let randomize = Math.floor(Math.random()*10);
    return randomize;
}

function generateBoard(){
    let arenaPlay = boardShip(10);
    let shipsObject = battleshipGame();

    for (let i = 0; i < shipsObject.length; i++) {
        for (let j = 0; j < arenaPlay.length; j++) {
            for (let k = 0; k < arenaPlay[j].length; k++) {
                if (j === shipsObject[i].location[0] && k === shipsObject[i].location[1]) {
                    arenaPlay[i][j] = shipsObject[i].graphic
                }
            }
        }
    }
    return arenaPlay
}

function checkBoard(){
    let board = battleshipGame();
    let generate = generateBoard();
    let position = horizontalVertical();

    return generate
}
console.log(checkBoard());

