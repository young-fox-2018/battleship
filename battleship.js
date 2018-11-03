// Your code here
function printBoard() {
    let board = []
    let points = 'ABCDEFGHIJK'
    for (let i = 0; i <= 10; i++) {
        board.push([])
        for (let j = 0; j <= 10; j++) {
            if(i === 0 && j > 0) board[i].push(`${j}`)
            else if(j === 0 && i > 0) board[i].push(points[i-1])
            else board[i].push('🐟')
        }    
    }
    
    let fleet = [
        {name:"Aircraft carrier", size:5, icon:'🚀'},
        {name:"Battleship", size:4, icon:'🛵'},
        {name:"Cruiser", size:3, icon:'🚕'},
        {name:"Destroyer", size:2, icon:'🛶'}]
    
    for (let i = 0; i < fleet.length; i++) {
        let x = randomCoordinate()
        let y = randomCoordinate()
        let spaceHor = 0
        let spaceVer = 0
        let spaceDia = 0
        if(x + fleet[i].size-1 < 11 && y + fleet[i].size-1 < 11) {
            let availDirection = []
            for (let j = 0; j < fleet[i].size; j ++) {
                if(board[x + j][y] === '🐟') spaceHor++
                if(board[x][y + j] === '🐟') spaceVer++
                if(board[x+j][y+j] === '🐟') spaceDia++
            }
            
            if (spaceHor === fleet[i].size) availDirection.push('hor')
            if (spaceVer === fleet[i].size) availDirection.push('ver')
            if (spaceDia === fleet[i].size) availDirection.push('dia')            
            
            if(!availDirection.length) i--

            let h = Math.floor(Math.random()*availDirection.length)
            if (availDirection[h] === 'hor') {
                for (let z = 0; z < fleet[i].size; z++) {
                    board[x+z][y] = fleet[i].icon
                }
            } else if (availDirection[h] === 'ver') {
                for (let z = 0; z < fleet[i].size; z++) {
                    board[x][y+z] = fleet[i].icon
                }
            } else if (availDirection[h] === 'dia') {
                for (let z = 0; z < fleet[i].size; z++) {
                    board[x+z][y+z] = fleet[i].icon
                }
            }
        } else {
            i--
        }
    }        
    return board
}

let input = process.argv.slice(2)
function shoot (arr) {
    let board = printBoard()
    let shoot = 0
    for (let i = 0; i < input.length; i++) {
        if (board[input[i][0]][input[i][1]] === '🚀' || board[input[i][0]][input[i][1]] === '🛵' || board[input[i][0]][input[i][1]] === '🚕' || board[input[i][0]][input[i][1]] === '🛶') {
            shoot++
        }
        board[input[i][0]][input[i][1]] = '😵'
    }
    console.log(board)
    return `${shoot} Enemy's was down`
}


function randomCoordinate() {
    let coordinate = Math.floor(Math.random()*(10-1)+1)
    return coordinate
}

console.log(shoot(input))