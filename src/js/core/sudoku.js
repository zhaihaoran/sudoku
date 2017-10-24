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

        // 中高难度下，判断宫格是否填充了9个，如果9个全填则重新生成谜盘
        if (level > 4 ) {
            for (let i = 0; i < 9; i++) {
                const box = Toolkit.box.getBoxCells(this.puzzleMatrix, i)
                if (box.every(v=>v)) {
                    console.log("重新生成谜盘")
                    return this.make();
                }
            }
        }
    }
}

console.log([2,3,0].every(a=>a))