import * as API from './utils'

function request (method, url, params) {
  let commonUrls = '/monitor/manager/api/v1' + url
  return API.Request(method, commonUrls, params)
}
export function AddGroup (name) {
  return request('POST', '/groups', { 'name': name })
}
export function AddGroupAndMember (name, members) {
  return request('POST', '/groups', { 'name': name, 'members': members })
}
export function ListGroup () {
  return request('GET', '/groups').then()
}
export function ListMemberGroup (member) {
  return request('GET', `/groups?member=${member}`)
}
export function GetGroup (name) {
  return request('GET', `/groups/${name}`)
}
export function DeleteGroup (name) {
  return request('DELETE', `/groups/${name}`)
}
export function AddMember (params) {
  return request('POST', `/groups/${params.groupName}/members`, { 'name': params.members })
}

export function ListMember (name) {
  return request('GET', `/groups/${name}/members`)
}

export function GetMember (params) {
  return request('GET', `/groups/${params.groupName}/members/${params.members}`)
}

export function DeleteMember (params) {
  return request('DELETE', `/groups/${params.groupName}/members/${params.members}`)
}

export function ListInfoType(params) {
  return request('GET', `/project/${params.project}/infotypes`)
}

export function UpdateInfoType(params) {
  return request('POST', `/project/${params.project}/infotypes`, { p1: params.p1, p2: params.p2, p3: params.p3 })
}

export function DeleteInfoType(params) {
  return request('DELETE', `/project/${params.project}/infotypes`, { p1: params.p1, p2: params.p2, p3: params.p3 })
}

