const canvas = document.getElementById("myCanvas");
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;
const ctx = canvas.getContext("2d");
let circle_x = 160;
let circle_y = 60;
let radius = 20;
let x_speed = 20;
let y_speed = 20;
let ground_x = 100;
let ground_y = 500;
const groundHeight = 5;
const groundWidth = 200;
let brickArray = [];
let count = 0;

//min,max
function getRandomArbitrary(min, max) {
  //假設要得到min~max內的隨機一個數字
  //則用min + Math.floor(Math.random() * (max - min))
  return min + Math.floor(Math.random() * (max - min));
}

class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    brickArray.push(this);
    this.visible = true;
  }

  drawBrick() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  touchingBall(ballX, ballY) {
    return (
      ballX >= this.x - radius &&
      ballX <= this.x + this.width + radius &&
      ballY <= this.y + this.height + radius &&
      ballY >= this.y - radius
    );
    // return true or false
  }
}
// 製作所有的Brick
for (let i = 0; i < 10; i++) {
  new Brick(getRandomArbitrary(0, 950), getRandomArbitrary(0, 550));
}
//跟著滑鼠移動
canvas.addEventListener("mousemove", (e) => {
  ground_x = e.clientX;
});

function drawCircle() {
  //畫黑背景
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  //如果撞到邊界則改變方向
  if (circle_x >= canvasWidth - radius || circle_x <= radius) {
    x_speed = -x_speed;
  }
  if (circle_y >= canvasHeight - radius || circle_y <= radius) {
    y_speed = -y_speed;
  }
  //劃出圓球
  //圓心X座標,圓心Y座標,半徑,起始角度，結束角度
  ctx.beginPath();
  ctx.arc(circle_x, circle_y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "yellow";
  ctx.fill();
  //更動圓的座標
  circle_x += x_speed;
  circle_y += y_speed;

  //畫板子
  ctx.fillStyle = "lightblue";
  ctx.fillRect(ground_x, ground_y, groundWidth, groundHeight);
  //如果撞到板子則改變方向
  if (
    circle_x >= ground_x - radius &&
    circle_x <= ground_x + 200 + radius &&
    circle_y >= ground_y - radius &&
    circle_y <= ground_y + groundHeight + radius
  ) {
    if (y_speed > 0) {
      circle_y -= 40;
    } else {
      circle_y += 40;
    }
    y_speed = -y_speed;
  }
  //畫出磚塊
  brickArray.forEach((brick) => {
    if (brick.visible) {
      brick.drawBrick();
    }
  });
  //如果撞到磚塊則改變方向
  brickArray.forEach((brick) => {
    if (brick.visible && brick.touchingBall(circle_x, circle_y)) {
      count++;
      console.log(count);
      brick.visible = false;
      //改變x,y方向
      //從下撞擊/從上撞擊/從右撞擊/從左撞擊
      if (circle_y >= brick.y + brick.height || circle_y <= brick.y) {
        y_speed *= -1;
      } else if (circle_x >= brick.x + brick.width || circle_x <= brick.x) {
        x_speed *= -1;
      }
      //然後從BrickArray中移除
      // brickArray.splice(index, 1);
      if (count == 10) {
        alert("YOU WIN!");
        clearInterval(game);
      }
    }
  });
}

let game = setInterval(drawCircle, 25);
