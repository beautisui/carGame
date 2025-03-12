# TODO

**As long we can assume in this car game we have total 4 main object**
which are :-

- **game**
- **playerCar**
- **EnemyCar**
- **scoreboard**

**Properties and methods of the classes :**

### **`Game` Class**

Responsible for controlling the overall game flow.  
 **Should not** store car properties it should only **control** them.  
 Should handle **event listeners** and **game loop logic**.

**Properties:**

- `roadElement`
- `playerCar`
- `scoreboard`
- `enemyCars`
- `gameInterval`

**Methods**

- `start()`
- `createEnemyCar()`
- `setupEventListenrs()`
- `checkCollisions()`
- `updateScoreboard()`
- `restart()`

---

### `PlayerCar`

Should handle **player-car movement**.  
 Should contain **only movement-related logic** (not event listeners).

**Properties**

- `carElement`
- `positionX`
- `positionY`
- `speed`
- `width`
- `height`

**`Methods`**

- `moveLeft()`
- `moveRight()`

---

### `EnemyCar`

Should handle **enemy-car movement**.  
 Should move **down automatically** after moving given heigth.

**Properties**

- `carElement`
- `positionX`
- `positionY`
- `speed`
- `width`
- `height`

**Methods**

- `moveDown()`
- `resetPosition()`
- `checkCollision(otherCar)`

---

### **`Scoreboard` Class**

Should **only handle score logic**.  
 Should update the **DOM** when scores change.

**Properties**

- `currentScore`
- `highestScore`

**Methods**

- `increaseScore()`
- `updateHighScore()`
- `resetScore()`
