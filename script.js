// const selectPlayerButtons = document.querySelectorAll('.select'),
//       divFields = document.querySelectorAll('.field > div'),
//       startBtn = document.getElementById('start'),
//       menuPage = document.getElementById('menuPage');
// let gameBoard = ['', '', '', '', 'X', '', '', 'O', ''];

// function selectPlayer() {
//     if (!this.classList.contains('active')) {
//         document.querySelector('.select.active').classList.remove('active');
//         this.classList.add('active');
//     } 
// }

// function startGame() {
//     menuPage.classList.add('hide');
// }

// function playerMove() {
//     let newImg = document.createElement('img');
//     newImg.classList.add('move');
//     newImg.src = 'img/x.svg';
//     this.appendChild(newImg);
//     this.removeEventListener('click', playerMove);
// }


// let realDivs = [];
// function fillFields() {
//     divFields.forEach(div => realDivs.push(div));
//     realDivs.map( (div, index) => {
//         if (gameBoard[index] == 'x') {
//             return div.classList.add('cross');
//         } else if (gameBoard[index] == 'o') {
//             return div.classList.add('circle');
//         } else {
//             return div
//         }
//     } )
// }

// selectPlayerButtons.forEach(button => button.addEventListener('click', selectPlayer));
// divFields.forEach(div => div.addEventListener('click', playerMove));


// // startBtn.addEventListener('click', startGame);

// const gameBoardObject = {
//     // const gameBoardArr = [];
// }
// fillFields();
// // console.log(realDivs)




// module
let ticTacToeGame = (() => {
    let gameboard = (() => {
    });
    // factory function:
    const Player = (name, symbol, type, turn) => {
        const playerName = name;
        const getSymbol = () => symbol;
        const getType = () => type;
        const playerTurn = turn;
        return {playerName, getSymbol, getType, playerTurn}
    };

    let player1 = Player('joe', 'x', 'human', 'true');
    let player2 = Player('bob', 'x', 'bot', 'false');

    const makeMove = function() {
        // let currentPlayer = null;
        // if (player1.playerTurn) { currentPlayer = player1 } else { currentPlayer = player2 };
        console.log(this)
    }

    const startGame = () => {
        let divFields = document.querySelectorAll('.field > div');
        divFields.forEach(div => div.addEventListener('click', makeMove));
    }
    return {startGame}
})();

console.log(ticTacToeGame.startGame());
