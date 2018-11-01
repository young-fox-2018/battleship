// Your code here
var firePlace = process.argv.slice(2);
var boardGame = makeBoard();
function makeBoard() {
    let result = [];
    for (let i = 0; i < 10; i++) {
        result.push([]);
        for (let j = 0; j < 10; j++) {
            result[i].push('-')
        }
    }
    return result;
}

function randomNum() {
    return Math.floor(Math.random() * 10);
}

function makeAircraft() {
    var x = randomNum();
    var y = randomNum();
    if (y + 5 <= 9) {
        boardGame[x][y] = '1';
        boardGame[x][y+1] = '1';
        boardGame[x][y+2] = '1';
        boardGame[x][y+3] = '1';
        boardGame[x][y+4] = '1';
    }
    else {
        boardGame[x][y] = '1';
        boardGame[x+1][y] = '1';
        boardGame[x+2][y] = '1';
        boardGame[x+3][y] = '1';
        boardGame[x+4][y] = '1';
    }
}
function makeBattleship() {
    var x = randomNum();
    var y = randomNum();
    if (y + 5 <= 9) {
        boardGame[x][y] = '1';
        boardGame[x][y+1] = '1';
        boardGame[x][y+2] = '1';
        boardGame[x][y+3] = '1';
    }
    else {
        boardGame[x][y] = '1';
        boardGame[x+1][y] = '1';
        boardGame[x+2][y] = '1';
        boardGame[x+3][y] = '1';
    }
}
function makeCruiser() {
    var x = randomNum();
    var y = randomNum();
    if (y + 5 <= 9) {
        boardGame[x][y] = '1';
        boardGame[x][y+1] = '1';
        boardGame[x][y+2] = '1';
    }
    else {
        boardGame[x][y] = '1';
        boardGame[x+1][y] = '1';
        boardGame[x+2][y] = '1';
    }
}
function makeDestroyer() {
    var x = randomNum();
    var y = randomNum();
    if (y + 5 <= 9) {
        boardGame[x][y] = '1';
        boardGame[x][y+1] = '1';
    }
    else {
        boardGame[x][y] = '1';
        boardGame[x+1][y] = '1';
    }
}

makeAircraft()
console.log(boardGame);