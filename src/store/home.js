// 引入三级联动api
import { reqCategoryList, reqGetbannerList, reqfloorList } from "@/api"
// home模块
export default {
    namespaced: true,
    actions: {
        // 三级列表（async await 获取响应数据对象）
        async categoryList(context) {
            // axios请求返回的是应该promise对象
            let result = await reqCategoryList()
            console.log('result1:', result);
            if (result.code == 200) {
                context.commit('CATEGORYLIST', result.data)
            }
        },
        // 轮播图数据
        async getBannerList(context) {
            let result = await reqGetbannerList()
            console.log('result2:', result);
            if (result.code == 200) {
                context.commit('GETBANNERLIST', result.data)
            }
        },
        // Floor数据
        async getFloorList(context) {
            let result = await reqfloorList()
            console.log('result3:', result);
            if (result.code == 200) {
                context.commit('GETFLOORLIST', result.data)
            }
        },

    },
    mutations: {
        CATEGORYLIST(state, categoryList) {
            state.categoryList = categoryList
        },
        GETBANNERLIST(state, bannerList) {
            state.bannerList = bannerList
        },
        GETFLOORLIST(state, floorList) {
            state.floorList = floorList
        },
    },
    state: {
        categoryList: [],
        bannerList: [],
        floorList: [],
    },
    getters: {

    }
}