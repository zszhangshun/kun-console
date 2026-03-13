import * as API from './utils'

function request (method, url, params) {
  let commonUrls = '/hamster/api' + url
  return API.Request(method, commonUrls, params)
}

export function Statistic (params) {
  return request(
    'GET',
    `/cluster/${params.clusterName}/namespace/${params.namespace}/statistic?date=${params.date}`
  )
}

export function StatisticSource (params) {
  return request(
    'GET',
    `/cluster/${params.clusterName}/namespace/${params.namespace}/statistic?date=${params.date}`
  )
}
export function GetStatistics (params) {
  return request(
    'GET',
    `/cluster/${params.clusterName}/namespace/${params.namespace}/statistics`
  )
}
export function GetBills (data) {
  return request('GET', `/statistic/bill`, data)
}
export function GetPrice (data) {
  return request('GET', `/statistic/price`, data)
}
export function GetStatistic (data) {
  return request('GET', `/statistic`, data)
}
export function GetDepartment (data) {
  return request('GET', `/bill/department`, data)
}
export function GetProject (data) {
  return request('GET', `/bill/project`, data)
}
export function GetPod (data) {
  return request('GET', `/bill/pod`, data)
}
