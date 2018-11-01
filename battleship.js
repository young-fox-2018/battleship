// Your code here
function warVehicle() {
    const vehicle =
        [
            { ship: 'Aircraft Carrier', symbol: '@', size: 5 },
            { ship: 'Battleship', symbol: '#', size: 4 },
            { ship: 'Cruiser', symbol: '$', size: 3 },
            { ship: 'Destroyer', symbol: '&', size: 2 }
        ]
    return vehicle
}

function ocean() {
    let board = []
    for (let i = 0; i < 10; i++) {
        let arr = []
        for (let j = 0; j < 10; j++) {
            arr.push(' ')
        }
        board.push(arr)
    }
    return board
}

function randomCoordinate() {
    let randomI = Math.floor(Math.random() * 9)
    let randomJ = Math.floor(Math.random() * 9)
    return [randomI, randomJ]
}

function randomDirection() {
    return Math.round(Math.random())
}

function play() {
    let vehicle = warVehicle()
    let board = ocean()
    for (let i = 0; i < vehicle.length; i++) {
        let random = randomCoordinate()
        board[random[0]][random[1]] = vehicle[i].symbol

        vehicle[i].position = [random[0], random[1]]
    }
    let check = false
    while (check === false) {
        for (let i = 0; i < vehicle.length; i++) {
            let randomDir = randomDirection()
            vehicle[i].orientation = randomDir
            for (let j = 0; j < vehicle[i].size; j++) {
                if (vehicle[i].position[0] <= board.length - 1 && vehicle[i].position[1] <= board.length - 1) {
                    board[vehicle[i].position[0]][vehicle[i].position[1]] = vehicle[i].symbol
                    check = true
                    vehicle[i].position[randomDir] += 1
                }
            }
        }
    }
    console.log(board)
    console.log(vehicle)
}

play()