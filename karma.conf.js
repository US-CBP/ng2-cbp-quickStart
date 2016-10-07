module.exports = config => {
  config.set({
    frameworks: ['jasmine'],

    files: ['karma.entry.js'],

    preprocessors: {
      'karma.entry.js': ['webpack', 'sourcemap']
    },

    webpack: require('./webpack.config'),

    webpackServer: {
      noInfo: true
    },

    webpackMiddleware: {
        stats: 'minimal'
    },

    reporters: ['progress'],

    logLevel: config.LOG_INFO,

    autoWatch: true,

    singleRun: false,

    browsers: ['Chrome']
  });
};
