// #docregion
module.exports = function(config) {
  var appBase    = '.tmp/app/';       // transpiled app JS and map files
  var appSrcBase = 'app/';            // app source TS files
  var appAssets  = '/base/.tmp/app/'; // component assets fetched by Angular's compiler

  var testBase    = 'testing/';       // transpiled test JS and map files
  var testSrcBase = 'testing/';       // test source TS files

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-phantomjs-launcher')
    ],

    files: [
      // System.js polyfills needed by PhantomJS (Chrome doesn't need them)
      'node_modules/systemjs/dist/system-polyfills.src.js',
      // System.js for module loading
      'node_modules/systemjs/dist/system.src.js',

      // Polyfills
      'node_modules/core-js/client/shim.js',
      'node_modules/reflect-metadata/Reflect.js',

      // zone.js
      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/long-stack-trace-zone.js',
      'node_modules/zone.js/dist/proxy.js',
      'node_modules/zone.js/dist/sync-test.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/fake-async-test.js',

      // RxJs
      { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },

      // included as node_modules/reflect-metadata/Reflect.js.map is requested during the test execution
      { pattern: 'node_modules/reflect-metadata/**/*.js.map', included: false, watched: false },

      // Paths loaded via module imports:
      // Angular itself
      {pattern: 'node_modules/@angular/**/*.js', included: false, watched: false},
      {pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false},

      // System.js text plugin for importing templates and styles
      {pattern: 'node_modules/systemjs-plugin-text/text.js', included: false, watched: false},
      // lodash
      {pattern: 'node_modules/lodash/**/*.js', included: false, watched: false},

      {pattern: 'systemjs.config.js', included: false, watched: false},
      'karma-test-shim.js',

      // transpiled application & spec code paths loaded via module imports
      {pattern: appBase + '**/*.js', included: false, watched: true},

      // Asset (HTML & CSS) paths loaded via Angular's component compiler
      // (these paths need to be rewritten, see proxies section)
      {pattern: appBase + '**/*.html', included: false, watched: true},
      {pattern: appBase + '**/*.css', included: false, watched: true},

      // Paths for debugging with source maps in dev tools
      {pattern: appSrcBase + '**/*.ts', included: false, watched: false},
      {pattern: appBase + '**/*.js.map', included: false, watched: false}
    ],

    // Proxied base paths for loading assets
    proxies: {
      // required for component assets fetched by Angular's compiler
      '/.tmp/app/': appAssets
    },

    exclude: [],
    preprocessors: {},
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  })
};
