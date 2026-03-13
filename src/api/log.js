import * as API from './utils'

function request (method, url, project, params) {
  let commonUrls = '/zoo/v1' + url
  return API.JWT(method, commonUrls, params, project)
}

export function GetLogStream (params) {
  return request('GET', `/cluster/${params.clusterName}/namespace/${params.namespace}/logstream/${params.logStreamName}`, params.namespace)
}

export function UpdateLogStream (params) {
  return request('POST', `/cluster/${params.clusterName}/namespace/${params.namespace}/logstream/${params.logStreamName}`, params.namespace,
    { 'protocol': params.protocol, 'address': params.address })
}

export function DeleteLogStream (params) {
  return request('DELETE', `/cluster/${params.clusterName}/namespace/${params.namespace}/logstream/${params.logStreamName}`, params.namespace)
}

export function ListLogStream (params) {
  return request('GET', `/cluster/${params.clusterName}/namespace/${params.namespace}/logstream`, params.namespace)
}

export function CreateLogStream (params) {
  return request('POST', `/cluster/${params.clusterName}/namespace/${params.namespace}/logstream`, params.namespace,
    { 'protocol': params.protocol, 'address': params.address })
}
