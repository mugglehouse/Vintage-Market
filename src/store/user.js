import { reqGetCode, reqUserInfo, reqUserLogin, reqUserLogout, reqUserRegister } from '@/api'
export default {
    namespaced: true,
    state: {
        code: '',
        // token: '','
        userInfo: {},
    },
    actions: {
        // 获取验证码
        async getCode({ commit }, phone) {
            let result = await reqGetCode(phone)
            console.log('getCode', result);
            if (result.code == 200) {
                // 实际场景不用发到仓库，直接发到用户手机
                commit('GETCODE', result.data)
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 注册
        async userRegister({ commit }, user) {
            let result = await reqUserRegister(user)
            console.log('111111', user, result)
            if (result.code == 200) {
                console.log('Register Success', result)
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 登录
        async userLogin({ commit }, user) {
            let result = await reqUserLogin(user)
            console.log('Login Success', result);
            if (result.code == 200) {
                // 获取token
                // commit('USERLOGIN', result.data.token)
                // 持久化存储token
                localStorage.setItem('TOKEN', result.data.token)
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 获取用户信息
        async getUserInfo({ commit }) {
            let result = await reqUserInfo()
            console.log('----userInfo', result);
            if (result.code == 200) {
                commit('GETUSERINFO', result.data)
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 退出登录
        async userLogout({ commit }) {
            let result = await reqUserLogout()
            console.log('userLogout', result)
            if (result.code == 200) {
                // 清除数据，action不能直接操作state，提交给mutations操作
                commit('CLEAR')
                return 'ok'
            } else {
                return Promise.reject(new Error('falie'))
            }
        }

    },
    mutations: {
        GETCODE(state, code) {
            state.code = code
        },
        GETUSERINFO(state, userInfo) {
            state.userInfo = userInfo
            console.log('userInfo', state.userInfo);
        },
        CLEAR(state) {
            state.userInfo = {}
            localStorage.removeItem('TOKEN')
            console.log('clear success', state.userInfo, localStorage.getItem('TOKEN'));
        }
    },
    getters: {

    }
}