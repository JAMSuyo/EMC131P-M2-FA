export default class WinScene extends Phaser.Scene{

    constructor() {
        super('WinScene')
    }

    create() {
        
        this.add.image( 0, 0, 'win' ).setOrigin( 0, 0 );

        let menu = this.add.image( 150, 280, 'menuIcon' );
        menu.setInteractive({ useHandCursor: true });
        menu.on( 'pointerdown', () => this.menuButton());

        let retry = this.add.image( 250, 280, 'retryIcon' );
        retry.setInteractive({ useHandCursor: true });
        retry.on( 'pointerdown', () => this.retryButton() );

    }

    retryButton() {
        this.scene.start( 'GameScene' );
    }

    menuButton() {
        this.scene.start( 'MainMenuScene' );
    }
    

}