
const path = require('path');
const BasicPlugin = require('./plugins')
const Skeleton = require('./Skeleton')
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry : './index.js',//入口文件
    output : {//输出文件
        filename : 'bundle.js',//输出文件名
        path :path.resolve('./dist')//输出文件路径
    },
    resolve:{
        alias: {
            vue: 'vue/dist/vue.esm.js'
        }
    },
    module:{
        rules:[{
            test:/\.css$/,
            use:[miniCssExtractPlugin.loader,'css-loader']
        },{
            test: /\.vue$/,
            loader: 'vue-loader'
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    },
    plugins:[
        new miniCssExtractPlugin({
            filename:'main.css'
        }),
        new HtmlWebpackPlugin({
            title: 'My App', 
            template: './index.html'
        }),
        // new BasicPlugin({
        //     match:/\.(js|css)/
        // }),
        new VueLoaderPlugin(),
        new Skeleton({
            template:'./skeleton.html'
        })
    ]
}