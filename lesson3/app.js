console.log("test...");

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d")

ctx.arc(150, 150, 50, 0, 6.28);
ctx.fillStyle="aquamarine";
ctx.fill();
ctx.stroke(); 

ctx.beginPath();
ctx.moveTo(150, 20);
ctx.lineTo(20, 100);
ctx.lineTo(280, 100);
ctx.closePath();
ctx.stroke();


var c1 = document.getElementById("one");
var ctx1 = c1.getContext("2d");

ctx1.beginPath();
ctx1.moveTo(150,20);
ctx1.lineTo(200,170);
ctx1.arc(150,170,50,0,3.14);
ctx1.lineTo(150,20);
ctx1.closePath();
ctx1.stroke();