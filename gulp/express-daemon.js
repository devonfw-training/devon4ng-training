/*global config*/
'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
        script: 'gulp/express/app.js',
        watch: ['gulp/express/*.js']
    }).on('start', function onStart() {
        // ensure start only got called once
        if (!called) {
            cb();
        }
        called = true;
    });
});
