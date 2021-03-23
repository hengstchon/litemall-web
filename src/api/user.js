import request from '../utils/request'
import api from './api'

/**
 * 账号登录
 *
 * @param body    请求内容，{ username: xxx, password: xxx }
 * @return 登录结果
 */
export function authLoginByAccount(data) {
  return request.post(api.AuthLoginByAccount, data)
}

/**
 * 账号注册
 *
 * @param body    请求内容
 *                {
 *                  username: xxx,
 *                  password: xxx,
 *                }
 *                其中code是手机验证码，目前还不支持手机短信验证码
 * @return 登录结果
 * 成功则
 * {
 * errno: 0,
 * errmsg: '成功',
 * data:
 *   {
 *   token: xxx,
 *   userInfo: {
 *      avatarUrl: xxx,
 *      nickName: xxx
 *      }
 * }
 * }
 * 失败则 { errno: XXX, errmsg: XXX }
 */
export function authRegister(data) {
  return request.post(api.AuthRegister, data)
}

/**
 * 账号登出
 */
export function authLogout() {
  return request.post(api.AuthLogout)
}

/**
 * 账号信息
 */
export function authInfo() {
  return request.get(api.AuthInfo)
}

/**
 * 账号信息更新
 *
 * @param body    请求内容
 *                {
 *                nickName: xxx,
 *                }
 * @return 更新结果
 */
export function authSave(data) {
  return request.post(api.AuthSave, data)
}

/**
 * 用户收藏列表
 *
 * @param userId 用户ID
 * @param type   类型，如果是0则是商品收藏，如果是1则是专题收藏
 * @param page   分页页数
 * @param limit   分页大小
 * @return 用户收藏列表
 */
export function collectList(params) {
  return request.get(api.CollectList, { params })
}

/**
 * 用户收藏添加或删除
 * <p>
 * 如果商品没有收藏，则添加收藏；如果商品已经收藏，则删除收藏状态。
 *
 * @param userId 用户ID
 * @param body   请求内容，{ type: xxx, valueId: xxx }
 * @return 操作结果
 */
export function collectAddOrDelete(data) {
  return request.post(api.CollectAddOrDelete, data)
}

/**
 * 用户足迹列表
 *
 * @param page 分页页数
 * @param limit 分页大小
 * @return 用户足迹列表
 */
export function footprintList(params) {
  return request.get(api.FootprintList, { params })
}

/**
 * 删除用户足迹
 *
 * @param userId 用户ID
 * @param body   请求内容， { id: xxx }
 * @return 删除操作结果
 */
export function footprintDelete(data) {
  return request.post(api.FootprintDelete, data)
}

/**
 * 常见问题
 * @param page 分页页数
 * @param size 分页大小
 * @return 常见问题列表
 */
export function issueList() {
  return request.get(api.IssueList)
}

/**
 * 添加意见反馈
 *
 * @param feedback 意见反馈
 * @return 操作结果
 */
export function feedbackAdd(data) {
  return request.post(api.FeedbackAdd, data)
}

/**
 * 用户个人页面数据
 * 目前是用户订单统计信息
 */
export function userIndex() {
  return request.get(api.UserIndex)
}

/**
¦* 搜索页面信息
¦* 如果用户已登录，则给出用户历史搜索记录；
¦* 如果没有登录，则给出空历史搜索记录。
¦*
¦* @return 搜索页面信息
¦*/
export function searchIndex() {
  return request.get(api.SearchIndex)
}

/**
¦* 清除用户搜索历史
¦*
¦* @return 清理是否成功
¦*/
export function searchClearHistory() {
  return request.post(api.SearchClearHistory)
}
