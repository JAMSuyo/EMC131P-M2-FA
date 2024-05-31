import LoadingScene from "./scenes/LoadingScene.js";
import GameScene from "./scenes/GameScene.js";
import MainMenuScene from "./scenes/MainMenuScene.js";
import CreditsScene from "./scenes/CreditsScene.js";
import GameOverScene from "./scenes/GameOverScene.js";
import WinScene from "./scenes/WinScene.js";
import GameScene2 from "./scenes/GameScene2.js";
import GameScene3 from "./scenes/GameScene3.js";

let loadingScene = new LoadingScene();
let gameScene = new GameScene();
let mainMenuScene = new MainMenuScene();
let creditsScene = new CreditsScene();
let gameOverScene = new GameOverScene();
let winScene = new WinScene();
let gameScene2 = new GameScene2();
let gameScene3 = new GameScene3();

let config = {
    type: Phaser.AUTO,
    width: 400,
    height: 320,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    }
}

let game = new Phaser.Game( config );

game.scene.add( 'LoadingScene', loadingScene );
game.scene.add( 'GameScene', gameScene );
game.scene.add( 'MainMenuScene', mainMenuScene );
game.scene.add( 'CreditsScene', creditsScene );
game.scene.add( 'GameOverScene', gameOverScene );
game.scene.add( 'WinScene', winScene );
game.scene.add( 'GameScene2', gameScene2 );
game.scene.add( 'GameScene3', gameScene3 );

game.scene.start( 'LoadingScene' );