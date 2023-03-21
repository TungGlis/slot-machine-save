import { Easing, vbContainer, vbImage, vbImageButton, vbImageLabel, vbImageLabelButton } from '@vb/index';
import { keys } from 'lodash';
import { RotateMode } from 'pixi-spine';
import * as PIXI from 'pixi.js';
import { Matrix } from './Matrix';


export class Example extends vbContainer {
    randomBtn: vbImageButton
    scoreDisplay: vbImageLabel
    score: number = 0
    screenX: number = 1280
    screenY: number = 720
    constructor() {
        super()
        this.name = 'btn'
        this.randomBtn = new vbImageButton('baqua')
        this.scoreDisplay = new vbImageLabel('baqua')
        this.scoreDisplay.addCenteredTxt({
            text: this.score.toString(),
            size: 100
        })
        this.scoreDisplay.height = 200
        this.scoreDisplay.width = 200
        this.randomBtn.height = 200
        this.randomBtn.width = 200
        // this.randomBtn.position.set(this.screenX/2 + 100, this.screenY-this.randomBtn.height)
        this.randomBtn.position.set(520, 600)
        this.scoreDisplay.position.set(0, this.screenY-this.randomBtn.height)
        this.randomBtn.setOnClick(()=>{
            globalThis.pgame.matrix.RandomPress()

            // //test
            // globalThis.pgame.matrix.ApplyImg(1, 0, 5)
            // globalThis.pgame.matrix.ApplyImg(1, 1, 5)
            // globalThis.pgame.matrix.ApplyImg(1, 2, 5)
            // globalThis.pgame.matrix.ApplyImg(1, 3, 5)
            // globalThis.pgame.matrix.ApplyImg(1, 4, 5)
            console.log(globalThis.pgame.matrix.matrix);
            // // test


            globalThis.pgame.matrix.CheckWin()
        })
        this.addObj(this.randomBtn)
            // .addObj(this.scoreDisplay)
        console.log(globalThis.pgame.matrix.screenMatrix);
        
    }
}