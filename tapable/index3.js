class SyncBailHook{//同步钩子
    constructor(args){
        this.tasks= [];
    }
    tap(name,task){
        this.tasks.push(task);
    }
    call(...args){
        // this.tasks.forEach((task)=>task(...args));
        let ret ;
        let index = 0;
        do {
            ret = this.tasks[index++](...args);
        } while (ret === undefined && index<this.tasks.length);

    }
}

let hook = new SyncBailHook(['name']);

hook.tap('react',function (name) {
    console.log('react',name);
    return "111"
})
hook.tap('node',function (name) {
    console.log('node',name);
})
hook.call('beautyLee')
