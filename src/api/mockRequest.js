// 引入axios
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress';
// 引入进度条样式 (发请求才有进度条)
import 'nprogress/nprogress.css'

// 配置aixos实例
const requests = axios.create({
    baseURL: '/mock',
    timeout: 5000
});
// 请求拦截器
requests.interceptors.request.use((config) => {
    // start 进度条开始
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