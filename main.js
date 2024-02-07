const canvas = document.getElementById("canvas")
canvas.width = 1024;
canvas.height = 576;
canvas.style.background = "black";

const ctx = canvas.getContext("2d");

let direction = {
    moveUp: false,
    moveDown: false,
    moveLeft: false,
    moveRight: false,
}

window.addEventListener("keypress", event =>{
    switch (event.key) {
        case 'w':
            direction.moveUp = true;
            direction.moveDown= false;
            direction.moveLeft= false;
            direction.moveRight= false;
            break;
        case 'd':
            direction.moveUp = false;
            direction.moveDown= false;
            direction.moveLeft= true;
            direction.moveRight= false;
            break;
        case 's':
            direction.moveUp = false;
            direction.moveDown= true;
            direction.moveLeft= false;
            direction.moveRight= false;
            break;
        case 'a':
            direction.moveUp = false;
            direction.moveDown= false;
            direction.moveLeft= false;
            direction.moveRight= true;
            break;
    }
})

let snake = [
    {
        x: 64,
        y: 64,
        width: 32,
        height: 32,
        color: "red"
    }
]

for (let i = 0; i < 2; i++) {
    let tail = {
        x: 64,
        y: 64,
        width: 32,
        height: 32,
        color: "green"
    }
    snake.push(tail)
}

function moveSnake() {
    for (let i = snake.length-1; i>0; i--) {
        snake[i].x = snake[i-1].x
        snake[i].y = snake[i-1].y
    }
    if (direction.moveUp) snake[0].y -= 32;
    if (direction.moveDown) snake[0].y += 32;
    if (direction.moveLeft) snake[0].x += 32;
    if (direction.moveRight) snake[0].x -= 32;
    
    if (snake[0].x > canvas.width) snake[0].x = 0; 
    if (snake[0].x < 0) snake[0].x = canvas.width; 
    if (snake[0].y > canvas.height) snake[0].y = 0; 
    if (snake[0].y < 0) snake[0].y = canvas.height; 
    
}

function drawSnake() {
    snake.forEach(block =>{
        ctx.fillStyle = block.color;
        ctx.fillRect(block.x, block.y, block.width, block.height)
    })
}

let xCoor = []
for (let i = 0; i < canvas.width; i+=32) {
    xCoor.push(i);
    console.log(i)
}
let yCoor = []
for (let i = 0; i < canvas.height; i+=32) {
    yCoor.push(i);
    console.log(i)
}

let fridge = []
function spawnFood() {
    
    if (fridge.length === 0) {
        let food = {
            x: xCoor[Math.floor(Math.random()*xCoor.length)],
            y: yCoor[Math.floor(Math.random()*yCoor.length)],
            width: 32,
            height: 32,
            color: "blue"
        }
        fridge.push(food)
    }
    fridge.forEach(item=>{
        ctx.fillStyle = item.color;
        ctx.fillRect(item.x, item.y, item.width, item.height)
    })
}


function eatFood() {
    if (snake[0].x === fridge[0].x && snake[0].y === fridge[0].y) {
        fridge.shift();
        let tail = {
            x: 64,
            y: 64,
            width: 32,
            height: 32,
            color: "green"
        }
        snake.push(tail)
    }
}


const game = () => {
    setInterval(() => {
        ctx.clearRect(0,0,1024,576);
        moveSnake()
        drawSnake()
        spawnFood()
        eatFood()

    }, 250);
}
game()
