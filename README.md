# VintageMarket

## Project setup 安装依赖包
```
npm install
```

### Compiles and hot-reloads for development  项目运行
```
npm run serve
```

### Compiles and minifies for production 项目打包
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



-----------------------------------------------------Vintage Market---------------------------------------------------------

线上预览地址：http://47.106.123.198/

-----------------------------------------------------Vintage Market---------------------------------------------------------


## 一、技术栈

### 1、vuecil

### 2、webpack

### 3、vuex--插件

（1）基本使用

* npm install --save vuex@3

* store-index.js-配置store --- main.js-注册store

* store-index.js -- 管理共享数据

  state--存储数据,

  actions--业务处理后commit,  

  mutations--修改state,  

  getters--操作state返回值）

* 组件vue -- 对共享数据进行读写操作mapstate/mapgetters--computed,

  mapmutations/mapactions--methods

（2）模块化开发

* index.js -- import 小仓库 --  modules 小仓库

* student.js -- 配置小仓库 -- export default{ namespaced/state/actions/ mutations/getters}

### 4、vue-router--插件

npm i vue-router@3

router--index.js--import/use/配置路由

main.js--import/注册/配置好的路由

（1）路由传参问题

* 三种传参、对象params只能name

* 如何知道params可传可不传  +？（很重要keyword报错）  空串怎么办   '' || undefined

（2）两种路由方式 

声明式导航--routerlink

编程式导航--this.$router.push()

（3）props三种传参

* 布尔值--传递params，将params作为路由组件身上的属性--- index.js设props=true ---- 路由组件接收 props:[ keyword ]
* 对象--额外传递一些参数
* 函数--  props: ($route)=>return { return keyword:$route.params.keyword }

（4）路由重复点击报错问题，在router.js那里配置

### 5、aixos 

* api--requst.js --二次封装axios/响应拦截器/请求拦截器
* api- -index.js -- 统一管理接口（用函数的形式来实现接口的调用）
* vue.config.js -- 代理服务器解决跨域

### 6、mock

（1）准备mock数据

* 创建mock文件夹---放json数据---mockServer.js--定义mock规则/引入mockjs/引入json----main.js引入mockServer.js
* public文件夹---放图片数据

（2）发送axios请求

* api-- mockRequest.js--配置该接口的axios实例
* api--index.js--一管理接口（用函数的形式来实现接口的调用）

（3）store调用接口，管理数据

* App.vue--dispatch触发store
* store--home.js--调用接口，管理数据--actions/mutations/state
* LsitContainer.vue --使用store中的数据/...mapstate

### 7、nprogress进度条的使用

npm install --save nprogress

request.js 引入--请求拦截器start --响应拦截器done



## 二、过程笔记

#### 1、三级列表--全局组件

（1）三级联动--路由跳转--编程式导航+事件委派+事件冒泡+自定义属性（项目优化）

声明式导航---卡顿现象---会循环出很多的router-link组件

编程式导航---在所有a标签的父级元素(无循环语句)绑定事件

* 如何确定点击的是a标签---每个a标签添加上自定义属性，有该属性的就是a标签

* 如何区分点击的是哪级a标签，并把响应的参数传递---通过事件对象event，event.target可获取到触发点击事件的节点---选择有自定义属性（dataset获取）的a标签来触发路由转发

（2）三级联动--服务器请求数据（vuex+aixos）

* api--axios--配置好接口函数--request/index/vue.config

* vuex--store--管理好接口传来的共享数据 -- actions中调用接口

* conponent--触发store--mounted-dispatch() --调用store中的共享数据...mapSate --- 使用v-for遍历

* （优化）

  --在typeNav组件的mounted钟发请求，那每次切换组件时typeNav都会重新加载，导致重复发请求

  --将该请求放在app组件的mounted钟，则整个程序中只请求一次

（3）三级联动--显示与隐藏

