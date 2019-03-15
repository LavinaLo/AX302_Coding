var game = new Phaser.Game(800,600, Phaser.AUTO, '', {preload:preload, create:create, update:update});

var score = 0;
var lives = 3;

function preload(){
	game.load.image('sky', 'assets/sky.png');
	game.load.image('diamond', 'assets/diamond.png');
	game.load.image('firstaid', 'assets/firstaid.png');
	game.load.image('platform', 'assets/platform.png');
	game.load.image('star', 'assets/star.png'); 
	game.load.image('diamond', 'assests/diamond.png');
	game.load.image('firstaid', 'assests/firstaid.png');

	game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
}

function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE);

	game.add.sprite(0, 0, 'sky')

	platforms = game.add.physicsGroup();
	platforms.enableBody = true;

	var platform = platforms.create(0, 560, 'platform');
	platform.scale.setTo(2, 2);
	platform.body.immovable = true;

	var ledge = platforms.create(400, 400, 'platform');
	ledge.body.immovable = true;

	var ledge = platforms.create(-100, 250, 'platform');
	ledge.body.immovable = true;

	var style = {font: "bold 32px Arial", fill:"#fff"};

	scorelabel = game.add.text(300, 560,"Score: ", style);
	scoretext = game.add.text(420, 560, score, style);
	scorelabel.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
	scoretext.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

	liveslabel = game.add.text(10, 5,"Lives: ", style);
	livestext = game.add.text(120, 5, lives, style);
	liveslabel.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
	livestext.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

	player = game.add.sprite(32, 410, 'dude');

	game.physics.arcade.enable(player)
	player.body.gravity.y = 250;
	player.body.bounce.y = 0.2;
	player.body.collideWorldBounds = true;
	player.animations.add('left', [0,1,2,3], 10, true);
	player.animations.add('right', [5,6,7,8], 10, true);

	enemy = game.add.sprite(760, 20, 'baddie');
	enemy2 = game.add.sprite(9, 40, 'baddie');
	diamond = game.add.sprite(200, 200, 'diamond');

	game.physics.arcade.enable(enemy)
	enemy.body.gravity.y = 300;
	enemy.body.bounce.y = 0.2;
	enemy.body.collideWorldBounds = true;
	enemy.animations.add('left', [0,1], 10, true);
	enemy.animations.add('right', [2,3], 10, true);

	game.physics.arcade.enable(enemy2)
	enemy2.body.gravity.y = 300;
	enemy2.body.bounce.y = 0.2;
	enemy2.body.collideWorldBounds = true;
	enemy2.animations.add('left', [0,1], 10, true);
	enemy2.animations.add('right', [2,3], 10, true);

	stars = game.add.physicsGroup();
	stars.enableBody = true;
	for(var i = 0; i < 12; i++){
		var star = stars.create(i*70, 0, "star");
		star.body.gravity.y = 200;
		star.body.bounce.y = Math.random()*0.2 + 0.7;
	}
	game.physics.arcade.enable(diamond)
	diamond.body.gravity.y = 300;
	diamond.body.bounce.y = 0.2;

	firstaids = game.add.physicsGroup();
	firstaids.enableBody = true;

	cursors = game.input.keyboard.createCursorKeys();
	wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
	aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
	sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
	dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);

}

function update(){
	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(stars, platforms);
	game.physics.arcade.collide(enemy, platforms);
	game.physics.arcade.collide(enemy2, platforms);
	game.physics.arcade.collide(diamond, platforms);
	game.physics.arcade.collide(firstaids, platforms);

	player.body.velocity.x = 0;

	if(cursors.left.isDown || aKey.isDown){
		player.body.velocity.x = -150;
		player.animations.play('left');
	} else if(cursors.right.isDown || dKey.isDown){
		player.body.velocity.x = 150;
		player.animations.play('right');
	} else {
		player.animations.stop();
		player.frame = 4;
	}

	if((cursors.up.isDown || wKey.isDown) && player.body.touching.down ){
		player.body.velocity.y = -300;
	}

	moveEnemy();
	moveEnemy2();

	game.physics.arcade.overlap(player, stars, collectStar);
	game.physics.arcade.overlap(player, enemy, loseLife);
	game.physics.arcade.overlap(player,enemy2, loseLife);
	game.physics.arcade.overlap(player, diamond, addScore);
	game.physics.arcade.overlap(player, firstaids, addLife);

}

function collectStar(player, star){
	score = score + 1;
	scoretext.setText(score);

	star.kill();
	star.reset(Math.floor(Math.random() * 760), 0)

}

function addScore(player, diamond){
	score = score + 2;
	scoretext.setText(score);

	diamond.kill();
	diamond.reset(Math.floor(Math.random() * 760), 0)
}

function loseLife(player, enemy){
	lives = lives - 1;
	livestext.setText(lives);

	enemy.kill();
	enemy.reset(760, 10); 

	if(lives < 1) {
		endGame();
	}

	if (lives == 1) {
		var firstaid = firstaids.create(Math.random() * 760, 0, 'firstaid')
		firstaid.body.gravity.y = 200;
		firstaid.body.bounce.y = Math.random()*0.3 + 0.7; 
	}

}

function loseLife(player, enemy2){
	lives = lives - 1;
	livestext.setText(lives);

	enemy2.kill();
	enemy2.reset(9, 40); 

	if(lives < 1) {
		endGame();
	}

	if (lives == 1) {
		var firstaid = firstaids.create(Math.random() * 760, 0, 'firstaid')
		firstaid.body.gravity.y = 200;
		firstaid.body.bounce.y = Math.random()*0.3 + 0.7; 
	}
}

function addLife(player, firstaid){
	lives = lives + 1;
	livestext.setText(lives);

	firstaid.kill();
}

function moveEnemy(){
	if(enemy.x > 759){ 
		enemy.body.velocity.x = -120;
		enemy.animations.play('left');
	} else if(enemy.x < 410){
		enemy.body.velocity.x = 120;
		enemy.animations.play('right');
	}
}

function moveEnemy2(){
	if(enemy2.x > 250){ 
		enemy2.body.velocity.x = -120;
		enemy2.animations.play('left');
	} else if(enemy2.x < 10){
		enemy2.body.velocity.x = 120;
		enemy2.animations.play('right');
	}
}

function endGame(){
	player.kill();
	liveslabel.visible = false;
	livestext.visible = false;
	scoretext.visible = false;
	scorelabel.visible = "GAME OVER! You score " + score;
}

