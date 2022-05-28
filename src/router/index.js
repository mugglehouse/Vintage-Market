import store from '@/store'
import Vue from 'vue'
// 引入插件
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)

// 引入路由配置信息
import routes from './routes'


// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err)
}

// 路由配置
let router = new VueRouter({
    routes,
    // 路由滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})

// 全局守卫--前置--每个路由跳转前触发
router.beforeEach(async(to, from, next) => {
    let token = localStorage.getItem('TOKEN')
    let name = store.state.user.userInfo.name;
    // 用户已登录
    if (token) {
        // 已登录--限制跳转回登录页面
        if (to.path == '/login') {
            console.log('---已登录，限制跳转回登录页面---')
            next('/')
        } else {
            // 已登录--跳转其他页面
            // 用户信息还在--没刷新
            // （用户信息要一直存在各个组件中，而store存储的数据每刷新一次就清空一次，如果userInfo只在header组件派发，则在跳转到其他组件时，没有发请求，store仓库中是没有userInfo的）
            if (name) {
                console.log('---已登录，用户信息还在，成功跳转其他页面---')
                next()
            } else {
                // 用户信息没了--刷新--重新发请求
                try {
                    // 请求用户信息成功
                    console.log('---已登录，没有用户信息，请求用户信息成功，成功跳转其他页面---')
                    await store.dispatch('user/getUserInfo')
                    next()
                } catch (error) {
                    // 请求用户信息失败--token失效--重新登录--清除token
                    console.log('---已登录，没有用户信息，请求用户信息失败，token过期，清空token，跳转回登录页面--')
                    await store.dispatch('user/userLogout')
                    next('/login')
                }
            }
        }
    } else {
        // 用户未登录--限制跳转订单、购物车、个人中心
        console.log('--用户未登录--')
        let toPath = to.path
            // if (toPath == '/trade' || toPath == '/pay' || toPath == '/shopcart' || toPath == '/center') {
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1 || toPath.indexOf('/shopcart') != -1) {
            next(`/login?redirect=${toPath}`)
        } else {
            next()
        }
    }
})

// 暴露路由配置
export default router