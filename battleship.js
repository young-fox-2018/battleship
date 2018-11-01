// Your code here

function printBoard() {
    console.log('   +---------------------------------------+')
    printLine(data)
    console.log('   +---------------------------------------+')
}
const data = [
    {
        name: '🛳',
        size: 5,
        kordinat: []
    },
    {
        name: '⛴',
        size: 4,
        kordinat: []
    },
    {
        name: '🚢',
        size: 3,
        kordinat: []
    },
    {
        name: '🛥',
        size: 2,
        kordinat: []
    }
]


function printLine(kapal) {
    let board = [];
    let pembatas = '\n   |---|---|---|---|---|---|---|---|---|---|\n'


    let ships = generate()
    // console.log(ships[0].kordinat);

    for (let i = 1; i <= 10; i++) {
        let temp = []
        if (i < 10) temp.push(` ${i} |`)
        else temp.push(`${i} |`)
        for (let j = 1; j <= 10; j++) {
            let isTrue = false
            let nameShip = ""
            for (let k = 0; k < ships.length; k++) {
                for (let l = 0; l < ships[k].kordinat.length; l++) {

                    if (ships[k].kordinat[l][0] === i && ships[k].kordinat[l][1] === j) {
                        nameShip = ships[k].name
                        isTrue = true
                    }
                }
            }

            if (isTrue === false) temp.push('   |')
            else temp.push(` ${nameShip} |`)
        }
        board.push(temp.join(''))
    }
    console.log(board.join(pembatas))
}

printBoard()

function heads() {
    let head = []
    let isCheck = false
    while (isCheck === false) {
        for (let i = 0; i < data.length; i++) {
            let randomI = Math.floor((Math.random() * 10) + 1)
            let randomJ = Math.floor((Math.random() * 10) + 1)
            head.push([randomI, randomJ])
            let direction = Math.floor((Math.random() * 2) + 1)
            for (let j = 0; j < data[i].size - 1; j++) {
                if (direction === 2) {
                    let left = randomJ + (j + 1)
                    head.push([randomI, left])
                }
                else {
                    let bottom = randomI + (j + 1)
                    head.push([bottom, randomJ])
                }
            }
        }
        let ceks = true
        for (let i = 0; i < head.length; i++) {
            if (head[i][0] > 10 || head[i][1] > 10) {
                ceks = false
            }
        }
        if (ceks === false) {
            isCheck = false
        }
        else {
            isCheck = true
        }
    }
    return head
}

function generate() {
    let process = heads()
    let allData = data
    for (let i = 0; i < allData.length; i++) {
        for (let j = 0; j < process.length; j++) {
            if (i === 0 && j < 5) {
                allData[i].kordinat.push(process[j])
            }
            else if (i === 1 && j < 9 && j > 4) {
                allData[i].kordinat.push(process[j])
            }
            else if (i === 2 && j < 12 && j > 8) {
                allData[i].kordinat.push(process[j])
            }
            else if (i === 3 && j < 15 && j > 11) {
                allData[i].kordinat.push(process[j])
            }
        }
    }
    return allData
}

// console.log(heads());







