var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10
var ballSpeedY = 4

var player1Score = 0;
var player2Score = 0;
const winningScore = 3;
var winningScreen = false

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect(evt);
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
}

function handleMouseClick(){
    player1Score = 0;
    player2Score = 0;
    winningScreen = false;
}

window.onload = function(){
    canvas = document.querySelector('.gameCanvas'); 
    canvasContext = canvas.getContext('2d');
    var framesPerSecond = 30;
    setInterval(function() {
        moveEveryThing();
        drawEverything();
    },1000/framesPerSecond)

    canvas.addEventListener('mousedown',handleMouseClick);

    canvas.addEventListener('mousemove',function(evt) {
        var mousePos = calculateMousePos(evt);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
    })
}

function ballReset(){
    if(player1Score >=winningScore || player2Score >=winningScore){
        winningScreen = true;
    }
    ballSpeedX = -ballSpeedX
    ballX = canvas.width/2
    ballY = canvas.height/2
}

function computerMovement(){
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2)
    if(paddle2YCenter < ballY + 30){
        paddle2Y += 11;
    }else if(paddle2YCenter > ballY + 30){
        paddle2Y -= 11;
    }
}

function moveEveryThing() {
    computerMovement()
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if(ballX > canvas.width){
        if(ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX
            var deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
        }else{

            player1Score++;
            ballReset()
        }
    }
    if(ballX < 0){
        if(ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX
            var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;

        }else{

            player2Score++;
            ballReset()
        }
    }
    if(ballY > canvas.height){
        ballSpeedY = -ballSpeedY
    }
    if(ballY < 0){
        ballSpeedY = -ballSpeedY
    }

}
function drawEverything() {
    // black screen
    colorRect(0, 0, canvas.width, canvas.height,'black');
    if (winningScreen){
        if (player1Score >= winningScore){
            
        }
        canvasContext.fillStyle = "white";
        canvasContext.fillText('Click to continue',100,100)
        return;
    }
    //left paddle
    colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT,'white');
    //right paddle(computer)
    colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT,'white');
    //ball
    colorCircle(ballX,ballY,10,'white')
    //score
    canvasContext.fillText(player1Score,100,100);
    canvasContext.fillText(player2Score,canvas.width-100,100);
}

function colorCircle(centerX,centerY,radius,drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath()
    canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true)
    canvasContext.fill()

}
function colorRect(leftX,topY,width,height,drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX,topY,width,height);
}