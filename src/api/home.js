import request from '../utils/request'
import api from './api'

/**
 * 首页数据
 * @return 首页数据
 */
export function getHome() {
  return request.get(api.IndexUrl)
}

/**
 * 商城介绍信息
 * @return 商城介绍信息
 */
export function getAbout() {
  return request.get(api.AboutUrl)
}
