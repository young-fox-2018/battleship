const ship = [
  {name: 'Aircraft',size: 5, initial: 'A', status: false},
  {name: 'Battleship',size: 4, initial: 'B', status: false},
  {name: 'Cruiser',size: 3, initial: 'C', status: false},
  {name: 'Destroyer',size: 2, initial: 'D', status: false}
]

function shipLocation() {
  for (var i = 0; i < ship.length; i++) {
    let random = Math.floor(Math.random() * 2);
    let row, col;

    if (random === 1) {
      ship[i]['row'] = Math.floor(Math.random() * 10);
      ship[i]['col'] = Math.floor(Math.random() * (10 - ship[i]['size'] + 1));
    } else {
      ship[i]['col'] = Math.floor(Math.random() * 10);
      ship[i]['row'] = Math.floor(Math.random() * (10 - ship[i]['size'] + 1));
    }
  }
  // return row.ship
}

function printBoard() {
  let board = []
  for (var i = 0; i < 10; i++) {
    let column = []
    for (var j = 0; j < 10; j++) {
        column.push(' ')
      }
    board.push(column)
  }
  return board;
}

function displayShip(size) {
  let display = printBoard()
  for (var j = 0; j < ship.length; j++) {
     while (ship[j]['status'] === false) {
      shipLocation();
      let rowShip = ship[j]['row'];
      let colShip = ship[j]['col'];
      let shipSize = ship[j]['size'];
      let shipInitial = ship[j]['initial'];

        if (display[colShip][rowShip] === ' ') {
          if (rowShip + shipSize < size) {
            let emptyCount = 0
            for (var i = 0; i < shipSize; i++) {
              if (display[rowShip+i][colShip] === ' ') {
                display[rowShip+i][colShip] = shipInitial
                emptyCount++;
              }
            }
            if (emptyCount == shipSize) {
              display[rowShip+i][colShip] = shipInitial;
              ship[j]['status'] = true;
            }
          } else if (colShip + shipSize < size){
            let emptyCount = 0
            for (var i = 0; i < shipSize; i++) {
              if (display[rowShip][colShip+i] === ' ') {
                display[rowShip][colShip+i] = shipInitial
                emptyCount++;
              }
            }
            if (emptyCount == shipSize) {
              display[rowShip][colShip+i] = shipInitial;
              ship[j]['status'] = true;
            }
          }
        }
      } //end while
  } // end for loop per ship
  return display;
}
console.log(displayShip(10));
