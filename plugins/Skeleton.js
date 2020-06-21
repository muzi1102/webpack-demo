const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const {log} = console;
class Skeleton{
    constructor({template}){
        this.template = template;
    }
    apply(compiler){
        // 生成compilation
        const skeletonpath = this.template;
        compiler.hooks.compilation.tap('Skeleton',(compilation)=> {
            log('---compilation---')
            HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tapAsync('Skeleton',(data,cb)=>{
                console.log('------data------')
                console.log(data)

                fs.readFile(skeletonpath,'utf-8',(err,htmldata)=>{
                    debugger
                    if (err) {
                        cb(null,data);
                    }else{
                        data.html = data.html.replace('<!-- skeleton-outlet -->', htmldata);
                        cb(null,data);
                    }
                });
            })
        })
    }
}

module.exports = Skeleton;