import request from '../utils/request'
import api from './api'

/**
 * 订单列表
 *
 * @param showType 显示类型，如果是0则是全部订单
 * @param page     分页页数
 * @param limit     分页大小
 * @param sort     排序字段
 * @param order     排序方式
 * @return 订单列表
 */
export function orderList(params) {
  return request.get(api.OrderList, { params })
}

/**
 * 订单详情
 *
 * @param orderId 订单ID
 * @return 订单详情
 */
export function orderDetail(params) {
  return request.get(api.OrderDetail, { params })
}

/**
 * 提交订单
 *
 * @param body   订单信息，
 *    { cartId：xxx, 必填
 *      addressId: xxx, 必填
 *      couponId: xxx, 必填
 *      message: xxx,
 *      grouponRulesId: xxx,
 *      grouponLinkId: xxx }
 * @return 提交订单操作结果
 */
export function orderSubmit(data) {
  return request.post(api.OrderSubmit, data)
}

/**
 * 取消订单
 *
 * @param body   订单信息，{ orderId：xxx }
 * @return 取消订单操作结果
 */
export function orderCancel(data) {
  return request.post(api.OrderCancel, data)
}

/**
 * 确认收货
 *
 * @param body   订单信息，{ orderId：xxx }
 * @return 订单操作结果
 */
export function orderConfirm(data) {
  return request.post(api.OrderConfirm, data)
}

/**
 * 删除订单
 *
 * @param body   订单信息，{ orderId：xxx }
 * @return 订单操作结果
 */
export function orderDelete(data) {
  return request.post(api.OrderDelete, data)
}
