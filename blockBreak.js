function setup() {
    createCanvas(700, 800);
}

let cs = 0;

let ballX = 350;
let ballY = 650;
let ballVx = 1+ parseInt(Math.random(6));
let ballVy = (3 + parseInt(Math.random(7))) * -1;
let barX = 300;
let barY = 660;
let score = 0;

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
            noStroke();
            
            if (mouseIsPressed) {
                mouseIsPressed = false;
                cs = 2;
            }
            break;
        case 2:
            
            if (mouseIsPressed) {
                mouseIsPressed = false;
                cs = 0;
            }
            break;
    }
}