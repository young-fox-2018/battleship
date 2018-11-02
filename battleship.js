
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

  for(let a = 0 ; a < bom.length ; a++) {
    if(temp[bom[a][0]-1][bom[a][1]-1] !== ' '){
    temp[bom[a][0]-1][bom[a][1]-1] = 'X'
    // return 'Yeay kapal tenggelam'
  } else {
    temp[bom[a][0]-1][bom[a][1]-1] = '/'
  }
}
  return temp
}

var bom = process.argv.slice(2)
// console.log(printShip())

const papan = printShip()

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

function tenggelam() {
  let counter = 0 
  for (let i = 0 ; i < papan.length ; i++) {

    for(let j = 0 ; j < papan[i].length ; j++) {
      if(papan[i][j] === 'X') {
        counter++
      }
    }
  }
  if(counter !== 0 ) {
    return ` Yeay anda berhasil menenggelamkan ${counter} kapal`
  } else {
    return `Yah anda gagal`
  }
}

console.log(papan)
console.log(tenggelam())