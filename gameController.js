import PlayerCar from "./playerCar.js";
import EnemyCar from "./enemyCar.js";
import Scoreboard from "./scoreboard.js";
import * as screen from "./screen.js";

class GameController {
  constructor(element, screen) {
    this.screen = screen;
    this.road = element.road;
    this.playerCarElement = element.playerCarElement;
    this.scoreElement = element.scoreElement;
    this.highScoreElement = element.highScoreElement;
    this.roadWidth = element.roadWidth;
    this.playerCar = element.playerCar;
    this.scoreboard = element.scoreboard;

    this.enemyCars = [];
    this.gameOver = false;
  }

  static getDomElement(selector) {
    return document.querySelector(selector);
  }

  static create() {
    const road = this.getDomElement(".road");
    const playerCarElement = this.getDomElement(".player-car");
    const scoreElement = this.getDomElement("#current-score");
    const highScoreElement = this.getDomElement("#highest-score");
    const roadWidth = 300;
    const playerCar = new PlayerCar(playerCarElement, roadWidth);
    const scoreboard = new Scoreboard(scoreElement, highScoreElement);
    const elements = {
      road,
      playerCarElement,
      scoreElement,
      highScoreElement,
      roadWidth,
      playerCar,
      scoreboard,
    };
    return new GameController(elements, screen);
  }

  handleGameOver() {
    this.gameOver = true;
    this.screen.displayOverMsg();
    this.screen.removeLane();
    this.screen.removeListeners();
    this.screen.restartGame();
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
    this.screen.hideGameOverMessage();
    this.screen.handleKeydown(
      () => this.playerCar.moveLeft(),
      () => this.playerCar.moveRight()
    );

    this.screen.handleMouseMove((event) => this.handleMouseMove(event));
    this.createEnemyCar();
  }
}

export default GameController;
