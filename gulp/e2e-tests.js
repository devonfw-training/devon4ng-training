'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('test:e2e', function () {
    return gulp.src(config.scripts.e2eSrc())
        .pipe($.angularProtractor({
            'configFile': 'protractor.conf.js',
            'autoStartStopServer': true,
            'debug': false
        }))
        .on('error', function(e) { throw e });
});