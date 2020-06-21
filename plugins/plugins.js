const { ConcatSource } = require('webpack-sources')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const chalk = require('chalk');
const {log} = console;


const wrapComment = (str) => {
    if (!str.includes('\n')) return `/*! ${str} */`
    return `/*!\n * ${str.split('\n').join('\n * ')}\n */`
}

class BasicPlugin {
    //  在构造函数中获取用户给该插件传入的配置
    constructor({match}){
        this.match = match
    }
    // 处理引入标签的数据
    processTags(data,compilation){
        debugger
        let bodyTags = [];
        data.bodyTags.forEach((bodyTag)=>{
            bodyTags.push(this.processTag(bodyTag,compilation));
        })
        return {...data,bodyTags}
    }
    // 处理单个插件的
    processTag(tag,compilation){
        let newTag,url;
        if (tag.tagName === 'script' && this.match.test(tag.attributes.src)) {
            newTag = {
                tagName:'script'
            }
            url = tag.attributes.src;
        }
        if (url) {
            newTag.innerHTML = compilation.assets[url].source()//文件的内容放到innerHTML
            delete compilation.assets[url];
            return newTag;
        }
    }
    // webpack存在钩子(以下生命周期钩子函数，是由 compiler 暴露)和钩子函数（tap,tapAsync,tapPromise）

    // Webpack 会调用 BasicPlugin 实例的 apply 方法给插件实例传入 compiler 对象
    apply(compiler){
        compiler.hooks.compilation.tap('myplugin',(compilation)=> {
            log('compilation')
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('alterplugins',(data,cb)=>{
                console.log(this)
                data = this.processTags(data,compilation);
                log(`${chalk.red(data)}`)
                cb(null,data)
            })
        })
    }
}

module.exports = BasicPlugin;


// Webpack 启动后，在读取配置的过程中会先执行 new BasicPlugin(options) 初始化一个 BasicPlugin 获得其实例。
// 在初始化 compiler 对象后，再调用 basicPlugin.apply(compiler) 给插件实例传入 compiler 对象。
// 插件实例在获取到 compiler 对象后，就可以通过 compiler.plugin(事件名称, 回调函数) 监听到 Webpack 广播出来的事件。
// 并且可以通过 compiler 对象去操作 Webpack。