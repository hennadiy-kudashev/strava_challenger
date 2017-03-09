const path = require('path');
const webpack = require('webpack');


module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        'babel-polyfill',
        './src/js/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: { //Обновлено
        preLoaders: [ //добавили ESlint в preloaders
            {
                test: /\.js$/,
                loaders: ['eslint'],
                include: [
                    path.resolve(__dirname, 'src/js')
                ]
            }
        ],
        loaders: [ //добавили babel-loader
            {
                loaders: ['react-hot', 'babel-loader'],
                include: [
                    path.resolve(__dirname, 'src/js')
                ],
                test: /\.js$/, plugins: ['transform-runtime']
            },
            {
              test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
              loader: "url?limit=10000&mimetype=application/font-woff"
            },
            {
              test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
              loader: "url?limit=10000&mimetype=application/font-woff"
            },
            {
              test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
              loader: "url?limit=10000&mimetype=application/octet-stream"
            },
            {
              test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
              loader: "file"
            },
            {
              test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
              loader: "url?limit=10000&mimetype=image/svg+xml"
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'file-loader'
            },
            // React toolbax has problem with loading simultaneusly app scss and own scss
            {
                test: /(\.scss)$/,
                loaders: ['style', 'css?modules', 'postcss', 'sass']
            },
            {
                test: /(\.css)$/,
                loaders: [ 'style-loader', 'css-loader?importLoaders=1', 'postcss-loader' ]
            }
        ]
    }
};
