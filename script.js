
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const start =document.querySelector('.btn');
const timeleft=document.querySelector('.time-left');

let lastHole;
let timeUp = false;
let score = 0;
let sec;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole == lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(300, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    timeremain();
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000)
}

function endGame(){
    timeUp=true;
    sec=0;
}

function hit() {
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

function RestartGame(){
  startGame();
}

function timeremain() {
    sec = 10;
    let IntervalId = setInterval(() => {
        if (sec >= 0) {
            timeleft.innerHTML = `${sec}`;
            sec--;
        }
        else {
            clearInterval(IntervalId)
        }
    }, 1000)
}


moles.forEach(mole => mole.addEventListener('click', hit));
