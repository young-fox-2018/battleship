var fleet = [
    {
        type: "Aircraft carrier",
        total: 5,
        sim: 'A',

    },
    {
        type: 'Battleship',
        total: 4,
        sim: 'B',
    },
    {
        type: 'Cruiser',
        total: 3,
        sim: 'C',
    },
    {
        type: 'Destroyer',
        total: 2,
        sim: 'D',
    }
]

var argv = process.argv.slice(2)
// console.log(argv)

function tembakcuy(board, target) {
    let dict = 'abcdefghij' 
    let kena = []

    for(let i = 0; i < target.length; i++) {
        let pointI = Number(dict.indexOf(target[i].slice(0,1)))
        let pointJ = Number(target[i].slice(1,2))
        for(let j = 0; j < board.length; j++) {
            for(let k = 0; k < board.length; k++) {
                if(j === pointI && k === pointJ) {
                    if(board[j][k] !== ' ') {
                        kena.push(board[j][k])
                    }
                    board[j][k] = '🔥'
                }
            }
        }
    }

    let kenaA = 0
    let kenaB = 0
    let kenaC = 0
    let kenaD = 0

    for(let i = 0; i < kena.length; i++) {
        if(kena[i] === 'A') {
            kenaA += 1
        } else if(kena[i] === 'B') {
            kenaB += 1
        } else if(kena[i] === 'C') {
            kenaC += 1
        } else if(kena[i] === 'D') {
            kenaD += 1
        }
    }

    console.log(board)
    console.log(`Kapal A hancur ${kenaA} buah`)
    console.log(`Kapal B hancur ${kenaB} buah`)
    console.log(`Kapal C hancur ${kenaC} buah`)
    console.log(`Kapal D hancur ${kenaD} buah`)
    console.log(`game over`)
}

function dice() {
    return Math.floor(Math.round()*10+1)
}

function direction() {
    let random = Math.round(Math.random())

    if(random === 0) {
        return 'horizontal'
    } else {
        return 'vertikal'
    }
}

function boardGenerator(bakalTarget) {
    var result = []

    for(let i = 0; i < 10; i++) {
        let temp = []
        for(let j = 0; j < 10; j++) {
            temp.push(' ')
        }
        result.push(temp)
    }

    for(let i = 0; i < fleet.length; i++) {
        var cek = false

        while(cek === false) {
            // console.log(i)
            let row = Math.floor(Math.random()*9+1)
            let collom = Math.floor(Math.random()*9+1)
            let cekShip = true

            if(direction() === 'vertikal') {
                // console.log(i)

                for(let j = 0; j < fleet[i].total; j++) {
                    // console.log(j)
                    if(result[row] === undefined || result[row][collom+j] === undefined) {
                        // console.log(result[row][collom+j])
                        cekShip = false
                        break;
                    } else if(/[ABCD]/.test(result[row][collom+j]) === true) {
                        // console.log(i)
                        cekShip = false
                        break;
                    }
                }

                if(cekShip === true) {
                    // console.log(i)
                    for(let j = 0; j < fleet[i].total; j++) {
                        result[row][collom+j] = fleet[i].sim
                    }
                }
            
            } else {

                for(let j = 0; j < fleet[i].total; j++) {
                    if(result[row+j] === undefined) {
                        cekShip = false
                        break;
                    } else if(result[row+j][collom] === undefined) {
                        cekShip = false
                        break;
                    } else if(/[ABCD]/.test(result[row][collom+j]) === true) {
                        // console.log(i)
                        cekShip = false
                        break;
                    }
                }

                if(cekShip === true) {
                    for(let j = 0; j < fleet[i].total; j++) {
                        result[row+j][collom] = fleet[i].sim
                    }
                }
            }

            if(cekShip === true) {
                // console.log(i)
                cek = true
                break;
            }
        }
    }
    tembakcuy(result, bakalTarget)
}

boardGenerator(argv)