* v-show --默认为true--路由跳转serach模块，三级联动组件重新挂载，mounted里改false
* @mouseenter/@mouseleave--鼠标移入移出事件控制serach模块中三级联动组件的显示与隐藏

（4）三级联动--过渡动画

* transition（name）标签--包裹dom节点
* 定义样式 name-enter/name-enter-to/name-enter-active

#### 2、轮播图

（1）mock

（2）elementUl

#### 3、footer

（1）mock

（2）父子组件通信（props）

home中的floor用v-for遍历，并将每一个:floor 用props传递给子组件floor，floor中继续遍历数据

#### 4、Search + TypeNav + Vue-router + Vuex + axios + mock

分类标识：query--name/Id---goSearch()

搜索标识：params--keyword---v-model

搜索参数：searchParams --- POST的请求参数，更新search页面渲染---发请求前，将当前页面的分类this.$route.query（name/id）和this.route.params（keyword）更新到searchParams（assign），以请求数据

路由跳转：this.$router.push(url)----url: {name: 'search' , query:{ name , id }, params:{ keyword }  }----监听路由watch，路由（url）一变化，更新searchParams（assign）,并重新发请求getData, 完事后 重新初始化searchParams（Id）

面包屑：显示与隐藏--searchParams中的categoryName用v-if，删除---更新searchParams（清空name和Id） + 重新发请求（重新渲染页面）+ 更新路由url，

##### （1）store

mock+axios+vuex---合并参数、getters处理数据

##### （2）router

搜索参数的传递--store请求数据的变化--页面重新渲染

---组件中 data定义搜索参数，beforemounted-页面挂载前合并路由参数（query,params,name,Id），watch监听路由的变化（$route），路由一变就更新路由参数（Object.assign）和重新发请求（getData），更新页面渲染，method-定义dispatch函数 ，mounted--组件重新挂载时发请求（getData）

---store中请求并更新List数据，getters简化List数据

---组件 中mapGetters数据

##### （3）面包屑---参数的变化---路由的变化---searchParams

* 分类面包屑

---添加面包屑--v-if 控制 searchParams . categoryName 的有无

---删除面包屑--删除分类params---更新searchParams + 路由url （params删   query保留）---重新发请求-->重新渲染页面

* 关键字面包屑

---添加面包屑--v-if-- searchparams.keyword

---删除面包屑--删除query关键字---更新searchPrams + 路由url ---重新发请求--->重新渲染页面 

----置空 header组件（子-->父）--全局事件总线

mian.js--定义全局事件总线Vue.prototype.$bus=this

search.vue--绑定点击事件，触发全局事件this.$bus.$emit('clear')

header.vue--mounted中定义全局事件回调this.$bus.$on( ' clear', ()=>{keyword} )

* 品牌面包屑---trademark---（子-->父）--自定义事件

---添加面包屑--v-if--searchParams.trademark

search子组件---绑定点击事件，触发自定义事件this.$emit('fun',trademark) ，将点击的品牌信息传给父

search父组件---在子组件身上绑定自定义事件，定义自定义事件回调，接收品牌信息---更新数据（searchParams加上品牌信息trademarks就行）---重新发请求---重新渲染（这块后端重新整理数据给我们，不用我们管）

---删除面包屑--删除trademark品牌信息--更新searchParams--重新发请求---重新渲染页面

* 商品详情属性---props---（子-->父）--自定义事件

---添加面包屑--v-for遍历searchParams.props

search子组件---绑定点击事件，触发自定义事件 this.$emit('fun' , attr ( id , name), attrvalue)

search父组件----在子组件身上绑定自定义事件，定义事件回调，接收attr,attrvalue----更新searchParams加上props的相关信息（props要数组去重），传送给后端api---重新发请求---重新渲染页面

---删除面包屑--删除props被点击（index）属性信息--更新searchParams--重新发请求--重新渲染页面



##### （4）排序---searchParams.order(1:desc)

----获取order的值，控制点击的元素

