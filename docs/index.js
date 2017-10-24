/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var matrixToolkit = {
    makeRow: function makeRow() {
        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        var array = new Array(9);
        // es6的新语法
        array.fill(v);
        return array;
    },
    makeMatrix: function makeMatrix() {
        var _this = this;

        var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        // 学习！
        // Array.from 可以对伪数组或可迭代对象转换成数组对象
        // Array.from(arrayLike, mapFn, thisArg)
        return Array.from({
            length: 9
        }, function () {
            return _this.makeRow(v);
        });
        // const array = new Array(9);
        // 这个实际上只生成了一行数据，其他的只是把地址复制到了每一行。
        // array.fill(makeRow(v));
        // return array;
    },


    // fisher-yates 洗牌算法 （随机算法）
    // http://www.imooc.com/video/15879

    shuffle: function shuffle(array) {
        // 因为最后一个元素是不用进行交换的，所以我们只用进行array.length-2次循环
        var endIndex = array.length - 2;
        for (var i = 0; i <= endIndex; i++) {
            // 第二个序号
            var j = i + Math.floor(Math.random() * (array.length - i));
            // 然后交换两个数,使用解构赋值快速完成交换！！
            var _ref = [array[j], array[i]];
            array[i] = _ref[0];
            array[j] = _ref[1];
        }
        return array;
    },


    checkFillable: function checkFillable(matrix, n, rowIndex, colIndex) {
        // 取到行数据
        var row = matrix[rowIndex];
        // 取到列数据
        // const column = [matrix[0][colIndex],matrix[1][colIndex],.....]
        // 二维数组取一列数据的取法！！！！
        var column = this.makeRow().map(function (v, i) {
            return matrix[i][colIndex];
        });
        // 计算出宫序号

        var _boxToolkit$convertTo = boxToolkit.convertToBoxIndex(rowIndex, colIndex),
            boxIndex = _boxToolkit$convertTo.boxIndex;
        // 取到宫数据


        var box = boxToolkit.getBoxCells(matrix, boxIndex);

        // 判断是否可以填入
        for (var i = 0; i < 9; i++) {
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
var boxToolkit = {
    convertToBoxIndex: function convertToBoxIndex(rowIndex, colIndex) {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        };
    },
    convertFromBoxIndex: function convertFromBoxIndex(boxIndex, cellIndex) {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        };
    },


    /**
     * 获取宫数据
     * 
     * @param {any} matrix 
     * @param {any} boxIndex 
     * @returns 
     */
    getBoxCells: function getBoxCells(matrix, boxIndex) {
        var startRowIndex = Math.floor(boxIndex / 3) * 3;
        var startColIndex = boxIndex % 3 * 3;
        var result = [];
        for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
            var rowIndex = startRowIndex + Math.floor(cellIndex / 3);
            var colIndex = startColIndex + cellIndex % 3;
            result.push(matrix[rowIndex][colIndex]);
        }
        return result;
    }
};

// 工具集

