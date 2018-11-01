//Data ship
let dataShip = [
  {
    ship: "Aircraft carrier",
    size: 5,
    total: 5,
    code: "&",
    loc: [],
    pos: "",
    koordinat:[]
  },
  {
    ship: "Battleship",
    size: 4,
    total: 4,
    code: "%",
    loc: [],
    pos: "",
    koordinat:[]
  },
  {
    ship: "Cruiser",
    size: 3,
    total: 3,
    code: "$",
    loc: [],
    pos: "",
    koordinat:[]
  },
  {
    ship: "Destroyer",
    size: 2,
    total: 2,
    code: "@",
    loc: [],
    pos: "",
    koordinat:[]
  }
]

let boardSize = 10
var board = []

const fireLoc = process.argv
let aim = [fireLoc[2],fireLoc[3],fireLoc[4]]

//Bikin board Awal
for (let i = 0; i < boardSize; i++) {
  let boardCol = []
  for (var j = 0; j < boardSize; j++) {
    boardCol.push(" ")
  }
  board.push(boardCol)
}

//fungsi random posisi
function randomPos() {
  let pos = ["horizontal","vertical"]
  let random = Math.round(Math.random())
  return pos[random]
}

//fungsi random
function randomRow() {
  let random = Math.floor(Math.random()*10)
  return random
}

//fungsi random
function randomCol() {
  let random = Math.floor(Math.random()*10)
  return random
}



function checkShip(row,col,pos,size) {
  var check = false
  if (pos === "horizontal") {
    for (let i = 0; i < size; i++) {
      if (col + i < 10 && board[row][col+i] === " ") {
        check = true
      }
      else {
        check = false
        break
      }
    }
  }
  else {
    for (let j = 0; j < size; j++) {
      if (row + j < 10 && board[row+j][col] === " ") {
        check = true
      }
      else {
        check = false
        break
      }
    }
  }
  return check
}

function replaceBoard(row,col,pos,size,code,index) {
  if (pos === "horizontal") {
    for (let i = 0; i < size; i++) {
      board[row][col+i] = code
    }
  }
  else {
    for (let j = 0; j < size; j++) {
      board[row+j][col] = code
    }
  }
}

function printBoard() {
  for (let i = 0; i < dataShip.length; i++) {
    while (true) {
      dataShip[i].loc = []
      dataShip[i].loc.push(randomRow())
      dataShip[i].loc.push(randomCol())
      dataShip[i].pos = randomPos()
      if (checkShip(dataShip[i].loc[0],dataShip[i].loc[1],dataShip[i].pos,dataShip[i].size) === true) {
        break
      }
    }
    let row = dataShip[i].loc[0]
    let col = dataShip[i].loc[1]
    let pos = dataShip[i].pos
    let size = dataShip[i].size
    let code = dataShip[i].code
    let index = i
    replaceBoard(row,col,pos,size,code,index)
  }
  return console.log(board);
}

function fire(aim) {
  var dic = "ABCDEFGHIJ"
  var aimLoc = []
  for (let i = 0; i < aim.length; i++) {
    var temp = []
    temp.push(dic.indexOf([aim[i][0]]))
    temp.push(aim[i].slice(1))
    aimLoc.push(temp)
  }
  for (let i = 0; i < aimLoc.length; i++) {
    let locI = aimLoc[i][1] -1
    let locJ = aimLoc[i][0]
    for (let j = 0; j < dataShip.length; j++) {
      if (board[locI][locJ] === dataShip[j].code) {
        dataShip[j].total = dataShip[j].total -1
        board[locI][locJ] = "X"
      }
      else {
        board[locI][locJ] = "X"
      }
    }
  }
}

function shipStatus() {
  for (let i = 0; i < dataShip.length; i++) {
    let sisa = dataShip[i].size - dataShip[i].total
    console.log(dataShip[i].ship +" hancur "+ sisa + " buah, sisa " + dataShip[i].total + " buah");
  }
}

fire(aim)
printBoard()
shipStatus()
