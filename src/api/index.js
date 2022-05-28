// 接口统一管理
import requests from "./request";
import mockRequests from './mockRequest'

// typeNav接口--服务器接(get 无参数 跨域--jsonP cros 代理)
export const reqCategoryList = () => mockRequests.get('/getBaseCategoryList')

// banner接口
export const reqGetbannerList = () => mockRequests.get('/banner')

// floor接口
export const reqfloorList = () => mockRequests.get('/floor')


// search接口 (post 有参数 跨域)  
export const reqGetSearchInfo = (params) => requests({
    url: 'list',
    method: 'post',
    // 这个默认参数至少是一个空对象,否则会响应错误
    data: params
})

// detail接口 （get 有参数 跨域） 带params参数
export const reqGoodsInfo = (skuid) => requests({
    url: `/item/${skuid}`,
    method: 'get'
})

// addcart接口 (psot 有参数 跨域)
export const reqAddOrUpdateShop = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
})

// shopcart接口
export const reqCartList = () => requests({
    url: '/cart/cartList',
    method: 'get'
})

// deletecart接口
export const reqDeleteCartById = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
})

// checked接口
export const reqUpdateCheckedById = (skuId, isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
})

// code接口
export const reqGetCode = (phone) => requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
})

// register接口
export const reqUserRegister = (data) => requests({
    url: '/user/passport/register',
    method: 'post',
    data,
})

//login接口
export const reqUserLogin = (data) => requests({
    url: '/user/passport/login',
    method: 'post',
    data
})

// userMsg接口
export const reqUserInfo = () => requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'get',

})

// logout接口
export const reqUserLogout = () => requests({
    url: '/user/passport/logout',
    method: 'get'
})

// address接口
export const reqAddressInfo = () => requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get'
})

// order接口
export const reqOrderInfo = () => requests({
    url: 'order/auth/trade',
    method: 'get'
})

// submitOrder接口
export const reqSubmitOrder = (tradeNo, data) => requests({
    url: `order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: 'post',
    data
})

// pay接口
export const reqPayInfo = (orderId) => requests({
    url: `payment/weixin/createNative/${orderId}`,
    method: 'get'
})

// payStatus接口
export const reqPayStatus = (orderId) => requests({
    url: `payment/weixin/queryPayStatus/${orderId}`,
    method: 'get'
})

// 个人中心接口
export const reqMyOrderList = (page, limit) => requests({
    url: `order/auth/${page}/${limit}`,
    method: 'get'
})