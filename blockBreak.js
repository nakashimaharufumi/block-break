function setup() {
    createCanvas(700, 800);
}

let cs = 0;
let score = 0;

let ballX = 350;
let ballY = 650;
let ballVx = 1+ parseInt(Math.random(6));
let ballVy = (3 + parseInt(Math.random(7))) * -1;
let barX = 300;
let barY = 660;

let block_num = 5;
let block = [1, 1, 1, 1, 1];

function draw() {
    clear();
    background(0, 30);
    stroke(255);
    strokeWeight(4);
    line(50, 50, 650, 50);
    line(50, 50, 50, 750);
    line(650, 50, 650, 750);
    line(50, 750, 650, 750);
    
    switch (cs) {
        case 0:
            noStroke();
            fill(0);
            textAlign(CENTER);
            textSize(50);
            text("ブロック崩しゲーム", 350, 300);
            textAlign(CENTER);
            textSize(25);
            text("click to start", 350, 400);
            fill(0);
            rect(barX, barY, 100, 10);
            circle(ballX, ballY, 20);
            if (mouseIsPressed) {
                mouseIsPressed = false;
                cs = 1;
            }
            break;
        case 1:
            let check = 0;
            noStroke();
            fill(0);
            barX = mouseX;
            if (barX<50) barX = 50;
            if (barX>550) barX = 550;
            rect(barX, barY, 100, 10);
            for (let cnt=0; cnt<block_num; cnt++) {
                if (block[cnt]>0) rect(100+cnt*100, 100, 90, 20);
            }
            ballX += ballVx;
            ballY += ballVy;
            if (ballX<60 || ballX>640) ballVx *= -1;
            if (ballY<60 || ballY>740) ballVy *= -1;
            if (barX-10<ballX && barX+110>ballX && barY>ballY && barY-10<ballY) {
                if (ballX<barX+25) ballVx = -1 * (2 + parseInt(Math.random(10)));
                else if (ballX>barX+75) ballVx = 2 + parseInt(Math.random(10));
                ballVy = (3 + parseInt(Math.random(7))) * -1;
            }
            for (let cnt=0; cnt<block_num; cnt++) {
                if (block[cnt]>0 && ((ballX>90+cnt*100 && 200+cnt*100>ballX && 120<ballY && 130>ballY) || (ballX>90+cnt*100 && 200+cnt*100>ballX && 90<ballY && 100>ballY))) {
                    block[cnt] = 0;
                    ballVy *= -1;
                }
            }
            circle(ballX, ballY, 20);

            for (let cnt=0; cnt<block_num; cnt++) {
                check += block[cnt];
            }
            if (check==0) cs = 2;
            break;
        case 2:
            fill(0);
            textAlign(CENTER);
            textSize(50);
            text("GAME CLEAR", 350, 300);
            if (mouseIsPressed) {
                mouseIsPressed = false;
                cs = 0;
            }
            break;
    }
}