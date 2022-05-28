import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";

export default {
    namespaced: true,
    state: {
        cartList: []
    },
    actions: {
        // 购物车列表数据
        async getCartList({ commit }) {
            let result = await reqCartList()
            if (result.code == 200) {
                console.log('cartList', result.data)
                commit('GETCARTLIST', result.data)
            }
        },
        // 删除购物车商品
        async deleteCart({ commit }, skuId) {
            let result = await reqDeleteCartById(skuId)
            if (result.code == 200) {
                return 'ok'
            } else Promise.reject(new Error('faile'))
        },
        // 修改勾选状态
        async checkCart({ commit }, { skuId, isChecked }) {
            let result = await reqUpdateCheckedById(skuId, isChecked)
            if (result.code == 200) {
                return 'ok'
            } else Promise.reject(new Error('faile'))
        },
        //修改全选状态
        updateAllCartIsChecked({ dispatch, state }, isChecked) {
            //数组
            let promiseAll = [];
            state.cartList[0].cartInfoList.forEach((item) => {
                let promise = dispatch("checkCart", {
                    skuId: item.skuId,
                    isChecked,
                });
                promiseAll.push(promise);
            });
            //最终返回结果
            return Promise.all(promiseAll);
        },
        //删除全部勾选的产品
        deleteAllCheckedCart({ dispatch, getters }) {
            let PromiseAll = [];
            getters.cartList.cartInfoList.forEach((item) => {
                let promise =
                    item.isChecked == 1 ?
                    dispatch("deleteCart", item.skuId) :
                    "";
                //将每一次返回的Promise添加到数组当中
                PromiseAll.push(promise);
            });
            //只要全部的p1|p2....都成功，返回结果即为成功
            //如果有一个失败，返回即为失败结果
            return Promise.all(PromiseAll);
        },
    },
    mutations: {
        GETCARTLIST(state, cartList) {
            state.cartList = cartList
        },
    },
    getters: {
        cartList(state) {
            return state.cartList[0] || {}
        },
    }
}