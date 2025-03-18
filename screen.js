export const hideGameOverMessage = () => {
  document.getElementById("game-over-message").classList.add("hidden");
};

export const handleKeydown = (onLeft, onRight) => {
  console.log("Registering keydown");
  document.onkeydown = (event) => {
    if (event.key === "ArrowLeft") onLeft();
    if (event.key === "ArrowRight") onRight();
  };
};

export const handleMouseMove = (handler) =>
  document.addEventListener("mousemove", handler);

export const removeListeners = () => (document.onkeydown = () => {});

export const removeLane = () => {
  const lanes = document.querySelectorAll(".lane");
  lanes.forEach((lane) => {
    lane.classList.remove("lane");
  });
};

export const displayOverMsg = () =>
  (document.getElementById("game-over-message").style.display = "block");

export const restartGame = () =>
  document
    .getElementById("restart-btn")
    .addEventListener("click", () => location.reload());
