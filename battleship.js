
//      A   B   C   D   E   F   G   H   I   J   0
//    +---------------------------------------+ 0
//  1 |   |   |   |   |   |   |   |   |   |   | 1
//    |---|---|---|---|---|---|---|---|---|---| 2
//  2 |   |   |   |   |   |   |   |   |   |   | 3
//    |---|---|---|---|---|---|---|---|---|---| 4
//  3 |   |   |   |   |   |   |   |   |   |   | 5
//    |---|---|---|---|---|---|---|---|---|---| 6
//  4 |   |   |   |   |   |   |   |   |   |   | 7
//    |---|---|---|---|---|---|---|---|---|---| 8
//  5 |   |   |   |   |   |   |   |   |   |   | 9
//    |---|---|---|---|---|---|---|---|---|---| 10 
//  6 |   |   |   |   |   |   |   |   |   |   | 11
//    |---|---|---|---|---|---|---|---|---|---| 12 
//  7 |   |   |   |   |   |   |   |   |   |   | 13
//    |---|---|---|---|---|---|---|---|---|---| 14
//  8 |   |   |   |   |   |   |   |   |   |   | 15
//    |---|---|---|---|---|---|---|---|---|---| 16
//  9 |   |   |   |   |   |   |   |   |   |   | 17
//    |---|---|---|---|---|---|---|---|---|---| 18
// 10 |   |   |   |   |   |   |   |   |   |   | 19
//    +---------------------------------------+ 20
//    0123456789012345678901234567890123456789012

function printBoard(num) {
  var result = []
  var batassamping = (num * 2)
  var batasbawah = (num * 4)

  for (let i = 0 ; i <= batassamping; i++){
    var arr = []

    for (let j = 0 ; j <= batasbawah; j++){
      if (i === 0|| i === batassamping) {
        if(i === 0 && j === 0 || i === 0 && j === batasbawah || i === batassamping && j === 0 || i === batassamping && j === batasbawah) {
          arr.push('+')
        }else{
          arr.push('-')
        }
      } else if( i === 0 ){

      }
       else if ( j % 4 === 0){
        arr.push('|')
      } else if(j % 4 !== 0){
        if(i % 2 !== 0){
          arr.push(' ')
        }else {
          arr.push('-')
        }
      }
    }
    // result.push(arr.join(''))
    result.push(arr)
  }
  // return result.join('\n')
  return result
}

// console.log(printBoard(10))

let temp = []
for ( let i = 0; i < 10; i++ ) {
  temp.push([])
  for (let j = 0 ; j < 10 ; j++ ){
    temp[i].push(' ')
  }
}
// console.log(temp)

const ships = [
  {name: 'Aircraft carrier' ,size: 5, pos: [],print:"A"},
  {name: 'Battleship' ,size: 4, pos: [] , print:'B'},
  {name: 'Cruiser' ,size: 3, pos: [], print:'C'},
  {name: 'Destroyer' ,size: 2, pos: [],print:'D'},
]
function printShip() {

  var arah = ['vertikal' , 'horizontal']
  debugger

  for (let i = 0 ; i < ships.length ; i++){
    let iawal = random()
    let jawal = random()
    let value = arah[Math.round(Math.random())]
    let flag = true
    var arr = []
    var cek = false

    while(cek === false){
      iawal = random()
      jawal = random()
      value = arah[Math.round(Math.random())]
      cek = true
      flag = true
      arr = []
      for(let j = 0 ; j < ships[i].size ; j++){
        if(value === 'vertikal'){
          // console.log(iawal + j, jawal, 'ini koor vertical')
          if (checkCoordinate(iawal+j, jawal) === false) {
            flag = false
            cek = false
            break
          } else {
            // console.log('masuk sini ver')
            arr.push([iawal+j,jawal])
          }
        } else if ( value === 'horizontal'){
          // console.log(i, jawal + j, 'ini koor hori')
          if (checkCoordinate(iawal, jawal+j) === false) {
            flag = false
            cek = false
            break
          } else {
            // console.log('masuk sini ver')

            arr.push([iawal,jawal+j])
          }
        }
      }
      // console.log(arr, 'ini array', cek, '====', ships[i].print)
    }
    if(flag === true) {
      ships[i].pos = arr
      for(let j = 0 ; j < ships[i].size ; j++){
        if(value === 'vertikal'){
          temp[iawal+j][jawal] = ships[i].print
        } else if ( value === 'horizontal'){
          temp[iawal][jawal+j] = ships[i].print
        }
      }
    }
  }
  return temp
}

console.log(printShip())

function checkCoordinate(row, col) {
   //apakah coordinate ini sudah di pakai di kapal yg lain ?
   // apakah coordinate ini melebihi board ?
  var condition = false
  // console.log('aaaaa', row, col)
  if(temp[row] === undefined){
    return condition
  }
  if ( row > 9 || col > 9 ) {
    return condition
  }

  if(temp[row][col] === ' '){
    condition = true
  }
   return condition
}


function random() {
  var angka = Math.floor(Math.random() * 9)
  return angka
}

var bom = process.argv.slice(2)

// console.log(bom)
var tampung = []
for (let i = 0 ; i < bom.length ; i++) {
  tampung.push([bom[i][0] , bom[i][1]] )
}
// console.log(tampung)

function bandingBom() {
  var kena = false
  for (let i = 0 ; i < ships.length ; i++) {
    for(let j = 0 ;j< ships[i].pos.length;j++ ){
      // console.log(ships[i].pos[j])
      for(let a = 0 ; a < tampung.length ; a++) {
          if(ships[i].pos[j][0] == tampung[a][0] && ships[i].pos[j][1] == tampung[a][1]){
            kena = true
          }
        }
    }
  }
  return kena
}

// function showShip() {
//   // ships
//   let board = temp 

//   // looping board 
//     // looping ships 
//       // bandingkan koordinat ship dengan koordinat board 
//   for ( let i = 0 ; i < board.length ; i ++) {
//     for (let j = 0 ; j < board[i].length ; j++) {
//       for (let a = 0 ; a < ships.length ; a++) {
//         for (let b = 0 ; b < ships[a].pos.length ; b++) {
//           if(ships[a].pos[b][0] === i &&ships[a].pos[b][1] === j){
//             board[i][j] = ships[a].print
//           }
//         }
//       }
//     }
//   }
//   return board
// }
// console.log(showShip())