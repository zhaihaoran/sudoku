const gulp = require("gulp");
const webpack = require("webpack-stream")
const config = require("./webpack.config.js")

gulp.task("webpack",()=>{
    // 转译Javascript
    gulp.src("./src")
        .pipe(webpack(config))
        .pipe(gulp.dest("../docs"));
});

gulp.task("default",["webpack"])