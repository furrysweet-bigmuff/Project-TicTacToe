const selectPlayerButtons = document.querySelectorAll('.select'),
      divFields = document.querySelectorAll('.field > div'),
      startBtn = document.getElementById('start'),
      menuPage = document.getElementById('menuPage');

function selectPlayer() {
    if (!this.classList.contains('active')) {
        document.querySelector('.select.active').classList.remove('active');
        this.classList.add('active');
    } 
}

function startGame() {
    menuPage.classList.add('hide');
}

function playerMove() {
    let newImg = document.createElement('img');
    newImg.src = 'img/x.svg';
    this.appendChild(newImg);
    this.removeEventListener('click', playerMove);
}

selectPlayerButtons.forEach(button => button.addEventListener('click', selectPlayer));
divFields.forEach(div => div.addEventListener('click', playerMove));


startBtn.addEventListener('click', startGame);