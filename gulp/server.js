/*global config*/
'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var _ = require('lodash');
var gulpsync = require('gulp-sync')(gulp);

function browserSyncInit(baseDir, files, browser) {
    browser = browser === undefined ? 'default' : browser;
    browserSync.instance = browserSync.init(files, {
        startPath: '/',
        port: 9000,
        server: {
            baseDir: baseDir,
            routes: null
        },
        browser: browser
    });
}

gulp.task('serve', gulpsync.sync(['build', 'watch']), function () {
    browserSyncInit([
        config.app.tmp(),
        config.app.src(),
        'app/bower_components/bootstrap/dist'
    ], _.flatten([
        config.css.dest.path(),
        config.js.src(),
        '.tmp/index.html'
    ]));
});

gulp.task('serve:dist', ['build:dist'], function () {
    browserSyncInit('dist');
});
