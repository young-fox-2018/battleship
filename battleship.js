// Your code here

const generateBoard = () => {
    let board = [],
        alphabet = ' ABCDEFGHIJ'
    for (let i = 0; i <= 10; i++) {
        let line = []
        for (let j = 0; j <= 10; j++) {
            if (i === 0) {
                line.push(` ${j}`)
            } else if (i !== 0 && j !== 0) {
                line.push('❌')
            } else if (i !== 0 && j == 0) {
                line.push(alphabet[i])
            }
        }
        board.push(line)
    }
    return board
}
// console.log(generateBoard())


const randomHeadShip = () => {
    let arr = []
    arr.push(Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1)
    return arr
}
// console.log(randomHeadShip())
const checkOutBoard = (koordinate, length) => {
    if (koordinate[0] - length <= 0 || koordinate[0] + length > 10 || koordinate[1] - length <= 0 || koordinate[1] + length > 10) {
        return false
    } else {
        return true
    }
}
const checkCrossShip = (board, koordinate) => {
    // let board = generateBoard()
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[koordinate[0]][koordinate[1]] === ' ') return true
            else return false
        }
    }
}
// console.log(checkCrossShip([4, 5]))
const checkV = (koordinat, length) => {
    if (koordinat[0] + length < 11 || koordinat[0] - length > 0) return true
    else return false
}
// console.log(checkV([1, 2], 5))

const generateShip = () => {
    var board = generateBoard()
    var ship = [{
            name: 'Aircraft Carrier',
            length: 5,
            koordinat: [],
            icon: '🚀'
        },
        {
            name: 'Battleship',
            length: 4,
            koordinat: [],
            icon: '🚢'
        },
        {
            name: 'Cruiser',
            length: 3,
            koordinat: [],
            icon: '😻'
        },
        {
            name: 'Destroyer',
            length: 2,
            koordinat: [],
            icon: '🙉'
        }
    ]
    let directions = ["top", "bottom", "right", "left"]
    for (let i = 0; i < ship.length; i++) {
        let isTrue = true
        while (isTrue) {
            let head = randomHeadShip()
            if (checkOutBoard(head) === true) {
                isTrue = false
            }
            ship[i].koordinat.push(head)
            board[head[0]][head[1]] = ship[i].icon

            for (let j = 0; j < ship[i].length; j++) {
                let done = false
                // while (!done) {
                if (head[1] + ship[i].length - 1 < 11) {
                    board[head[0]][head[1] + j] = ship[i].icon
                    ship[i].koordinat.push([head[0], head[1] + j])
                    // done = true
                }
                // arah kanan
                // if (head[1] - ship[i].length - 1 > 0) {
                //     board[head[0]][head[1] - j] = ship[i].icon
                //     ship[i].koordinat.push([head[0], head[1] - j])
                //     done = true
                // }
                // // arah kiri
                // if (head[0] - ship[i].length - 1 > 0) {
                //     board[head[0] - j][head[1]] = ship[i].icon
                //     ship[i].koordinat.push([head[0] - j, head[1]])
                //     done = true
                // }
                // // arah atas
                // if (head[0] + ship[i].length - 1 < 11) {
                //     board[head[0] + j][head[1]] = ship[i].icon
                //     ship[i].koordinat.push([head[0] + j, head[1]])
                //     done = true
                // }
                // }
            }


            // let directionIndex = 0
            // let done = false
            // while (!done) {
            //     if (direction[directionIndex] === "top") {
            //         // check coordinatenya sudah dipakai atau belum 
            //         // kalau sudah ada 
            //         // reset coordinates yg sebelumnya 
            //         // tetap melakukan penyecekan lagi 
            //         // directionIndex += 1 
            //         // kalau belum ada 
            //         // generate body 
            //         // kalau di posisi ini berhasil 
            //         // save coordinate 
            //         // set done = true  
            //     } else {

            //     }
            // }
            // for (let d = 0; d < directions.length; d++) {

            // }

            // vertikal
            // for (let j = 1; j < ship[i].length; j++) {
            //     // let isTrue = true


            //     board[head[0] + j][head[1]] = ship[i].icon

            //     // if (head[0] - ship[i].length > 0) {
            //     //     board[head[0] + j][head[1]] = ship[i].icon
            //     // }
            // }

        }


        // let head = randomHeadShip()
        // ship[i].koordinat.push(head)
        // // console.log(a)
        // console.log(board)
    }
    return board
    // return ship[0].koordinat


}
console.log(generateShip())


/*
Aircraft carrier =5
Battleship =4
Cruiser=3
Destroyer=2

[
    {name:"Aircraft", length:5, coordinates:[
        [4,5],[3,5],[2,5]
    ]},{
        name:"battleShip",length:4,coordinates:[
            
        ]
    }},
]
*/

// FUNCTION - FUNCTION 
/* 
    function checkOutBoard(coordinate)( -1 atau 11 ) // true false
    function checkCrossShip(coordinate) // true false 
    function randomHeadShip(ship[i])
    function generateShip()

    if(checkOutBoard && checkCrossShip()) {
        // maka simpan coordinate 
    }
*/

/* 
    langkah langkah setelah generate board 
    1 . ambil 1 kapal ( aircraft )
    2. random koordinat kepala kapal 
    3. random arah ( vertical / horizintal ) ke atas atau kebawah / kiri kanan 
    4. misal didapatkan random kepala 4,5 
      - check dahulu sudah ada belum koordinate ini sudah di pakai di kapal lain atau belum 
    vertical keatas 
        4,5 -> 3,5 check lagi -> 2,5 check lg  -> 1,5 -> 0,5 
        berarti langung generate kapalnya ke board , selama 
        - tidak nabrak dengan kapal lain 
        - dan tidak keluar board 
    5. kalau misalkan salah satu koordinat bentrok dengan kapal lain dalam artian sudah dipakai oleh kapal lain 
       - hapus koordinate sebelumnya yg sudah di generate 
       - random lagi dari awal 

*/