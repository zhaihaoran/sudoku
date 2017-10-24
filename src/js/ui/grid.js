// 生成九宫格
const Toolkit = require("../core/toolkit")
const Generator = require("../core/generator")
const Sudoku = require("../core/sudoku")
const Checker = require("../core/checker")

class Grid {
    constructor(container) {
        this._$container = container;
    }

    build() {
        const sudoku = new Sudoku();
        sudoku.make();
        const matrix = sudoku.puzzleMatrix;

        // const generator = new Generator();
        // generator.generate();
        // const matrix = generator.matrix;

        // 定义宫的class
        const rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"]
        const colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"]

        const $cells = matrix.map(rowValues => rowValues.map((cellValue, colIndex) => {
            return $("<span>").addClass(colGroupClasses[colIndex % 3]).addClass(cellValue ? "fixed" : "empty")
                .text(cellValue)
        }));

        // $spanArray 为参数
        const $divArray = $cells.map(($spanArray, rowIndex) => {
            return $("<div>").addClass("row").addClass(rowGroupClasses[rowIndex % 3])
                .append($spanArray);
        })

        this._$container.append($divArray);

    }

    layout() {
        const width = $("span:first", this._$container).width();
        $("span", this._$container).height(width).css({
            "line-height": `${width}px`,
            "font-size": width < 32 ? `${width/2}px` : ""
        })
    }

    bindPopup(popupNumbers) {
        // 事件代理！
        this._$container.on("click", "span", e => {
            const $cell = $(e.target);
            if ($cell.is('.fixed')) {
                return;
            }
            popupNumbers.popup($cell);
        })
    }

    /**
     * 重建新棋盘
     * 
     * @memberof Grid
     */
    rebuild() {
        this._$container.empty();
        this.build();
        this.layout();
    }

    /**
     * 检查用户解谜结果，如果成功则提示，失败则显示错误标记
     * 
     * @memberof Grid
     */
    check() {
        // 从界面中获取填充后的数据
        const data = this._$container.children()
            .map((rowIndex, div) => {
                return $(div).children().map((colIndex, span) => parseInt($(span).text()) || 0)
            })
            // 转换成原生数组
            .toArray().map($data => $data.toArray());

        console.log(data)
        const checker = new Checker(data)
        // 开始检查
        if (checker.check()) {
            return true;
        }
        // 不成功，则开始标记 , 循环标记
        const marks = checker.matrixMarks;
        this._$container.children().each((rowIndex, div) => {
            $(div).children().each((colIndex, span) => {
                const $span = $(span);
                // 不能标记之前固定的fixed的class样式，方便以后清空
                if ($span.is(".fixed") || marks[rowIndex][colIndex]) {
                    $span.removeClass("error")
                } else {
                    $span.addClass("error")
                }
            })
        })
    }
    /**
     * 重置当前棋盘到初始位置
     * 
     * @memberof Grid
     */
    reset() {
        this._$container.find('span:not(.fixed)')
            .removeClass("error mark1 mark2")
            .addClass("empty")
            .text(0);
    }

    /**
     * 清理错误标记
     * 
     * @memberof Grid
     */
    clear() {
        this._$container.find('span.error').removeClass("error");
    }
}

module.exports = Grid