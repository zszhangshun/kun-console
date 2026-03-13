import * as API from './utils'

function request (method, url, project, params) {
  let commonUrls = '/cd/api/v1' + url
  return API.JWT(method, commonUrls, params, project)
}

export function ListResourceSet (project, params = {}) {
  return request('GET', `/projects/${project}/resourcesets`, project, params)
}

export function GetResourceSet (params) {
  return request(
    'GET',
    `/projects/${params.projectName}/resourcesets/${params.resourceset}`,
    params.projectName
  )
}

export function CreateResourceSet (params) {
  return request(
    'POST',
    `/projects/${params.projectName}/resourcesets`,
    params.projectName,
    { name: params.name, project: params.projectName, type: params.type }
  )
}

export function DeleteResourceSet (params) {
  return request(
    'DELETE',
    `/projects/${params.projectName}/resourcesets/${params.resourceset}`,
    params.projectName
  )
}
export function ListResourceSetVersion (params) {
  return request(
    'GET',
    `/projects/${params.projectName}/resourcesets/${params.resourceset}/versions?with_configuration=false`,
    params.projectName, params
  )
}

export function GetResourceSetVersion (params) {
  return request(
    'GET',
    `/projects/${params.projectName}/resourcesets/${params.resourceset}/versions/${params.version}`,
    params.projectName
  )
}

export function CreateResourceSetVersion (params) {
  return request(
    'POST',
    `/projects/${params.projectName}/resourcesets/${params.resourceset}/versions`,
    params.projectName,
    { name: params.version, configuration: params.configuration }
  )
}

export function DeleteResourceSetVersion (params) {
  return request(
    'DELETE',
    `/projects/${params.projectName}/resourcesets/${params.resourceset}/versions/${params.version}`,
    params.projectName
  )
}

export function ListJob (params) {
  return request(
    'GET',
    `/projects/${params.projectName}/jobs?${params.querystring}&with_configuration=false`,
    params.projectName
  )
}
export function GetJob (params) {
  return request(
    'GET',
    `/projects/${params.projectName}/jobs/${params.jobId}`,
    params.projectName
  )
}

export function CreateJob (params) {
  return request(
    'POST',
    `/projects/${params.projectName}/jobs`,
    params.projectName,
    {
      resourceset: params.resourceset,
      version: params.version,
      cluster: params.cluster,
      namespace: params.projectName,
      configuration: params.configuration
    }
  )
}

export function GetJobLog (params) {
  return request(
    'GET',
    `/projects/${params.projectName}/jobs/${params.jobId}/log`,
    params.projectName
  )
}
