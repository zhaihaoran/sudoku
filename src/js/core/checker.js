// 做真值表判断并记录错误数据 
function checkArray(array) {
    const length = array.length;
    const marks = new Array(length);
    marks.fill(true);

    for (let i = 0; i < length; i++) {
        const v = array[i];
        // 是否有效 0-无效 ，1-9 有效，是否有重复：i+1 ~length-1 是否和i位置的数据重复
        if (!v) {
            marks[i] = false;
            continue;
        }

        for (let j = i + 1; j < length; j++) {
            if (v === array[j]) {
                marks[i] = marks[j] = false;
            }
        }

    }
    return marks;
}

const ToolKit = require("./toolkit")

// 输入：matrix 用户完成的数独数据：9*9
// 处理：对matrix 行列宫进行检查，并填写marks
// 输出：检查是否成功、 marks


module.exports = class Checker {

    constructor(matrix) {
        this._matrix = matrix;
        this._matrixMarks = ToolKit.matrix.makeMatrix(true);
    }

    get matrixMarks() {
        return this._matrixMarks;
    }

    get isSuccess() {
        return this._success;
    }

    check() {
        this.checkRows();
        this.checkCols();
        this.checkBoxs();

        // 检查是否成功
        // Array.prototype.every  对数组的每一个元素进行检查，其中有一个元素返回false，则整体返回false，否则返回true
        this._success = this._matrixMarks.every(row => row.every(mark => mark))
        return this._success;
    }

    checkRows() {
        for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
            const rows = this._matrix[rowIndex];
            const marks = checkArray(rows);

            for (let colIndex = 0; colIndex < marks.length; colIndex++) {
                if (!marks[colIndex]) {
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }

    checkCols() {
        for (let colIndex = 0; colIndex < 9; colIndex++) {
            const cols = [];
            for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
                cols[rowIndex] = this._matrix[rowIndex][colIndex];
            }
            // const col = ToolKit.matrix.makeRow().map((v, i) => {
            //     this._matrix[i][colIndex]
            // })
            // console.log(col);
            const marks = checkArray(cols);

            for (let rowIndex = 0; rowIndex < marks.length; rowIndex++) {
                if (!marks[rowIndex]) {
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }

    checkBoxs() {
        for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
            const boxes = ToolKit.box.getBoxCells(this._matrix, boxIndex);
            const marks = checkArray(boxes);
            for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
                if (!marks[cellIndex]) {
                    const {
                        rowIndex,
                        colIndex
                    } = ToolKit.box.convertFromBoxIndex(boxIndex, cellIndex);
                    this._matrixMarks[rowIndex][colIndex] = false;
                }
            }
        }
    }
}

// const Generator = require('./generator');
// const gen = new Generator();
// gen.generate();

// const matrix = gen.matrix;

// const checker = new Checker(matrix);

// console.log("check result", checker.check());
// console.log("marks", checker.matrixMarks);

// matrix[1][1] = 0;
// matrix[2][3] = matrix[3][5] = 5;
// const checker2 = new Checker(matrix);

// console.log("check result", checker2.check());
// console.log("marks", checker2.matrixMarks);