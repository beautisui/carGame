import PlayerCar from "./playerCar.js";
import EnemyCar from "./enemyCar.js";
import Scoreboard from "./scoreboard.js";
import * as screen from "./screen.js";

class GameController {
  constructor(gameElemet, screen) {
    this.screen = screen;
    this.road = gameElemet.road;
    this.playerCarElement = gameElemet.playerCarElement;
    this.scoreElement = gameElemet.scoreElement;
    this.highScoreElement = gameElemet.highScoreElement;
    this.roadWidth = gameElemet.roadWidth;
    this.playerCar = new PlayerCar(this.playerCarElement, this.roadWidth);
    this.scoreboard = new Scoreboard(this.scoreElement, this.highScoreElement);
    this.enemyCars = [];
    this.gameOver = false;
  }

  static getDomElement(selector) {
    return document.querySelector(selector);
  }

  static setupGameElements() {
    return {
      road: this.getDomElement(".road"),
      playerCarElement: this.getDomElement(".player-car"),
      scoreElement: this.getDomElement("#current-score"),
      highScoreElement: this.getDomElement("#highest-score"),
      roadWidth: 300,
    };
  }

  handleGameOver() {
    this.gameOver = true;
    screen.displayOverMsg();
    screen.removeLane();
    screen.removeListeners();
    screen.restartGame();
  }

  updatePosition(enemyCar) {
    enemyCar.positionY += 5;
    enemyCar.element.style.top = enemyCar.positionY + "px";
  }

  checkCollisions(enemyCar, moveInterval) {
    if (enemyCar.checkCollision(this.playerCar)) {
      clearInterval(moveInterval);
      this.handleGameOver();
    }
  }

  handleEnemyCarExit(enemyCar, moveInterval) {
    this.scoreboard.updateScore();
    enemyCar.destroy();
    clearInterval(moveInterval);
  }

  moveEnemyCar(enemyCar) {
    const moveInterval = setInterval(() => {
      if (this.gameOver) {
        clearInterval(moveInterval);
        return;
      }

      this.updatePosition(enemyCar);
      this.checkCollisions(enemyCar, moveInterval);

      if (enemyCar.positionY > 500) {
        this.handleEnemyCarExit(enemyCar, moveInterval);
      }
    }, 30);
  }

  createEnemyCar() {
    setInterval(() => {
      const enemyCar = new EnemyCar(this.road, this.roadWidth);
      this.enemyCars.push(enemyCar);
      this.moveEnemyCar(enemyCar);
    }, 1000);
  }

  handleMouseMove(event) {
    if (this.gameOver) return;
    const roadRect = this.road.getBoundingClientRect();
    this.playerCar.moveWithMouse(event.clientX, roadRect);
  }

  start() {
    screen.hideGameOverMessage();
    screen.handleKeydown(
      () => this.playerCar.moveLeft(),
      () => this.playerCar.moveRight()
    );

    screen.handleMouseMove((event) => this.handleMouseMove(event));
    this.createEnemyCar();
  }
}

export default GameController;
