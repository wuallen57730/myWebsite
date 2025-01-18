const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
// getContext() method會回傳一個canvas的drawing context，
// drawing context可以用來在canvas內畫圖
const unit = 20;
const row = canvas.height / unit; // 320 / 20 = 16
const column = canvas.width / unit; // 320 / 20 = 16
let snake = [];
let speed = 10;
//array中的每個元素都是一個物件
// 每個物件用來儲存身體的x, y座標;
function createSnake() {
  // 物件的工作是，儲存身體的x, y座標
  snake[0] = {
    x: 80,
    y: 0,
  };
  snake[1] = {
    x: 60,
    y: 0,
  };
  snake[2] = {
    x: 40,
    y: 0,
  };
  snake[3] = {
    x: 20,
    y: 0,
  };
}

class Fruit {
  constructor() {
    this.x = Math.floor(Math.random() * column) * unit;
    this.y = Math.floor(Math.random() * row) * unit;
  }
  drawFruit() {
    context.fillStyle = "yellow";
    context.fillRect(this.x, this.y, unit, unit);
  }
  newLocation() {
    //不能跟蛇的身體重疊
    let overlapping = false;
    let new_x;
    let new_y;
    function checkoverlap(new_x, new_y) {
      for (let i = 0; i < snake.length; i++) {
        if (new_x == snake[i].x && new_y == snake[i].y) {
          overlapping = true;
          return;
        } else {
          overlapping = false;
        }
      }
    }
    do {
      new_x = Math.floor(Math.random() * column) * unit;
      new_y = Math.floor(Math.random() * row) * unit;
      checkoverlap(new_x, new_y);
    } while (overlapping);
    this.x = new_x;
    this.y = new_y;
  }
}
class UltraFruit {
  constructor() {
    this.x = Math.floor(Math.random() * column) * unit;
    this.y = Math.floor(Math.random() * row) * unit;
  }
  drawFruit() {
    context.fillStyle = "rebeccapurple";
    context.fillRect(this.x, this.y, unit, unit);
  }
  newLocation() {
    //不能跟蛇的身體重疊
    let overlapping = false;
    let new_x;
    let new_y;
    function checkoverlap(new_x, new_y) {
      for (let i = 0; i < snake.length; i++) {
        if (new_x == snake[i].x && new_y == snake[i].y) {
          overlapping = true;
          return;
        } else {
          overlapping = false;
        }
      }
    }
    do {
      new_x = Math.floor(Math.random() * column) * unit;
      new_y = Math.floor(Math.random() * row) * unit;
      checkoverlap(new_x, new_y);
    } while (overlapping);
    this.x = new_x;
    this.y = new_y;
  }
}
class obstacle {
  constructor() {
    this.x = Math.floor(Math.random() * column) * unit;
    this.y = Math.floor(Math.random() * row) * unit;
  }
  drawObstacle() {
    context.fillStyle = "red";
    context.fillRect(this.x, this.y, unit, unit);
  }
  newLocation() {
    //不能跟蛇的身體重疊
    let overlapping = false;
    let new_x;
    let new_y;
    function checkoverlap(new_x, new_y) {
      for (let i = 0; i < snake.length; i++) {
        if (new_x == snake[i].x && new_y == snake[i].y) {
          overlapping = true;
          return;
        } else {
          overlapping = false;
        }
      }
    }
    do {
      new_x = Math.floor(Math.random() * column) * unit;
      new_y = Math.floor(Math.random() * row) * unit;
      checkoverlap(new_x, new_y);
    } while (overlapping);
    this.x = new_x;
    this.y = new_y;
  }
}
class ExtraObstacle {
  constructor() {
    this.x = Math.floor(Math.random() * column) * unit;
    this.y = Math.floor(Math.random() * row) * unit;
  }
  drawObstacle() {
    context.fillStyle = "red";
    context.fillRect(this.x, this.y, unit, unit);
  }
  newLocation() {
    //不能跟蛇的身體重疊
    let overlapping = false;
    let new_x;
    let new_y;
    function checkoverlap(new_x, new_y) {
      for (let i = 0; i < snake.length; i++) {
        if (new_x == snake[i].x && new_y == snake[i].y) {
          overlapping = true;
          return;
        } else {
          overlapping = false;
        }
      }
    }
    do {
      new_x = Math.floor(Math.random() * column) * unit;
      new_y = Math.floor(Math.random() * row) * unit;
      checkoverlap(new_x, new_y);
    } while (overlapping);
    this.x = new_x;
    this.y = new_y;
  }
}

