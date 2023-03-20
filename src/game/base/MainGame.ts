import { SLoading } from '@g/states/SLoading';
import { SStart } from '@g/states/SStart';
import { createAllScenes } from './Scenes';
import { vbGame, vbSceneTransition } from '@vb/index';
import type { Example } from '@g/gameplay/Example';
import type { Matrix } from '@g/gameplay/Matrix';


export class MainGame extends vbGame {

    test = {} as Example
    matrix = {} as Matrix

    initGame() {
        this.assets.prepareLoading();

        this.addState(new SLoading());
        this.setState('Loading');
        this.startLoop(); // Current state is Boot

        // async function is annoying but we have to wrap the following codes into then().
        return this.initAssets().then(() => {
            // init default style and landscape first
            this.applyLandscape();

            const localeCode = globalThis.API.queries.get('locale');
            this.setLocale(localeCode !== null ? localeCode : 'en');

            this.addScenes(...createAllScenes());

            this.addState(new SStart());

            new vbSceneTransition(null, 'main').transit();
            // manually call resize
            window.dispatchEvent(new Event('resize'));
            this.currState.setNext('Start');
        });
    }

    mainLoop(deltaFrame: number) {
        let next = this.currState.runFSM(deltaFrame);
        if (next != '') {
            this.setState(next);
        }
        this.stage.update(deltaFrame);
    }

    detectStyleAndResize(contentWidth: number, contentHeight: number) {
        if (contentWidth >= contentHeight) {
            if (this.currStyle.name != 'landscape')
                this.applyLandscape();
        }
        else {
            if (this.currStyle.name != 'portrait')
                this.applyPortrait();
        }
        this.resizeAppView(contentWidth, contentHeight);
    }

    resizeAppView(contentWidth: number, contentHeight: number) {
        // doesn't need to scale the resolution when we turn on the autodensity
        let resizedWidth = contentWidth; /// this.renderer.resolution;
        let resizedHeight = contentHeight; /// this.renderer.resolution;
        if (contentWidth * this.desiredRatio <= contentHeight) {
            // fit width
            resizedHeight = resizedWidth * this.desiredRatio;
        }
        else {
            // fit height
            resizedWidth = resizedHeight / this.desiredRatio;
        }
        this.renderer.resize(resizedWidth, resizedHeight);
        this.stage.scale.set(resizedWidth / this.desiredWidth, resizedHeight / this.desiredHeight);
    }

    prepareStyle() {
        this.stage.tweens.endAll();
        // get resolution
        const res = this.currStyle.Resolution;
        this.setResolution(res[0], res[1]);
    }

    applyLandscape() {
        this.setStyle('landscape');
        this.prepareStyle();
        this.applyCurrentStlye();
    }

    applyPortrait() {
        this.setStyle('portrait');
        this.prepareStyle();
        this.applyCurrentStlye();
    }
}
