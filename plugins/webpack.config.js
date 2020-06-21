
const path = require('path');
const BasicPlugin = require('./plugins')
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry : './index.js',//入口文件
    output : {//输出文件
        filename : 'bundle.js',//输出文件名
        path :path.resolve('./dist')//输出文件路径
    },
    module:{
        rules:[{
            test:/\.css$/,
            use:[miniCssExtractPlugin.loader,'css-loader']
        }]
    },
    plugins:[
        new miniCssExtractPlugin({
            filename:'main.css'
        }),
        new HtmlWebpackPlugin({
            title: 'My App', 
            template: './index.html'
        }),
        new BasicPlugin({
            match:/\.(js|css)/
        })
    ]
}