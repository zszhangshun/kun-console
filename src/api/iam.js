import * as API from './utils'
import axios from 'axios'

function request (method, url, params) {
  let commonUrls = '/iam/v1' + url
  return API.Request(method, commonUrls, params)
}

// 查询获取一条user信息
export function GetUser (name) {
  return request('GET', `/user/${name}`)
}

// 查询获取user列表
export function ListUser (params) {
  return request('GET', '/user',params)
}
// 创建用户
/*
body{
    name: string
}
*/
export function CreateUser (params) {
  return request('POST', '/user', params)
}

// 查询获取项目列表
export function ListProject () {
  return request('GET', '/project')
}
// 创建项目
export function CreateProject (params) {
  return request('POST', '/project', params)
}
// 编辑项目
export function EditProject (params) {
  return request('PUT', `/project/${params.name}`, params)
}

// 查看项目下的用户
export function ListProjectUser (name) {
  return request('GET', `/project/${name}/user`)
}
// 增加项目用户
export function AddProjectUser (projectName, params) {
  return request('POST', `/project/${projectName}/user`, params)
}
// 删除项目用户
export function DeleteProjectUser (params) {
  return request(
    'DELETE',
    `/project/${params.projectName}/user/${params.userName}`
  )
}
// 获取项目用户信息
export function GetProjectUserInfo (params) {
  return request(
    'GET',
    `/project/${params.projectName}/user/${params.userName}`
  )
}
// 更新用户权限
export function UpdateProjectUserRole (params) {
  return request(
    'PUT',
    `/project/${params.projectName}/user/${params.userName}/role/${
      params.role
    }?read_only=${params.read_only}`
  )
}
export function WhoAmI () {
  return request('GET', '/whoami')
}

export function GetRoles () {
  return request('GET', '/roles')
}

// 获取项目对所有用户的邀请状态
export function ListUserInviteState (name) {
  let funcs = [ListUser(), ListProjectUser(name)]

  return request('ALL', '', funcs).then(
    axios.spread(function (res1, res2) {
      return API.FilterByName(res1, res2)
    })
  )
}
// 删除iam中的project，只允许owner操作
export function DeleteIamProject (projectName) {
  return request('DELETE', `/project/${projectName}`)
}

/**
 * 虚拟账号
 */

// 查看虚拟账号
export function ListVirtualAccount () {
  return request('GET', `/virtualuser`)
}

// 查看虚拟账号详细信息
export function GetVirtualUserDetail (params) {
  return request('GET', `/virtualuser/${params.virtual_user}`)
}

// 创建虚拟账号
export function AddVirtualAccount (params) {
  return request('POST', `/virtualuser`, params)
}

// 查看项目
export function GetProjectList (params) {
  return request('GET', `/virtualuser/${params.virtual_user}/project`)
}

// 添加项目
export function AddProject (params) {
  return request('POST', `/virtualuser/${params.virtual_user}/project`, params)
}

// 删除项目
export function DeleteProject (params) {
  return request('DELETE', `/virtualuser/${params.virtual_user}/project/${params.project_name}`, params)
}

// 查看用户
export function GetUserList (params) {
  return request('GET', `/virtualuser/${params.virtual_user}/user`)
}

// 添加用户
export function AddUser (params) {
  return request('POST', `/virtualuser/${params.virtual_user}/user`, { 'name': params.name })
}

// 删除用户
export function DeleteUser (params) {
  return request('DELETE', `/virtualuser/${params.virtual_user}/user/${params.user}`)
}
