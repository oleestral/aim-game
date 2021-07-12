const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
let time = 0;
let score = 0;
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#5680E9', '#84CEEB', '#5AB9EA', '#C1C8E4', '#8860D0'];
const restartBtn = document.querySelector('.screen__refresh-btn');

startBtn.addEventListener('click', (event)=> {
    event.preventDefault();
    screens[0].classList.add('up');
});
timeList.addEventListener('click', (evt)=>{
    if(evt.target.classList.contains('time-btn')) {
        time = parseInt(evt.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('circle')) {
        score++;
        evt.target.remove();
        createRandomCircle();
    }
});


function startGame() {
    setInterval(decreaseTime,1000);
    createRandomCircle();
    setTime(time);
}
function decreaseTime() {
    if(time === 0) {
        finishGame();
    }
    else {
        let current = --time;
        if(current<10) {
            current = `0${current}`;
        }
        setTime(current);
    }
}
function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}
function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Счет: ${score}</h1>`;
    restartBtn.classList.remove('hide-btn');

}
function restartGame() {
    window.location.reload();
}

restartBtn.addEventListener('click', ()=> {
    restartGame();
})
function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10,60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    circle.classList.add('circle');
    const color = getRandomColor();
    circle.style.backgroundColor = color;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}