const path = require('path');

const autoprefixer = require('autoprefixer');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const WebpackMd5Hash = require('webpack-md5-hash');


//=========================================================
//  VARS
//---------------------------------------------------------
const NODE_ENV = process.env.NODE_ENV;

const ENV_DEVELOPMENT = NODE_ENV === 'development';
const ENV_PRODUCTION = NODE_ENV === 'production';
const ENV_TEST = NODE_ENV === 'test';

const HOST = '0.0.0.0';
const PORT = 3000;


//=========================================================
//  LOADERS
//---------------------------------------------------------
const rules = {
  cssStyles: { 
    test: /\.css$/, 
    loader: ['style-loader', 'css-loader'],
    exclude: path.resolve('src/shared/styles')
  },
  componentStyles: {
    test: /\.scss$/,
    loader: 'raw!postcss!sass',
    exclude: path.resolve('src/shared/styles')
  },
  sharedStyles: {
    test: /\.scss$/,
    loader: 'style!css!postcss!sass',
    include: path.resolve('src/shared/styles')
  },
  javascript: {
    test: /\.js$/,
    loader: ['babel-loader'],
    exclude: /node_modules/
  },
  typescript: {
    test: /\.ts$/,
    loader: ['awesome-typescript-loader', 'angular2-template-loader'],
    exclude: /node_modules/
  },
  html: {
    test: /\.html$/,
    loader: 'html?-minimize'
  },
  fontFile: { 
    test: /\.(ttf|otf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loaders: ['file-loader'] 
  },
  fontUrl: { 
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
    loader: 'url-loader?limit=10000&mimetype=application/font-woff'
  },
  imagesFile: {
    test: /\.(jpe?g|png|gif|svg)$/i,
    loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
    ]
  }
};


//=========================================================
//  CONFIG
//---------------------------------------------------------
const config = module.exports = {};

config.resolve = {
  extensions: ['.ts', '.js', '.css', '.scss'],
  modules: [
    path.resolve('.'),
    'node_modules'
  ],
  alias: {
    jquery: 'node_modules/jquery/dist/jquery.js',
    jqueryInputmask: 'node_modules/jquery.inputmask/dist/inputmask/jquery.inputmask.js',
    lodash: 'node_modules/lodash/lodash.min'
  }
};

config.module = {
  rules: [
    rules.javascript,
    rules.typescript,
    rules.cssStyles,
    rules.componentStyles,
    rules.html,
    rules.fontFile,
    rules.fontUrl,
    rules.imagesFile
  ]
};


config.plugins = [
  new ProvidePlugin({
    _: 'lodash',
    jQuery: 'jquery',
    $: 'jquery',
    jquery: 'jquery',
    'jquery.inputmask': 'jqueryInputmask'
  }),
  new DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
  }),
  new LoaderOptionsPlugin({
    debug: false,
    minimize: true,
    options: {
      postcss: [
        autoprefixer({browsers: ['last 3 versions']})
      ],
      resolve: {},
      sassLoader: {
        outputStyle: 'compressed',
        precision: 10,
        sourceComments: false
      },
    }
  }),
  new ContextReplacementPlugin(
    /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
    path.resolve('src')
  )
];

//=====================================
//  DEVELOPMENT or PRODUCTION
//-------------------------------------
if (ENV_DEVELOPMENT || ENV_PRODUCTION) {
  config.entry = {
    main: './src/main.ts',
    polyfills: './src/polyfills.ts'
  };

  config.output = {
    filename: '[name].js',
    path: path.resolve('./target'),
    publicPath: '/'
  };

  config.plugins.push(
    new CommonsChunkPlugin({
      name: ['polyfills'],
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      hash: false,
      inject: 'body',
      template: './src/index.html'
    })
  );
}


//=====================================
//  DEVELOPMENT
//-------------------------------------
if (ENV_DEVELOPMENT) {
  config.devtool = 'inline-source-map';

  config.module.rules.push(rules.sharedStyles);

  config.plugins.push(new ProgressPlugin());

  config.devServer = {
    contentBase: './src',
    historyApiFallback: true,
    host: HOST,
    port: PORT,
    stats: {
      cached: true,
      cachedAssets: true,
      chunks: true,
      chunkModules: false,
      colors: true,
      hash: false,
      reasons: true,
      timings: true,
      version: false
    }
  };
}


//=====================================
//  PRODUCTION
//-------------------------------------
if (ENV_PRODUCTION) {
  config.devtool = 'hidden-source-map';

  config.output.filename = '[name].[chunkhash].js';

  config.module.rules.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('css?-autoprefixer!postcss!sass'),
    include: path.resolve('src/shared/styles')
  });

  config.plugins.push(
    new WebpackMd5Hash(),
    new ExtractTextPlugin('styles.[contenthash].css'),
    new UglifyJsPlugin({
      comments: false,
      compress: {
        dead_code: true, // eslint-disable-line camelcase
        screw_ie8: true, // eslint-disable-line camelcase
        unused: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true  // eslint-disable-line camelcase
      }
    })
  );
}


//=====================================
//  TEST
//-------------------------------------
if (ENV_TEST) {
  config.devtool = 'inline-source-map';

  config.module.rules.push(rules.sharedStyles);
}
