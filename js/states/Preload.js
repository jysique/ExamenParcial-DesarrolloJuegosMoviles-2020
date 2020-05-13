Preload = function(game){}

Preload.prototype = {
	preload:function(){


		 this.load.image('titlepage', 'assets/titlepage.png');
		// this.load.image('circulo', 'assets/circulo.png');
		// this.load.image('shoot', 'assets/arrowButton.png');
		// this.load.image('arrow', 'assets/actionButton.png');
	    this.load.image('seas', 'assets/sea.png');
	    this.load.image('bullet', 'assets/bullet.png');
	    // this.load.image('enemyBullet', 'assets/enemy-bullet.png');
	    // this.load.image('powerup1', 'assets/powerup1.png');
	    this.load.spritesheet('greenEnemy', 'assets/enemy.png', 32, 32,4);
	    this.load.spritesheet('whiteEnemy', 'assets/shooting-enemy.png', 32, 32,4);
	    this.load.spritesheet('boss', 'assets/boss.png', 93, 75,4);
		this.load.spritesheet('explosion', 'assets/explosion.png', 32, 32,6);
		
		// this.load.image('player', 'assets/player.png', 64, 64);
		this.load.spritesheet('player', 'assets/player.png', 64, 64,4);

		this.load.audio('explosion', ['assets/explosion.ogg']);
    	this.load.audio('fire', ['assets/enemy-fire.ogg']);
	},
	create:function(){
		this.state.start("Menu");
	}

}