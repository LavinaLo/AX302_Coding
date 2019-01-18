console.log("test...");

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

ctx.moveTo(50,50);
ctx.lineTo(250,250);
ctx.strokeStyle = "aquamarine";
ctx.lineWidth = 5;
ctx.stroke();

ctx.moveTo(250, 50);
ctx.lineTo(50, 250);
ctx.strokeStyle = "salmon";
ctx.lineWidth = 5;
ctx.stroke();

ctx.fillStyle = "aquamarine";
ctx.fillRect(125,125,50,50);


ctx.strokeRect (50,50,200,200);

ctx.clearRect(135,135,30,30);


var c1 = document.getElementById("one");
var ctx1 = c1.getContext("2d");

ctx1.moveTo(150,150);
ctx1.lineTo(150,300);
ctx1.strokeStyle = "aquamarine";
ctx1.lineWidth = 5;
ctx1.stroke();

ctx1.moveTo(150,150);
ctx1.lineTo(300,150);
ctx1.strokeStyle = "aquamarine";
ctx1.lineWidth = 5;
ctx1.stroke();