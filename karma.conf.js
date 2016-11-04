// Karma configuration
// Generated on Wed Jul 06 2016 10:19:26 GMT+0200 (W. Europe Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['systemjs', 'jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'dist/main/index.js',
      'dist/**/*.spec.js'
    ],

    systemjs: {
      // Path to your SystemJS configuration file 
      configFile: null,

      includeFiles: [
        'node_modules/angular/angular.min.js',
        'node_modules/angular-sanitize/angular-sanitize.min.js',
        'node_modules/angular-mocks/angular-mocks.js'
      ],
  
      // Patterns for files that you want Karma to make available, but not loaded until a module requests them. eg. Third-party libraries. 
      serveFiles: [
          'dist/!(bundles|demo)/**/*.js'
      ],
  
      // SystemJS configuration specifically for tests, added after your config file. 
      // Good for adding test libraries and mock modules 
      config: {
        transpiler: null,
        defaultJSExtensions: true,
        paths: {
          'systemjs': 'node_modules/systemjs/dist/system.js',
          'system-polyfills': 'node_modules/systemjs/dist/system-polyfills.js'
        }
      }
    },

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'dist/**/!(*.spec).js': 'coverage'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    hostname: "127.0.0.1",

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],  //['Chrome', 'Firefox', 'IE']


    // to fix random disconnect from PhantomJS
    browserDisconnectTimeout : 10000, // default 2000
    browserDisconnectTolerance : 1, // default 0
    browserNoActivityTimeout : 60000, //default 10000


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    coverageReporter: {
      dir : 'coverage/',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' }
      ]
    }
  })
}