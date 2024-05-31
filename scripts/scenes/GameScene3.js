export default class GameScene3 extends Phaser.Scene {

    constructor() {
        super( 'GameScene3' );
    }

    init( data ) {
        this.score = data.score;
    }

    create() {

        const map3 = this.make.tilemap( { key: 'map3' } );
        
        const terrainTiles3 = map3.addTilesetImage( 'Terrain' );
        console.log("tileset image loaded");
        this.terrainLayer3 = map3.createLayer( 'Terrain', terrainTiles3, 0, 0 );
        this.terrainLayer3.setCollisionByExclusion( [-1] );

        const appleTiles3 = map3.addTilesetImage( 'Apple' );
        this.appleLayer3 = map3.createLayer( 'Apples', appleTiles3, 0, 0 );

        const keyTiles3 = map3.addTilesetImage( 'icon19' );
        this.keyLayer3 = map3.createLayer( 'Key', keyTiles3, 0, 0 );

        this.physics.world.bounds.width = this.terrainLayer3.width;
        this.physics.world.bounds.height = this.terrainLayer3.height;

        this.player = this.physics.add.sprite( 60, 50, 'ninjaSprite' );
        this.player.setBounce( 0.2 );

        this.physics.add.collider( this.terrainLayer3, this.player );

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
        this.cameras.main.setBounds( 0, 0, map3.widthInPixels, map3.heightInPixels );
        this.cameras.main.startFollow( this.player );
        this.cameras.main.setBackgroundColor('#fcc199');

        this.scoreText = this.add.text( 250, 25, 'Apples: ' + this.score, {
            fontSize: '20px',
            fill: '#ffffff'
        });
        this.scoreText.setScrollFactor( 0 );

        this.appleLayer3.setTileIndexCallback( 243, this.collectApple, this );
        this.physics.add.overlap( this.player, this.appleLayer3 );

        this.keyLayer3.setTileIndexCallback( 244, this.collectKey, this );
        this.physics.add.overlap( this.player, this.keyLayer3 );

        this.birdEnemy = this.physics.add.group({
            key: 'birdEnemy',
            repeat: 1,
            setXY: { x: 350, y: 120, stepX: 420 }
        });

        this.anims.create({
            key: 'bird',
            frames: this.anims.generateFrameNumbers( 'birdFly', { start: 0, end: 8 } ),
            frameRate: 10,
            repeat: -1
        });

        this.birdEnemy.children.iterate( function ( birdEnemy ) {
            birdEnemy.setBounce( 0.2 );
            birdEnemy.setCollideWorldBounds( true );
            birdEnemy.body.velocity.x = 50;
            birdEnemy.anims.play( 'bird', true );
        });

        this.physics.add.collider( this.terrainLayer3, this.birdEnemy );
        this.physics.add.collider( this.player, this.birdEnemy, this.gameOver, null, this );


        this.ghostEnemy = this.physics.add.group({
            key: 'ghostEnemy',
            repeat: 1,
            setXY: { x: 680, y: 30, stepX: 550 }
        });

        this.anims.create({
            key: 'ghost',
            frames: this.anims.generateFrameNumbers( 'ghostFly', { start: 0, end: 9 } ),
            frameRate: 10,
            repeat: -1
        });

        this.ghostEnemy.children.iterate( function ( ghostEnemy ) {
            ghostEnemy.setBounce( 0.2 );
            ghostEnemy.setCollideWorldBounds( true );
            ghostEnemy.body.velocity.x = 30;
            ghostEnemy.anims.play( 'ghost', true );
        });

        this.physics.add.collider( this.terrainLayer3, this.ghostEnemy );
        this.physics.add.collider( this.player, this.ghostEnemy, this.gameOver, null, this );


        this.mushroomEnemy = this.physics.add.group({
            key: 'mushroomEnemy',
            setXY: { x: 1940, y: 190 }
        });

        this.anims.create({
            key: 'mushroom',
            frames: this.anims.generateFrameNumbers( 'mushroomRun', { start: 0, end: 15 } ),
            frameRate: 10,
            repeat: -1
        });
        
        this.mushroomEnemy.children.iterate( function ( mushroomEnemy ) {
            mushroomEnemy.setBounce( 0.2 );
            mushroomEnemy.setCollideWorldBounds( true );
            mushroomEnemy.body.velocity.x = 60;
            mushroomEnemy.anims.play( 'mushroom', true );
        }) 

        this.physics.add.collider( this.terrainLayer3, this.mushroomEnemy );
        this.physics.add.collider( this.player, this.mushroomEnemy, this.gameOver, null, this );


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


        this.birdEnemy.children.iterate( function ( birdEnemy ) {
            if (birdEnemy.body.blocked.right) {
                birdEnemy.body.velocity.x = -50; 
                birdEnemy.flipX = false; 
                birdEnemy.anims.play( 'bird', true );
            } else if (birdEnemy.body.blocked.left) {
                birdEnemy.body.velocity.x = 50; 
                birdEnemy.flipX = true; 
                birdEnemy.anims.play( 'bird', true );
            }
        });

        this.ghostEnemy.children.iterate( function ( ghostEnemy ) {
            if ( ghostEnemy.body.blocked.right ) {
                ghostEnemy.body.velocity.x = -30; 
                ghostEnemy.flipX = false; 
                ghostEnemy.anims.play( 'ghost', true );
            } else if ( ghostEnemy.body.blocked.left ) {
                ghostEnemy.body.velocity.x = 30; 
                ghostEnemy.flipX = true; 
                ghostEnemy.anims.play( 'ghost', true );
            }
        });

        this.mushroomEnemy.children.iterate( function ( mushroomEnemy ) {
            if ( mushroomEnemy.body.blocked.right ) {
                mushroomEnemy.body.velocity.x = -60;
                mushroomEnemy.flipX = false;
                mushroomEnemy.anims.play( 'mushroom', true );
            } else if ( mushroomEnemy.body.blocked.left ) {
                mushroomEnemy.body.velocity.x = 60;
                mushroomEnemy.flipX = true;
                mushroomEnemy.anims.play( 'mushroom', true );
            }
        });


        if (this.player.y > this.sys.game.config.height) {
            this.gameOver();
        }
    }

    collectApple( sprite, tile ) {
        this.appleLayer3.removeTileAt( tile.x, tile.y );
        this.score++;
        this.scoreText.setText( 'Apples: ' + this.score );
        this.coinSound.play();
        return false;
    }

    collectKey( sprite, tile ) {
        this.appleLayer3.removeTileAt( tile.x, tile.y );
        this.scene.start( 'WinScene' );
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