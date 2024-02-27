const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;

let snake = [];
snake[0] = { x: 10 * box, y: 10 * box };

let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box
};

let d;

document.addEventListener('keydown', direction);

function direction(event) {
  if (event.keyCode === 37 && d !== 'RIGHT') {
    d = 'LEFT';
  } else if (event.keyCode === 38 && d !== 'DOWN') {
    d = 'UP';
  } else if (event.keyCode === 39 && d !== 'LEFT') {
    d = 'RIGHT';
  } else if (event.keyCode === 40 && d !== 'UP') {
    d = 'DOWN';
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? '#ff6347' : '#32cd32';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = '#fff';
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = '#ffd700';
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (d === 'LEFT') snakeX -= box;
  if (d === 'UP') snakeY -= box;
  if (d === 'RIGHT') snakeX += box;
  if (d === 'DOWN') snakeY += box;

  if (snakeX === food.x && snakeY === food.y) {
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box
    };
  } else {
    snake.pop();
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  if (
    snakeX < 0 ||
    snakeX >= canvas.width ||
    snakeY < 0 ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    ctx.fillStyle = '#fff';
    ctx.font = '40px Arial';
    ctx.fillText('Game Over!', canvas.width / 4, canvas.height / 2);
  }

  snake.unshift(newHead);
}

let game = setInterval(draw, 100);

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}
