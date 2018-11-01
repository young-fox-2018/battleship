function generateBoard(dimension) {
    var baris = ['','A','B','C','D','E','F','G','H','I','J'] 
    for (let i = 0; i <= dimension; i++) {
        var board = []
        for (let j = 0; j <= dimension; j++) {
            if(i === 0 & j=== 0) {
                board.push(' x ')
            }else if(i === 0 & j!==0){
                board.push(` ${j} `)
            }else if(j === 0 && i !== 0){
                board.push(` ${baris[i]} `)
            } else {
               board.push('   ')
           }         
        } 
        console.log(board.join('|'))
    }
}

console.log(generateBoard(10))