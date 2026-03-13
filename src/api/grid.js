import * as API from './utils'
// function request1 (method, url, params) {
//   return API.Request(method, url, params)
// }

function request (method, url, params, project) {
  let commonUrls = '' + url
  return API.JWT(method, commonUrls, params, project)
}
// 获取图形信息
export function GetGridSet (cluster, namespace, data) {
  return request(
    'GET',
    `/mesh/v1/clusters/${cluster}/projects/${namespace}/graph`,
    data,
    namespace
  )
}
// 获取时间列表
export function GetGridDurations () {
  return API.Request('GET', `/mesh/v1/graph/durations`)
}
// 获取图形类型
export function GetGridTypes () {
  return API.Request('GET', `/mesh/v1/graph/types`)
}
// 获取边缘线详情
export function GetLineDetail (cluster, name, data) {
  return request(
    'GET',
    `/mesh/v1/clusters/${cluster}/projects/${name}/metrics`,
    data,
    name
  )
}
