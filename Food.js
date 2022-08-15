export function Food(canvasWidth, canvasHeight, snake) {
    // Randomly x and y co-ordinates for new food.
    this.foodX = Math.floor(Math.random() * (canvasWidth / snake.width)) * snake.width;
    this.foodY = Math.floor(Math.random() * (canvasHeight / snake.height)) * snake.height;
    // create new Food
    this.createFood = (ctx) => {
        ctx.fillStyle = 'Red';
        // ctx.fillRect(this.foodX, this.foodY, snake.width, snake.height);
        ctx.beginPath();
        ctx.arc(this.foodX + snake.width / 2, this.foodY + snake.width / 2, (snake.width + 2) / 2, 0, 2 * Math.PI);
        ctx.fill();
    }
    // To check if food was eaten by snake
    this.eat = () => {
        if (this.foodX == snake.x && this.foodY == snake.y) {
            return true
        }
        return false;
    }
}