//初始設定
createSnake();
let myFruit = new Fruit();
let myUltraFruit = new UltraFruit();
let newObstacle = new obstacle();
let newExtraObstacle = new ExtraObstacle();
//keydown就是偵測有沒有按鍵被按
window.addEventListener("keydown", changeDirection);
let d = "Right";
function changeDirection(e) {
  if (e.key == "ArrowLeft" && d != "Right") {
    console.log("Left");
    d = "Left";
  } else if (e.key == "ArrowDown" && d != "Up") {
    console.log("Down");
    d = "Down";
  } else if (e.key == "ArrowRight" && d != "Left") {
    console.log("Right");
    d = "Right";
  } else if (e.key == "ArrowUp" && d != "Down") {
    console.log("Up");
    d = "Up";
  }
  //每次按上下左右鍵後在下一幀被畫出來之前不接受任何any keydown事件
  //防止連續按鍵
  window.addEventListener("keydown", changeDirection);
}
let highestScore;
loadHighestScore();
let score = 0;
document.getElementById("myScore").innerHTML = "Game Point:" + score;
document.getElementById("myScore2").innerHTML =
  "Highest Game Point:" + highestScore;

function draw() {
  // 背景全設定為黑色
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  //畫果實和障礙物
  myFruit.drawFruit();
  newObstacle.drawObstacle();
  if (score >= 10) {
    myUltraFruit.drawFruit();
  }
  if (score >= 10) {
    newExtraObstacle.drawObstacle();
  }
  //如果分數大於15則加速
  if (score >= 15 && score < 20) {
    speed = 20;
    // console.log(speed);
  } else if (score >= 20) {
    speed = 40;
  }
  //畫蛇
  for (let i = 0; i < snake.length; i++) {
    if (i == 0) {
      context.fillStyle = "darkblue";
    } else {
      context.fillStyle = "lightblue";
    }
    context.strokeStyle = "white";
    //超出邊界時的動作
    if (snake[i].x >= canvas.width) {
      snake[i].x = 0;
    }
    if (snake[i].x < 0) {
      snake[i].x = canvas.width - unit;
    }
    if (snake[i].y >= canvas.height) {
      snake[i].y = 0;
    }
    if (snake[i].y < 0) {
      snake[i].y = canvas.height - unit;
    }

    //x,y,width,height
    context.fillRect(snake[i].x, snake[i].y, unit, unit);
    context.strokeRect(snake[i].x, snake[i].y, unit, unit);
  }
  //以目前的D方向來決定蛇的下一幀
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  if (d == "Left") {
    snakeX -= unit;
  } else if (d == "Up") {
    snakeY -= unit;
  } else if (d == "Down") {
    snakeY += unit;
  } else if (d == "Right") {
    snakeX += unit;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };
  //確認蛇是否有吃到果實
  //如果蛇有吃到果實 =>unshift()
  //如果蛇沒吃到果實 =>後面pop()，前面unshift()
  if (snake[0].x == myFruit.x && snake[0].y == myFruit.y) {
    myFruit.newLocation();
    newObstacle.newLocation();
    score++;
    setHighestScore(score);
    document.getElementById("myScore").innerHTML = "Game Point:" + score;
    document.getElementById("myScore2").innerHTML =
      "Highest Game Point:" + highestScore;
  } else {
    snake.pop();
  }
  if (
    score >= 10 &&
    snake[0].x == myUltraFruit.x &&
    snake[0].y == myUltraFruit.y
  ) {
    myUltraFruit.newLocation();
    newExtraObstacle.newLocation();
    newObstacle.newLocation();
    score += 2;
    setHighestScore(score);
    document.getElementById("myScore").innerHTML = "Game Point:" + score;
    document.getElementById("myScore2").innerHTML =
      "Highest Game Point:" + highestScore;
  }
  //如果撞到障礙物則遊戲結束
  if (
    (snake[0].x == newObstacle.x && snake[0].y == newObstacle.y) ||
    (score >= 10 &&
      snake[0].x == newExtraObstacle.x &&
      snake[0].y == newExtraObstacle.y)
  ) {
    clearInterval(myGame);
    alert("Game Over!  If you want to play Again, press Start!! or space");
    //遊戲結束後按空白鍵可以重載介面
    window.addEventListener("keydown", playAgain);
    return;
  }

  snake.unshift(newHead);
  //確認蛇有沒有咬到自己
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      //停止遊戲
      clearInterval(myGame);
      alert("Game Over!");
      return;
    }
  }
  window.addEventListener("keydown", changeDirection);
}
function playAgain(e) {
  if (e.keyCode == 32) {
    location.reload();
  }
}
function loadHighestScore() {
  if (localStorage.getItem("highestScore") == null) {
    highestScore = 0;
  } else {
    //localStorage.getItem("highestScore")是String
    highestScore = Number(localStorage.getItem("highestScore"));
  }
}

function setHighestScore(score) {
  if (score > highestScore) {
    localStorage.setItem("highestScore", score);
    highestScore = score;
  }
}
let myGame = setInterval(draw, 1000 / speed);
