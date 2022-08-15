import { Snake } from "./snake.js";
import { Food } from "./Food.js"

// Access the canvas
const ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
const canvas = document.getElementsByTagName('canvas')[0];

// set canvas height and width
const canvasWidth = 450;
const canvasHeight = 450;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

let foodCount = 0;
document.getElementById('counter').innerHTML = foodCount

var modal = document.getElementById("modal");
var btn = document.getElementById("btn");

// create new snake and food
const snake = new Snake(ctx);
let food = new Food(canvasWidth, canvasHeight, snake);

let dead = new Audio();
let eat = new Audio();

// New audio for setting eat and dead
dead.src = "audio/Mario Game Over.mp3";
eat.src = "audio/Mariocoin.mp3";

// Move snake with arrow keys
document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowDown' && snake.long != -1) {
        snake.long = 1;
        snake.lat = 0;
    } else if (event.code === 'ArrowUp' && snake.long != 1) {
        snake.long = -1;
        snake.lat = 0;
    } else if (event.code === 'ArrowRight' && snake.lat != -1) {
        snake.lat = 1;
        snake.long = 0;
    } else if (event.code === 'ArrowLeft' && snake.lat != 1) {
        snake.lat = -1;
        snake.long = 0;
    }
});

// creating new snake and food in canvas
let createSnake = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    snake.show();
    food.createFood(ctx)
}

// updating snake's new position
let updateSnake = () => {
    snake.update(canvasWidth, canvasHeight);

    // check if snake is dead
    if (snake.dead()) {
        document.getElementById('counter').innerHTML = foodCount
        clearInterval(interval)
        dead.play()
        modal.style.visibility = "visible";
        document.getElementById('final-score').innerHTML = foodCount
    }

    // check if snake eat the food
    if (food.eat()) {
        foodCount++;
        eat.play();
        ctx.clearRect(food.foodX, food.foodY, snake.width, snake.height)
        food = new Food(canvasWidth, canvasHeight, snake);
        snake.grow();
        document.getElementById('counter').innerHTML = foodCount
    }
}

let interval = setInterval(() => {
    updateSnake();
    createSnake();
}, 200)

btn.onclick = () => {
    console.log("clicked")
    window.location.reload();
}
createSnake();