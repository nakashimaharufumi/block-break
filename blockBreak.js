function setup() {
    createCanvas(700, 800);
}

let cs = 0;
let tmr = 0;
let stage = 0;
let score = 0;

let ballX = 350;
let ballY = 650;
let ballVx = 3 + parseInt(Math.random(6));
let ballVy = (5 + parseInt(Math.random(7))) * -1;
let barX = 300;
let barY = 660;

//let block_num = 5;
let block = [];
let block_x = [];
let block_y = [];

//60フレーム/s
function draw() {
    tmr++;
    setField();
    noStroke();
    fill(0);
    
    switch (cs) {
        case 0:
            textAlign(CENTER);
            textSize(50);
            text("ブロック崩しゲーム", 350, 300);
            textAlign(CENTER);
            textSize(25);
            text("click to start", 350, 400);
            stage = 1;
            initField();
            if (mouseIsPressed) {
                mouseIsPressed = false;
                for (let i=0; i<stage*5; i++) block.push(1);
                cs = 1;
            }
            break;
        case 1:
            let check = 0;
            setBlock(); //ブロック用意
            moveBar(); //バー移動
            moveBall(); //ボール移動

            //残りブロック確認
            for (let cnt=0; cnt<stage*5; cnt++) check += block[cnt];
            if (check==0) {
                stage++;
                initField();
                block = [];
                for (let i=0; i<stage*5; i++) block.push(1);
            }

            if (stage==6) cs = 2;
            textAlign(CENTER);
            textSize(40);
            text("STAGE: "+stage, 350, 40);
            break;
        case 2:
            textAlign(CENTER);
            textSize(50);
            text("GAME CLEAR", 350, 300);
            if (mouseIsPressed) {
                mouseIsPressed = false;
                cs = 0;
            }
            break;
        case 3:
            textAlign(CENTER);
            textSize(50);
            text("GAME OVER", 350, 300);
            if (mouseIsPressed) {
                mouseIsPressed = false;
                cs = 0;
            }
            break;
    }
}

function setField() {
    clear();
    background(0, 30);
    stroke(255);
    strokeWeight(4);
    line(50, 50, 650, 50);
    line(50, 50, 50, 750);
    line(650, 50, 650, 750);
    line(50, 750, 650, 750);
}

function initField() {
    ballX = 350;
    ballY = 650;
    ballVx = 3 + parseInt(Math.random(6));
    ballVy = (5 + parseInt(Math.random(7))) * -1;
    barX = 300;
    barY = 660;
    rect(barX, barY, 100, 10);
    circle(ballX, ballY, 20);
}

function setBlock() {
    block_x = [];
    block_y = [];
    for (let cnt=0; cnt<stage*5; cnt++) {
        block_x.push(100*(1+(cnt%5)));
        block_y.push(100+parseInt(cnt/5)*40);
        //textSize(10);
        //text(block[cnt], block_x[cnt], block_y[cnt]);
        if (block[cnt]>0) rect(block_x[cnt], block_y[cnt], 90, 20);
    }
}

function moveBar() {
    barX = mouseX;
    if (barX<52) barX = 52;
    if (barX>548) barX = 548;
    rect(barX, barY, 100, 10);
}

function moveBall() {
    ballX += ballVx;
    ballY += ballVy;
    if (ballX<60 || ballX>640) ballVx *= -1;
    if (ballY<60) ballVy *= -1;
    if (ballY==740) cs = 3; //ゲームオーバー処理
    if (barX-10<ballX && barX+110>ballX && barY>ballY && barY-10<ballY) {
        if (ballX<barX+25) ballVx = -1 * (3 + parseInt(Math.random(10)));
        else if (ballX>barX+75) ballVx = 3 + parseInt(Math.random(10));
        ballVy = (5 + parseInt(Math.random(7))) * -1;
    }
    for (let cnt=0; cnt<stage*5; cnt++) {
        if (block[cnt]>0 && ((ballX>block_x[cnt]-10 && block_x[cnt]+100>ballX && block_y[cnt]+20<ballY && block_y[cnt]+30>ballY) || (ballX>block_x[cnt]-10 && block_x[cnt]+100>ballX && block_y[cnt]-10<ballY && block_y[cnt]>ballY))) {
            block[cnt] = 0;
            ballVy *= -1;
        }
    }
    circle(ballX, ballY, 20);
}