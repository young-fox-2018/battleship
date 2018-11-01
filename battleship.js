// Your code here
function printBoard(){
    var labelCol = 'ABCDEFGHIJ';
    var board = [];
    var counterRow = 0;
    // board row 
    for (let i = 0; i <= 21; i++) {
        let counterCol = 0;
        let baris = [];
        // board column
        for (let j = 0; j <= 21; j++) {
            //NOTE: GRAPHIC                  
            if (i === 0 && j !== 0 && j % 2 === 0) {
                baris.push(`${labelCol[counterCol]} `);
                counterCol++;
            } else if (j === 0 && i !== 0 && i % 2 === 0) {
                baris.push(`${counterRow} `);
                counterRow++;
            } else if (j === 0 || i === 0) {
                baris.push(`  `);
            } else if ((i === 1 && j === 1) || (i === 21 && j === 1)) {
                baris.push(`+-`);
            } else if ((i === 1 && j === 21) || (i === 21 && j === 21)) {
                baris.push(`+`);
            } else if (i === 1 || i === 21) {
                baris.push(`--`);        
            } else if (j % 2 === 1 || j === 21) {
                baris.push(`|`);
            } else if (i % 2 === 1) {
                baris.push(`---`);        
            } else {
                baris.push(`   `);
            } 
        }
        board.push(baris);
    }

    // print the ship
    for (let i = 0; i < SHIPS.length; i++) {
        // cek apakah kosong
        let direction = horizontalVertical();        
        let empty = checkEmpty(board, SHIPS[i], direction);
        
        while (empty === false) {
            SHIPS[i].coordinate[0] = randomCoordinate();
            SHIPS[i].coordinate[1] = randomCoordinate();            
            empty = checkEmpty(board, SHIPS[i], direction);
        }

        // kosong, input the ship
        if (empty === true) {
            board = insertShips(board,SHIPS[i], direction);
        }
    }

    // print the bomb
    for (let i = 0; i < args.length; i++) {
        let coordinateBombs = [args[i][1]*2, args[i][0]];
        let alphabet = 'ABCDEFGHIJ';
        let convertAlphabet = [2,4,6,8,10,12,14,16,18,20];        

        // convert column coordinate
        for (let j = 0; j < alphabet.length; j++) {
            if (coordinateBombs[1] === alphabet[j]) {
                coordinateBombs[1] = convertAlphabet[j];
            }            
        }

        board = insertBombs(board, coordinateBombs);
        // console.log(coordinateBombs);
    }

    board = boardFinishing(board);
    return board;
}

function boardFinishing(board) {
    for (let i = 0; i < board.length; i++) {
        board[i] = board[i].join('');    
    }

    return board.join('\n');
}

function insertBombs(board, coordinate){
    board[coordinate[0]][coordinate[1]] = '!!!';
    return board;
}

function checkEmpty(board, ship, direction) {

    for (let i = 0; i < ship.size*2; i+=2) {
        if (direction === 'horizontal') {
            if (board[ship.coordinate[0]][ship.coordinate[1]+i] === undefined || board[ship.coordinate[0]][ship.coordinate[1]+i] !== `   ` || ship.coordinate[1]+(ship.size*2) >= 20) {
                return false;
            }
        } else {
            if (board[ship.coordinate[0]+i][ship.coordinate[1]] === undefined || board[ship.coordinate[0]+i][ship.coordinate[1]] !== `   ` || ship.coordinate[0]+(ship.size*2) >= 20) {
                return false;
            }
        }
    }

    return true;
}

function insertShips(board, ship, direction) {
    for (let i = 0; i < ship.size*2; i+=2) {
        if (direction === 'horizontal') {
            board[ship.coordinate[0]][ship.coordinate[1]+i] = ` ${ship.graphic} `;
        } else {
            board[ship.coordinate[0]+i][ship.coordinate[1]] = ` ${ship.graphic} `;        
        }
    }

    return board;
}

function randomCoordinate(){
    var coordinate = Math.floor(Math.random() * 18) + 2;

    if (coordinate % 2 === 1){
        coordinate += 1;
    }

    return coordinate;
}

function horizontalVertical(){
    var shape = Math.floor(Math.random() * 2);

    if (shape === 1) {
        return 'horizontal';
    }
    return 'vertical';
}

function checkResult(){
    var countA = 0;
    var countB = 0;
    var countC = 0;
    var countD = 0;

    for (let i = 0; i < BOARD.length; i++) {                
        if(BOARD[i] === 'A'){
            countA++;
        } else if(BOARD[i] === 'B'){
            countB++;
        } else if(BOARD[i] === 'C'){
            countC++;
        } else if(BOARD[i] === 'D'){
            countD++;
        }        
    }

    // TODO: Refactor this 
    return `Kapal ${SHIPS[0].name} tertembak: ${SHIPS[0].size-countA+1}, sisa ${countA-1}\nKapal ${SHIPS[1].name} tertembak: ${SHIPS[1].size-countB+1}, sisa ${countB-1}\nKapal ${SHIPS[2].name} tertembak: ${SHIPS[2].size-countC+1}, sisa ${countC-1}\nKapal ${SHIPS[3].name} tertembak: ${SHIPS[3].size-countD+1}, sisa ${countD-1}`;
}

const SHIPS = [
    { name: 'Aircraft carrier', size: 5, graphic: 'A', coordinate: [randomCoordinate(), randomCoordinate()]},
    { name: 'Battleship', size: 4, graphic: 'B', coordinate: [randomCoordinate(), randomCoordinate()]},
    { name: 'Cruiser', size: 3, graphic: 'C', coordinate: [randomCoordinate(), randomCoordinate()]},
    { name: 'Destroyer', size: 2, graphic: 'D', coordinate: [randomCoordinate(), randomCoordinate()]}
]

const args = process.argv.slice(2);
const BOARD = printBoard();
console.log(BOARD);
console.log(checkResult());
