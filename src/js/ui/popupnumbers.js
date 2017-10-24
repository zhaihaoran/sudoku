// 弹出操作面板
module.exports = class PopupNumbers {
    constructor($panel) {
        this._$panel = $panel.hide().removeClass("hidden");

        this._$panel.on("click", "span", e => {
            const $cell = this._$targetCell;
            const $span = $(e.target);
            // mark1,mark2 回填样式
            this.hide();
            if ($span.hasClass("mark1")) {
                if ($cell.hasClass("mark1")) {
                    $cell.removeClass("mark1");
                } else {
                    $cell.removeClass("mark2")
                        .addClass("mark1");
                }
                return;
            } else if ($span.hasClass("mark2")) {
                if ($cell.hasClass("mark2")) {
                    $cell.removeClass("mark2");
                } else {
                    $cell.removeClass("mark1")
                        .addClass("mark2");
                }
                return;
            } else if ($span.hasClass("empty")) {
                $cell.text(0).removeClass("mark2").removeClass("mark1").addClass("empty");
                // 取消数字和mark
                return;
            } else {
                // 1 - 9,回填数字
                $cell.removeClass("empty").text($span.text());
            }
        });
    }

    popup($cell) {
        this._$targetCell = $cell;
        const panelCellWidth = this._$panel.find('span').width();
        const {
            left,
            top
        } = $cell.position();
        this._$panel
            .css({
                left: `${left - panelCellWidth}px`,
                top: `${top - panelCellWidth}px`,
                display: "block"
            });
    }

    hide() {
        this._$panel.hide();
    }
}