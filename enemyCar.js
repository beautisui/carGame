class EnemyCar {
  constructor(road, roadWidth) {
    this.element = document.createElement("div");
    this.element.classList.add("enemy-car");
    this.carEmojis = ["🚘", "🚔", "🚖", "🚍"];
    this.element.innerHTML =
      this.carEmojis[Math.floor(Math.random() * this.carEmojis.length)];

    this.roadWidth = roadWidth;
    this.positionX = Math.floor(Math.random() * (roadWidth - 50));
    this.positionY = -100;
    this.moveInterval = null;

    this.element.style.left = this.positionX + "px";
    road.appendChild(this.element);
  }

  checkCollision(playerCar) {
    const playerRect = playerCar.element.getBoundingClientRect();
    const enemyRect = this.element.getBoundingClientRect();

    return (
      playerRect.left < enemyRect.right &&
      playerRect.right > enemyRect.left &&
      playerRect.top < enemyRect.bottom &&
      playerRect.bottom > enemyRect.top
    );
  }

  destroy() {
    clearInterval(this.moveInterval);
    this.element.remove();
  }
}

export default EnemyCar;
