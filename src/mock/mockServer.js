// 引入mockjs
import Mock from 'mockjs'
// 引入json
import banner from './banner.json'
import floor from './floor.json'
import getBaseCategoryList from './getBaseCategoryList.json'
import searchList from './searchList.json'

// 定义mock规则
Mock.mock('/mock/banner', {
    code: 200,
    message: '成功',
    data: banner,
    ok: true
})
Mock.mock('/mock/floor', {
    code: 200,
    message: '成功',
    data: floor,
    ok: true
})
Mock.mock('/mock/getBaseCategoryList', {
    code: 200,
    message: '成功',
    data: getBaseCategoryList,
    ok: true
})
Mock.mock('/mock/searchList', {
    code: 200,
    message: '成功',
    data: searchList,
    ok: true
})