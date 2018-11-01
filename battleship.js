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
        // console.log('arah', direction);
        let empty = checkEmpty(board, SHIPS[i], direction);
        
        while (empty === false) {
            SHIPS[i].coordinate[0] = randomCoordinate();
            SHIPS[i].coordinate[1] = randomCoordinate();
            // console.log(SHIPS[i].coordinate, '=================')
            empty = checkEmpty(board, SHIPS[i], direction);
        }

        // kosong, input the ship
        if (empty === true) {
            board = insertShips(board,SHIPS[i], direction);
        }
        // if (empty) {
        //     for (let j = 0; j < SHIPS[i].size*2; j+=2) {
        //         board = insertShips(board,SHIPS[i]);
        //         // board[SHIPS[i].coordinate[0]][SHIPS[i].coordinate[1]+j] = ` ${SHIPS[i].graphic} `;
        //     }  
        // } else {
        //     SHIPS[i].coordinate[0] = randomCoordinate();
        //     SHIPS[i].coordinate[1] = randomCoordinate();
        // }
        // board[SHIPS[i].coordinate[0]][SHIPS[i].coordinate[1]] = ` ${SHIPS[i].graphic} `;
    }


    return board.join('\n');
}

function checkEmpty(board, ship, direction) {

    for (let i = 0; i < ship.size*2; i+=2) {
        // console.log('kapal: ', ship.graphic, direction, ship.coordinate[0], ship.coordinate[1]+i)        
        // console.log('horzontal: ', ship.coordinate[1] + i)
        // console.log(board[ship.coordinate[0]][ship.coordinate[1]], ship.coordinate[0], ship.coordinate[1])
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

const SHIPS = [
    { name: 'Aircraft carrier', size: 5, graphic: 'A', coordinate: [randomCoordinate(), randomCoordinate()]},
    { name: 'Battleship', size: 4, graphic: 'B', coordinate: [randomCoordinate(), randomCoordinate()]},
    { name: 'Cruiser', size: 3, graphic: 'C', coordinate: [randomCoordinate(), randomCoordinate()]},
    { name: 'Destroyer', size: 2, graphic: 'D', coordinate: [randomCoordinate(), randomCoordinate()]}
]

const BOARD = printBoard();
const args = process.argv.slice(2);
console.log(BOARD);
console.log(args);
// console.log(SHIPS);