红色类名-isOne( return this.searchParams.order.indexOf( '1' ) !==1 )

 箭头-isAsc(return this.searchParams.order.indexOf('asc') !==1)

----改变order的值，切换点击的元素，重新渲染页面

originOrder--newOrder--getData()

---阿里巴巴图标库

在public--index.html中link引入

组件中--记得加类名class='iconfont   icon-up'（一般类名  图标类名）

##### （5） 分页--全局组件--elementUI--自定义事件

---定义全局组件--component创建，main.js注册，Search.vue引入

---自定义事件--Search.vue 在组件身上绑定自定义事件，定义回调--全局组件触发自定义事件，并传去参数

---Search.vue接收pageNo，更新searchParams，重新发请求，重新渲染页面

#### 5、详情页

静态页面(elementUI)--发请求(API aixos)--共享数据(vuex)--动态展示组件(vue-router)

（1）vue-router--跳转到详情页

routes.js配置路由（params要占位），search.vue声明路由router-ink（并传递params参数图片id）, 添加滚动行为

（2）API--request.js 配置req--store.js触发req--遍历详情页信息

vuex--state/actions/mutations/getters 触发req，组件dispatch发起，mapState/mapGetters接收，替换静态数据

（3）放大镜模块

props--父给子传skuImageList---Zoom--大图

props--父给子传skuImageList---ImageList--小图

---轮播图切换--兄弟组件--全局事件总线

ImageList--this.$bus.emit('fun',index)

Zoom--mounted--this.$bus.on('fun',(index)=>{  })

---放大镜移动---ref---将组件/元素实例存到ref上，便于访问

将鼠标位置+蒙版位置+大图位置 结合

（4）选择模块--排他思想

先将所有的高亮isChecked=0，再将点击的元素isChecked=1

（6）添加购物车模块--路由跳转（携带参数id和num）+重新发请求（传参，从路由参数那拿）

---request.js--添加请求接口req，携带参数id和num

---store-detail.js--触发请求，将购物车数据添加到后台接口，所以这里不需要更新store数据（store模块化开发，dispatch时的模块路径要加上！）

---detail.js--dispatch请求，这里用asycn-await （等待promise的结果，dispatch返回的是一个promise，因为actions中也用了asycn-await）& try-catch 来完成请求成功/失败的操作

---注册添加购物车模块的路由--并传递参数

routes.js--注册路由

datail.js--跳转路由--传递参数（skuInfo--会话存储,skuNum--query）

detail.js--sessionStorage.setItem( 'name',JSON.stringify(obj) )

addcart.js--JSON.parse( sessonStorage.getItem('name') )



#### 6、购物车页面

（1）shopcart--配置router--写接口requests--发请求store--组件展示数据

（2）uuid游客身份登录--查看购物车列表时，需把用户身份带过去，后端才有相应的数据返回

utils--uuid.js--封装游客临时持久身份--localstorage+uuid

store--detail.js--仓库接收存储uuid

api--request.js--在请求拦截器中，将uuid放在请求头，请求时就能一并带过去

cart.vue--展示数据

（3）修改购物车列表--防抖节流

--修改数量--函数节流（用户操作频繁，限制用户几秒内才能点一次）--重新发请求

引入loadash-- fun: throttle( async function(){ await }, 500 )

--删除一个商品（有接口）

写接口request.js--发请求store(不需要传数据回来，不用commit，只需返回成功和失败的结果)--shopCart.js --async-await接收dispatch promise请求的结果--try-catch操作成功则getData()，失败则捕获error

--单选状态（有接口）

写接口request.js--发请求store--重新渲染页面 async-await等待dispatch返回promise请求的结果，try-catch进行成功或失败的操作

--全选状态（无接口）

cart.js-dispatch触发--actions中遍历产品分别dispatch单选的接口，进行全部勾选（skuId, isChecked=1的参数传过去）--promiseAll存储dispatch返回的每一个promise--promise.all判断是否每一个dispatch请求都成功，所有都成功全选的dispatch才算成功

