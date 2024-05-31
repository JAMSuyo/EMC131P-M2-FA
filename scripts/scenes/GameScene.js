export default class GameScene extends Phaser.Scene {

    constructor() {
        super( 'GameScene' );
    }
    
    create() {

        const map = this.make.tilemap( { key: 'map' } );
        
        const terrainTiles = map.addTilesetImage( 'Terrain' );
        console.log("tileset image loaded");
        this.terrainLayer = map.createLayer( 'Terrain', terrainTiles, 0, 0 );
        this.terrainLayer.setCollisionByExclusion( [-1] );

        const appleTiles = map.addTilesetImage( 'Apple' );
        this.appleLayer = map.createLayer( 'Apple', appleTiles, 0, 0 );

        const keyTiles = map.addTilesetImage( 'icon19' );
        this.keyLayer = map.createLayer( 'Key', keyTiles, 0, 0 );

        this.physics.world.bounds.width = this.terrainLayer.width;
        this.physics.world.bounds.height = this.terrainLayer.height;

        this.player = this.physics.add.sprite( 50, 200, 'ninjaSprite' );
        this.player.setBounce( 0.2 );
        //this.player.setCollideWorldBounds( { sides: { left: true, right: true, up: true, down: false } } );

        this.physics.add.collider( this.terrainLayer, this.player );

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers( 'ninjaSprite', { start: 11, end: 22 }),
            frameRate: 10, 
            repeat: -1,
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers( 'ninjaSprite', { start: 0, end: 10 }),
            frameRate: 10
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.setBounds( 0, 0, map.widthInPixels, map.heightInPixels );
        this.cameras.main.startFollow( this.player );
        this.cameras.main.setBackgroundColor('#d0eab4');

        this.score = 0;
        this.scoreText = this.add.text( 250, 25, 'Apples: 0', {
            fontSize: '20px',
            fill: '#000000'
        });
        this.scoreText.setScrollFactor( 0 );

        this.appleLayer.setTileIndexCallback( 243, this.collectApple, this );
        this.physics.add.overlap( this.player, this.appleLayer );

        this.keyLayer.setTileIndexCallback( 244, this.collectKey, this );
        this.physics.add.overlap( this.player, this.keyLayer );


        // enemy
        this.batEnemy = this.physics.add.group({
            key: 'batEnemy',
            repeat: 1,
            setXY: { x: 200, y: 250, stepX: 450 }
        });

        this.anims.create({
            key: 'bat',
            frames: this.anims.generateFrameNumbers( 'batFly', { start: 1, end: 6 } ),
            frameRate: 10,
            repeat: -1
        });

        
        this.batEnemy.children.iterate(function (batEnemy) {
            batEnemy.setBounce(0.2);
            batEnemy.setCollideWorldBounds(true);
            batEnemy.body.velocity.x = 50;
            batEnemy.anims.play('bat', true);
        });

        

        this.physics.add.collider( this.terrainLayer, this.batEnemy );

        this.physics.add.collider( this.player, this.batEnemy, this.gameOver, null, this );

        this.coinSound = this.sound.add( 'coin' );
        this.jumpSound = this.sound.add( 'jump' );
        this.deathSound = this.sound.add( 'gameoversfx' );
        this.fairySound = this.sound.add( 'fairy' );

        
    }

    update() {

        if ( this.cursors.left.isDown ) {
            this.player.body.setVelocityX( -200 );
            this.player.anims.play( 'walk', true );
            this.player.flipX = true;
        } else if ( this.cursors.right.isDown ) {
            this.player.body.setVelocityX( 200 );
            this.player.anims.play( 'walk', true );
            this.player.flipX = false;
        } else {
            this.player.setVelocityX( 0 );
            this.player.anims.play( 'idle', true );
        }

        if ( this.cursors.up.isDown && this.player.body.onFloor() ) {
            this.player.setVelocityY( - 300 );
        }


        this.batEnemy.children.iterate(function (batEnemy) {
            if (batEnemy.body.blocked.right) {
                batEnemy.body.velocity.x = -50; 
                batEnemy.flipX = false; 
                batEnemy.anims.play('bat', true);
            } else if (batEnemy.body.blocked.left) {
                batEnemy.body.velocity.x = 50; 
                batEnemy.flipX = true; 
                batEnemy.anims.play('bat', true);
            }
        });

        if (this.player.y > this.sys.game.config.height) {
            this.gameOver();
        }

    }

    collectApple( sprite, tile ) {
        this.appleLayer.removeTileAt( tile.x, tile.y );
        this.score++;
        this.scoreText.setText( 'Apples: ' + this.score );
        this.coinSound.play();
        return false;
    }

    collectKey( sprite, tile ) {
        this.appleLayer.removeTileAt( tile.x, tile.y );
        this.scene.start( 'GameScene2', { score: this.score } );
        this.fairySound.play();
        console.log( 'score:' + this.score );
        return false;
        
    }

    gameOver() {
        console.log( 'game over' );
        this.deathSound.play();
        this.scene.start( 'GameOverScene' );
    }

}
