
Game = function(game){}

Game.prototype = {
	create:function(){
		this.background = this.game.add.tileSprite(0,0,this.game.width, this.game.height,'seas');
		// this.background = this.add.rite(0,0,this.game.width,this.game.height,'seas');
		// this.background.moveAxis(0,100);
		this.background.autoScroll(0,100);

		this.explosionSound = this.game.add.sound('explosion');
		this.shoowSound = this.game.add.sound('fire');

		// this.game.arcade.enable(Phaser.ARCADE);

		this.player = this.game.add.sprite(0,0,'player');
		this.player.animations.add('fly', [ 0, 1, 2 ], 20, true);
		this.player.animations.play("fly");
		// this.player.play("fly");

		

		// this.player.center.setTo(0.5);
		this.player.anchor.setTo(0.5);

		this.player.x = this.game.world.centerX
		this.player.y = this.game.world.centerY;

		// this.playerMovement = {
		// 	left:false,
		// 	right:false,
		// 	down:false,
		// 	up:false,
		// 	shoot:false
		// };

		// this.game.arcade.enable(this.player);
		this.physics.arcade.enable(this.player);

		this.player.collideWorldBounds = true;

		this.keys = this.input.keyboard.createCursorKeys();

		this.bullets = this.game.add.group();;

		

		this.playerLifes = 4;
		this.powerups = this.game.add.group();;
		this.score = 0;
		this.maxscore = 0;
		this.lifes = this.game.add.group();;
		this.gameOver= false;
		this.enemies = this.game.add.group();;
		this.hud();
	
		this.shootInterval = 0;
		this.enemyInterval = 0;
		this.poweupInterval = 0;

		// this.createControls();
		
		this.style = {
			fill: "#FFF"
		};
	},
	/*
	// createControls:function(){
	// 	this.shootBtn = this.add.sprite(900,650,'shoot');
	// 	this.shootBtn.inputEnable = true;
		
	// 	this.shootBtn.event.onClick.addListener.add(function(){
	// 		this.player.movement.shoot = true;
	// 	},this);

	// 	this.shootBtn.event.onClick.addListenerUp.add(function(){
	// 		this.player.movement.shoot = false;
	// 	},this);

	// 	this.left = this.add.sprite(30,650,'arrow');
	// 	this.right = this.add.sprite(170,650,'arrow');
	// 	this.up = this.add.sprite(100,600,'arrow');
	// 	this.down = this.add.sprite(100,700,'arrow');
	// 	this.left.inputEnable = true;
	// 	this.right.inputEnable = true;
	// 	this.down.inputEnable = true;
	// 	this.up.inputEnable = true;

	// 	this.left.event.onClick.addListener.add(function(){
	// 		this.player.movement.left = true;
	// 	},this);

	// 	this.right.event.onClick.addListener.add(function(){
	// 		this.player.movement.right = true;	
	// 	},this);
	// 	this.down.event.onClick.addListener.add(function(){
	// 		this.player.movement.down = true;	
	// 	},this);

	// 	this.up.event.onClick.addListener.add(function(){
	// 		this.player.movement.up = true;
	// 	},this);

	// 	this.left.event.onClick.addListenerUp.add(function(){
	// 		this.player.movement.left = false;
	// 	},this);

	// 	this.right.event.onClick.addListenerUp.add(function(){
	// 		this.player.movement.right = false;	
	// 	},this);
	// 	this.down.event.onClick.addListenerUp.add(function(){
	// 		this.player.movement.down = false;	
	// 	},this);

	// 	this.up.event.onClick.addListenerUp.add(function(){
	// 		this.player.movement.up = false;
	// 	},this);
	// },
	*/
	hud:function(){
		this.scoreText = this.game.add.text(0,0,'Score : '+this.score);
		this.scoreText.fill = "#000000";
		this.scoreText.x = this.game.width - 400;
		for(let i=0;i<this.playerLifes;i++){
			let life = this.game.add.sprite(0,0,'player');

			// life.center.setTo(0.5);
			life.scale.setTo(0.5);
			life.anchor.setTo(0.5); //añadido
			life.index = 0;
			life.x = life.width  * i + 20; //añadido
			life.y = life.height + 2; // añadido
			this.lifes.add(life);
		}
		this.maxScoreText = this.game.add.text(0,0,'Max Score : ');
		this.maxScoreText.fill = "#000000";
		this.maxScoreText.x = this.game.width -200;

		if(localStorage.points!=null){
			// this.maxScoreText.text = "Max Score "+ parseInt(localStorage.points);
			this.maxScoreText.setText("Max Score "+ parseInt(localStorage.points));
		}
	},

	update:function(){
		console.log(localStorage.points);
		if(this.gameOver){
			return;
		}
		this.poweupInterval+=this.game.time.elapsed;
		this.enemyInterval +=this.game.time.elapsed;
		this.shootInterval += this.game.time.elapsed;
		if(this.poweupInterval>=10000 && this.playerLifes < 4){
			this.poweupInterval = 0;
			this.createPowerUp();
		}
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.Z)
			// || (this.player.movement.shoot)
					&& this.shootInterval >=300){
			this.shootInterval = 0;
			this.shoot();
					
		}
		if(this.enemyInterval>=1000){
			this.enemyInterval = 0;
			this.createEnemy();
		}
		// console.log(this.enemyInterval);

		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;

		//if(this.keys.left.isDown || this.player.movement.left){
		if(this.keys.left.isDown){
			this.player.body.velocity.x = -300;
		}

		if(this.keys.right.isDown){
			this.player.body.velocity.x = 300;
		}

		if(this.keys.up.isDown) {
			this.player.body.velocity.y = -300;
		}

		if(this.keys.down.isDown){
			this.player.body.velocity.y = 300;
		}


		this.enemies.forEach(function(enemy){
			if(enemy.y>=this.game.height){
				enemy.kill();
			}
		},this);

		this.powerups.forEach(function(powerup){
			if(powerup.y>=this.game.height){
				powerup.kill();
			}
		},this);

		this.game.physics.arcade.overlap(this.player,this.enemies,
				this.reduceLife,null,this);

		this.game.physics.arcade.overlap(this.bullets,this.enemies,
										this.destroyEnemies,null,this);

		this.game.physics.arcade.overlap(this.player,this.powerups,
										this.gainLife,null,this);
	},

	gainLife:function(player,powerup){
		powerup.kill();
		if(this.playerLifes<4){
			this.playerLifes++;
			let life = this.lifes.getFirstDead();
			life.reset(life.index*life.width,0);
		}		
	},

	createPowerUp:function(){
		let powerup = this.game.add.sprite(0,0,'player');
		powerup.scale.setTo(0.5);
		powerup.anchor.setTo(0.5);
		powerup.y = -powerup.height/2;
		powerup.x = this.game.rnd.integerInRange(powerup.width/2,
												this.game.width - (powerup.width / 2));
		this.physics.arcade.enable(powerup);
		this.powerups.add(powerup);
		powerup.body.velocity.y = 100;
	},

	reduceLife:function(player,enemy){
		this.showExplosion(enemy);
		enemy.kill();
		let life = this.lifes.getFirstAlive();
		life.kill();
		this.playerLifes--;
		if(this.playerLifes==0){
			this.gameOver = true;
			this.showExplosion(this.player);
			this.player.kill();
			this.enemies.killAll();
			this.powerups.killAll();
			this.gameOverText = this.game.add.text(0,0,'Game Over',this.style);

			this.gameOverText.anchor.setTo(0.5);
			this.gameOverText.x = this.game.world.centerX;
			this.gameOverText.y = this.game.world.centerY;

			this.gameOverText.inputEnabled = true;
			this.gameOverText.events.onInputDown.add(function(){
				this.game.state.start("Game");
			},this);
		}
	},

	destroyEnemies:function(bullet, enemy){
		this.showExplosion(enemy);
		let types = ["greenEnemy","whiteEnemy","boss"];
		if(enemy.key == "greenEnemy"){
			this.score+=10;
		}
		if(enemy.key == "whiteEnemy"){
			this.score+=20;
		}
		if(enemy.key == "boss"){
			this.score+=40;
		}
		if(localStorage.points != null){
			let temp = localStorage.points;
			if(temp<this.score){
				localStorage.points = parseInt(this.score);
			}
		}else{
			localStorage.points = parseInt(this.score);	
		}
		// this.scoreText = "Score : "+this.score;
		this.scoreText.setText("Score :" +this.score);  //PROFE ME PUSE TRYHARD EN ESTA XD
		bullet.kill();
		enemy.kill();
	},

	showExplosion:function(sprite){
		let explosion = this.game.add.sprite(sprite.x,sprite.y,'explosion');
		explosion.anchor.setTo(0.5);
		explosion.width = sprite.width;
		explosion.height = sprite.height;
		explosion.animations.add('boom');
		explosion.animations.play('boom',7,false,true);
		this.explosionSound.play();
	},

	createEnemy:function(){
		let types = ["greenEnemy","whiteEnemy","boss"];
		let key = this.game.rnd.integerInRange(0,2);
		
		let enemy = this.enemies.getFirstDead();
		
		if(enemy){
			enemy.reset(0,-enemy.height/2);
		}else{
			enemy = new Enemy(this);

			enemy = this.game.add.sprite(0,0,types[key]);
			enemy.animations.add('fly');
			enemy.animations.play('fly', [ 0, 1, 2 ], 20, true);
		}
		enemy.anchor.setTo(0.5);
		enemy.y = -enemy.height/2;
		this.game.physics.arcade.enable(enemy);
		enemy.body.velocity.y = 200;
		this.enemies.add(enemy);
		// enemy.play("fly");
		enemy.x = this.game.rnd.integerInRange(enemy.width/2,
												this.game.width - (enemy.width / 2));
	},

	shoot:function(){
		// console.log("hola");
		let bullet = this.bullets.getFirstDead();
		this.shoowSound.play();
		if(bullet){
			// bullet.restart(this.player.x,this.player.y);
			bullet.reset(this.player.x,this.player.y);
			bullet.body.velocity.y = -200; 	
		}else{
			bullet = this.game.add.sprite(this.player.x,this.player.y,'bullet');

		}
		this.bullets.add(bullet);
		bullet.scale.setTo(2.0);
		bullet.anchor.setTo(0.5);
		this.game.physics.arcade.enable(bullet);
		bullet.body.velocity.y = -200; 	
		bullet.checkWorldBounds = true;
		bullet.outOfBoundsKill  = true;
	}


}
