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
    // factory function:
    const Player = (name, symbol, type, turn, svg) => {
        const getName = name;
        const getSymbol = symbol;
        const getType = type;
        const getTurn = turn;
        const getSVG = svg;
        const getWins = 0;
        return {getName, getSymbol, getType, getTurn, getSVG, getWins}
    };
    // variables
    let crossSVG = '<svg width="102" height="101" viewBox="0 0 102 101" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="3.88909" y1="4.11091" x2="96.8891" y2="97.1109" stroke="black" stroke-width="11"/><line x1="97.8891" y1="3.88909" x2="4.88909" y2="96.8891" stroke="black" stroke-width="11"/></svg>';
    let circleSVG = '<svg width="93" height="93" viewBox="0 0 93 93" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="46.5" cy="46.5" r="40.5" fill="white" stroke="black" stroke-width="12"/></svg>';
    let field = document.getElementById('field');
    let divFields = document.querySelectorAll('.field > div');
    let winnerMsg = document.getElementById('winnerMsg');
    let scoreDisplayOne = document.getElementById('oneScore');
    let scoreDisplayTwo = document.getElementById('twoScore');
    let continueScreen = document.getElementById('continueScreen');
    let nextRound = document.getElementById('nextRound');
    let restart = document.getElementById('restart');
    let gameboard = ['', '', '', '', '', '', '', '', ''];
    const menuScreen = document.getElementById('menuScreen');
    const backBtn = document.getElementById('back');
    let selectPlayerButtons = document.querySelector('#selectButtons');
    let selectPlayerButtonsChildren = document.querySelectorAll('#selectButtons button');
    let player1 = null;
    let player2 = null;
    const changePlayer = function() {
        if ( !this.classList.contains('active') ) {
            this.classList.add('active');
            if (this.nextElementSibling) {
                this.nextElementSibling.classList.remove('active');
            } else {
                this.previousElementSibling.classList.remove('active');
            }
        }
    }
    const toggleMainMenu = () => {
        if (menuScreen.classList.contains('hide')) {
            menuScreen.classList.remove('hide');
        } else {
            menuScreen.classList.add('hide');
            initPlayers(selectPlayerButtons.querySelector('.active').value);
        }
    }
    const initPlayers = playerType => {
        player1 = Player('joe', 'x', 'human', true, crossSVG);
        player2 = Player('bob', 'o', playerType, false, circleSVG);
    }
    const startGame = () => {
        divFields.forEach(div => div.addEventListener('click', playerMove));
    };
    const endGame = status => {
        let winner = null;
        divFields.forEach(div => div.removeEventListener('click', playerMove));

        if (status === 'win') {
            if (player1.getTurn) {
                winner = player1;
            } else {
                winner = player2;
            }
            winnerMsg.innerHTML = winner.getName + ' won!';
            winner.getWins += 1;
            setTimeout( () => { updateStats(); toggleWinnerMsg(true); toggleContinueScreen(true) }, 300);
        } else {
            // draw
            winnerMsg.innerHTML = 'It\'s a draw!';
            setTimeout( () => { updateStats(); toggleWinnerMsg(true); toggleContinueScreen(true) }, 300);
        }
    }
    const toggleWinnerMsg = status => {
        if (status) {
            winnerMsg.classList.add('active');
        } else {
            winnerMsg.classList.remove('active');

        }
    }
    const toggleContinueScreen = status => {
        if (status) {
            continueScreen.classList.add('active');
        } else {
            continueScreen.classList.remove('active');
        }
    }
    const updateStats = flag => {
        if (!flag) {
            scoreDisplayOne.innerHTML = player1.getWins;
            scoreDisplayTwo.innerHTML = player2.getWins;
        } else {
            scoreDisplayOne.innerHTML = 0;
            scoreDisplayTwo.innerHTML = 0;
        }
    }
    const startNextRound = () => {
        clearField();
        startGame();
    }
    const restartGame = () => {
        clearField();
        player1.getWins = 0;
        player2.getWins = 0;
        updateStats();
        startGame();
    }
    const quitGame = () => {
        clearField();
        toggleMainMenu();
        updateStats(true);
    }
    const playerMove = function() {
        let that = this;

        if (player1.getTurn) {
            makeMove(player1, that);
        } else {
            makeMove(player2, that);
        }
    };
    const toggleDisableField = () => {
        if (field.classList.contains('disabled')) {
            field.classList.remove('disabled');
        } else {
            field.classList.add('disabled')
        }
    }
    const clearField = () => {
        gameboard = ['', '', '', '', '', '', '', '', ''];
        let svgs = document.querySelectorAll('svg');
        let winClass = document.querySelectorAll('.win');
        toggleDisableField();
        svgs.forEach(svg => {svg.classList.add('hide')});
        toggleWinnerMsg(false);
        toggleContinueScreen(false);
        setTimeout(() => {
            svgs.forEach(svg => svg.remove());
            winClass.forEach(div => div.classList.remove('win'));
            toggleDisableField();
        }, 500);
    };
    // function
    const makeMove = (player, element) => {
 
        element.innerHTML = player.getSVG;

        gameboard[element.id] = player.getSymbol;

        element.removeEventListener('click', playerMove);

        if (checkWin() === 'win' ) {
            endGame('win');
            return
        } else if (checkWin() === 'draw' ) {
            endGame('draw');
            return
        }
        if (player2.getType === 'bot' && player1.getTurn === true) {
            player1.getTurn = false;
            toggleDisableField();
            setTimeout(botMove, 500);
        } else {
            player1.getTurn = !player1.getTurn;
        }
    }
    const botMove = () => {
        let freeSpaces = [];
        for (let i = 0; i < gameboard.length; i++) {
            if (gameboard[i] === '') {
                freeSpaces.push(i)
            }
        }
        let id = freeSpaces[Math.round(Math.random() * (freeSpaces.length - 1))];
        document.getElementById(id).click();
        setTimeout( () => {
            toggleDisableField();
        }, 500);
    }
    // function
    const checkWin = () => {
        let patterns = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ],
            isWin = false,
            checkDraw = (list) => list.every(item => item !== '');

        for (let i = 0; i < patterns.length; i++) {
            if (gameboard[patterns[i][0]] === '' || gameboard[patterns[i][1]] === '' || gameboard[patterns[i][2]] === '') {
                continue
            } 
            if (gameboard[patterns[i][0]] === gameboard[patterns[i][1]] && gameboard[patterns[i][1]] === gameboard[patterns[i][2]]) {
                isWin = true;
                setTimeout( () => {
                    document.querySelector('[id="' + [patterns[i][0] + '"]']).classList.add('win');
                    document.querySelector('[id="' + [patterns[i][1] + '"]']).classList.add('win');
                    document.querySelector('[id="' + [patterns[i][2] + '"]']).classList.add('win');
                }, 300 )
            }
        }

        if (checkDraw(gameboard)) {
            return 'draw'
        } 
        if (isWin) {
            return 'win'
        }
    };
    nextRound.addEventListener('click', startNextRound);
    restart.addEventListener('click', restartGame);
    backBtn.addEventListener('click', quitGame);
    selectPlayerButtonsChildren.forEach(btn => btn.addEventListener('click', changePlayer));

    return {toggleMainMenu, startGame}
})();

let startBtn = document.getElementById('start');

function runGame() {
    ticTacToeGame.toggleMainMenu();
    ticTacToeGame.startGame();
}

startBtn.addEventListener('click', runGame);


