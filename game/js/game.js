 "use strict";

let player;
 var nicki = [
     "Bogdan",
     "Zbyszek",
     "Stefan",
     "Egzorcysta",
     "No name"
 ]
 var nick = nicki[Math.floor(Math.random() * nicki.length)];
 var nickText;
 var buttone;
 
 console.clear();
 
 console.log(Phaser.VERSION);

 const config = {
    type: Phaser.CANVAS,
    width: 400,
    height: 300,
    pixelArt: true,
    scene: {
      preload: preload,
      create: create,
      update: update
    },

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 400,
        height: 300
    },

     physics: {
         default: "arcade",
         arcade: {
             gravity: { y: 0 } // Top down game, so no gravity
         }
     }
  };
  
  const game = new Phaser.Game(config);
  let controls;
  
  function preload() {
    this.load.image('playerimg', 'https://frankoslaw.github.io/who-is-alien/game/assets/images/player.png',{ frameWidth: 16, frameHeight: 16 });
    this.load.image("button", "https://frankoslaw.github.io/who-is-alien/game/assets/images/button.png",{ frameWidth: 15, frameHeight: 15 });

    this.load.image("tiles", "https://frankoslaw.github.io/who-is-alien/game/assets/images/tilemap.png");
    this.load.tilemapTiledJSON("map", "https://frankoslaw.github.io/who-is-alien/game/assets/mapa0.0.2.json");
  }
  
  function create() {
    const map = this.make.tilemap({ key: "map" });

    const tileset = map.addTilesetImage("test", "tiles");
  
    const walls = map.createStaticLayer("walls", tileset, 0, 0);
    const ground = map.createStaticLayer("ground", tileset, 0, 0);
    // tile camera position 30 18
    const camera = this.cameras.main;

     

    const cursors = this.input.keyboard.createCursorKeys();

    /*controls = new Phaser.Cameras.Controls.FixedKeyControl({
      camera: camera,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      speed: 0.15
    });*/

    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  
    //camera.x = 1890;
    //camera.y = 1134;
    //player.scrollX += 1890;
    //player.scrollY += 1134;

      player = this.physics.add.sprite(0, 0, 'playerimg');

      player.setBounce(0.2);
      player.setCollideWorldBounds(true);

        nickText = this.add.text(16, 16, 'Nick : ', { fontSize: '16px', fill: '#ffffff'}).setScrollFactor(0);
        nickText.setText('Nick : ' + nick);

        var button = this.add.image(400 - 20, 20, 'button', 0).setOrigin(1, 0).setInteractive().setScrollFactor(0);
    
        button.on('pointerdown', function() {
        if (this.scale.isFullscreen)
        {
            this.scale.stopFullscreen();
        }
        else
        {
            this.scale.startFullscreen();
        }
        }, this);

      walls.setCollisionByProperty({ collides: true });

      this.physics.add.collider(player, walls);

  }
  
function update() {
    const speed = 175;
    var cursors = this.input.keyboard.createCursorKeys();

    player.body.setVelocity(0);

    // Horizontal movement
    if (cursors.left.isDown) {
        player.body.setVelocityX(-100);
    } else if (cursors.right.isDown) {
        player.body.setVelocityX(100);
    }

    // Vertical movement
    if (cursors.up.isDown) {
        player.body.setVelocityY(-100);
    } else if (cursors.down.isDown) {
        player.body.setVelocityY(100);
    }

    // Normalize and scale the velocity so that player can't move faster along a diagonal
    player.body.velocity.normalize().scale(speed);

        this.input.on('pointermove', function (pointer) {
             let cursor = pointer;
             let angle = Phaser.Math.Angle.Between(player.x, player.y, cursor.x, cursor.y) + 90
             player.rotation = angle;
        }, this);
}