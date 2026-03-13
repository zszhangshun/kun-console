import * as API from './utils'

function request (method, url, project, params) {
  let commonUrls = '/zoo/v1' + url
  return API.JWT(method, commonUrls, params, project)
}

export function GetProxy (params) {
  return request('GET', `/cluster/${params.clusterName}/namespace/${params.namespace}/proxy/${params.serviceName}`, params.namespace)
}

export function DeleteProxy (params) {
  return request('DELETE', `/cluster/${params.clusterName}/namespace/${params.namespace}/proxy/${params.serviceName}`, params.namespace)
}

export function ListProxy (params) {
  return request('GET', `/cluster/${params.clusterName}/namespace/${params.namespace}/proxy`, params.namespace)
}

export function CreateProxy (params) {
  return request('POST', `/cluster/${params.clusterName}/namespace/${params.namespace}/proxy`, params.namespace,
    { 'name': params.serviceName, 'port': params.port })
}
