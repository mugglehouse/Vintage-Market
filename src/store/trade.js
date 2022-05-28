import { reqAddressInfo, reqOrderInfo } from "@/api"

export default {
    namespaced: true,
    state: {
        addrList: [],
        orderList: [],
    },
    actions: {
        // 获取收件人地址
        async getAddrList({ commit }) {
            let result = await reqAddressInfo()
            console.log('Address', result);
            if (result.code == 200) {
                commit('GETADDRLIST', result.data)
                return 'ok'
            } else {
                return Promise.reject(new Error('fail'))
            }
        },
        // 获取商品列表
        async getOrderList({ commit }) {
            let result = await reqOrderInfo()
            console.log('Orders', result);
            if (result.code == 200) {
                commit('GERORDERLIST', result.data)
                return 'ok'
            } else {
                return Promise.reject(new Error('fail'))
            }
        },

    },
    mutations: {
        GETADDRLIST(state, addrList) {
            state.addrList = addrList
        },
        GERORDERLIST(state, orderList) {
            state.orderList = orderList
        }
    },
    getters: {
        detailOrderList(state) {
            return state.orderList.detailArrayList || []
        },

    },
}