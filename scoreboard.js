class Scoreboard {
  constructor(scoreElement, highScoreElement) {
    this.scoreElement = scoreElement;
    this.highScoreElement = highScoreElement;
    this.score = 0;
    this.highScore = localStorage.getItem("highScore") || 0;
    this.updateScoreDisplay();
  }

  updateScore() {
    this.score++;
    this.updateScoreDisplay();

    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem("highScore", this.highScore);
    }
  }

  updateScoreDisplay() {
    this.scoreElement.innerText = this.score;
    this.highScoreElement.innerText = this.highScore;
  }
}

export default Scoreboard;
