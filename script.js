var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 5

window.onload = function(){
    canvas = document.querySelector('.gameCanvas'); 
    canvasContext = canvas.getContext('2d');
    var framesPerSecond = 30;
    setInterval(function() {
        moveEveryThing();
        drawEverything();
    },1000/framesPerSecond)
}

function moveEveryThing() {
    ballX = ballX + ballSpeedX;
    if(ballX > canvas.width){
        ballSpeedX = -ballSpeedX
    }
    if(ballX < 0){
        ballSpeedX = -ballSpeedX
    }

}
function drawEverything() {
    // black screen
    colorRect(0, 0, canvas.width, canvas.height,'black');
    //left paddle
    colorRect(0, 210, 10, 100,'white');
    //ball
    colorCircle(ballX,150,10,'white')
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