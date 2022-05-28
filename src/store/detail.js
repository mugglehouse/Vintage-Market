import { reqGoodsInfo, reqAddOrUpdateShop } from "@/api"
import { getUUID } from '@/utils/uuid_token'
export default {
    namespaced: true,
    state: {
        goodInfo: {},
        // 游客临时身份--utils里封装好--本地存储--下次访问就还是原来的身份
        uuid_token: getUUID()
    },
    actions: {
        // 详情页数据
        async getGoodInfo({ commit }, skuid) {
            let result = await reqGoodsInfo(skuid)
            if (result.code == 200) {
                commit('GETGOODINFO', result.data)
            }
        },
        // 加入购物车数据
        async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
            let result = await reqAddOrUpdateShop(skuId, skuNum)
            if (result.code == 200) {
                console.log('car req result', result.data)
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },

    },
    mutations: {
        GETGOODINFO(state, goodInfo) {
            state.goodInfo = goodInfo
        },

    },
    getters: {
        // 这里至少返回一个空对象，因为goodInfo是空对象，会返回一个undefined
        // 路径导航
        categoryView(state) {
            return state.goodInfo.categoryView || {}
        },
        // 产品信息
        skuInfo(state) {
            return state.goodInfo.skuInfo || {}
        },
        // 售卖属性
        spuSaleAttrList(state) {
            return state.goodInfo.spuSaleAttrList || []
        }

    }
}