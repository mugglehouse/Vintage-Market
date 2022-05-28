/* 
component: () => import('@/pages/Search')
1. import(modulePath): 动态import引入模块, 被引入的模块会被单独打包
2. 组件配置的是一个函数, 函数中通过import动态加载模块并返回, 
    初始时函数不会执行, 第一次访问对应的路由才会执行, 也就是说只有一次请求对应的路由路径才会请求加载单独打包的js
作用: 用于提高首屏的加载速度
*/

// 路由配置信息
export default [{
        path: '/home',
        component: () =>
            import ('@/pages/Home'),
        // 显示footer
        meta: { show: true }
    },
    {
        name: 'search',
        // params传参，这里需占位接收
        path: '/search/:keyword?',
        // path: '/search',
        component: () =>
            import ('@/pages/Search'),
        props: route => ({ keyword3: route.params.keyword, keyword4: route.query.keyword2 }),
        meta: { show: true }

    },
    {
        path: '/login',
        component: () =>
            import ('@/pages/Login'),
        meta: { show: false }

    },
    {
        path: '/register',
        component: () =>
            import ('@/pages/Register'),
        meta: { show: false }

    },
    {
        // 要传params参数，确定点击的是哪个商品的详情
        path: '/detail/:skuid',
        component: () =>
            import ('@/pages/Detail'),
        meta: { show: true }

    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: () =>
            import ('@/pages/AddCartSuccess'),
        meta: { show: true }
    },
    {
        path: '/shopcart',
        component: () =>
            import ('@/pages/ShopCart'),
        meta: { show: true }
    },
    {
        path: '/introduct',
        component: () =>
            import ('@/pages/Introduct'),
        meta: { show: true }
    },
    {
        path: '/trade',
        component: () =>
            import ('@/pages/Trade'),
        meta: { show: false },
        // 路由独享守卫--只能从shopcart跳转到trade
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next()
            } else {
                next('/shopcart')
            }
        }
    },
    {
        path: '/pay',
        component: () =>
            import ('@/pages/Pay'),
        meta: { show: false },
        // 路由独享守卫--只能从trade跳转到pay
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next('/trade')
            }
        }
    },
    {
        path: '/paysuccess',
        component: () =>
            import ('@/pages/PaySuccess'),
        meta: { show: false },
        beforeEnter: (to, from, next) => {
            if (from.path == '/pay') {
                next()
            } else {
                next('/pay')
            }
        }
    },
    {
        path: '/center',
        component: () =>
            import ('@/pages/Center'),
        meta: { show: true },
        // 引入二级路由
        children: [{
            path: 'myorder',
            component: () =>
                import ('@/pages/Center/MyOrder')

        }, {
            path: 'grouporder',
            component: () =>
                import ('@/pages/Center/GroupOrder')
        }, {
            // 只要一来到center页面，就默认显示myorder这个二级路由
            path: '/center',
            redirect: '/center/myorder'
        }]
    },
    // 重定向
    {
        path: '*',
        redirect: '/home'
    }
]