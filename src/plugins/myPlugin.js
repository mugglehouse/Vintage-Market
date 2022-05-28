// vue插件暴露一个install方法（即对象myPlugin应有一个install方法并暴露）
let myPlugin = {}
    // 第一个参数是vue构造函数，第二个参数是可选对象(在Vue.use里配置)
myPlugin.install = function(Vue, options) {
    console.log('I am Muggle');
    console.log(options);
}
export default myPlugin