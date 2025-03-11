const moveCarWithMouse = (event, playerCar, road) => {
  const roadWidth = 300;
  const carWidth = 50;
  const roadRect = road.getBoundingClientRect();
  let newPosition = event.clientX - roadRect.left - carWidth / 2;

  if (newPosition >= 0 && newPosition <= roadWidth - carWidth) {
    playerCar.style.left = newPosition + "px";
  }
};

const checkCollision = (enemyCar, playerCar, moveInterval) => {
  const playerRect = playerCar.getBoundingClientRect();
  const enemyRect = enemyCar.getBoundingClientRect();

  if (
    playerRect.left < enemyRect.right &&
    playerRect.right > enemyRect.left &&
    playerRect.top < enemyRect.bottom &&
    playerRect.bottom > enemyRect.top
  ) {
    alert("Game Over!🙂");
    location.reload();
    clearInterval(moveInterval);
  }
};

const updateScore = (scoreBoard) => {
  scoreBoard.textContent = parseInt(scoreBoard.textContent) + 1;
};

const updateHighestScore = (highestScore, currentScore) => {
  const storedHighScore = parseInt(localStorage.getItem("highestScore")) || 0;

  if (currentScore > storedHighScore) {
    localStorage.setItem("highestScore", currentScore);
    highestScore.textContent = currentScore;
  }
};

const moveEnemyCar = (enemyCar, playerCar) => {
  let positionY = -100;
  const moveInterval = setInterval(() => {
    positionY += 5;
    enemyCar.style.top = positionY + "px";

    if (positionY > 500) {
      const scoreBoard = document.querySelector("#current-score");
      const highestScore = document.querySelector("#highest-score");

      updateScore(scoreBoard);
      updateHighestScore(highestScore, parseInt(scoreBoard.textContent));

      enemyCar.remove();
      clearInterval(moveInterval);
    }

    checkCollision(enemyCar, playerCar, moveInterval);
  }, 30);
};

const createEnemyCar = (road, playerCar) => {
  const enemyCar = document.createElement("div");
  enemyCar.classList.add("enemy-car");

  const carEmojis = ["🚘", "🚔", "🚖", "🚍"];
  enemyCar.innerHTML = carEmojis[Math.floor(Math.random() * carEmojis.length)];

  const roadWidth = 300;
  const carWidth = 50;
  const randomPosition = Math.floor(Math.random() * (roadWidth - carWidth));
  enemyCar.style.left = randomPosition + "px";

  road.appendChild(enemyCar);
  moveEnemyCar(enemyCar, playerCar);
};

const movePlayerCar = (event, playerCar) => {
  const roadWidth = 300;
  const carWidth = 50;
  let positionX = parseInt(playerCar.style.left) || 125;

  if (event.key === "ArrowLeft" && positionX > 10) {
    positionX -= 30;
  }

  if (event.key === "ArrowRight" && positionX < roadWidth - carWidth - 10) {
    positionX += 30;
  }

  playerCar.style.left = positionX + "px";
};

const startEnemyCarGeneration = (road, playerCar) => {
  setInterval(() => createEnemyCar(road, playerCar), 2000);
};

const setupEventListeners = (playerCar, road) => {
  document.addEventListener("keydown", (event) =>
    movePlayerCar(event, playerCar)
  );

  document.addEventListener("mousemove", (event) =>
    moveCarWithMouse(event, playerCar, road)
  );
};

const startGame = () => {
  const road = document.querySelector(".road");
  const playerCar = document.querySelector(".player-car");
  const highestScore = document.querySelector("#highest-score");

  highestScore.textContent = localStorage.getItem("highestScore") || 0;

  setupEventListeners(playerCar, road);
  startEnemyCarGeneration(road, playerCar);
};

window.onload = startGame;
