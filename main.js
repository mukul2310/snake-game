var game_over;
function init() 
{
    canvas = document.getElementById("mycanvas");
    W = canvas.width = 700;
    H = canvas.height = 650;
    cell_size = 50;
    score = 0;
    pen = canvas.getContext('2d');
    game_over = false;
    food_img = new Image();
    food_img.src = "images/apple.png";
    snake_img = new Image();
    snake_img.src = "images/snake.png";
    trophy = new Image();
    trophy.src = "images/trophy.png";
    food = getRandomFood();
    snake = {
        init_len: 5,
        cells: [],
        direction: "right",

        createSnake: function () 
        {
            for (var i = this.init_len-1; i >= 0; i--) {
                this.cells.push({
                    x: i,
                    y: 0
                });
            }
        },
        drawSnake: function () 
        {
            for (var i = 0; i < this.cells.length; i++) 
            {
                pen.drawImage(snake_img, this.cells[i].x * cell_size, this.cells[i].y * cell_size, cell_size, cell_size);
            }
        },
        updateSnake: function () 
        {
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            if (headX == food.x && headY == food.y) {
                food = getRandomFood();
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
            if (this.cells[0].x > Math.round(W / cell_size)-1 || this.cells[0].y > Math.round(H / cell_size)-1|| this.cells[0].x < 0 || this.cells[0].y < 0)
                game_over = true;
            for(i=1;i<this.cells.length;i++)
            {
                if(this.cells[0].x==this.cells[i].x && this.cells[0].y==this.cells[i].y)
                {
                    game_over = true;
                }
            }
            

        }
    };

    snake.createSnake();

    function keyPressed(e) 
    {
        if (e.key == "ArrowRight" &&snake.direction!="left")
            snake.direction = "right";
        if (e.key == "ArrowLeft" &&snake.direction!="right")
            snake.direction = "left";
        if (e.key == "ArrowUp" &&snake.direction!="down")
            snake.direction = "up";
        if (e.key == "ArrowDown" &&snake.direction!="up")
            snake.direction = "down";
    }
    document.addEventListener('keydown', keyPressed);

}

function draw() 
{
    pen.clearRect(0, 0, W, H);
    snake.drawSnake();
    pen.fillStyle = food.color;
    pen.drawImage(food_img, food.x * cell_size, food.y * cell_size, cell_size, cell_size);
    pen.drawImage(trophy, 20, 20, cell_size, cell_size);
    pen.font = "20px Roboto";
    pen.fillText(score, 40, 45);
}

function update() 
{
    snake.updateSnake();
}

function getRandomFood() 
{
    var foodX = Math.round(Math.random() * (W - cell_size) / cell_size);
    var foodY = Math.round(Math.random() * (H - cell_size) / cell_size);
    var food = {
        x: foodX,
        y: foodY,
    };
    return food;
}

function gameloop() 
{
    if (game_over)
    {
        let lastHighScore=sessionStorage.getItem("high_score");
        if(lastHighScore==null || score>lastHighScore)
            sessionStorage.setItem("high_score",score);
        $("#high_score").html('High Score: '+sessionStorage.getItem("high_score"));
        clearInterval(f);
        alert("game over");
    }
    draw();
    update();

}


function start(speed) 
{
    init();
    f = setInterval(gameloop, speed);
}