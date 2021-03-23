import request from '../utils/request'
import api from './api'

/**
 * 分类详情
 *
 * @param id   分类类目ID。
 *             如果分类类目ID是空，则选择第一个分类类目。
 *             需要注意，这里分类类目是一级类目
 * @return 分类详情
 */
export function catalogList() {
  return request.get(api.CatalogList)
}

/**
 * 当前分类栏目
 *
 * @param id 分类类目ID
 * @return 当前分类栏目
 */
export function catalogCurrent(params) {
  return request.get(api.CatalogCurrent, { params })
}

/**
 * 商品详情
 * <p>
 * 用户可以不登录。
 * 如果用户登录，则记录用户足迹以及返回用户收藏信息。
 *
 * @param id     商品ID
 * @return 商品详情
 */
export function goodsDetail(params) {
  return request.get(api.GoodsDetail, { params })
}

/**
 * 商品分类类目
 *
 * @param id 分类类目ID
 * @return 商品分类类目
 */
export function getCategory(params) {
  return request.get(api.GoodsCategory, { params })
}

/**
 * 根据条件搜素商品
 * <p>
 * 1. 这里的前五个参数都是可选的，甚至都是空
 * 2. 用户是可选登录，如果登录，则记录用户的搜索关键字
 *
 * @param categoryId 分类类目ID，可选
 * @param brandId    品牌商ID，可选
 * @param keyword    关键字，可选
 * @param isNew      是否新品，可选
 * @param isHot      是否热买，可选
 * @param userId     用户ID
 * @param page       分页页数
 * @param limit      分页大小
 * @param sort       排序方式，支持"add_time", "retail_price"或"name"
 * @param order      排序类型，顺序或者降序
 * @return 根据条件搜素的商品详情
 */
export function goodsList(params) {
  return request.get(api.GoodsList, { params })
}

/**
 * 商品详情页面“大家都在看”推荐商品
 *
 * @param id, 商品ID
 * @return 商品详情页面推荐商品
 */
export function goodsRelated(params) {
  return request.get(api.GoodsRelated, { params })
}

/**
 * 在售的商品总数
 *
 * @return 在售的商品总数
 */
export function getGoodsCount() {
  return request.get(api.GoodsCount)
}
