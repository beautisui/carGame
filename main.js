import GameController from "./game.js";

globalThis.onload = () => {
  const gameElements = GameController.setupGameElements();
  const gameController = new GameController(gameElements);
  gameController.start();
};
