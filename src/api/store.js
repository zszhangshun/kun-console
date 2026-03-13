import * as API from './utils'

function newRequest (method, url, params, project) {
  let commonUrls = '/appshop/v2' + url
  return API.JWT(method, commonUrls, params, project)
}
function Request (method, url, params, project) {
  let commonUrls = '/appshop/v1/shop/kun' + url
  return API.JWT(method, commonUrls, params, project)
}
function request (method, url, params) {
  let commonUrls = '/appshop/v1/shop/kun' + url
  return API.Request(method, commonUrls, params)
}
export function GetAppsList (data) {
  return request('GET', `/apps`, data)
}
export function GetAppsDetail (name) {
  return request('GET', `/app/${name}`)
}
export function GetFiles (name, version, params) {
  return request('GET', `/app/${name}/version/${version}`, params)
}
export function DeployApp (params) {
  return Request(
    'POST',
    `/app/${params.chart}/version/${params.chart_version}`,
    params,
    params.project
  )
}
export function GetReleases ({ project, cluster }) {
  return newRequest(
    'GET',
    `/clusters/${cluster}/namespaces/${project}/releases`,
    {},
    project
  )
}
export function GetRelease ({ project, cluster, name }) {
  return newRequest(
    'GET',
    `/clusters/${cluster}/namespaces/${project}/releases/${name}`,
    {},
    project
  )
}
export function GetReleaseStatus ({ project, cluster, name }) {
  return newRequest(
    'GET',
    `/clusters/${cluster}/namespaces/${project}/releases/${name}/status`,
    {},
    project
  )
}
export function DelRelease ({ project, cluster, name }) {
  return newRequest(
    'DELETE',
    `/clusters/${cluster}/namespaces/${project}/releases/${name}`,
    {},
    project
  )
}
export function PutRelease ({ project, cluster, name, ...datas }) {
  return newRequest(
    'PUT',
    `/clusters/${cluster}/namespaces/${project}/releases/${name}`,
    datas,
    project
  )
}
export function GetHistories ({ project, cluster, name }) {
  return newRequest(
    'GET',
    `/clusters/${cluster}/namespaces/${project}/releases/${name}/histories`,
    {},
    project
  )
}
export function PutHistorie ({ project, cluster, name, version }) {
  return newRequest(
    'PUT',
    `/clusters/${cluster}/namespaces/${project}/releases/${name}/histories/${version}`,
    {},
    project
  )
}
export function CreateReleases ({ project, cluster, ...datas }) {
  return newRequest(
    'POST',
    `/clusters/${cluster}/namespaces/${project}/releases`,
    datas,
    project
  )
}
