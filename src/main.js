import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false


// 注册全局组件( 之后任意组件都能直接使用该组件，不需要引入 )
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'
Vue.component('TypeNav', TypeNav) // （组件名字，哪个组件）
Vue.component('Pagination', Pagination)

// 引入路由
import router from '@/router'

// 引入store
import store from '@/store'

// 引入mock
import '@/mock/mockServer'

// 引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 引入所有的API
import * as API from '@/api'

// 引入懒加载默认图片
import logo from '@/assets/logo.png'

// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    // 懒加载默认图片
    loading: logo
})

// 引入自定义插件
import myPlugin from './plugins/myPlugin'
Vue.use(myPlugin, {
    name: 'Muggle',

})

// 引入表单验证插件
import '@/plugins/validate'


new Vue({
    render: h => h(App),
    // 注册路由，组件vm和vc身上都会多了$router（共同）和$route属性（私有）
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$API = API;
    },
    router,
    // 注册store，组件身上多了$store属性，管理共享数据
    store,

}).$mount('#app')