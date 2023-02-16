// Game Constants and variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("food.mp3");
const gameOverSound = new Audio("gameover.mp3");
const moveSound = new Audio("move.mp3");
// const rockSound = new Audio("rock..mp3");
const musicSound = new Audio("music.mp3");
//Game Functions
let lastPaintTime = 0;
let speed = 10;
let Score = 0;
let snakeArr = [
    { x: 13, y: 15 }
];
let food = { x: 6, y: 7 };
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}
function isCollide(snake) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}

function gameEngine() {
    //Updating the snake Array And Food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        // rockSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Press Any Key To Play Again");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        // rockSound.play();
        Score = 0;
        document.getElementsByClassName("sc")[0].innerHTML = "Score: " + Score;
    }
    // If snake is Eaten the Food And then Increment the Score and Regenerate the Food.
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        //Expading the Snake body if snake is Eaten the food
        foodSound.play();
        Score += 1;
        if (Score > hiVal) {
            hiVal = Score;
            localStorage.setItem("HiScore: ", JSON.stringify(hiVal));
            document.getElementsByClassName("hiScore")[0].innerHTML = "HiScore: " + hiVal;
        }
        document.getElementsByClassName("sc")[0].innerHTML = "Score: " + Score;

        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        //Now Randomly Regenerating the food netween the grid(0 to 18)
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }
    // Moving tahe Snake 
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    //Display the Snake and Food
    //Displaying Snake
    // board.innearHTML = "";
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //Displaying Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}



window.requestAnimationFrame(main);

// main Logic Starts From Here

// Writing Logic for the High Score
let Hscore = localStorage.getItem("HiScore: ");
if (Hscore === null) {
    hiVal = 0;
    localStorage.setItem("HiScore: ", JSON.stringify(hiVal));
}
else {
    hiVal = JSON.parse(Hscore);
    document.getElementsByClassName("hiScore")[0].innerHTML = "HiScore: " + Hscore;
}
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }   //Starts The Game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("Up Key Is Clicked")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("Down Key Is Clicked")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("Left Key Is Clicked")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("Right Key Is Clicked")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})

function music() {
        musicSound.pause();
}