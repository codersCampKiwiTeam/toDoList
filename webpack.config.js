const path = require('path');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        main: './src/script.js',
        todo: './src/todo.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
        publicPath: '/dist/'
    },

    module: {
        rules: [{
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader'
            }]
        },
        ],
    },

    plugins: [
        new MinifyPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
        }),
        new HtmlWebpackPlugin({
            filename: 'todo.html',
            template: './todo.html',
            chunks: ['todo']
        })
    ]
}