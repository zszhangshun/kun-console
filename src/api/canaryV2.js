import * as API from './utils'

function request (method, url, params, project) {
  // let mockPuth = '/canary'
  let commonUrls = '/gray/v2' + url
  // if (params.mock) {
  //   mockPuth += params.mock
  //   return API.Request('GET', mockPuth)
  // }
  return API.JWT(method, commonUrls, params, project)
}
// 账号组列表
export function getAccountgroup (params) {
  return request(
    'GET',
    `/projects/${params.project}/accountgroups`,
    {},
    params.project
  )
}
export function createGroup (data, params) {
  return request(
    'POST',
    `/projects/${params.project}/accountgroups`,
    data,
    params.project
  )
}
export function updateGroup (data, params) {
  return request(
    'PUT',
    `/projects/${params.project}/accountgroups/${params.uuid}`,
    data,
    params.project
  )
}
export function delGroup (params, data) {
  return request(
    'DELETE',
    `/projects/${params.project}/accountgroups/${params.uuid}`,
    data,
    params.project
  )
}
// 网关
export function GetGatewayList (project, data) {
  return request(
    'GET',
    `/projects/${project}/gateways`,
    data,
    project
  )
}
export function CreateGateway (data, params) {
  return request(
    'POST',
    `/projects/${params.project}/gateways`,
    data,
    params.project
  )
}
export function UpdateGateway (data, params, method) {
  let path = `/projects/${params.project}/gateways/${params.gateway}`
  if (method) {
    const { action, canary } = method
    path += `?action=${action}${canary ? `&canary=${canary}` : ''}`
  }
  return request(
    'PUT',
    // `/projects/${params.project}/gateways/${params.gateway}`,
    path,
    data,
    params.project
  )
}
export function BindGateway (data, params) {
  return request(
    'PUT',
    `/projects/${params.project}/gateways/${params.gateway}?action=${params.method}&canary=${params.uuid}`,
    data,
    params.project
  )
}
export function GetGatewayHistorys (params, data) {
  return request(
    'GET',
    `/projects/${params.project}/gateways/${params.gateway}`,
    data,
    params.project
  )
}
export function delGateway (params, data) {
  return request(
    'DELETE',
    `/projects/${params.project}/gateways/${params.gateway}`,
    data,
    params.project
  )
}
export function GetGatewayStatus (params, data) {
  return request(
    'GET',
    `/projects/${params.project}/gateways/${params.gateway}/onlinestatus`,
    data,
    params.project
  )
}
export function GetGatewaysOnline (params, data) {
  return request(
    'GET',
    `/projects/${params.project}/gateways/${params.gateway}/online`,
    data,
    params.project
  )
}
export function CreateGatewaysOnline (params, data) {
  return request(
    'POST',
    `/projects/${params.project}/gateways/${params.gateway}/online?version=${params.version}&cluster=${params.cluster}`,
    data,
    params.project
  )
}
export function UpdateGatewaysOnline (params, data) {
  return request(
    'PUT',
    `/projects/${params.project}/gateways/${params.gateway}/online?version=${params.version}&cluster=${params.cluster}`,
    data,
    params.project
  )
}
export function DeleteGatewaysOnline (params, data) {
  return request(
    'DELETE',
    `/projects/${params.project}/gateways/${params.gateway}/online?cluster=${params.cluster}`,
    data,
    params.project
  )
}
// 灰度控制
export function GetCanarylist (params, data) {
  return request(
    'GET',
    `/projects/${params.project}/canaries`,
    data,
    params.project
  )
}
export function CreateCanary (data, params) {
  return request(
    'POST',
    `/projects/${params.project}/canaries`,
    data,
    params.project
  )
}
export function UpdateCanary (data, params) {
  return request(
    'PUT',
    `/projects/${params.project}/canaries/${params.canary}`,
    data,
    params.project
  )
}
// 绑定网关 /projects/{project}/canaries/{canary}/binding
export function UpdateGatewayCanary (data, params, method) {
  let path = `/projects/${params.project}/canaries/${params.canary}/binding`
  if (method) {
    const { action, gateway } = method
    path += `?action=${action}${gateway ? `&gateway=${gateway}` : ''}`
  }
  return request(
    'PUT',
    // `/projects/${params.project}/gateways/${params.gateway}`,
    path,
    {},
    params.project
  )
}
export function DelCanary (params, data) {
  return request(
    'DELETE',
    `/projects/${params.project}/canaries/${params.canary}`,
    data,
    params.project
  )
}
export function GetCanary (params, data) {
  // /cluster/{cluster}/namespace/{namespace}/canary/{canary}
  return request(
    'GET',
    `/projects/${params.project}/canaries/${params.canary}`,
    data,
    params.project
  )
}
export function GetCanaryOlines (params, data) {
  return request(
    'GET',
    `/projects/${params.project}/canaries/${params.canary}/online`,
    data,
    params.project
  )
}
export function CreateGrayOnline (params, data) {
  return request(
    'POST',
    `/projects/${params.project}/canaries/${params.canary}/online?version=${params.version}&cluster=${params.cluster}`,
    data,
    params.project
  )
}
export function UpdateGrayOnline (params, data) {
  return request(
    'PUT',
    `/projects/${params.project}/canaries/${params.canary}/online?version=${params.version}&cluster=${params.cluster}`,
    data,
    params.project
  )
}
export function DeleteGrayOnline (params, data) {
  return request(
    'DELETE',
    `/projects/${params.project}/canaries/${params.canary}/online?cluster=${params.cluster}`,
    data,
    params.project
  )
}
export function GetGrayStatus (params, data) {
  return request(
    'GET',
    `/projects/${params.project}/canaries/${params.canary}/onlinestatus`,
    data,
    params.project
  )
}
// log
export function GetLogs (params, data) {
  return request(
    'GET',
    `/projects/${params.project}/oplogs`,
    data,
    params.project
  )
}

// target /projects/{project}/targets
export function GetTargetlist (params, data) {
  return request(
    'GET',
    `/projects/${params.project}/targets`,
    data,
    params.project
  )
}

// cluster
export function GetServicelist (params, data) {
  return request(
    'GET',
    `/clusters/${params.cluster}/namespaces/${params.project}/services`,
    data,
    params.project
  )
}

export function addTarget (data, params) {
  // data.mock = '/target/add'
  return request(
    'POST',
    `/projects/${params.project}/targets`,
    data,
    params.project
  )
}
export function delTarget (params, data) {
  return request(
    'DELETE',
    `/projects/${params.project}/targets/${params.target}`,
    data,
    params.project
  )
}
// 查看关联的灰度信息
// /projects/{project}/canaryrelation
export function getCanaryrelation (params, data) {
  return request(
    'GET',
    `/projects/${params.project}/canaryrelation`,
    data,
    params.project
  )
}
