var path = require('path')
var webpack = require('webpack')


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
        publicPath: '/static/'
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
                test: /\.(png|jpg)$/,
                loader: 'file-loader'
            },
            {
                test: /(\.scss)$/,
                loaders: ['style', 'css?modules', 'postcss', 'sass']
            },
            {
                test: /(\.css)$/,
                loaders: ['style', 'css']
            }
        ]
    }
}
