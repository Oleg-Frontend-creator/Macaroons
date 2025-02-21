'use strict';

const gulp = require("gulp");
const less = require("gulp-less");
const cleanCss = require("gulp-clean-css");
const rename = require("gulp-rename");
const concatCss = require('gulp-concat-css');

exports.less = function () {
    return gulp.src(["./less/styles.less", "./less/adaptive.less"])
        .pipe(less())
        .pipe(concatCss("style.css"))
        .pipe(
            rename(function (file) {
                file.basename = file.basename + ".min";
            })
        )
        .pipe(cleanCss())
        .pipe(gulp.dest("./css"));
};

exports.watch = function () {
    gulp.watch('./less/*.less', gulp.series('less'));
};