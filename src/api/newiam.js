import * as API from './utils'
// import { AddGroupAndMember } from './alert'
// import axios from 'axios'

function request (method, url, params) {
  // let commonUrls = '/mock/' + url
  // let commonUrls = '/iam/v2/' + url
  return API.Request(method, url, params)
}

function requestToken (method, url, params, project) {
  // let commonUrls = '/mock/' + url
  // let commonUrls = '/iam/v2/' + url
  return API.JWTBucket(method, url, params, project)
}
// 镜像仓库列表
export function RepositoryList (data) {
  return request('GET', `/iam/v2/permit/buckets`, data)
}
// 创建Bucket
export function CreateBucket (data) {
  return request('POST', `/iam/v2/buckets`, data)
}
// 获取Bucket信息
export function GetBucket (bucketName) {
  return request('GET', `/iam/v2/buckets/${bucketName}`)
}
// 编辑Bucket信息
export function UpdateBucket (bucketName, params) {
  return request('PUT', `/iam/v2/buckets/${bucketName}`, params)
}
// 获取Bucket密码信息
export function GetBucketGroups (bucketName) {
  return request('GET', `/iam/v2/groups/${bucketName}`)
}
// 重置Bucket密码信息
export function ResetBucketGroups (bucketName) {
  return request('PUT', `/iam/v2/groups/${bucketName}/reset`)
}
// 添加Bucket用户
export function AddBucketUser (bucketName, params) {
  return request('POST', `/iam/v2/buckets/${bucketName}/users`, params)
}
// 删除Bucket用户
export function DeleteBucketUser (bucketName, userName) {
  return request('DELETE', `/iam/v2/buckets/${bucketName}/users/${userName}`)
}
// 更新Bucket用户
export function UpdateBucketUser (bucketName, userName, role) {
  return request(
    'PUT',
    `/iam/v2/buckets/${bucketName}/users/${userName}/roles/${role}`
  )
}
// 获取Bucket用户组信息
export function GetBucketUsers (bucketName, data) {
  return request('GET', `/iam/v2/buckets/${bucketName}/users`, data)
}
// 获取镜像详情
export function RepositoryDetail (bucketName, data) {
  return requestToken(
    'GET',
    `/hub/api/v1/buckets/${bucketName}/repositories`,
    data,
    bucketName
  )
}
// 删除Tags信息
export function DeleteRepository (bucketName, mirrorName) {
  return requestToken(
    'DELETE',
    `/hub/api/v1/buckets/${bucketName}/repositories/${mirrorName}`,
    {},
    bucketName
  )
}
// 获取Tags列表信息
export function GetTaglist (bucketName, mirrorName, data) {
  return requestToken(
    'GET',
    `/hub/api/v1/buckets/${bucketName}/repositories/${mirrorName}/tags`,
    data,
    bucketName
  )
}
// 删除Tags信息
export function DeleteTags (bucketName, mirrorName, tag) {
  return requestToken(
    'DELETE',
    `/hub/api/v1/buckets/${bucketName}/repositories/${mirrorName}/tags/${tag}`,
    {},
    bucketName
  )
}
