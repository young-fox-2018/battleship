// Your code here
const argv = process.argv.slice(2)
let board = printBoard(10)

//random angka
function getRandomNumber() {
    return Math.floor((Math.random() * 10))
}

let ships = [
    {name: 'Aircraft Carrier', size: 5, logo: '#'},
    {name: 'Battleship', size: 4, logo: '@'},
    {name: 'Cruiser', size: 3, logo: '&'},
    {name: 'Destroyer', size: 2, logo: '%'}
]

//random ship direction
function shipDirection() { 
    let direction = ['horizontal', 'vertical']
    let a = Math.round(Math.random())
    return direction[a]
}

//print area battle
function printBoard(size) {
    let board = []
    for (let i = 1; i <= size; i++) {
        let temp = []
        for (let j = 1; j <= size; j++) {
            temp.push(' ')
        }
        board.push(temp)
    }
    return board
}

//generate bomb
function bombCoor(){
    let abjad = 'ABCDEFGHIJ'
    for(let i = 0; i < argv.length; i++){
        argv[i] = argv[i].split('')
        for(let j = 0; j < abjad.length; j++){
            if(argv[i][0] === abjad[j]){
                argv[i][0] = j
            }
        }
    }
}
  
// generate random ship
function generateShip(board) {
    let temp = []
    for(let i = 0; i < ships.length; i++) {
        let condition = false
        // cek koordx n koord y
        while(condition === false) {
            temp = []
            condition = true
            koorx = getRandomNumber()
            koory = getRandomNumber()
            let getDirection = shipDirection()
            if(getDirection === 'vertical') {
                for(let j = 0; j < ships[i].size; j++) {
                    if(board[koorx + j] === undefined){
                        condition = false
                        break;
                    }
                    if(board[koorx + j][koory] !== ' ') {
                        condition = false
                        break;
                    }
                    temp.push([
                        koorx + j, koory
                    ])
                }
            } else if (getDirection === 'horizontal') {
                for(let k = 0; k < ships[i].size; k++){
                    if(board[koorx][koory + k] !== ' '){
                        condition = false
                        break;
                    }
                    temp.push([
                        koorx, koory + k
                    ])
                }
            }
        }

        // masukin kapalnya
        for(let j = 0; j < temp.length; j++){
            board[temp[j][0]][temp[j][1]] = ships[i].logo
        }
    }

    bombCoor()
    for(let i = 0; i < argv.length; i++){
        board[argv[i][0]][argv[i][1]] = 'X'   
    }
    console.log(board);
    return board
}

const summary = generateShip(board)
function getSummary(){
    let countShip1 = 0
    let countShip2 = 0
    let countShip3 = 0
    let countShip4 = 0

    for(let i = 0; i < summary.length; i++){
        for(let j = 0; j < summary[i].length; j++){
            if(summary[i][j] === '#'){
                countShip1++
            }else if(summary[i][j] === '@'){
                countShip2++
            }else if(summary[i][j] === '&'){
                countShip3++
            }else if(summary[i][j] === '%'){
                countShip4++
            }
        }

    }
    return `Kapal ${ships[0].name} tertembak : ${ships[0].size-countShip1}, sisa ${countShip1}\nKapal ${ships[1].name} tertembak : ${ships[1].size-countShip2}, sisa ${countShip2}\nKapal ${ships[2].name} tertembak : ${ships[2].size-countShip3}, sisa ${countShip3}\nKapal ${ships[3].name} tertembak : ${ships[3].size-countShip4}, sisa ${countShip4}`
}

// console.log(generateShip(board));
console.log(getSummary())





