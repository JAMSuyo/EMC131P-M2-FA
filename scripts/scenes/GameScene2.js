export default class GameScene2 extends Phaser.Scene {
    
    constructor() {
        super( 'GameScene2' );
    }

    init( data ) {
        this.score = data.score;
    }

    create() {

        const map2 = this.make.tilemap( { key: 'map2' } );
        
        const bgTiles2 = map2.addTilesetImage( 'Terrain' );
        this.bgTiles2 = map2.createLayer( 'BG', bgTiles2, 0, 0 );
        
        const terrainTiles2 = map2.addTilesetImage( 'Terrain' );
        console.log("tileset image loaded");
        this.terrainLayer2 = map2.createLayer( 'Terrain', terrainTiles2, 0, 0 );
        this.terrainLayer2.setCollisionByExclusion( [-1] );

        const appleTiles2 = map2.addTilesetImage( 'Apple' );
        this.appleLayer2 = map2.createLayer( 'Apples', appleTiles2, 0, 0 );

        const keyTiles2 = map2.addTilesetImage( 'icon19' );
        this.keyLayer2 = map2.createLayer( 'Key', keyTiles2, 0, 0 );

        this.physics.world.bounds.width = this.terrainLayer2.width;
        this.physics.world.bounds.height = this.terrainLayer2.height;

        this.player = this.physics.add.sprite( 50, 200, 'ninjaSprite' );
        this.player.setBounce( 0.2 );

        this.physics.add.collider( this.terrainLayer2, this.player );

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
        this.cameras.main.setBounds( 0, 0, map2.widthInPixels, map2.heightInPixels );
        this.cameras.main.startFollow( this.player );

        this.scoreText = this.add.text( 250, 25, 'Apples: ' + this.score, {
            fontSize: '20px',
            fill: '#ffffff'
        });
        this.scoreText.setScrollFactor( 0 );

        this.appleLayer2.setTileIndexCallback( 243, this.collectApple, this );
        this.physics.add.overlap( this.player, this.appleLayer2 );

        this.keyLayer2.setTileIndexCallback( 244, this.collectKey, this );
        this.physics.add.overlap( this.player, this.keyLayer2 );
        

        this.birdEnemy = this.physics.add.group({
            key: 'birdEnemy',
            repeat: 1,
            setXY: { x: 300, y: 10, stepX: 450 }
        });

        this.anims.create({
            key: 'bird',
            frames: this.anims.generateFrameNumbers( 'birdFly', { start: 0, end: 8 } ),
            frameRate: 10,
            repeat: -1
        });

        this.birdEnemy.children.iterate(function (birdEnemy) {
            birdEnemy.setBounce(0.2);
            birdEnemy.setCollideWorldBounds(true);
            birdEnemy.body.velocity.x = 50;
            birdEnemy.anims.play('bird', true);
        });

        this.physics.add.collider( this.terrainLayer2, this.birdEnemy );
        this.physics.add.collider( this.player, this.birdEnemy, this.gameOver, null, this );


        this.ghostEnemy = this.physics.add.group({
            key: 'ghostEnemy',
            repeat: 1,
            setXY: { x: 320, y: 240, stepX: 450 }
        });

        this.anims.create({
            key: 'ghost',
            frames: this.anims.generateFrameNumbers( 'ghostFly', { start: 0, end: 9 } ),
            frameRate: 10,
            repeat: -1
        });

        this.ghostEnemy.children.iterate(function (ghostEnemy) {
            ghostEnemy.setBounce(0.2);
            ghostEnemy.setCollideWorldBounds(true);
            ghostEnemy.body.velocity.x = 30;
            ghostEnemy.anims.play('ghost', true);
        });

        this.physics.add.collider( this.terrainLayer2, this.ghostEnemy );
        this.physics.add.collider( this.player, this.ghostEnemy, this.gameOver, null, this );


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


        this.birdEnemy.children.iterate(function (birdEnemy) {
            if (birdEnemy.body.blocked.right) {
                birdEnemy.body.velocity.x = -50; 
                birdEnemy.flipX = false; 
                birdEnemy.anims.play('bird', true);
            } else if (birdEnemy.body.blocked.left) {
                birdEnemy.body.velocity.x = 50; 
                birdEnemy.flipX = true; 
                birdEnemy.anims.play('bird', true);
            }
        });

        this.ghostEnemy.children.iterate(function (ghostEnemy) {
            if (ghostEnemy.body.blocked.right) {
                ghostEnemy.body.velocity.x = -50; 
                ghostEnemy.flipX = false; 
                ghostEnemy.anims.play('ghost', true);
            } else if (ghostEnemy.body.blocked.left) {
                ghostEnemy.body.velocity.x = 50; 
                ghostEnemy.flipX = true; 
                ghostEnemy.anims.play('ghost', true);
            }
        });


        if (this.player.y > this.sys.game.config.height) {
            this.gameOver();
        }
    }

    collectApple( sprite, tile ) {
        this.appleLayer2.removeTileAt( tile.x, tile.y );
        this.score++;
        this.scoreText.setText( 'Apples: ' + this.score );
        this.coinSound.play();
        return false;
    }

    collectKey( sprite, tile ) {
        this.appleLayer2.removeTileAt( tile.x, tile.y );
        this.scene.start( 'GameScene3', { score: this.score } );
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