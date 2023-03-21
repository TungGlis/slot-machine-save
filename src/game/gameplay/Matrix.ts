import { Easing, vbContainer, vbImageLabel, vbImageButton, vbImageLabelButton, vbImage } from '@vb/index';
import { chain } from 'lodash';

export class Matrix extends vbContainer {
    test: vbImage
    matrix: number[][] = []
    screenMatrix: vbImage[][] = []
    imgArray: string[] = ["g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8", "g9", "g10"]
    NumberOfGem: number = 10
    screenX: number = 1280
    screenY: number = 720
    constructor() {
        // let test = require('')
        super();
        this.name = 'matrix'
        this.test = new vbImage('g1')
        let i: number = 0
        let j: number = 0
        let k: number = 0
        for (i = 0; i < 7; i++) {
            this.matrix[i] = []
            this.screenMatrix[i] = []
            for (j = 0; j < 5; j++) {
                // this.matrix[i][j] = Math.floor((Math.random() * 10))
                this.screenMatrix[i][j] = new vbImage("g1")
                this.ApplyImg(i, j, Math.floor((Math.random() * 10)))
                this.screenMatrix[i][j].width = 200;
                this.screenMatrix[i][j].height = 200;
                this.screenMatrix[i][j].position.set(j * (this.screenX / 5) + 20, i * (this.screenY / 3) - (this.screenY))
                // row 3, 4, 5 is visible
                this.addObj(this.screenMatrix[i][j])
            }
        }

    }
    RandomPress() {
        // let i: number = 0
        // let j: number = 0
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 5; j++) {
                this.matrix[i][j] = Math.floor((Math.random() * 10))
                this.screenMatrix[i][j].setTex(this.imgArray[this.matrix[i][j]])

                //One way to fix the problem is position should be reset after running.
                this.screenMatrix[i][j].position.set(j * (this.screenX / 5) + 20, i * (this.screenY / 3) - (this.screenY))

            }
        }
        // animation

        //Another method is to change the step so each time spinning the bottomIndex return to 0 
        //before start new spinning. 
        //At this time may be step % 7 = 0 is the chosen one. But still occue errors when items
        //have not finished their cycle.
        let step: number = 100
        
        const bottomIndex: number = 6
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 5; j++) {
                const test = this.tweens.create(`${i}${j}test`, this.screenMatrix[i][j], { y: this.screenMatrix[i][j].position.y - 20 }, 500)
                    .easing(Easing.Cubic.Out).start()
                const test1 = this.tweens.create(`${i}${j}test1`, this.screenMatrix[i][j], { y: this.screenMatrix[i][j].position.y + 20 }, 200)
                    .easing(Easing.Cubic.In).on('end', () => {
                        this.MoveAnimation(step, this.screenMatrix, i, i, j)
                    })
                test.chain(test1)
            }
        }
        // // reset IDs
        // const originslIndex: number[] = [0,1,2,3,4,5,6]
        // let newIndex: number[] = [0,1,2,3,4,5,6]
        // for (let i = 0; i < step; i++) {
        //     let palceholder: number = newIndex[newIndex.length - 1]
        //     newIndex.pop()
        //     newIndex.unshift(palceholder)
        // }
        // console.log(originslIndex);
        // console.log(newIndex);

        // for (let i = 0; i < 7; i++) {
        //     for (let j = 0; j < 5; j++) {
        //         this.screenMatrix[i][j] = this.screenMatrix[newIndex[i]][j]
        //     }

        // }
    }
    ApplyImg(i: number, j: number, value: number) {
        this.matrix[i][j] = value
        this.screenMatrix[i][j].setTex(this.imgArray[this.matrix[i][j]])
    }
    CheckWin(): number[] {
        let win: number[] = []
        // A =              ID: 0       score: 5
        //10 =              ID: 1       score: 10
        // Coin =           ID: 2       score: 15
        // Imperator =      ID: 3       score: 20
        // J =              ID: 4       score: 25
        // K =              ID: 5       score: 30
        // Q =              ID: 6       score: 35
        // Scatter =        ID: 7       score: 40
        // Sword =          ID: 8       score: 45
        // Wild =           ID: 9       score: 50

        // console.clear()

        this.WinCondition([3, 3, 3, 3, 3])
        this.WinCondition([4, 4, 4, 4, 4])
        this.WinCondition([5, 5, 5, 5, 5])
        this.WinCondition([3, 4, 5, 4, 3])
        this.WinCondition([5, 4, 3, 4, 5])
        this.WinCondition([3, 3, 4, 3, 3])
        this.WinCondition([5, 5, 4, 5, 5])
        this.WinCondition([4, 5, 5, 5, 4])
        this.WinCondition([4, 3, 3, 3, 4])
        this.WinCondition([4, 3, 4, 3, 4])
        return win
    }
    WinCondition(rowNo: number[]): number {

        const map: Record<number, number> = {}
        // let point: number = 1
        if ((this.matrix[rowNo[0]][0] != this.matrix[rowNo[2]][2]) && (this.matrix[rowNo[2]][2] != this.matrix[rowNo[4]][4])) {
            // //---no win---
            // console.log(rowNo + ': ' + 'lose');
            // // -----
            return 0
        }
        for (let i = 0; i < 4; i++) {
            if (map[this.matrix[rowNo[i]][i]] == null) {
                map[this.matrix[rowNo[i]][i]] = 1
            }
            if (this.matrix[rowNo[i]][i] == this.matrix[rowNo[i + 1]][i + 1]) {
                map[this.matrix[rowNo[i]][i]] += 1
            }
        }
        const key = (Object.keys(map))
        let max: number = 0
        let maxKey: number = 0
        max = map[+key[0]]
        for (let i = 0; i < key.length; i++) {
            if (max < map[+key[i + 1]]) {
                max = map[+key[i + 1]]
            }
        }
        if (max >= 3) {
            // // ---win with point---
            // console.log(rowNo + ': ' + 'WIN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!   ' + max + ' ' + maxKey);
            // console.log(map);

            // // -----
        }
        else {
            // console.log(rowNo + ': ' + 'lose     ' + max + ' ' + maxKey);
        }
        // else{
        //     max = 0
        // }
        // console.log(map);
        // console.log('max: '+ max + ', '+ 'maxKey: '+maxKey);

        return max
    }
    MoveAnimation(stepNo: number, target: vbImage[][], bottomIndex: number, i: number, j: number) {
        // console.log(`${i}${j} `+ stepNo + ' ' + bottomIndex + ' ' + target[i][j].position.y);
        // console.log(bottomIndex);

        stepNo -= 1
        this.tweens.create(`${i}${j}test${stepNo}`, target[i][j], { y: target[i][j].position.y + (this.screenY / 3) }, 30).on('end', () => {
            bottomIndex += 1
            if (bottomIndex > 6) {
                // target[i][j].position.set(target[i][j].position.x, -this.screenY)
                target[i][j].position.set(target[i][j].position.x,  - this.screenY )
                // console.log(`${i}${j} at bottom`);
                console.log(bottomIndex);
                console.log(target[(i + 1) % 7][j]);

                bottomIndex = 0
            }

            if (stepNo <= 0) {
                const test = this.tweens.create(`${i}${j}test`, this.screenMatrix[i][j], { y: this.screenMatrix[i][j].position.y + 20 }, 200)
                    .easing(Easing.Cubic.In).start()
                const test1 = this.tweens.create(`${i}${j}test1`, this.screenMatrix[i][j], { y: this.screenMatrix[i][j].position.y - 20 }, 500)
                    .easing(Easing.Cubic.In)
                test.chain(test1)
            }
            else {
                this.MoveAnimation(stepNo, this.screenMatrix, bottomIndex, i, j)
            }
        }).start()
    }

}