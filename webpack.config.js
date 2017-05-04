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
        exclude: path.resolve('src/shared/styles'),
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
    },
    componentStyles: {
        test: /\.scss$/,
        exclude: path.resolve('src/shared/styles'),
        use: ['raw-loader', 'sass-loader']
    },
    globalStyles: {
        test: /\.scss$/,
        include: path.resolve('src/shared/styles'),
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
    },
    typescript: {
        test: /\.ts$/,
        use: ['awesome-typescript-loader', 'angular2-template-loader']
    },
    html: {
        test: /\.html$/,
        use: ['html-loader?-minimize']
    },
    fontFile: {
        test: /\.(ttf|otf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['file-loader']
    },
    fontUrl: {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['url-loader?limit=10000&mimetype=application/font-woff']
    },
    imagesFile: {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
            'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
            {
                loader: 'image-webpack-loader',
                query: {
                    gifsicle: {
                        interlaced: false
                    },
                    optipng: {
                        optimizationLevel: 7
                    }
                }
            }
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
        path.join(__dirname, 'node_modules'),
        'node_modules'
    ],
    alias: {
    }
};

config.module = {
    rules: [
        rules.typescript,
        rules.cssStyles,
        rules.componentStyles,
        rules.html,
        rules.fontFile,
        rules.fontUrl,
        rules.imagesFile,
        rules.globalStyles
    ]
};

config.plugins = [
    new ExtractTextPlugin('[name].css'),
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
                autoprefixer({ browsers: ['last 3 versions'] })
            ],
            resolve: {},
            sassLoader: {
                outputStyle: 'compressed',
                precision: 10,
                sourceComments: false
            }
        }
    }),
    new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        path.resolve('src')
    )
];

//=====================================
//  DEVELOPMENT or PRODUCTION
//-------------------------------------
if(ENV_DEVELOPMENT || ENV_PRODUCTION) {
    config.entry = {
        main: './src/main.ts',
        vendor: './src/vendor.ts',
        polyfills: './src/polyfills.ts'
    };

    config.output = {
        filename: '[name].js',
        path: path.resolve('./target'),
        publicPath: ENV_PRODUCTION ? './' : '/'
    };

    config.plugins.push(
        new CommonsChunkPlugin({
            name: ['main', 'vendor', 'polyfills'],
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
if(ENV_DEVELOPMENT) {
    config.devtool = 'inline-source-map';

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
if(ENV_PRODUCTION) {
    config.devtool = 'hidden-source-map';

    config.output.filename = '[name].[chunkhash].js';

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
if(ENV_TEST) {
    config.devtool = 'inline-source-map';
}
