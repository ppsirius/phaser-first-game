(function() {

  var game = new Phaser.Game(640, 960, Phaser.AUTO, null,
    { preload: preload, create: create, update: update });

  var brick;
  var score = 0;

  function preload() {
    // Center game window
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    // Add assets
    game.load.image('background', 'img/background.png');
    game.load.image('brick', 'img/brick.png');
    game.load.image('ground', 'img/ground.png');
    game.load.spritesheet('windows', 'img/windows.png', 82, 75);
  }

  function create() {
    // Add element on canvas
    game.add.sprite(0, 0, 'background');
    game.add.sprite(0, 960 - 668, 'ground');
    game.physics.startSystem(Phaser.Physics.ARCADE);
    scoreText = game.add.text(20,20, '0', { font: "28px Arial", fill: "#fff" });
    windows = game.add.group();
    game.time.events.loop(400, spawnWindow);
    spawnBrick();
  }

  function update() {
    brick.x = game.input.x;
    brick.y = game.input.y;
    game.physics.arcade.collide(brick, windows, crash);
    windows.forEach(function(object) {
      if(object.y >= game.world.height) {
        alert('KONIEC!\n\nTwój wynik: '+score);
        location.reload();
      }
    });
  }

  function spawnBrick() {
    brick = game.add.sprite(200, 200, 'brick');
    brick.anchor.set(0.5);
    game.physics.enable(brick, Phaser.Physics.ARCADE);
  }

  function spawnWindow() {
    var randomX = game.rnd.integerInRange( 0, 640-82 );
    var randomFrame = game.rnd.integerInRange( 0, 2 );
    // Random element add
    object = game.add.sprite(randomX, -100, 'windows', randomFrame);
    // Add physics
    game.physics.enable(object, Phaser.Physics.ARCADE);
    object.body.gravity.y = 450;
    windows.add(object);
  }

  function crash(brick, object) {
    object.destroy();
    score++;
    scoreText.setText(score);
    game.camera.shake(0.01, 200);
  }

})();


