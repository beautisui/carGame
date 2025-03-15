class PlayerCar {
  constructor(element, roadWidth) {
    this.element = element;
    this.roadWidth = roadWidth;
    this.carWidth = 40;
    this.positionX = 125;
  }

  moveLeft() {
    if (this.positionX > 10) {
      this.positionX -= 30;
      this.updatePosition();
    }
  }

  moveRight() {
    if (this.positionX < this.roadWidth - this.carWidth - 10) {
      this.positionX += 30;
      this.updatePosition();
    }
  }

  moveWithMouse(mouseX, roadRect) {
    let newPosition = mouseX - roadRect.left - this.carWidth / 2;
    if (newPosition >= 0 && newPosition <= this.roadWidth - this.carWidth) {
      this.positionX = newPosition;
      this.updatePosition();
    }
  }

  updatePosition() {
    this.element.style.left = this.positionX + "px";
  }
}

export default PlayerCar;
