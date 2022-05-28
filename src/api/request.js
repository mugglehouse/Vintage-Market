// 引入axios
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress';
// 引入进度条样式 (发请求才有进度条)
import 'nprogress/nprogress.css'

// 配置aixos实例
const requests = axios.create({
    baseURL: '/api',
    timeout: 5000
});
// 请求拦截器
requests.interceptors.request.use((config) => {

    // 1、uuId: 请求头添加Id字段，将uuid发过去，字段名是与后台商量好的
    if (localStorage.getItem('UUIDTOKEN')) {
        config.headers.userTempId = localStorage.getItem('UUIDTOKEN');
    }
    // 2、token: 
    if (localStorage.getItem('TOKEN')) {
        config.headers.token = localStorage.getItem('TOKEN')
    }

    // 3、start 进度条开始
    nprogress.start()
        // config为配置对象,里面有请求头
    return config
});
// 响应拦截器
requests.interceptors.response.use((res) => {
    // done 进度条结束
    nprogress.done()
    return res.data
}, (err) => {
    return Promise.reject(new Error('faile'))
})

export default requests