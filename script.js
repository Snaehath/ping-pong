var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10
var ballSpeedY = 4

var paddle1Y = 250;
const PADDLE_HEIGHT = 100;

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


window.onload = function(){
    canvas = document.querySelector('.gameCanvas'); 
    canvasContext = canvas.getContext('2d');
    var framesPerSecond = 30;
    setInterval(function() {
        moveEveryThing();
        drawEverything();
    },1000/framesPerSecond)

    canvas.addEventListener('mousemove',function(evt) {
        var mousePos = calculateMousePos(evt);
        paddle1Y = mousePos.y;
    })
}

function moveEveryThing() {
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
    if(ballX > canvas.width){
        ballSpeedX = -ballSpeedX
    }
    if(ballX < 0){
        ballSpeedX = -ballSpeedX
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
    //left paddle
    colorRect(0, paddle1Y, 10, 100,'white');
    //ball
    colorCircle(ballX,ballY,10,'white')
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