const matrixToolkit = {

    makeRow(v = 0) {
        const array = new Array(9);
        // es6的新语法
        array.fill(v)
        return array;
    },

    makeMatrix(v = 0) {
        // 学习！
        // Array.from 可以对伪数组或可迭代对象转换成数组对象
        // Array.from(arrayLike, mapFn, thisArg)
        return Array.from({
            length: 9
        }, () => this.makeRow(v))
        // const array = new Array(9);
        // 这个实际上只生成了一行数据，其他的只是把地址复制到了每一行。
        // array.fill(makeRow(v));
        // return array;
    },

    // fisher-yates 洗牌算法 （随机算法）
    // http://www.imooc.com/video/15879

    shuffle(array) {
        // 因为最后一个元素是不用进行交换的，所以我们只用进行array.length-2次循环
        const endIndex = array.length - 2;
        for (let i = 0; i <= endIndex; i++) {
            // 第二个序号
            const j = i + Math.floor(Math.random() * (array.length - i));
            // 然后交换两个数,使用解构赋值快速完成交换！！
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },

    checkFillable: function(matrix, n, rowIndex, colIndex) {
        // 取到行数据
        const row = matrix[rowIndex];
        // 取到列数据
        // const column = [matrix[0][colIndex],matrix[1][colIndex],.....]
        // 二维数组取一列数据的取法！！！！
        const column = this.makeRow().map((v, i) => matrix[i][colIndex])
        // 计算出宫序号
        const {boxIndex} = boxToolkit.convertToBoxIndex(rowIndex,colIndex)
        // 取到宫数据
        const box = boxToolkit.getBoxCells(matrix, boxIndex)

        // 判断是否可以填入
        for (let i = 0; i < 9; i++) {
            if (row[i] === n || column[i] === n || box[i] === n) {
                return false;
            }
        }

        return true;
    }

    /**
     * 检查算法
     * 抽取宫格数据校验是关键，行和列校验so easy
     * 
     * 1.先算宫的位置,！！x的位置通过取余数获得，y的位置通过取整获得！！
     * 以第5宫举例，bX = n%/3 = 2, bY = n/3 = 1
     * 2.算起始格的位置
     * x0 = bX * 3 = 6; y0 = bY * 3 = 3
     * 3.宫内小格的坐标计算：
     * x = x0 + i % 3 ; y = y0 + i/3
     */
};

/**
 * 宫坐标系工具
 */
const boxToolkit = {

    convertToBoxIndex(rowIndex, colIndex) {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        }
    },

    convertFromBoxIndex(boxIndex, cellIndex) {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        }
    },

    /**
     * 获取宫数据
     * 
     * @param {any} matrix 
     * @param {any} boxIndex 
     * @returns 
     */
    getBoxCells(matrix, boxIndex) {
        const startRowIndex = Math.floor(boxIndex / 3) * 3;
        const startColIndex = boxIndex % 3 * 3
        const result = [];
        for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
            const rowIndex = startRowIndex + Math.floor(cellIndex / 3);
            const colIndex = startColIndex + cellIndex % 3;
            result.push(matrix[rowIndex][colIndex]);
        }
        return result;
    },
}

// 工具集

module.exports = class ToolKit {
    /**
     * 矩阵和数组相关工具
     * 
     * @readonly
     * @static
     */
    static get matrix() {
        return matrixToolkit;
    }
    /**
     * 宫坐标系相关工具
     * 
     * @readonly
     * @static
     */
    static get box() {
        return boxToolkit;
    }
};