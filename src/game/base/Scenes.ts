import { Example } from '@g/gameplay/Example';
import { Matrix } from '@g/gameplay/Matrix';
import { vbScene } from '@vb/index';


export function createAllScenes() {
    const eg = new Example();
    globalThis.pgame.test = eg;

    const matrix = new Matrix();
    globalThis.pgame.matrix = matrix
    
    const mainScene = new vbScene('main', [
        eg, matrix
    ]);
    return [mainScene];
}
