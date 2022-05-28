// serch模块

import { reqGetSearchInfo } from "@/api"
export default {
    namespaced: true,
    actions: {
        // params在组件中dispatch的时候传递,并且至少为一个空对象
        async getSearchList({ commit }, params = {}) {
            let result = await reqGetSearchInfo(params)
            console.log('result4:', result);
            if (result.code == 200) {
                commit('GETSEARCHLIST', result.data)
            }
        }
    },
    mutations: {
        GETSEARCHLIST(state, searchList) {
            state.searchList = searchList
            console.log('state result4:200 ok', state.searchList);

        }
    },
    state: {
        searchList: {}
    },
    // 简化数据（相当于计算属性）
    getters: {
        goodsList(state) {
            return state.searchList.goodsList || []
        },
        trademarkList(state) {
            return state.searchList.trademarkList || []

        },
        attrsList(state) {
            return state.searchList.attrsList || []
        },
    }
}