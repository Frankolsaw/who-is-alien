"use strict";

var player;
var nick = "Franek";
var nickText;
var buttone;

console.clear();

console.log(Phaser.VERSION);

var GameScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function GameScene ()
    {
        Phaser.Scene.call(this, { key: 'gameScene', active: true });

        this.player = null;
        this.cursors = null;
        this.score = 0;
        this.scoreText = null;
    },

    preload: function ()
    {
        this.load.image('playerimg', 'https://frankolsaw.github.io/who-is-alien/game/assets/images/player.png',{ frameWidth: 16, frameHeight: 16 });
        this.load.image("button", "https://frankolsaw.github.io/who-is-alien/game/assets/images/button.png",{ frameWidth: 15, frameHeight: 15 });

        this.load.image("tiles", "https://frankolsaw.github.io/who-is-alien/game/assets/images/tilemap.png");
        this.load.tilemapTiledJSON("map", "https://frankolsaw.github.io/who-is-alien/game/assets/mapa.json");
    },

    create: function ()
    {
        player = this.physics.add.sprite(200, 150, 'playerimg');

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        nickText = this.add.text(16, 16, 'Nick : ', { fontSize: '16px', fill: '#ffffff'});
        nickText.setText('Nick : ' + nick);

        var button = this.add.image(400 - 20, 20, 'button', 0).setOrigin(1, 0).setInteractive();
    
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



        //var map = this.make.tilemap({ key: 'map' });

        //var layer = map.createStaticLayer(0, tiles, 0, 0);
    
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    
        //var cursors = this.input.keyboard.createCursorKeys();
        /*var controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            speed: 0.5
        };
        controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
        
        var help = this.add.text(16, 16, 'Arrow keys to scroll', {
            fontSize: '18px',
            padding: { x: 10, y: 5 },
            backgroundColor: '#000000',
            fill: '#ffffff'
        }*/
        );
    },

    update: function ()
    {
        var cursors = this.input.keyboard.createCursorKeys();

        this.input.on('pointermove', function (pointer) {
             let cursor = pointer;
             let angle = Phaser.Math.Angle.Between(player.x, player.y, cursor.x, cursor.y) + 90
             player.rotation = angle;
        }, this);
        }

});

var config = {
    type: Phaser.CANVAS,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 400,
        height: 300
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: GameScene
};

var game = new Phaser.Game(config);



