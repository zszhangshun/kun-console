import * as API from './utils'
// import axios from 'axios'

function request (method, url, params, project, cluster) {
  let commonUrls = `/logsphere/clusters/${cluster}/logging/v1alpha2` + url
  return API.JWT(method, commonUrls, params, project)
}
// 查询日志信息
export function getlogs (params, tokenkey, cluster) {
  return request('GET', `/cluster`, params, tokenkey, cluster)
}
// 查询日志信息 namespace
export function getNamespacelogs (params, tokenkey, cluster, namespace) {
  return request('GET', `/namespaces/${namespace}`, params, tokenkey, cluster)
}
export function getpods (params, project, cluster, tokenkey) {
  return API.JWT(
    'GET',
    `/logsphere/clusters/${cluster}/kapis/v1/namespaces/${project}/pods`,
    params,
    tokenkey
  )
}
export function clusterList () {
  return API.Request('GET', `/zoo/v1/cluster`)
}
export const tokenkey = 'userlogs'
