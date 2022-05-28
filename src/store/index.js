// 引入vue
import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
// 使用插件vuex
Vue.use(Vuex)

// 引入模块
import search from './search'
import home from './home'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'

// 暴露store
export default new Vuex.Store({
    modules: {
        search,
        home,
        detail,
        shopcart,
        user,
        trade
    }
})