window.onload =function(){
    let game = new Phaser.Game(1024,768,Phaser.AUTO); //solo por siacaso le puse let :u
    game.state.add('Preload',Preload); //asegurandose que tengan el mismo nombre xd
    game.state.add('Menu',Menu); // x2
    game.state.add('Game',Game);
    game.state.start('Preload');
}