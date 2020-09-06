const path = require('path');
const process = require('process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
    mode : 'development',
    entry : {
        bundle : './src/index.jsx'
    },
    output : {
        path : path.resolve(__dirname, './dist'),
        filename : '[name].js',
    },
    resolve: {
        extensions: ['.js','.jsx']
    },
    devServer: {
        overlay: true,
        stats: "errors-only",
        hot : true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test : /\.css$/,
                use  : [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test : /\.(png|jpg|gif|svg)$/,
                loader :'url-loader',
                options : {
                    publicPath : './dist/',
                    name : '[name].[ext]?[hash]',
                    limit : 20000, //20kb
                }
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            template : './index.html',
            templateParameters : {
                env: process.env.NODE_DEV === 'development' ? '개발' : ''
            },
            minify :process.env.NODE_ENV === 'production' ? {
                collapseWhitespace : true, //공백제거
                removeComments : true //주석제거
            } : false
        }),
        new CleanWebpackPlugin()
    ]
}