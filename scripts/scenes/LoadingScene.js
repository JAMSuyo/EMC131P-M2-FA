export default class LoadingScene extends Phaser.Scene {

    constructor() {
        super( 'LoadingScene' )
    }

    preload() {

        this.load.tilemapTiledJSON( 'map', '../assets/maps/map1/test.json' );
        this.load.spritesheet( 'Terrain', '../assets/maps/tiles/Terrain.png', { frameWidth: 16, frameHeight: 16 } );
        this.load.image( 'Apple', '../assets/maps/tiles/Apple.png' );
        this.load.image( 'icon19', '../assets/maps/tiles/key.png' );
        this.load.tilemapTiledJSON( 'map2', '../assets/maps/map2/map2.json' );
        this.load.tilemapTiledJSON( 'map3', '../assets/maps/map3/map3.json' );
        

        this.load.spritesheet( 'ninjaRun', '../assets/sprites/ninjaRun.png', { frameWidth: 32, frameHeight: 32 } );
        this.load.spritesheet( 'ninjaIdle', '../assets/sprites/ninjaIdle.png', { frameWidth: 32, frameHeight: 32 } );
        this.load.spritesheet( 'ninjaSprite', '../assets/sprites/ninjaSprite.png', { frameWidth: 32, frameHeight: 32 } );
        
        this.load.spritesheet( 'trunkRun', '../assets/sprites/trunkRun.png', { frameWidth: 64, frameHeight: 32 } );
        this.load.spritesheet( 'snail', '../assets/sprites/snail.png', { frameWidth: 38, frameHeight: 24 } );
        this.load.spritesheet( 'pigRun', '../assets/sprites/pigRun.png', { frameWidth: 36, frameHeight: 30 } );
        this.load.spritesheet( 'batFly', '../assets/sprites/batFly.png', { frameWidth: 46, frameHeight: 30 } );
        this.load.spritesheet( 'birdFly', '../assets/sprites/birdFly.png', { frameWidth: 32, frameHeight: 32 } );
        this.load.spritesheet( 'ghostFly', '../assets/sprites/ghost.png', { frameWidth: 44, frameHeight: 30 } );
        this.load.spritesheet( 'mushroomRun', '../assets/sprites/mushroomRun.png', { frameWidth: 32, frameHeight: 32 } );

        this.load.image( 'mainmenu', '../assets/menu/coverPage.png' );
        this.load.image( 'credits', '../assets/menu/creditsPage.png' );
        this.load.image( 'gameover', '../assets/menu/gameOverPage.png' );
        this.load.image( 'win', '../assets/menu/winPage.png' );

        this.load.image( 'backIcon', '../assets/menu/backIcon.png' );
        this.load.image( 'creditsIcon', '../assets/menu/creditsIcon.png' );
        this.load.image( 'menuIcon', '../assets/menu/menuIcon.png' );
        this.load.image( 'playIcon', '../assets/menu/playIcon.png' );
        this.load.image( 'retryIcon', '../assets/menu/retryIcon.png' );
        this.load.image( 'exitIcon', '../assets/menu/exitIcon.png' );

        this.load.audio( 'bgm', '../assets/audio/bgm/time_for_adventure.mp3' );
        this.load.audio( 'coin', '../assets/audio/soundeffects/coin.mp3' );
        this.load.audio( 'gameoversfx', '../assets/audio/soundeffects/gameoversfx.mp3' );
        this.load.audio( 'jump', '../assets/audio/soundeffects/jump.mp3' );
        this.load.audio( 'fairy', '../assets/audio/soundeffects/fairy.mp3' );
        this.load.audio( 'button', '../assets/audio/soundeffects/menusound.mp3' );
    }

    create() {
        console.log( 'Loading scene accessed!' );
        this.music = this.sound.add( 'bgm', { loop: true } );
        this.music.play();
        this.scene.start( 'MainMenuScene' );
    }
}