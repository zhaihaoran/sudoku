// 生成数组解决方案的js
const ToolKit = require("./toolkit")
module.exports = class Generator {

    generate() {
        while(!this.internalGenerate()){
            console.warn("try again");
        }
    }

    internalGenerate() {

        this.matrix = ToolKit.matrix.makeMatrix();
        // 随机打乱序号位置
        this.orders = ToolKit.matrix.makeMatrix().map(row => row.map((v, i) => i)).map(row => ToolKit.matrix.shuffle(row));
        for (let n = 1; n <= 9; n++) {
            if (!this.fillNumber(n)) {
                return false;
            }
        }
        return true;
    }

    fillNumber(n) {
        return this.fillRow(n, 0);
    }

    fillRow(n, rowIndex) {

        if (rowIndex > 8) {
            return true;
        }
        // 先取到行数据
        const row = this.matrix[rowIndex]
        // 随机选择列
        const orders = this.orders[rowIndex]

        for (let i = 0; i < 9; i++) {
            const colIndex = orders[i];
            // 如果这个位置有值，则跳过
            if (row[colIndex]) {
                continue;
            }

            // 检测这个位置是否可以填n
            if (!ToolKit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
                continue;
            }

            row[colIndex] = n;
            // 当前行 填写 n 成功，会递归调用 fillRow() 来进行下一行的填写

            // 去下一行填写，如果没填进去，就继续当前行寻找下一个位置
            if (!this.fillRow(n, rowIndex + 1)) {
                row[colIndex] = 0;
                continue;
            }

            return true;
        }

        return false;
    }
}

// const generater = new Generator();

// generater.generate()

// console.log(generater.matrix);