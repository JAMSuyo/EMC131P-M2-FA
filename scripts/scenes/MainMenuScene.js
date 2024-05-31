export default class MainMenuScene extends Phaser.Scene {

    constructor() {
        super( 'MainMenuScene' );
    }

    create() {

        this.add.image( 0, 0, 'mainmenu' ).setOrigin( 0, 0 );

        let play = this.add.image( 100, 280, 'playIcon' );
        play.setInteractive( { useHandCursor: true } );
        play.on( 'pointerdown', () => this.playButton() );

        let credits = this.add.image( 200, 280, 'creditsIcon' );
        credits.setInteractive( { useHandCursor: true } );
        credits.on( 'pointerdown', () => this.creditsButton() );

        let exit = this.add.image( 300, 280, 'exitIcon' );
        exit.setInteractive( { useHandCursor: true } );
        exit.on( 'pointerdown', () => this.exitButton() );

    }

    playButton() {
        this.scene.start( 'GameScene' );
    }

    creditsButton() {
        this.scene.start( 'CreditsScene' );
    }

    exitButton() {
        alert( 'You have exited the game. Thank you for playing!' );
    }
}