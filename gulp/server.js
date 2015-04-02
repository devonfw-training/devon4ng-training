/*global config*/
'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var middleware = require('./proxy');
var _ = require('lodash');
var nodemon = require('gulp-nodemon');
var gulpsync = require('gulp-sync')(gulp);

function browserSyncInit(baseDir, files, browser) {
    browser = browser === undefined ? 'default' : browser;
    browserSync.instance = browserSync.init(files, {
        startPath: '/',
        port: 9000,
        server: {
            baseDir: baseDir,
            middleware: middleware,
            routes: null
        },
        browser: browser,
        ghostMode: false
    });
}
gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
        script: 'gulp/express/app.js',
        watch: ['gulp/express/*.js']
    })
        .on('start', function onStart() {
            // ensure start only got called once
            if (!called) {
                cb();
            }
            called = true;
        })
        .on('restart', function onRestart() {
            setTimeout(function reload() {
                browserSync.reload({
                    stream: false
                });
            }, 500);
        });
});

gulp.task('serve', gulpsync.sync(['build', 'nodemon', 'watch']), function () {
    browserSyncInit([
        config.app.tmp(),
        config.app.src(),
        'app/bower_components/bootstrap/dist'
    ], _.flatten([
        config.css.dest.path(),
        config.js.src()
    ]));
});

gulp.task('serve:dist', ['build:dist'], function () {
    browserSyncInit('dist');
});