module.exports = function () {
    function ToolKit() {
        _classCallCheck(this, ToolKit);
    }

    _createClass(ToolKit, null, [{
        key: "matrix",

        /**
         * 矩阵和数组相关工具
         * 
         * @readonly
         * @static
         */
        get: function get() {
            return matrixToolkit;
        }
        /**
         * 宫坐标系相关工具
         * 
         * @readonly
         * @static
         */

    }, {
        key: "box",
        get: function get() {
            return boxToolkit;
        }
    }]);

    return ToolKit;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 生成数组解决方案的js
var ToolKit = __webpack_require__(0);
module.exports = function () {
    function Generator() {
        _classCallCheck(this, Generator);
    }

    _createClass(Generator, [{
        key: "generate",
        value: function generate() {
            while (!this.internalGenerate()) {
                console.warn("try again");
            }
        }
    }, {
        key: "internalGenerate",
        value: function internalGenerate() {

            this.matrix = ToolKit.matrix.makeMatrix();
            // 随机打乱序号位置
            this.orders = ToolKit.matrix.makeMatrix().map(function (row) {
                return row.map(function (v, i) {
                    return i;
                });
            }).map(function (row) {
                return ToolKit.matrix.shuffle(row);
            });
            for (var n = 1; n <= 9; n++) {
                if (!this.fillNumber(n)) {
                    return false;
                }
            }
            return true;
        }
    }, {
        key: "fillNumber",
        value: function fillNumber(n) {
            return this.fillRow(n, 0);
        }
    }, {
        key: "fillRow",
        value: function fillRow(n, rowIndex) {

            if (rowIndex > 8) {
                return true;
            }
            // 先取到行数据
            var row = this.matrix[rowIndex];
            // 随机选择列
            var orders = this.orders[rowIndex];

            for (var i = 0; i < 9; i++) {
                var colIndex = orders[i];
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
    }]);

    return Generator;
}();

// const generater = new Generator();

// generater.generate()

// console.log(generater.matrix);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

var Grid = __webpack_require__(8);
var PopupNumbers = __webpack_require__(11);

var grid = new Grid($('#container'));
grid.build();
grid.layout();

var popupNumbers = new PopupNumbers($('#popupNumbers'));
grid.bindPopup(popupNumbers);

$("#check").on('click', function (e) {
    if (grid.check()) {
        alert("成功");
    };
});
$("#reset").on('click', function (e) {
    grid.reset();
});
$("#clear").on('click', function (e) {
    grid.clear();
});
$("#rebuild").on('click', function (e) {
    grid.rebuild();
});
// 设置难度
$('#level').on('change', function (e) {
    var value = e.target.value;
    grid.changeLevel(parseInt(value));
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/cjs.js!./main.less", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/cjs.js!./main.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(undefined);
// imports


// module
exports.push([module.i, "html {\n  font-size: 14px;\n}\nbody {\n  margin: 0;\n  padding: 0;\n  background: #eeeeee;\n  font-family: \"\\5FAE\\8F6F\\96C5\\9ED1\";\n  user-select: none;\n  max-width: 450px;\n}\nbody .title {\n  padding: 1rem 5%;\n  background: steelblue;\n  color: white;\n  box-shadow: 0 0.2rem 0.3rem #303030;\n}\nbody .title h1 {\n  text-align: center;\n  margin: 0;\n  padding: 0;\n}\nbody .hidden {\n  display: none;\n}\nbody .dashboard {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  padding: 1rem 0;\n  box-sizing: border-box;\n  box-shadow: 0 -0.1rem, 0.2rem #303030;\n  height: 3rem;\n}\nbody .dashboard .buttons {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  top: 0;\n}\nbody .dashboard .buttons .button {\n  border: 0;\n  border-radius: 3px;\n  line-height: 1.4;\n  font-size: 14px;\n  float: left;\n  width: 20%;\n  height: 3rem;\n  font-size: white;\n  border: 1px solid #cccccc;\n  background: transparent;\n}\nbody .dashboard .buttons .button.select {\n  padding-left: 15px;\n}\nbody .container {\n  position: relative;\n  margin-top: 20%;\n  padding: 5%;\n}\nbody .container div.row.row_g_bottom > span {\n  border-bottom-width: 1px;\n}\nbody .container div.row:first-child > span {\n  border-top-width: 2px;\n}\nbody .container div.row:last-child > span {\n  border-bottom-width: 2px;\n}\nbody .container span {\n  display: inline-block;\n  cursor: pointer;\n  text-align: center;\n  width: 11%;\n  box-sizing: border-box;\n  height: 24px;\n  line-height: 24px;\n  background: white;\n  border: 1px solid #888;\n  border-right-width: 0;\n  border-bottom-width: 0;\n}\nbody .container span:first-child {\n  border-left-width: 2px;\n}\nbody .container span:last-child {\n  border-right-width: 2px;\n}\nbody .container span.empty {\n  color: white;\n}\nbody .container span.fixed {\n  background: #cccccc;\n}\nbody .container span.error {\n  background: lightpink;\n}\nbody .container span.error.empty {\n  color: lightpink;\n}\nbody .container span.mark1 {\n  background: lightblue;\n}\nbody .container span.mark1.empty {\n  color: lightblue;\n}\nbody .container span.mark2 {\n  background: lightgreen;\n}\nbody .container span.mark2.empty {\n  color: lightgreen;\n}\nbody .container span.col_g_left {\n  border-left-width: 2px;\n}\nbody .popup-num {\n  position: relative;\n  margin-top: 20%;\n  padding: 5%;\n  width: 120px;\n  position: absolute;\n  padding: 0;\n}\nbody .popup-num div.row.row_g_bottom > span {\n  border-bottom-width: 1px;\n}\nbody .popup-num div.row:first-child > span {\n  border-top-width: 2px;\n}\nbody .popup-num div.row:last-child > span {\n  border-bottom-width: 2px;\n}\nbody .popup-num span {\n  display: inline-block;\n  cursor: pointer;\n  text-align: center;\n  width: 11%;\n  box-sizing: border-box;\n  height: 24px;\n  line-height: 24px;\n  background: white;\n  border: 1px solid #888;\n  border-right-width: 0;\n  border-bottom-width: 0;\n}\nbody .popup-num span:first-child {\n  border-left-width: 2px;\n}\nbody .popup-num span:last-child {\n  border-right-width: 2px;\n}\nbody .popup-num span.empty {\n  color: white;\n}\nbody .popup-num span.fixed {\n  background: #cccccc;\n}\nbody .popup-num span.error {\n  background: lightpink;\n}\nbody .popup-num span.error.empty {\n  color: lightpink;\n}\nbody .popup-num span.mark1 {\n  background: lightblue;\n}\nbody .popup-num span.mark1.empty {\n  color: lightblue;\n}\nbody .popup-num span.mark2 {\n  background: lightgreen;\n}\nbody .popup-num span.mark2.empty {\n  color: lightgreen;\n}\nbody .popup-num span.col_g_left {\n  border-left-width: 2px;\n}\nbody .popup-num span {\n  width: 40px;\n  height: 40px;\n  line-height: 40px;\n}\n", ""]);

// exports


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(7);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 生成九宫格
var Toolkit = __webpack_require__(0);
var Generator = __webpack_require__(1);
var Sudoku = __webpack_require__(9);
var Checker = __webpack_require__(10);

var Grid = function () {
    function Grid(container) {
        _classCallCheck(this, Grid);

        this._$container = container;
    }

    _createClass(Grid, [{
        key: "build",
        value: function build(level) {
            var sudoku = new Sudoku();
            this.level = level || 5;
            sudoku.make(this.level);
            var matrix = sudoku.puzzleMatrix;

            // const generator = new Generator();
            // generator.generate();
            // const matrix = generator.matrix;

            // 定义宫的class
            var rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
            var colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"];

            var $cells = matrix.map(function (rowValues) {
                return rowValues.map(function (cellValue, colIndex) {
                    return $("<span>").addClass(colGroupClasses[colIndex % 3]).addClass(cellValue ? "fixed" : "empty").text(cellValue);
                });
            });

            // $spanArray 为参数
            var $divArray = $cells.map(function ($spanArray, rowIndex) {
                return $("<div>").addClass("row").addClass(rowGroupClasses[rowIndex % 3]).append($spanArray);
            });

            this._$container.append($divArray);
        }
    }, {
        key: "layout",
        value: function layout() {
            var width = $("span:first", this._$container).width();
            $("span", this._$container).height(width).css({
                "line-height": width + "px",
                "font-size": width < 32 ? width / 2 + "px" : ""
            });
        }
    }, {
        key: "bindPopup",
        value: function bindPopup(popupNumbers) {
            // 事件代理！
            this._$container.on("click", "span", function (e) {
                var $cell = $(e.target);
                if ($cell.is('.fixed')) {
                    return;
                }
                popupNumbers.popup($cell);
            });
        }

        /**
         * 重建新棋盘
         * 
         * @memberof Grid
         */

    }, {
        key: "rebuild",
        value: function rebuild(level) {
            this._$container.empty();
            this.build(level || this.level);
            this.layout();
        }

        /**
         * 检查用户解谜结果，如果成功则提示，失败则显示错误标记
         * 
         * @memberof Grid
         */

    }, {
        key: "check",
        value: function check() {
            // 从界面中获取填充后的数据
            var data = this._$container.children().map(function (rowIndex, div) {
                return $(div).children().map(function (colIndex, span) {
                    return parseInt($(span).text()) || 0;
                });
            })
            // 转换成原生数组
            .toArray().map(function ($data) {
                return $data.toArray();
            });

            console.log(data);
            var checker = new Checker(data);
            // 开始检查
            if (checker.check()) {
                return true;
            }
            // 不成功，则开始标记 , 循环标记
            var marks = checker.matrixMarks;
            this._$container.children().each(function (rowIndex, div) {
                $(div).children().each(function (colIndex, span) {
                    var $span = $(span);
                    // 不能标记之前固定的fixed的class样式，方便以后清空
                    if ($span.is(".fixed") || marks[rowIndex][colIndex]) {
                        $span.removeClass("error");
                    } else {
                        $span.addClass("error");
                    }
                });
            });
        }
        /**
         * 重置当前棋盘到初始位置
         * 
         * @memberof Grid
         */

    }, {
        key: "reset",
        value: function reset() {
            this._$container.find('span:not(.fixed)').removeClass("error mark1 mark2").addClass("empty").text(0);
        }

        /**
         * 清理错误标记
         * 
         * @memberof Grid
         */

    }, {
        key: "clear",
        value: function clear() {
            this._$container.find('span.error').removeClass("error");
        }

        /**
         * 改变等级
         * 
         * @param {any} level 
         * @memberof Grid
         */

    }, {
        key: "changeLevel",
        value: function changeLevel(level) {
            this.level = level;
            this.rebuild(this.level);
        }
    }]);

    return Grid;
}();

module.exports = Grid;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 生成数独游戏

/**
 * 步骤：
 * 1. 生成完成的解决方案，Generator
 * 2. 随机去除部分数据，按比例
 */

var Generator = __webpack_require__(1);
var Toolkit = __webpack_require__(0);

module.exports = function () {
    function Sudoku() {
        _classCallCheck(this, Sudoku);

        // 生成解决方案
        var generator = new Generator();
        generator.generate();
        this.solutionMatrix = generator.matrix;
    }

    _createClass(Sudoku, [{
        key: "make",
        value: function make(level) {
            // 生成谜盘
            this.puzzleMatrix = this.solutionMatrix.map(function (row) {
                return row.map(function (cell) {
                    return Math.random() * 9 < level ? 0 : cell;
                });
            });

            // 中高难度下，判断宫格是否填充了9个，如果9个全填则重新生成谜盘
            if (level > 4) {
                for (var i = 0; i < 9; i++) {
                    var box = Toolkit.box.getBoxCells(this.puzzleMatrix, i);
                    if (box.every(function (v) {
                        return v;
                    })) {
                        console.log("重新生成谜盘");
                        return this.make();
                    }
                }
            }
        }
    }]);

    return Sudoku;
}();

console.log([2, 3, 0].every(function (a) {
    return a;
}));

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 做真值表判断并记录错误数据 
function checkArray(array) {
    var length = array.length;
    var marks = new Array(length);
    marks.fill(true);

    for (var i = 0; i < length; i++) {
        var v = array[i];
        // 是否有效 0-无效 ，1-9 有效，是否有重复：i+1 ~length-1 是否和i位置的数据重复
        if (!v) {
            marks[i] = false;
            continue;
        }

        for (var j = i + 1; j < length; j++) {
            if (v === array[j]) {
                marks[i] = marks[j] = false;
            }
        }
    }
    return marks;
}

var ToolKit = __webpack_require__(0);

// 输入：matrix 用户完成的数独数据：9*9
// 处理：对matrix 行列宫进行检查，并填写marks
// 输出：检查是否成功、 marks


module.exports = function () {
    function Checker(matrix) {
        _classCallCheck(this, Checker);

        this._matrix = matrix;
        this._matrixMarks = ToolKit.matrix.makeMatrix(true);
    }

    _createClass(Checker, [{
        key: "check",
        value: function check() {
            this.checkRows();
            this.checkCols();
            this.checkBoxs();

            // 检查是否成功
            // Array.prototype.every  对数组的每一个元素进行检查，其中有一个元素返回false，则整体返回false，否则返回true
            this._success = this._matrixMarks.every(function (row) {
                return row.every(function (mark) {
                    return mark;
                });
            });
            return this._success;
        }
    }, {
        key: "checkRows",
        value: function checkRows() {
            for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
                var rows = this._matrix[rowIndex];
                var marks = checkArray(rows);

                for (var colIndex = 0; colIndex < marks.length; colIndex++) {
                    if (!marks[colIndex]) {
                        this._matrixMarks[rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: "checkCols",
        value: function checkCols() {
            for (var colIndex = 0; colIndex < 9; colIndex++) {
                var cols = [];
                for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
                    cols[rowIndex] = this._matrix[rowIndex][colIndex];
                }
                // const col = ToolKit.matrix.makeRow().map((v, i) => {
                //     this._matrix[i][colIndex]
                // })
                // console.log(col);
                var marks = checkArray(cols);

                for (var _rowIndex = 0; _rowIndex < marks.length; _rowIndex++) {
                    if (!marks[_rowIndex]) {
                        this._matrixMarks[_rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: "checkBoxs",
        value: function checkBoxs() {
            for (var boxIndex = 0; boxIndex < 9; boxIndex++) {
                var boxes = ToolKit.box.getBoxCells(this._matrix, boxIndex);
                var marks = checkArray(boxes);
                for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
                    if (!marks[cellIndex]) {
                        var _ToolKit$box$convertF = ToolKit.box.convertFromBoxIndex(boxIndex, cellIndex),
                            rowIndex = _ToolKit$box$convertF.rowIndex,
                            colIndex = _ToolKit$box$convertF.colIndex;

                        this._matrixMarks[rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: "matrixMarks",
        get: function get() {
            return this._matrixMarks;
        }
    }, {
        key: "isSuccess",
        get: function get() {
            return this._success;
        }
    }]);

    return Checker;
}();

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

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 弹出操作面板
module.exports = function () {
    function PopupNumbers($panel) {
        var _this = this;

        _classCallCheck(this, PopupNumbers);

        this._$panel = $panel.hide().removeClass("hidden");

        this._$panel.on("click", "span", function (e) {
            var $cell = _this._$targetCell;
            var $span = $(e.target);
            // mark1,mark2 回填样式
            _this.hide();
            if ($span.hasClass("mark1")) {
                if ($cell.hasClass("mark1")) {
                    $cell.removeClass("mark1");
                } else {
                    $cell.removeClass("mark2").addClass("mark1");
                }
                return;
            } else if ($span.hasClass("mark2")) {
                if ($cell.hasClass("mark2")) {
                    $cell.removeClass("mark2");
                } else {
                    $cell.removeClass("mark1").addClass("mark2");
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

    _createClass(PopupNumbers, [{
        key: "popup",
        value: function popup($cell) {
            this._$targetCell = $cell;
            var panelCellWidth = this._$panel.find('span').width();

            var _$cell$position = $cell.position(),
                left = _$cell$position.left,
                top = _$cell$position.top;

            this._$panel.css({
                left: left - panelCellWidth + "px",
                top: top - panelCellWidth + "px",
                display: "block"
            });
        }
    }, {
        key: "hide",
        value: function hide() {
            this._$panel.hide();
        }
    }]);

    return PopupNumbers;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map