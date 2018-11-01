// Your code here
function printBoard(){
    var board = [];
    for (let i = 0; i <= 20; i++) {
        let baris = [];
        for (let j = 0; j <= 20; j++) {
            if ((i === 0 && j === 0) || (i === 20 && j === 0)) {
                baris.push(`+-`);
            } else if ((i === 0 && j === 20) || (i === 20 && j === 20)) {
                baris.push(`+`);
            } else if (i === 0 || i === 20) {
                baris.push(`--`);        
            } else if (j === 20 && i % 2 === 1) {
                baris.push(`|`);        
            } else if (j === 20 && i % 2 === 0) {
                baris.push(`|`);        
            } else if ((j === 0 && i % 2 === 1) || (j % 2 === 0 && i % 2 === 1)) {
                baris.push(`| `);
            } else if ((j === 0 && i % 2 === 0) || (j % 2 === 0 && i % 2 === 0)) {
                baris.push(`|-`);        
            } else if (i % 2 === 0) {
                baris.push(`--`);        
            } else {
                baris.push(`  `)              
            }         
        }
        board.push(baris.join(''));
    }

    return board.join('\n');
}

console.log(printBoard());