class DushmanGaadi {
  #id;
  #dimensions;
  #position;
  constructor(id, dimensions, position) {
    this.#id = id;
    this.#dimensions = dimensions;
  }
}

class EnemyCar {
  constructor(road, roadWidth) {
    this.element = document.createElement("div");
    this.element.classList.add("enemy-car");
    this.carEmojis = ["🚘", "🚔", "🚖", "🚍"];
    this.element.innerHTML =
      this.carEmojis[Math.floor(Math.random() * this.carEmojis.length)];

    this.roadWidth = roadWidth;
    this.carWidth = 40;
    this.carHeight = 40;
    this.positionX = Math.floor(Math.random() * (roadWidth - this.carWidth));
    this.positionY = -100;

    this.element.style.width = this.carWidth + "px";
    this.element.style.height = this.carHeight + "px";
    this.element.style.left = this.positionX + "px";

    road.appendChild(this.element);
  }

  checkCollision(playerCar) {
    return (
      this.positionX < playerCar.positionX + playerCar.carWidth &&
      this.positionX + this.carWidth > playerCar.positionX &&
      this.positionY < playerCar.positionY + playerCar.carHeight &&
      this.positionY + this.carHeight > playerCar.positionY
    );
  }

  destroy() {
    this.element.remove();
  }
}

export default EnemyCar;
