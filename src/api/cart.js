import request from '../utils/request'
import api from './api'

/**
 * 用户购物车信息
 *
 * @return 用户购物车信息
 */
export function getCartList() {
  return request.get(api.CartList)
}

/**
 * 加入商品到购物车
 * <p>
 * 如果已经存在购物车货品，则增加数量；
 * 否则添加新的购物车货品项。
 *
 * @param cart   购物车商品信息， { goodsId: xxx, productId: xxx, number: xxx }
 * @return 加入购物车操作结果
 */
export function cartAdd(data) {
  return request.post(api.CartAdd, data)
}

/**
 * 立即购买
 * <p>
 * 和add方法的区别在于：
 * 1. 如果购物车内已经存在购物车货品，前者的逻辑是数量添加，这里的逻辑是数量覆盖
 * 2. 添加成功以后，前者的逻辑是返回当前购物车商品数量，这里的逻辑是返回对应购物车项的ID
 *
 * @param cart   购物车商品信息， { goodsId: xxx, productId: xxx, number: xxx }
 * @return 立即购买操作结果
 */
export function cartFastAdd(data) {
  return request.post(api.CartFastAdd, data)
}

/**
 * 修改购物车商品货品数量
 *
 * @param cart   购物车商品信息， { id: xxx, goodsId: xxx, productId: xxx, number: xxx }
 * @return 修改结果
 */
export function cartUpdate(data) {
  return request.post(api.CartUpdate, data)
}

/**
 * 购物车商品货品勾选状态
 * <p>
 * 如果原来没有勾选，则设置勾选状态；如果商品已经勾选，则设置非勾选状态。
 *
 * @param body   购物车商品信息， { productIds: xxx, isChecked: 1/0 }
 * @return 购物车信息
 */
export function checkCart(data) {
  return request.post(api.CartChecked, data)
}

/**
 * 购物车商品删除
 *
 * @param body   购物车商品信息， { productIds: xxx }
 * @return 购物车信息
 * 成功则
 * {
 * errno: 0,
 * errmsg: '成功',
 * data: xxx
 * }
 * 失败则 { errno: XXX, errmsg: XXX }
 */
export function cartDelete(data) {
  return request.post(api.CartDelete, data)
}

/**
 * 购物车商品货品数量
 * <p>
 * 如果用户没有登录，则返回空数据。
 *
 * @return 购物车商品货品数量
 */
export function cartGoodsCount() {
  return request.get(api.CartGoodsCount)
}

/**
 * 购物车下单
 *
 * @param cartId    购物车商品ID：
 *                  如果购物车商品ID是空，则下单当前用户所有购物车商品；
 *                  如果购物车商品ID非空，则只下单当前购物车商品。
 * @param addressId 收货地址ID：
 *                  如果收货地址ID是空，则查询当前用户的默认地址。
 * @param couponId  优惠券ID：
 *                  如果优惠券ID是空，则自动选择合适的优惠券。
 * @return 购物车操作结果
 */
export function cartCheckout(params) {
  return request.get(api.CartCheckout, { params })
}
