Enemy = function(game,sprite,velocity){
    console.log(sprite);
    Phaser.Sprite.call(this,game,0,0,sprite);
    this.game = game;
    this.game.physics.arcade.enable(this);
    this.body.velocity.y = velocity;
    this.anchor.setTo(0.5);
    this.y = -this.height/2;
    this.x = this.game.rnd.integerInRange(this.width/2, this.game.width - (this.width / 2));
    this.animations.add('fly', [ 0, 1, 2 ], 20, true);
    this.play("fly");
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;