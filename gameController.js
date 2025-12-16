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
    // Difficulty tuning
    this.spawnBaseInterval = 1000; // ms between spawns at score 0
    this.spawnMinInterval = 300; // minimum ms between spawns
    this.spawnAcceleration = 20; // ms reduction per score point

    this.baseEnemySpeed = 5; // pixels per tick base
    this.enemySpeedFactor = 0.15; // added speed per score point
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
    // positionY should be updated by the mover; this just applies it to DOM
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

      // move by per-enemy speed when available, otherwise fallback
      if (typeof enemyCar.speed === "number") {
        enemyCar.positionY += enemyCar.speed;
      } else {
        enemyCar.positionY += this.baseEnemySpeed;
      }

      this.updatePosition(enemyCar);
      this.checkCollisions(enemyCar, moveInterval);

      if (enemyCar.positionY > 500) {
        this.handleEnemyCarExit(enemyCar, moveInterval);
      }
    }, 30);
  }

  createEnemyCar() {
    // dynamic spawner using setTimeout so delay can change with score
    const spawn = () => {
      if (this.gameOver) return;

      const enemyCar = new EnemyCar(this.road, this.roadWidth);
      // compute speed using current score
      const score = this.scoreboard?.score || 0;
      const speed = this.baseEnemySpeed + score * this.enemySpeedFactor;
      
      enemyCar.speed = speed + (Math.random() * 0.6 - 0.3); // small variance

      this.enemyCars.push(enemyCar);
      this.moveEnemyCar(enemyCar);

      const nextDelay = Math.max(
        this.spawnMinInterval,
        this.spawnBaseInterval - score * this.spawnAcceleration
      );

      setTimeout(spawn, nextDelay);
    };

    spawn();
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
