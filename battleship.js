const ship = [
  {name: 'Aircraft',size: 5, initial: '🈲', status: false},
  {name: 'Battleship',size: 4, initial: '🇩🇪‍', status: false},
  {name: 'Cruiser',size: 3, initial: '🌺', status: false},
  {name: 'Destroyer',size: 2, initial: '🚒', status: false}
]

function printBoard() {
  let board = []
  for (var i = 0; i < 10; i++) {
    let column = []
    for (var j = 0; j < 10; j++) {
      column.push('🌊')
    }
    board.push(column)
  }
  return board;
}
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
  return ship
}

function gamePlay(){
  const board = printBoard()
  // console.log(board,ship)
  let ship = shipLocation()
  // while(ship[k].status===false){
    for(let k = 0;k<ship.length;k++){
      if((ship[k].row+ship[k].size)<=board.length){
        for(let j = 0 ;j < ship[k].size; j++){
          if(board[ship[k].row+j][ship[k].col]==='🌊' ||
             board[ship[k].row+j][ship[k].col]!=='🈲' ||
             board[ship[k].row+j][ship[k].col]!=='🇩' ||
             board[ship[k].row+j][ship[k].col]!=='🌊' ||
             board[ship[k].row+j][ship[k].col]!=='🌊'){
               board[ship[k].row+j][ship[k].col]=ship[k].initial
          }
        }
      }else if((ship[k].col+ship[k].size)<=board.length){
        for(let j = 0 ;j < ship[k].size; j++){
          if(board[ship[k].row][ship[k].col+j]==='🌊' ||
             board[ship[k].row][ship[k].col+j]!=='🈲'  ||
             board[ship[k].row][ship[k].col+j]!=='🇩'  ||
             board[ship[k].row][ship[k].col+j]!=='🌊'  ||
             board[ship[k].row][ship[k].col+j]!=='🌊'){
             board[ship[k].row][ship[k].col+j]=ship[k].initial
          }
        }
      }
    }
  // }
  console.log(board)
}

gamePlay()
