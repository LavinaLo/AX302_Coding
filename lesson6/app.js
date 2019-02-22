console.log("test...");

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d")	

var WIDTH = 600;
var HEIGHT = 600;

var x, y, s;

var mx, my;

var circleX, circleY, circleS;
var circleCollision = false;

var enemyX, enemyY, enemyS;
var enemyCollision = false;

var score = 0;

function drawPacman(){
	var pacman = new Image();
	pacman.src = "pacman.png";
	ctx.drawImage(pacman, x, y, s, s)
}

function drawCircle(){
	var circle = new Image();
	circle.src = "circle.png";
	ctx.drawImage(circle, circleX, circleY, circleS, circleS);
}

function drawEnemy(){
	var drawEnemy= new Image();
	circle.src = "enemy.png";
	ctx.drawImage(enemy, enemyX, enemyY, enemyS, enemyS);
}

function clear(){
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function init(){
	x = 300;
	y = 300;
	s = 50;
	mx = 0;
	my = 0;

	circleS = 50;
	circleX = Math.floor(Math.random()*(WIDTH - circleS));
	circleY = Math.floor(Math.random()*(HEIGHT - circleS));

	enemyS = 50;
	enemyX = Math.floor(Math.random()*(WIDTH - enemyS));
	enemyY = Math.floor(Math.random()*(HEIGHT - enemyS));

	window.onkeydown = keydownControl;

	return setInterval(draw,10);
}

function keydownControl(e){
	if(e.keyCode == 37){
		mx = -4;
		my = 0;
	}
	if(e.keyCode == 39){
		mx = 4;
		my = 0;
	}
	if(e.keyCode == 38){
		mx = 0;
		my = -4;
	}
	if(e.keyCode == 40){
		mx = 0;
		my = 4;
	}
}

function draw(){
	clear();
	drawPacman();
	drawCircle();

	x += mx;
	y += my;

	if(x + mx > WIDTH - s || x + mx < 0){
		mx =  -mx;
	}
	if(y + my > HEIGHT - s || y + my < 0){
		my =  -my;
	}

	collisionCheck();
	collisionHandle();
}

function collisionCheck(){
	if( (x+s >= circleX) && (x <= circleX + circleS) && (y + s >= circleY) && (y <= circleY + circleY) ) {
		circleCollision = true;
	} else {
		circleCollision = false;
	}
}

function collisionHandle(){
	if(circleCollision){
		score += 1;
		document.getElementById("score").innerHTML = "Score: " + score;
		circleX = Math.floor(Math.random()*(WIDTH - circleS));
		circleY = Math.floor(Math.random()*(HEIGHT - circleS));
	}
}

function followPacman(){
	if (enemyX < x){
		enemyX += 1;
	}
	if(enemyX > x){
		enemyX -= 1;
	}
	if (enemyY < y){
		enemyY += 1;
	}
	if(enemyY > y){
		enemyY -= 1;
	}
}

init();
