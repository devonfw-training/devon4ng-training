'use strict';

var gulp = require('gulp');
global.config = require('./gulp/configFactory.js')(require('./config.json'));
global.isProd = function () {
    return process.env.NODE_ENV === 'prod';
};
require('require-dir')('./gulp', {recurse: false});

gulp.task('default', ['clean'], function () {
    gulp.start('build:dist');
});
