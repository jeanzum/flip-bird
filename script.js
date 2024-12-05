
const fish = document.getElementById('fish');
const gameArea = document.getElementById('gameContainer');
const scoreDisplay = document.getElementById('score');

let score = 0;
let fishPosition = 180;
let isGameOver = false;

// Movimiento del pez

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp' || event.key === 'w') {
    fishPosition -= 30; // Subir
  } else if (event.key === 'ArrowDown' || event.key === 's') {
    fishPosition += 30; // Bajar
  }

  if(!isGameOver) {
    fish.style.top = `${fishPosition}px`;
  }
});

const checkCollision = () => {
    const fishReact = fish.getBoundingClientRect();
    const obstacles = document.querySelectorAll('.obstacle');
    
    obstacles.forEach((obstacle) => {
      const obstacleRect = obstacle.getBoundingClientRect();

      // Colisión
      if(
        fishReact.left < obstacleRect.right &&
        fishReact.right > obstacleRect.left &&
        fishReact.top < obstacleRect.bottom &&
        fishReact.bottom > obstacleRect.top
      ) {
        endGame();
      }
    });

    // Fuera de limites
    if(fishPosition < 0 || fishPosition > gameArea.offsetHeight - fish.offsetHeight) {
      endGame();
    }
} 

const endGame = () => {
    if(!isGameOver) {
        isGameOver = true;
       alert(`Game Over, tu puntaje fue de ${score}`);
       location.reload();
    }
}

const updateScore = () => {
    if(!isGameOver) {
        score++;
        scoreDisplay.textContent = score;
    }
};

setInterval(() => {
    if(!isGameOver) {
        checkCollision();
        updateScore();
    }
}, 100);