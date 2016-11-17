'use strict';

var
  oasp4js = {
    currentAppDir: ''
  },
// gulp, its plugins and some libraries used
  gulp = require('gulp'),
  gulpSync = require('gulp-sync')(gulp),
  Server = require('karma').Server,
  tsLint = require('gulp-tslint'),
  clean = require('gulp-clean'),
  ts = require('gulp-typescript'),
  sourceMaps = require('gulp-sourcemaps'),
  browserSync = require('browser-sync').create(),
  httpProxy = require('http-proxy'),
  less = require('gulp-less'),
  sass = require('gulp-sass'),
  processHtml = require('gulp-processhtml'),
  historyApiFallback = require('connect-history-api-fallback'),
  currentTsTranspiler = require('typescript'),
  Builder = require('systemjs-builder'),
  usemin = require('gulp-usemin'),
  rev = require('gulp-rev'),
  gulpIf = require('gulp-if'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),

  htmlMin = require('gulp-htmlmin'),
  htmlMinConfig = {
    collapseWhitespace: true,
    caseSensitive: true,
    removeComments: true
  },

// helper functions
  transpileTsToJs = function (sourceRoot) {
    var tsResult = gulp.src(config.tsSources)
      .pipe(sourceMaps.init())
      .pipe(tsProject());

    return tsResult.js
      .pipe(sourceMaps.write('.', {
        includeContent: false,
        sourceRoot: sourceRoot
      }))
      .pipe(gulp.dest(config.transpiledAppDir));
  },

  runKarmaTestsAndWatchForChanges = function (headlessBrowser, done) {
    var karmaConfig = {
      configFile: __dirname + '/karma.conf.js',
      singleRun: false,
      autoWatch: true
    };

    if (headlessBrowser) {
      karmaConfig.browsers = ['PhantomJS'];
    }

    gulp.watch([config.tsSources, config.templateSources, config.lessComponentSources, config.sassComponentSources], ['transpile-ts-to-js-4-tests']);
    new Server(karmaConfig, done).start();
  },

  redirectRestServiceCallsToBackendServer = function () {
    var
      changeCookiePathToHandleServerContextPath = function (proxyRes) {
        if (proxyRes.headers['set-cookie']) {
          proxyRes.headers['set-cookie'][0] = proxyRes.headers['set-cookie'][0].replace(config.proxy.contextPath, '');
        }
      },

      redirectErrors = function (error, req, res) {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        console.error('[Proxy] Error response received: ', error);
      },

      backendServerProxy = httpProxy.createProxyServer({
        target: config.proxy.url()
      });

    backendServerProxy.on('error', redirectErrors);
    backendServerProxy.on('proxyRes', changeCookiePathToHandleServerContextPath);

    return function (req, res, next) {
      if (new RegExp(config.proxy.serverPathRegExp).test(req.url)) {
        backendServerProxy.web(req, res);
      } else {
        next();
      }
    };
  },

  browserSyncConfigFactory = function (routes) {
    return {
      online: false,
      ghostMode: false,
      server: {
        baseDir: [config.currentDistDir()],
        routes: routes || null,
        middleware: [
          redirectRestServiceCallsToBackendServer(),
          historyApiFallback() // to return index.html while refreshing or bookmarking (HTML5 navigation)
        ]
      }
    };
  },

// TypeScript project
  tsProject = ts.createProject({
    // these settings comes from tsconfig.json (except for sourceMap; source maps are generated using gulp-sourcemaps)
    target: 'es5',
    module: 'commonjs',
    moduleResolution: 'node',
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    removeComments: false,
    noImplicitAny: true,
    suppressImplicitAnyIndexErrors: true,
    typeRoots: [
      './node_modules/@types/'
    ],

    // these settings are specific to gulp-typescript
    declaration: false,
    typescript: currentTsTranspiler
  }),

  polyfillPaths = [
    'node_modules/core-js/client/shim.min.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/zone.js/dist/zone.js'],

