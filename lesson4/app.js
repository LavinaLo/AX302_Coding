console.log("test...");

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d")

var img = new Image();
img.src = 'christmasCoffee.png'

img.onload = function(){
	ctx.drawImage(img, 10, 20, 300, 300);
}

var img2 = new Image();
img2.src = 'frappuccino.png'

img2.onload = function(){
	ctx.drawImage(img2, 600, 100, 150, 250);
}

var img3 = new Image();
img3.src = 'matcha.png'

img3.onload = function(){
	ctx.drawImage(img3, 250, 150, 300, 300);
}

ctx.font = "30px Arial";
ctx.fillText("STARBUCKS", 300, 50); 

ctx.fillStyle = "aquamarine";
ctx.fillRect(400, 100, 1000, 500);

ctx.fillStyle = "salmon";
ctx.fillRect(100, 400, 1000, 500);
