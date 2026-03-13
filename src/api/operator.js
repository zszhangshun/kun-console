import * as API from './utils'
function APIRequest (method, url, params) {
  return API.Request(method, url, params)
}

function request (method, url, params, project) {
  let commonUrls = '' + url
  return API.JWT(method, commonUrls, params, project)
}
export function GetOperators () {
  return APIRequest('GET', `/operator-server/v1/operators`)
}
export function GetInstanceList (data, project) {
  return request(
    'GET',
    `/operator-server/v1/project/${data.project}/instances`,
    data,
    project
  )
}
export function GetParamsList (operatorName) {
  return API.Request(
    'GET',
    `/operator-server/v1/operators/${operatorName}/parameters`
  )
}
export function CreateRedis (data) {
  return request(
    'POST',
    `/operator-server/v1/project/${data.project}/instances`,
    data,
    data.project
  )
}
export function UpdateRedis (data) {
  return request(
    'PUT',
    `/operator-server/v1/project/${data.project}/instances/${data.name}`,
    data,
    data.project
  )
}
export function GetDetails (data, instanceName) {
  return request(
    'GET',
    `/operator-server/v1/project/${data.project}/instances/${instanceName}`,
    data,
    data.project
  )
}
export function DeleteInstance (data, instanceName) {
  return request(
    'DELETE',
    `/operator-server/v1/project/${data.project}/instances/${instanceName}`,
    data,
    data.project
  )
}
export function GetTemplate (data, instanceName) {
  return request(
    'GET',
    `/operator-server/v1/project/${data.project}/instances/${instanceName}/template`,
    data,
    data.project
  )
}
