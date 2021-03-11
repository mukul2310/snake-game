function init() {
    var canvas = document.getElementById("mycanvas");
    W = canvas.width = 700;
    H = canvas.height = 650;
    cell_size = 66;
    score=5;
    pen = canvas.getContext('2d');
    game_over = false;
    food_img= new Image();
    food_img.src="images/apple.png";
    
    snake_img=new Image();
    snake_img.src="images/snake.png";
    trophy=new Image();
    trophy.src="images/trophy.png";
    food = getRandomFood();
    snake = {
        init_len: 5,
        color: "blue",
        cells: [],
        direction: "right",

        createSnake: function () {
            for (var i = this.init_len; i >= 0; i--) {
                this.cells.push({
                    x: i,
                    y: 0
                });
            }
        },
        drawSnake: function () {
            for (var i = 0; i < this.cells.length; i++) {
                pen.fillStyle = this.color;
                pen.drawImage(snake_img,this.cells[i].x * cell_size, this.cells[i].y * cell_size, cell_size, cell_size);
            }
        },
        updateSnake: function () {
            
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            if(headX==food.x&&headY==food.y)
                {
                    food=getRandomFood();
                    score++;
                }
            else
                this.cells.pop();
            var nextX;
            var nextY;
            if (snake.direction == "right") {
                nextX = headX + 1;
                nextY = headY;
            }
            if (snake.direction == "left") {
                nextX = headX - 1;
                nextY = headY;
            }
            if (snake.direction == "up") {
                nextX = headX;
                nextY = headY - 1;
            }
            if (snake.direction == "down") {
                nextX = headX;
                nextY = headY + 1;
            }
            this.cells.unshift({
                x: nextX,
                y: nextY
            });
            if (this.cells[0].x > Math.round(W/cell_size)||this.cells[0].y > Math.round(W/cell_size)||this.cells[0].x <0||this.cells[0].y <0)
                game_over = true;
            
        }
    };

    snake.createSnake();

    function keyPressed(e) {
        if (e.key == "ArrowRight")
            snake.direction = "right";
        if (e.key == "ArrowLeft")
            snake.direction = "left";
        if (e.key == "ArrowUp")
            snake.direction = "up";
        if (e.key == "ArrowDown")
            snake.direction = "down";
        //        console.log(snake.direction);
    }
    document.addEventListener('keydown', keyPressed);

}

function draw() {
    pen.clearRect(0, 0, W, H);
    snake.drawSnake();
    pen.fillStyle = food.color;
pen.drawImage(food_img,food.x*cell_size,food.y*cell_size,cell_size,cell_size);

    pen.drawImage(trophy,24,20,cell_size,cell_size);
    pen.fillStyle="blue";
    pen.font="20px Roboto";
    pen.fillText(score,50,50);
 //pen.fillRect(rect.x,rect.y,rect.w,rect.h);
    //    pen.fillStyle = "red";
}

function update() {
    snake.updateSnake();

}

function getRandomFood() {
    var foodX = Math.round(Math.random() * (W - cell_size )/ cell_size);
    var foodY = Math.round(Math.random() * (H - cell_size) / cell_size);
    var food = {
        x: foodX,
        y: foodY,
        color: "red",
    };
    return food;
}

function gameloop() {
    if (game_over)
        
{
	clearInterval(f);
alert("game over");
}    
draw();
    update();

}

init();
function start()
{
init();
f = setInterval(gameloop, 150);

}