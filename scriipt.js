const bird = document.getElementById('bird');
const pipeTop = document.getElementById('pipeTop');
const pipeBottom = document.getElementById('pipeBottom');
const gameContainer = document.getElementById('gameContainer');

let birdY = 50;
let birdVelocity = 0;
let gravity = 0.5;
let pipeX = 300;
let gap = 120;
let score = 0;
let gameInterval;
let pipeInterval;

document.addEventListener('keydown', () => {
    birdVelocity = -8;
});

function moveBird() {
    birdVelocity += gravity;
    birdY += birdVelocity;
    bird.style.top = birdY + 'px';

    if (birdY > gameContainer.clientHeight - bird.clientHeight || birdY < 0) {
        endGame();
    }
}

function movePipes() {
    pipeX -= 2;
    if (pipeX < -pipeTop.clientWidth) {
        pipeX = gameContainer.clientWidth;
        let pipeHeight = Math.random() * (gameContainer.clientHeight - gap);
        pipeTop.style.height = pipeHeight + 'px';
        pipeBottom.style.height = (gameContainer.clientHeight - pipeHeight - gap) + 'px';
        score++;
    }
    pipeTop.style.right = pipeX + 'px';
    pipeBottom.style.right = pipeX + 'px';
}

function checkCollision() {
    const birdRect = bird.getBoundingClientRect();
    const pipeTopRect = pipeTop.getBoundingClientRect();
    const pipeBottomRect = pipeBottom.getBoundingClientRect();

    if (
        birdRect.left < pipeTopRect.right &&
        birdRect.right > pipeTopRect.left &&
        (birdRect.top < pipeTopRect.bottom || birdRect.bottom > pipeBottomRect.top)
    ) {
        endGame();
    }
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(pipeInterval);
    alert(`Game Over! Pontuação: ${score}`);
    resetGame();
}

function resetGame() {
    birdY = 50;
    birdVelocity = 0;
    pipeX = gameContainer.clientWidth;
    score = 0;
    bird.style.top = birdY + 'px';
    pipeTop.style.right = pipeX + 'px';
    pipeBottom.style.right = pipeX + 'px';
    gameInterval = setInterval(() => {
        moveBird();
        checkCollision();
    }, 20);
    pipeInterval = setInterval(movePipes, 20);
}

resetGame();
