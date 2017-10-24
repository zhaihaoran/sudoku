// 生成数独游戏

/**
 * 步骤：
 * 1. 生成完成的解决方案，Generator
 * 2. 随机去除部分数据，按比例
 */

const Generator = require("./generator");
const Toolkit = require("./toolkit");

module.exports = class Sudoku {

    constructor() {
        // 生成解决方案
        const generator = new Generator();
        generator.generate();
        this.solutionMatrix = generator.matrix;
    }

    make(level) {
        // 生成谜盘
        this.puzzleMatrix = this.solutionMatrix.map(row => row.map(cell => {
            return Math.random() * 9 < level ? 0 : cell;
        }))

        if (!this.checkPuzzleMatrix(this.puzzleMatrix, level)) {
            return this.make(level)
        }
    }

    /**
     * 谜盘校验合理算法
     * 
     * 1.低难度下每个宫格，每一行，每一列不可填满，否则重新生成
     * 2.中高难度下每个宫格，每一行，每一列至少填充1个，否则重新生成
     * TODO 3.尽量保证每个宫格内数字抹除比较均衡 (均衡？？？)
     */
    checkPuzzleMatrix(matrix, level) {

        let status = true;

        for (let i = 0; i < 9; i++) {
            // 取行数据
            const row = matrix[i];
            // 取列数据
            const line = Array.from({
                length: 9
            }).map((v, j) => matrix[j][i])
            // 取宫数据
            const box = Toolkit.box.getBoxCells(matrix, i)
            // 低中难度下
            if ((level < 6) && (box.every(v => v) || row.every(v => v) || line.every(v => v))) {
                console.log("level < 6 -- 重新生成谜盘")
                status = false;
            }
            // 高难度下
            if ((level > 5) && (box.every(v => !v) || row.every(v => !v) || line.every(v => !v))) {
                console.log("level > 5 -- 重新生成谜盘")
                status = false;
            }
        }

        return status;
    }
}

// console.log([2, 3, 0].every(a => a))