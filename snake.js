export function Snake(ctx) {
    this.x = 0;
    this.y = 0;
    this.width = 15;
    this.height = 15;
    this.long = 0;
    this.lat = 1;
    this.snakeArr = []

    // Showing generated snake in canvas
    this.show = () => {
        ctx.fillStyle = 'rgb(156 248 198)'
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + this.width / 2, (this.width + 2) / 2, 0, 2 * Math.PI);
        ctx.fill();
        for (let i = 0; i < this.snakeArr.length; i++) {
            ctx.fillStyle = 'rgb(156 248 198)'
            ctx.beginPath();
            ctx.arc(this.snakeArr[i].x + this.width / 2, this.snakeArr[i].y + this.width / 2, (this.width - 3) / 2, 0, 2 * Math.PI);
            ctx.fill();
            // ctx.fillRect(this.snakeArr[i].x + 2, this.snakeArr[i].y + 2, this.width - 4, this.height - 4)
        }
    }

    // updating snake postion
    this.update = (canvasWidth, canvasHeight) => {
        let x = this.x + this.width * this.lat;
        let y = this.y + this.height * this.long;

        // Dont allow opposite direction of snake movement
        // make snake move from other direction after it reaches canvas end.
        if (this.x > canvasWidth - this.width) {
            x = 0
        }
        if (this.x < 0) {
            x = canvasWidth - this.width;
        }
        if (this.y > canvasHeight - this.height) {
            y = 0
        }
        if (this.y < 0) {
            y = canvasHeight - this.height
        }

        // creating new snake after eating. it works after 2nd food
        for (let i = 0; i < this.snakeArr.length - 1; i++) {
            this.snakeArr[i] = this.snakeArr[i + 1];
        }

        // setting previous snake postion(x and y coordinates) to last snake element
        this.snakeArr[this.snakeArr.length - 1] = { x: this.x, y: this.y }
        this.x = x;
        this.y = y;
    }

    // increase snake size after eat
    this.grow = () => {
        this.snakeArr.push({ x: this.x, y: this.y })
    }

    // check if snake is dead
    this.dead = () => {
        for (let i = 0; i < this.snakeArr.length; i++) {
            if (this.x == this.snakeArr[i].x && this.y == this.snakeArr[i].y) {
                this.snakeArr = [];
                return true;
            }
        }
        return false;
    }
}