const {resolve} = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packagejson = require('../../package.json');

/*
Config

if deploy on stage or production

 */

const staging_host = "https://static.testing.devnetcloud.com";
const prod_host = "https://static.production.devnetcloud.com";

const envconfig = require('../env/dev.json');
const stageenvconfig = require('../env/stage.json');
const prodenvconfig = require('../env/production.json');

const BASENAME = envconfig.config.BASENAME;

//update app links
let app_path = "/" + BASENAME.replace("/", "-");

// merge config
if (process.env.NODE_ENV) {
    //config will merged
    const _envconfig = process.env.NODE_ENV == "production" ? prodenvconfig : stageenvconfig;
    //append absolute stage/prod static resource link
    app_path = process.env.NODE_ENV == "production" ? prod_host + app_path : staging_host + app_path;
    envconfig.js = Object.assign(envconfig.js, _envconfig.js);
    envconfig.css = Object.assign(envconfig.css, _envconfig.css);
    envconfig.window = Object.assign(envconfig.window, _envconfig.window);
    envconfig.config = Object.assign(envconfig.config, _envconfig.config);

}

// update app js/css link to `absolute` link
Object.keys(envconfig.js).forEach(function (key) {
    if (key.startsWith("*")) {
        envconfig.js[key] = app_path + envconfig.js[key];
    }
});

Object.keys(envconfig.css).forEach(function (key) {
    if (key.startsWith("*")) {
        envconfig.css[key] = app_path + envconfig.css[key];
    }
});

const webconfig = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        './main.js',
        './assets/scss/main.scss'
    ],

    output: {
        filename: 'app.js',
        path: resolve(__dirname, '../../dist'),
        publicPath: ''
    },

    context: resolve(__dirname, '../../app'),

    devServer: {
        hot: true,
        contentBase: resolve(__dirname, '../../build'),
        publicPath: '/',
        historyApiFallback: true
    },

    module: {
        rules: [
            // {
            //   enforce: "pre",
            //   test: /\.js$/,
            //   exclude: /node_modules/,
            //   loader: "eslint-loader"
            // },
            {
                test: /\.js$/,
                loaders: [
                    'babel-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            query: {
                                sourceMap: false,
                            },
                        },
                    ],
                    publicPath: '../'
                }),
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            mimetype: 'image/png',
                            name: 'images/[name].[ext]'
                        }
                    }
                ],
            },
            {
                test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ],
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            mimetype: 'application/font-woff',
                            name: 'fonts/[name].[ext]',
                        }
                    }
                ],
            },
            {
                test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            mimetype: 'application/octet-stream',
                            name: 'fonts/[name].[ext]',
                        }
                    }
                ],
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            mimetype: 'image/svg+xml',
                            name: 'images/[name].[ext]',
                        }
                    }
                ],
            },
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'CONFIG': JSON.stringify(envconfig.config)
        }),
        new HtmlWebpackPlugin({
            title: packagejson.name,
            version: packagejson.version,
            hash: true,
            filename: 'index.html',
            template: '../template/index.html'
        }),
        new ExtractTextPlugin({filename: './styles/style.css', disable: false, allChunks: true}),
        new CopyWebpackPlugin([{from: 'vendors', to: 'vendors'}]),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = webconfig;
