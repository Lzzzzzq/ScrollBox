var path = require('path');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
module.exports = {
    entry: {
        'Index': './example/index.js'
    },
    output: {
        path: path.join(__dirname, 'devBuild'),
        publicPath: '/',
        filename: "[name]/[name].[hash:5].js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
            },
            {test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'style!css')},
            {test: /\.(png|jpg|gif)$/, loader: "url?limit=8192&name=./img/[name].[ext]"},
            {test: /\.json$/, loader: "json"},
            {test: /\.svg/, loader: 'svg-url-loader'}
        ]
    },
    url: {
        dataUrlLimit: 2048
    },
    resolve: {
        modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions: ['', '.web.js', '.js', '.json']
    },
    devtool: 'source-map',
    postcss: function () {
        return [autoprefixer];
    },
    plugins: [
        new ExtractTextPlugin('[name]/[name].[hash:5].css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'example/index.html',
            chunks: ['Index']
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
                // 'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};
