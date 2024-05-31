export default class CreditsScene extends Phaser.Scene {

    constructor() {
        super( 'CreditsScene' );
    }

    create() {

        this.add.image( 0, 0, 'credits' ).setOrigin( 0, 0 );

        let back = this.add.image( 200, 280, 'backIcon' );
        back.setInteractive( { useHandCursor: true } );
        back.on( 'pointerdown', () => this.backButton() );
    }

    backButton() {
        this.scene.start( 'MainMenuScene' );
    }
}