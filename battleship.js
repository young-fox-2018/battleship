const boms = process.argv.slice(2)

const jenisKapal = [
    {
        name : 'aircraft',
        jumlah : 5,
        simbol : 'A'
    },
    {
        name : 'battleship',
        jumlah : 4,
        simbol : 'B'
    },
    {
        name : 'cruiser',
        jumlah : 3,
        simbol : 'C'
    },
    {
        name : 'destroyer',
        jumlah : 2,
        simbol : 'D'
    },
]
// const jumAircraft = 5
// const jumBattleship = 4
// const jumCruiser = 3
// const jumDestroyer = 2


function getKoorBomb(parameter) {
    var baris =  'abcdefghij'
    var koorBom = []
    for (let i = 0; i < parameter.length; i++) {
        var obj = {
            x : Number(baris.indexOf(parameter[i].slice(0,1))),
            y : Number(parameter[i].slice(1))
        }
 
        koorBom.push(obj)
    }
   return koorBom
}
// console.log(getKoorBomb(bom1))

function generateBoard(dimension) {
    var arr = []
    for (let i = 0; i < dimension ; i++){
        var tempArray = []
        for (let j = 0; j < dimension; j++) {
            tempArray.push(' ')
        }
        arr.push(tempArray)  
    }
    return arr
}

// function randomize() {
//     return Math.floor(Math.random() * 9) + 1
// }

// console.log(randomize())
// function checkIsEmpty(row,col,board,size,direction) {
//     if(direction === 'horizontal') {
//         for (let i = 0; i < size; i++) {
//             if(board[row][col+i] !== ' ' || board[row][col+i] === undefined){
//                 return false
//             }
//         }
//     }else if(direction === 'vertical') {
//         for (let i = 0; i < size; i++) {
//             if(board[row+i][col] !== ' ' || board[row+i][col] === undefined ){
//                 return false
//             }
//         }
//     }
//     return true
// }

// function checkIsAvailable(koordinat,size) {
//     if(koordinat+size > 10 ){
//         return false
//     }
//     return true
// }
function randomArah() {
    var shake = Math.round(Math.random())
    if(shake === 0){
        return 'horizontal'
    }else{
        return 'vertical'
    }
}
function shootKapal(board,bom){
    var koordinatBom = getKoorBomb(bom)
    var die = []
    let dieA = 0
    let dieB = 0
    let dieC = 0
    let dieD = 0

    for (let i = 0; i < koordinatBom.length; i++) {
        for (let j = 0; j < board.length; j++) {
           for (let k = 0; k < board.length; k++) {
               if(j === koordinatBom[i].x && k ===  koordinatBom[i].y) {
                    if(board[j][k] !== ' '){
                        die.push(board[j][k])
                        board[j][k] = 'X'
                    }else{
                        board[j][k] = '/'
                    }
               }
           } 
        }
    }
    

    for(let i = 0; i < die.length; i++) {
        if(die[i] === 'A') {
            dieA += 1
        } else if(die[i] === 'B') {
            dieB += 1
        } else if(die[i] === 'C') {
            dieC += 1
        } else if(die[i] === 'D') {
            dieD += 1
        }
    }
    console.log(board)
    console.log(`Kapal A hancur ${dieA} buah`)
    console.log(`Kapal B hancur ${dieB} buah`)
    console.log(`Kapal C hancur ${dieC} buah`)
    console.log(`Kapal D hancur ${dieD} buah`)
    console.log(`GAME OVER`)
}

function generateKapal(){
    var boardGame = generateBoard(10)
    // console.log(randomArah())
    for (let i = 0; i < jenisKapal.length; i++) {
        var statusKapal  = false
        while(statusKapal!== true){
            var x =  Math.floor(Math.random()*9 + 1)
            var y =  Math.floor(Math.random()*9 + 1)
            var check = true
            var random = randomArah() 
            
            if(random === 'vertical'){
                // console.log(random)
                // console.log('masuk ke vertical '+jenisKapal[i].name)
                for (let j = 0; j < jenisKapal[i].jumlah; j++) {
                    if(boardGame[x] === undefined || boardGame[x][y+j] === undefined) {
                        check = false
                        break;
                    }else if(/[ABCD]/.test(boardGame[x][y+j]) === true) {
                        check = false
                        break;
                    }           
                }
                if(check === true) {
                    for (let j = 0; j < jenisKapal[i].jumlah; j++) {
                       boardGame[x][y+j] = jenisKapal[i].simbol 
                    }
                }
            }else {
                // console.log(random)
                // console.log('masuk ke horizontal '+jenisKapal[i].name)
                for (let j = 0; j < jenisKapal[i].jumlah; j++) {
                    if(boardGame[x+j] === undefined) {
                        check = false
                        break;
                    } else if(boardGame[x+j][y] === undefined) {
                        check = false
                        break;
                    }else if(/[ABCD]/.test(boardGame[x+j][y]) === true) {
                        check = false
                        break;
                    }           
                }
                if(check === true) {
                    for (let j = 0; j < jenisKapal[i].jumlah; j++) {
                       boardGame[x+j][y] = jenisKapal[i].simbol 
                    }
                }
            }
            if(check === true){
                statusKapal = true
                break;
            }
        }

    }
    // console.log(shootKapal(boardGame,boms))
    shootKapal(boardGame,boms)
    // return boardGame
}


console.log(generateKapal())















// function generateBoard(dimension) {
//     var baris = ['','A','B','C','D','E','F','G','H','I','J'] 
//     for (let i = 0; i <= dimension; i++) {
//         var board = []
//         for (let j = 0; j <= dimension; j++) {
//             if(i === 0 & j=== 0) {
//                 board.push(' x ')
//             }else if(i === 0 & j!==0){
//                 board.push(` ${j} `)
//             }else if(j === 0 && i !== 0){
//                 board.push(` ${baris[i]} `)
//             } else {
//                board.push('   ')
//            }         
//         } 
//         console.log(board.join('|'))
//     }
// }