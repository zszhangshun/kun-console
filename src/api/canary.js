import * as API from './utils'

function request (method, url, params, project) {
  // let mockPuth = '/canary'
  let commonUrls = '/gray/v1' + url
  // if (params.mock) {
  //   mockPuth += params.mock
  //   return API.Request('GET', mockPuth)
  // }
  return API.JWT(method, commonUrls, params, project)
}
export function GetDomainList (params, data) {
  // data.mock = '/domain/list'
  return request(
    'GET',
    `/cluster/${params.cluster}/namespace/${params.namespace}/domains`,
    data,
    params.namespace
  )
}
export function addDomain (data, params) {
  return request(
    'POST',
    `/cluster/${params.cluster}/namespace/${params.namespace}/domains`,
    data,
    params.namespace
  )
}
export function delDomain (params, data) {
  return request(
    'DELETE',
    `/cluster/${params.cluster}/namespace/${params.namespace}/domain/${
      params.domain
    }`,
    data,
    params.namespace
  )
}
export function updateDomain (data, params) {
  return request(
    'PUT',
    `/cluster/${params.cluster}/namespace/${params.namespace}/domain/${
      params.domain
    }`,
    data,
    params.namespace
  )
}
// gray
export function GetCanarylist (params, data) {
  return request(
    'GET',
    `/cluster/${params.cluster}/namespace/${params.namespace}/canaries`,
    data,
    params.namespace
  )
}
export function GetCanary (params, data) {
  return request(
    'GET',
    `/cluster/${params.cluster}/namespace/${params.namespace}/canary/${
      params.canary
    }`,
    data,
    params.namespace
  )
}
export function addCanary (data, params) {
  return request(
    'POST',
    `/cluster/${params.cluster}/namespace/${params.namespace}/canaries`,
    data,
    params.namespace
  )
}
export function UpdateCanary (data, params) {
  return request(
    'PUT',
    `/cluster/${params.cluster}/namespace/${params.namespace}/canary/${
      params.canary
    }`,
    data,
    params.namespace
  )
}
export function delCanary (params, data) {
  return request(
    'DELETE',
    `/cluster/${params.cluster}/namespace/${params.namespace}/canary/${
      params.uuid
    }`,
    data,
    params.namespace
  )
}
// strategy
export function GetStrategy (params, data) {
  return request(
    'GET',
    `/cluster/${params.cluster}/namespace/${params.namespace}/canary/${
      params.canary
    }/strategy `,
    data,
    params.namespace
  )
}
export function addStrategys (data, params) {
  return request(
    'PUT',
    `/cluster/${params.cluster}/namespace/${params.namespace}/canary/${
      params.canary
    }/strategy `,
    data,
    params.namespace
  )
}
// target
export function GetTargetlist (data, params) {
  return request(
    'GET',
    `/cluster/${params.cluster}/namespace/${params.namespace}/targets`,
    data,
    params.namespace
  )
}
export function delTarget (params, data) {
  return request(
    'DELETE',
    `/cluster/${params.cluster}/namespace/${params.namespace}/target/${
      params.target
    }`,
    data,
    params.namespace
  )
}
export function addTarget (data, params) {
  // data.mock = '/target/add'
  return request(
    'POST',
    `/cluster/${params.cluster}/namespace/${params.namespace}/targets`,
    data,
    params.namespace
  )
}

// gateway
export function GetGatewayList (params, data) {
  return request(
    'GET',
    `/cluster/${params.cluster}/namespace/${params.namespace}/gateways`,
    data,
    params.namespace
  )
}
export function addGateway (data, params) {
  return request(
    'POST',
    `/cluster/${params.cluster}/namespace/${params.namespace}/gateways`,
    data,
    params.namespace
  )
}
export function updateGateway (data, params) {
  return request(
    'PUT',
    `/cluster/${params.cluster}/namespace/${params.namespace}/gateway/${
      params.name
    }`,
    data,
    params.namespace
  )
}
export function delGateway (params, data) {
  return request(
    'DELETE',
    `/cluster/${params.cluster}/namespace/${params.namespace}/gateway/${
      params.name
    }`,
    data,
    params.namespace
  )
}
// cluster
export function GetServicelist (params, data) {
  return request(
    'GET',
    `/cluster/${params.cluster}/namespace/${params.namespace}/services`,
    data,
    params.namespace
  )
}

// 获取namespace注入状态

export function GetInjection (data, params) {
  return request(
    'GET',
    `/cluster/${data.cluster}/namespace/${data.projectName}/injection`,
    params,
    data.projectName
  )
}
// 修改namespace注入状态
export function UpdateInjection (params, data) {
  return request(
    'PUT',
    `/cluster/${data.cluster}/namespace/${data.projectName}/injection`,
    params,
    data.projectName
  )
}
