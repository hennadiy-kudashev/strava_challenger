const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production')
};

module.exports = {
    devtool: 'source-map',
    entry: ['./src/js/index'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin(GLOBALS),
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        loaders: [
            {
                loaders: ['react-hot', 'babel-loader'],
                include: [
                    path.resolve(__dirname, 'src/js')
                ],
                test: /\.js$/, plugins: ['transform-runtime']
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'file-loader'
            },
            {
                test: /(\.scss)$/,
                loaders: ['style', 'css?modules', 'postcss', 'sass']
            },
            {
                test: /(\.css)$/,
                loader: ExtractTextPlugin.extract("css?sourceMap")
            }
        ]
    }
};
