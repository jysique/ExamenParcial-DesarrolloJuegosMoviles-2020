Enemy = function(game){
    this.game = game;
    let key = this.game.rnd.integerInRange(0,2);
    
    this.game.physics.arcade.enable(this);
    let types = ["greenEnemy","whiteEnemy","boss"];
    console.log(types[key]);
    Phaser.Sprite.call(this,game,100,100,types[key]);
    // this.animations.add('fly');
    // this.animations.play('fly', [ 0, 1, 2 ], 20, true);
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;