// configuration (to be externalized to oasp4js.config.json)
  config = function () {
    var
      externalConfig = require('./oasp4js.config.json'),
      devMode = true,
      appDir = (externalConfig.paths && externalConfig.paths.src) || 'app',
      devDir = (externalConfig.paths && externalConfig.paths.tmp) || '.tmp',
      prodDir = (externalConfig.paths && externalConfig.paths.dist) || 'dist',
      imagesDir = (externalConfig.paths && externalConfig.paths.img) || 'images',
      fontsDir = (externalConfig.paths && externalConfig.paths.fonts) || 'fonts',
      mainLessPath = 'styles.less',
      mainSassPath = 'styles.scss',
      lessComponentSources = appDir + '/**/*.component.less',
      sassComponentSources = appDir + '/**/*.component.scss',
      currentDistDir = function () {
        return devMode ? devDir : prodDir;
      };

    return {
      setForProd: function () {
        devMode = false;
      },
      isProd: function () {
        return !devMode;
      },
      tmpDir: devDir,
      srcDir: appDir,
      distDir: prodDir,
      imagesDir: imagesDir,
      fontsDir: fontsDir,
      isDev: devMode,
      transpiledAppDir: devDir + '/' + appDir,
      imageSources: appDir + '/**/' + imagesDir + '/**/*.*',
      fontSources: appDir + '/**/' + fontsDir + '/**/*.*',
      cssDir: devDir + '/' + 'css',
      fontsInCurrentDistDir: function () {
        return currentDistDir() + '/' + fontsDir;
      },
      mainLessPath: mainLessPath,
      mainSassPath: mainSassPath,
      mainHtmlPath: 'index.html',
      tsSources: appDir + '/**/*.ts',
      tsSources4Test: devDir + '/' + appDir + '/**/*.ts',
      templateSources: appDir + '/**/*.html',
      lessSourcesExceptComponentOnes: [mainLessPath, appDir + '/**/*.less', '!' + lessComponentSources],
      sassSourcesExceptComponentOnes: [mainSassPath, appDir + '/**/*.scss', '!' + sassComponentSources],
      lessComponentSources: lessComponentSources,
      sassComponentSources: sassComponentSources,
      currentDistDir: currentDistDir,
      currentEnvFile: function () {
        return 'environment.' + (this.isProd() ? 'prod' : 'dev') + '.ts';
      },
      proxy: {
        serverPathRegExp: externalConfig.proxy && externalConfig.proxy.servicesPath,
        baseUrl: externalConfig.proxy && externalConfig.proxy.baseUrl,
        contextPath: externalConfig.proxy && externalConfig.proxy.context,
        url: function () {
          return (this.baseUrl ? this.baseUrl : '') + (this.contextPath ? this.contextPath : '');
        }
      },
      currentBaseHref: function () {
        var href = '/';
        if (this.isProd() && this.proxy && this.proxy.contextPath && this.proxy.contextPath !== '/') {
          href = this.proxy.contextPath + href;
        }
        return href;
      }
    };
  }();

// for communication (through global oasp4js namespace) between gulp and systemjs.config.js on current app directory
global.oasp4js = oasp4js;

gulp.task('copy-favicon-icon', function () {
  return gulp.src('favicon.ico')
    .pipe(gulp.dest(config.currentDistDir()));
});

gulp.task('copy-images', function () {
  return gulp.src(config.imageSources)
    .pipe(rename(function (path) {
      // e.g.: module/component/images/logos/logo.png -> logos/logo.png
      path.dirname = path.dirname.replace(new RegExp('(.*)' + config.imagesDir), '');
    }))
    .pipe(gulp.dest(config.currentDistDir() + '/' + config.imagesDir));
});

gulp.task('reload-browser-after-copying-images', ['copy-images'], function (done) {
  browserSync.reload();
  done();
});

gulp.task('copy-fonts', function () {
  return gulp.src(config.fontSources)
    .pipe(rename(function (path) {
      // e.g.: module/component/fonts/my-font.ttf -> my-font.ttf
      path.dirname = path.dirname.replace(new RegExp('(.*)' + config.fontsDir), '');
    }))
    .pipe(gulp.dest(config.fontsInCurrentDistDir()));
});

gulp.task('reload-browser-after-copying-fonts', ['copy-fonts'], function (done) {
  browserSync.reload();
  done();
});

gulp.task('copy-bootstrap-fonts', function () {
  return gulp.src('node_modules/bootstrap-css-only/fonts/*.{eot,svg,ttf,woff,woff2}')
    .pipe(gulp.dest(config.fontsInCurrentDistDir()));
});

gulp.task('copy-templates', function () {
  return gulp.src(config.templateSources)
    .pipe(gulpIf(config.isProd(), htmlMin(htmlMinConfig)))
    .pipe(gulp.dest(config.transpiledAppDir));
});

gulp.task('compile-main-less-and-copy-it', function () {
  return gulp.src(config.mainLessPath)
    .pipe(less())
    .pipe(gulp.dest(config.cssDir))
    .pipe(browserSync.stream());
});

gulp.task('compile-main-sass-and-copy-it', function () {
  return gulp.src(config.mainSassPath)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.cssDir))
    .pipe(browserSync.stream());
});

gulp.task('compile-component-less-styles-and-copy-them', function () {
  return gulp.src(config.lessComponentSources)
    .pipe(less())
    .pipe(gulpIf(config.isProd(), cleanCss()))
    .pipe(gulp.dest(config.transpiledAppDir));
});

gulp.task('compile-component-sass-styles-and-copy-them', function () {
  return gulp.src(config.sassComponentSources)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpIf(config.isProd(), cleanCss()))
    .pipe(gulp.dest(config.transpiledAppDir));
});

gulp.task('process-main-html-and-copy-it', function () {
  return gulp.src(config.mainHtmlPath)
    .pipe(processHtml({
      commentMarker: 'process', // use <!-- process:... --> comment markers to not conflict with usemin ones: <!-- build:css ... -->
      environment: config.isProd() ? 'prod' : 'dev',
      data: {
        contextPath: config.currentBaseHref()
      }
    }))
    .pipe(gulpIf(config.isProd(), usemin({
      path: config.tmpDir,
      css: [cleanCss(), rev()],
      js: [rev()]
    })))
    .pipe(gulp.dest(config.currentDistDir()));
});

