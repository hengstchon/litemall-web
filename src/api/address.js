import request from '../utils/request'
import api from './api'

/**
 * 用户收货地址列表
 *
 * @return 收货地址列表
 */
export function addressList() {
  return request.get(api.AddressList)
}

/**
 * 收货地址详情
 *
 * @param id     收货地址ID
 * @return 收货地址详情
 */
export function addressDetail(params) {
  return request.get(api.AddressDetail, { params })
}

/**
 * 添加或更新收货地址
 *
 * @param data 用户收货地址
 * @return 添加或更新操作结果
 */
export function addressSave(data) {
  return request.post(api.AddressSave, data)
}

/**
 * 删除收货地址
 *
 * @param data 用户收货地址，{ id: xxx }
 * @return 删除操作结果
 */
export function addressDelete(data) {
  return request.post(api.AddressDelete, data)
}
