const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');

const boxSize = 10;
let key = 0;
let snake = [];
let direction;
let gameRunning = false;
let food;
if (!gameRunning) {
    startGame();
}


document.addEventListener('keydown', (event) => { key = event.key; })

function handleKey() {      // Check if the snake has more than one segment
    if (snake.length > 1) {
        switch (key) {
            case 'ArrowUp':
                if (direction !== 'down') {
                    direction = 'up';
                }
                break;
            case 'ArrowDown':
                if (direction !== 'up') {
                    direction = 'down';
                }
                break;
            case 'ArrowLeft':
                if (direction !== 'right') {
                    direction = 'left';
                }
                break;
            case 'ArrowRight':
                if (direction !== 'left') {
                    direction = 'right';
                }
                break;
        }
    }
    else {
        // Allow any direction if the snake has only one segment
        switch (key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
    }
    key = 0;
}


function startGame() {
  snake = [{ x: Math.floor(canvas.width / (2 * boxSize)), y: Math.floor(canvas.height / (2 * boxSize)) }];
  direction = '';
  generateFood();
  gameRunning = true;
  tick();
}

function tick() {
  if (!gameRunning) {
    return;
  }

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move the snake
  const head = { ...snake[0] };

  handleKey();

  // Move in the direction of the first input
  if (direction) {
    switch (direction) {
      case 'up':
        head.y -= 1;
        break;
      case 'down':
        head.y += 1;
        break;
      case 'left':
        head.x -= 1;
        break;
      case 'right':
        head.x += 1;
        break;
    }
  }

  // Check for collision with walls
  if (
    head.x < 0 || head.x >= Math.floor(canvas.width / boxSize) ||
    head.y < 0 || head.y >= Math.floor(canvas.height / boxSize)
  ) {
    alert('Game over!');
    resetGame();
    return;
  }

  // Check for collision with itself
  if (isCollision(head, snake.slice(1))) {
    alert('Game over!');
    resetGame();
    return;
  }

  snake.unshift(head);

  // Check for collision with food
  if (isCollision(head, [food])) {
    generateFood();
  } else {
    snake.pop();
  }

  // Draw food
  ctx.fillStyle = '#FF0000';
  ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);

  // Draw snake
  ctx.fillStyle = '#4CAF50';
  snake.forEach(segment => {
    ctx.fillRect(segment.x * boxSize, segment.y * boxSize, boxSize, boxSize);
  });  

  setTimeout(tick, 200); // Adjust the delay (in milliseconds) to control the speed
}

function isCollision(point, array) {
  return array.some(p => p.x === point.x && p.y === point.y);
}

function generateFood() {
  food = {
    x: Math.floor(Math.random() * (canvas.width / boxSize)),
    y: Math.floor(Math.random() * (canvas.height / boxSize)),
  };

  // Make sure food doesn't spawn on the snake
  while (isCollision(food, snake)) {
    food.x = Math.floor(Math.random() * (canvas.width / boxSize));
    food.y = Math.floor(Math.random() * (canvas.height / boxSize));
  }
}

function resetGame() {
  snake = [];
  gameRunning = false;
  // Clear canvas
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
 startGame();
}