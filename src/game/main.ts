import { MainGame } from './base/MainGame';
import { vb } from '@vb/index';
export { vb } from '@vb/index';

// module hot reload for game is buggy and should be disabled
// if (import.meta.hot) {
//     let hmrContext = import.meta.hot;
//     // WTF why is this not implemented
//     hmrContext.decline();
// }


export function prepareGame(canvas: HTMLCanvasElement) {
    vb.setNumberFormat('it');
    const gameInstance = new MainGame({
        view: canvas,
        autoStart: true,
        sharedTicker: true,
        autoDensity: true,
        antialias: true,
        backgroundAlpha: 0,
        interactiveStage: false,
    });
    // init everything for game object
    globalThis.pgame = gameInstance;
    gameInstance.ticker.minFPS = 30;
    
    gameInstance.initGame().then(() => {
        if (DEV)
            gameInstance.showFPS(); // debug
        
        setGameAPI();
    });
}

// initialize global object
globalThis.API = {
    queries: new URLSearchParams(window.location.search)
} as typeof globalThis.API;

function setGameAPI() {
    
}