gulp.task('copy-env-file', function () {
  var envDir = config.srcDir + '/_env/';
  return gulp.src(envDir + config.currentEnvFile())
    .pipe(rename(function (path) {
      path.basename = 'environment';
    }))
    .pipe(gulp.dest(envDir));

});

gulp.task('transpile-ts-to-js', ['copy-templates', 'copy-env-file', 'compile-component-less-styles-and-copy-them', 'compile-component-sass-styles-and-copy-them'], function () {
  return transpileTsToJs('/' + config.srcDir);
});

gulp.task('transpile-ts-to-js-4-tests', ['copy-templates', 'copy-env-file', 'compile-component-less-styles-and-copy-them', 'compile-component-sass-styles-and-copy-them'], function () {
  return transpileTsToJs('/base/' + config.srcDir);
});

gulp.task('reload-browser-after-transpilation', ['transpile-ts-to-js'], function (done) {
  browserSync.reload();
  done();
});

gulp.task('reload-browser-after-processing-main-html', ['process-main-html-and-copy-it'], function (done) {
  browserSync.reload();
  done();
});

gulp.task('build', ['transpile-ts-to-js', 'process-main-html-and-copy-it', 'compile-main-less-and-copy-it', 'compile-main-sass-and-copy-it', 'copy-bootstrap-fonts', 'copy-favicon-icon', 'copy-images', 'copy-fonts']);

gulp.task('serve', ['build'], function () {
  browserSync.init(
    browserSyncConfigFactory({
      '/node_modules': 'node_modules',
      '/systemjs.config.js': 'systemjs.config.js',
      '/app': config.srcDir // for getting TypeScript sources from within source maps
    })
  );

  gulp.watch([config.tsSources, config.templateSources, config.lessComponentSources, config.sassComponentSources], ['reload-browser-after-transpilation']);
  gulp.watch([config.lessSourcesExceptComponentOnes], ['compile-main-less-and-copy-it']);
  gulp.watch([config.sassSourcesExceptComponentOnes], ['compile-main-sass-and-copy-it']);
  gulp.watch([config.mainHtmlPath], ['reload-browser-after-processing-main-html']);
  gulp.watch([config.imageSources], ['reload-browser-after-copying-images']);
  gulp.watch([config.fontSources], ['reload-browser-after-copying-fonts']);
});

gulp.task('set-prod-config', function () {
  config.setForProd();
});

gulp.task('minify-main-html-in-dist', function () {
  return gulp.src(config.distDir + '/' + config.mainHtmlPath)
    .pipe(htmlMin(htmlMinConfig))
    .pipe(gulp.dest(config.distDir));
});

gulp.task('build-systemjs-self-executable-js', ['transpile-ts-to-js'], function (done) {
  oasp4js.currentAppDir = config.transpiledAppDir;
  try {
    new Builder('.', './systemjs.config.js')
      .buildStatic(
        polyfillPaths.join(' + ') + ' + ' + config.transpiledAppDir + '/main.js',
        config.transpiledAppDir + '/main-sfx.js',
        {minify: true, runtime: false}) // no transpiler runtime needed
      .then(function () {
        done();
      })
      .catch(function (error) {
        done(error);
      });
  } catch (error) {
    done(error);
  }
});

gulp.task('build:dist', gulpSync.sync([
  ['set-prod-config'],
  ['build-systemjs-self-executable-js', 'compile-main-less-and-copy-it', 'compile-main-sass-and-copy-it', 'copy-bootstrap-fonts', 'copy-favicon-icon', 'copy-images', 'copy-fonts'],
  ['process-main-html-and-copy-it'],
  ['minify-main-html-in-dist']]));

gulp.task('serve:dist', ['build:dist'], function () {
  browserSync.init(browserSyncConfigFactory());
});

gulp.task('clean', function () {
  return gulp.src([config.tmpDir, config.distDir], {read: false})
    .pipe(clean({force: true}));
});

gulp.task('test:tdd', ['transpile-ts-to-js-4-tests'], function (done) {
  runKarmaTestsAndWatchForChanges(true, done);
});

gulp.task('test:tdd:debug', ['transpile-ts-to-js-4-tests', 'copy-images'], function (done) {
  runKarmaTestsAndWatchForChanges(false, done);
});

gulp.task('test', gulpSync.sync(['lint', 'transpile-ts-to-js-4-tests']), function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    browsers: ['PhantomJS'],
    singleRun: true,
    autoWatch: false
  }, done).start();
});

gulp.task('lint', function () {
  return gulp.src(config.tsSources)
    .pipe(tsLint({
      formatter: 'prose'
    }))
    .pipe(tsLint.report({
      emitError: true,
      summarizeFailureOutput: true
    }))
});

gulp.task('default', gulpSync.sync(['clean', 'serve']));
