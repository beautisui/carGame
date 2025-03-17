import PlayerCar from "./playerCar.js";
import EnemyCar from "./enemyCar.js";
import Scoreboard from "./scoreboard.js";

class Game {
  constructor() {
    this.road = document.querySelector(".road");
    this.playerCarElement = document.querySelector(".player-car");
    this.scoreElement = document.querySelector("#current-score");
    this.highScoreElement = document.querySelector("#highest-score");

    this.roadWidth = 300;
    this.playerCar = new PlayerCar(this.playerCarElement, this.roadWidth);
    this.scoreboard = new Scoreboard(this.scoreElement, this.highScoreElement);
    this.enemyCars = [];

    this.start();
  }

  handleGameOver() {
    alert("Game Over!🙂");
    location.reload();
  }

  startEnemyCarGeneration() {
    setInterval(() => {
      const enemyCar = new EnemyCar(this.road, this.roadWidth);
      this.enemyCars.push(enemyCar);

      const moveInterval = setInterval(() => {
        enemyCar.positionY += 5;
        enemyCar.element.style.top = enemyCar.positionY + "px";

        if (enemyCar.checkCollision(this.playerCar)) {
          clearInterval(moveInterval);
          this.handleGameOver();
          return;
        }

        if (enemyCar.positionY > 500) {
          this.scoreboard.updateScore();
          enemyCar.destroy();
          clearInterval(moveInterval);
        }
      }, 30);
    }, 1000);
  }

  handleMouseMove(event) {
    const roadRect = this.road.getBoundingClientRect();
    this.playerCar.moveWithMouse(event.clientX, roadRect);
  }

  handleKeyPress(event) {
    if (event.key === "ArrowLeft") this.playerCar.moveLeft();
    if (event.key === "ArrowRight") this.playerCar.moveRight();
  }

  start() {
    document.addEventListener("keydown", (event) => this.handleKeyPress(event));
    document.addEventListener("mousemove", (event) => {
      this.handleMouseMove(event);
    });

    this.startEnemyCarGeneration();
  }
}

export default Game;
