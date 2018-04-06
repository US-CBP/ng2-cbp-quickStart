const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//=========================================================
//  VARS
//---------------------------------------------------------
const NODE_ENV = process.env.NODE_ENV;

const ENV_DEVELOPMENT = NODE_ENV === 'development';
const ENV_PRODUCTION = NODE_ENV === 'production';
const ENV_TEST = NODE_ENV === 'test';

//=========================================================
//  LOADERS
//---------------------------------------------------------
const rules = {
    cssStyles: {
        test: /\.css$/,
        exclude: path.resolve('src/shared/styles'),
        use: ['style-loader', 'css-loader']
    },
    componentStyles: {
        test: /\.scss$/,
        exclude: path.resolve('src/shared/styles'),
        use: ['raw-loader', 'sass-loader']
    },
    globalStyles: {
        test: /\.scss$/,
        include: path.resolve('src/shared/styles'),
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: './'
                }
            },
            'css-loader',
            'sass-loader'
        ]
    },
    typescript: {
        test: /\.ts$/,
        use: ['awesome-typescript-loader', 'angular2-template-loader', 'angular2-router-loader']
    },
    html: {
        test: /\.html$/,
        use: ['html-loader?-minimize']
    },
    fontFile: {
        test: /\.(ttf|otf|eot|svg|woff|woff2|cur|ani)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['file-loader']
    },
    imagesFile: {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
            'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false'
        ]
    }
};

//=========================================================
//  CONFIG
//---------------------------------------------------------
const config = module.exports = {};

config.mode = 'none';

config.resolve = {
    extensions: ['.ts', '.js'],
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
        rules.imagesFile,
        rules.globalStyles
    ]
};

config.optimization = {
    splitChunks: {
        cacheGroups: {
            'default': false,
            'vendors': {
                test: function(module) {
                    if(module.context && module.context.indexOf('node_modules') !== -1) {
                        let current = module;
                        while(current.issuer !== null) {
                            current = current.issuer;
                        }
                        return current.rawRequest !== './src/polyfills.ts';
                    } else {
                        return false;
                    }
                },
                name: 'vendor',
                chunks: 'all'
            }
        }
    }
};

config.plugins = [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    new webpack.LoaderOptionsPlugin({
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
    new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        path.resolve('src')
    )
];

//=====================================
//  DEVELOPMENT or PRODUCTION
//-------------------------------------
if(ENV_DEVELOPMENT || ENV_PRODUCTION) {
    config.entry = {
        'main': './src/main.ts',
        'polyfills': './src/polyfills.ts'
    };

    config.plugins.push(
        new HtmlWebpackPlugin({
            filename: 'index.html',
            hash: false,
            inject: 'body',
            template: './src/index.html'
        })
    );

    config.output = {
        filename: '[name].js',
        path: path.resolve('dist'),
        publicPath: '/'
    };
}

//=====================================
//  DEVELOPMENT
//-------------------------------------
if(ENV_DEVELOPMENT) {
    config.devtool = 'inline-source-map';

    config.plugins.push(new webpack.ProgressPlugin());
    config.plugins.push(new webpack.WatchIgnorePlugin([
        path.join(__dirname, 'node_modules'),
        'node_modules'
    ]));

    config.watch = true;
}

//=====================================
//  PRODUCTION
//-------------------------------------
if(ENV_PRODUCTION) {
    config.devtool = 'hidden-source-map';

    config.output.filename = '[name].[chunkhash].js';

    config.plugins.push(
        new UglifyJsPlugin()
    );
}

//=====================================
//  TEST
//-------------------------------------
if(ENV_TEST) {
    config.devtool = 'inline-source-map';
}