--删除选中商品（无接口）

cart.js-dispatch触发--actions中遍历产品分别dispacth删除一个的接口( skuId , isChecked=1的 )--promiseAll存储dispatch返回的每一个promise--promise.all判断是否每一个dispatch请求都成功，所有都成功全选的dispatch才算成功

#### 7、登录注册页面

（1）注册

--data中存储表单数据--api-store-vue三连环

--完成注册提交表单数据--并进行路由跳转

（2）登录--获取token和获取userInfo

--data中存储登录表单数据（phone,password）--api-store-vue

--token--服务器发放的用户唯一标识--登陆时服务器发放--token不能存在store仓库中，不是持久化，一刷新就没了

--点击登录(reqUserLogin)--路由跳转到home--携带token向服务器发请求获取用户地址信息(reqUserInfo)

token放在请求头，在请求拦截器配置好，持久化存储token用本地存储，在userLogin中localstoreage.setItem，在getUserInfo中localstorage.getItem

（3）退出登录

--api-store-vue--清空用户数据--跳转回home

**（4）路由守卫--全局前置守卫**

--用户已登录--（有无token判断）

跳登录页面--限制--next(' / ')

跳其他页面--判断有无携带userInfo（userName判断）-- 有则直接成功跳转next()--无则重新dispatch请求userInfo--请求成功则next()--请求失败则为token过期，清空token，并返回登录页面

( 这里因为userInfo要存在每一个组件当中，store是非持久化的，一刷新store中的数据就清空了，所以userInfo的dispatch请求要放在全局前置路由守卫中，每一个路由跳转前都要判断userInfo是否还在 )

--用户未登录--next()

#### 8、结算页面

（1）Trade

--收件人信息--api-store-vue--切换默认地址（排他思想）

--商品列表--api-store-vue

--提交订单--路由跳转，并携带数据发请求（这里的请求不再放入store）

在main.js直接引入全部的api--import * as API from '@/api'

放入vue的原型中，Vue.prototype.$API=API ---则任何组件都可直接使用

立即结算--绑定点击事件--直接调用reqSumit接口（携带tradeNo, data ）-- 返回orderId --作为query参数进行路由跳转到pay页面

（2）Pay

--订单信息--api--mounted调用reqPay发请求（不允许给生命周期函数加aysnc）

（3）支付页面

--ElementUI--支付弹窗

--qrcode--随机生成二维码

--长轮询--判断支付成功/失败

设置定时器timer--每隔1秒发一次请求询问是否支付完成

设置弹窗关闭前的回调--控制confirm和cancel两个按钮的操作

（4）个人中心--二级路由

订单列表--api--mounted发请求（page,limit）--动态展示页面数据

分页器--ElementUI

#### 9、路由守卫

（1）全局守卫--未登录限制访问--订单--购物车--个人中心--跳回登录

--router.js--用户未登录--if (toPath='/trade')--将toPath存储，作为query参数--再next('/login/?q=toPath')

--login.vue（带了query参数）--登录成功后，判断是否有query参数--有则跳回指定页面，无则跳到home

（2）路由独享守卫--已登录--不能直接去trade/pay/paysuccess

（3）组件内守卫--跳转到该组件前执行

#### 10、图片懒加载 vue-lazyload

安装npm i vue-lazyload -S----引入main.js-import/use---替换:src 为v-lazy

#### 11、表单验证--  vee-validate@2 --会用即可

--安装npm i vee-validate@2 --save----main.js引入插件import/use

--plugins定义好，main.js引用，vue组件使用

#### 12、路由懒加载

component不直接写组件，写成（）=> import( '@/page/home' )--箭头函数返回的是一个promise，当

------自己封装轮播图、分页器、日历--------

------自定义插件plugin------

#### 13、项目部署

npm run build-dist

登录宝塔--新建站点--将dist文件放入www/wwwroot/vintageMarket

配置反向代理nginx--解决接口服务器的问题
