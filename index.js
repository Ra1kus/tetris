import Game from './scripts/game.js';
import View from './scripts/view.js';

const root = document.querySelector('#root');

const game = new Game();
const view = new View(root, 480, 640, 20, 10);

window.game = game;
window.view = view;

let interval = null;

document.addEventListener('keydown', event => {
    switch(event.keyCode) {
        case 37: // Left arrow
        if (view.isGameStarted && !view.isGamePaused) {
            game.movePieceLeft();
            view.renderMainScreen(game.getState());
        }
        break;
        case 38: // Up arrow
        if (view.isGameStarted && !view.isGamePaused) {
            game.rotatePiece();
            view.renderMainScreen(game.getState());
        }
        break;
        case 39: // Right arrow
        if (view.isGameStarted && !view.isGamePaused) {
            game.movePieceRight();
            view.renderMainScreen(game.getState());
        }
        break;
        case 40: // Down arrow
        if (view.isGameStarted && !view.isGamePaused) {
            game.movePieceDown();
            view.renderMainScreen(game.getState());
        }
        break;
        case 13: // Enter
            if (view.isGameStarted) {
                if (view.isGamePaused) {
                    view.renderMainScreen(game.getState());
                    view.isGamePaused = false;
                    interval = setInterval(() => {
                        game.movePieceDown();
                        view.renderMainScreen(game.getState());
                    }, 1000);
                } else {
                    view.renderPauseScreen();
                    view.isGamePaused = true;
                    clearInterval(interval);
                }
            } else {
                view.renderMainScreen(game.getState());
                view.isGameStarted = true;
                interval = setInterval(() => {
                    game.movePieceDown();
                    view.renderMainScreen(game.getState());
                }, 1000);
            }
            break;  
    }
});

// window.onload = () => view.renderMainScreen(game.getState());
window.onload = () => view.renderStartScreen(game.getState());
// window.onload = () => view.renderGameOverScreen(game.getState());
