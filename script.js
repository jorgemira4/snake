const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const grid = 20;
let snake = [{ x: 200, y: 200 }];
let food = { x: 100, y: 100 };
let dx = grid;
let dy = 0;
let score = 0;

function gameLoop() {
  setTimeout(() => {
    requestAnimationFrame(gameLoop);
    update();
    draw();
  }, 100);
}

function update() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Wall collision
  if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height) {
    alert("Game Over! Score: " + score);
    document.location.reload();
  }

  snake.unshift(head);

  // Food collision
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 20) * grid,
      y: Math.floor(Math.random() * 20) * grid
    };
  } else {
    snake.pop();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  ctx.fillStyle = "lime";
  snake.forEach(part => ctx.fillRect(part.x, part.y, grid, grid));

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, grid, grid);
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -grid; }
  if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = grid; }
  if (e.key === "ArrowLeft" && dx === 0) { dx = -grid; dy = 0; }
  if (e.key === "ArrowRight" && dx === 0) { dx = grid; dy = 0; }
});

gameLoop();
