import * as API from './utils'
function request (method, url, params) {
  return API.Request(method, url, params)
}

// function request (method, url, params) {
//   let commonUrls = '' + url
//   return API.JWT(method, commonUrls, params)
// }
export function GetRegions (data) {
  return request('GET', `/tools/v1/regions`, data)
}
export function SerchIPv6 (region, id, data) {
  return request('GET', `/tools/v1/vpc_ipv6/${region}/${id}`, data)
}
export function TransformIPv6 (data) {
  return request('GET', `/tools/v1/nat64_ipv6`, data)
}
export function QueryPods(data) {
  return request('POST', `/tools/v1/podip/?page=${data.page}&size=${data.size}`, data)
}
