/*global config*/
'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
gulp.task('watch', [], function () {
    gulp.watch(config.css.src(), ['less']);
    gulp.watch(config.index.src(), ['index']);
    gulp.watch(config.html.src(), ['html']);
    gulp.watch(config.js.src(), ['page:reload']);
    gulp.watch('bower.json', ['index']);
    config.ngTemplates.conf().forEach(function (ngTemplatesItemConf) {
        gulp.watch(ngTemplatesItemConf.src, ['ngTemplates[' + ngTemplatesItemConf.file + ']']);
    });
});

gulp.task('page:reload', function(){
    browserSync.instance.reload();
});
