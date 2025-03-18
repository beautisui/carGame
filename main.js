import GameController from "./gameController.js";

globalThis.onload = () => {
  const gameController = GameController.create();
  gameController.start();
};

// globalThis.onload = () => {
//   const ui = new UI();
//   const car = new car();
//   const gameController = new GameController();
//   gameController.start();
// };
