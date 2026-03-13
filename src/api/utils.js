import axios from 'axios'
// import { Base64 } from 'js-base64'
import { tokenCollec } from './common'
const ErrMap = {
  400: '请求参数有误',
  401: '认证失败',
  402: '预留错误码402',
  403: '没有权限访问',
  404: '请求资源没找到',
  405: '请求方法不支持',
  406: '请求的资源的内容特性无法满足请求头中的条件',
  407: '代理认证失败',
  408: '请求超时',
  409: '请求冲突，资源已经存在',
  500: '内部错误',
  501: '无法识别请求资源',
  502: '网关不可用',
  503: '后端接口服务不可用',
  504: '网关超时',
  505: 'HTTP版本不支持',
  10000: '账号名为空',
  10001: '集群不存在',
  10002: '连接集群失败',
  10003: '用户创建集群凭证失败',
  10004: '从DB中获取集群信息失败',
  10005: '集群中没有项目对应的Namespace',
  10006: '项目不存在',
  10007: '用户加入项目失败',
  10008: '项目名称不符合规范，需要prj-开头，由a-z,0-9,-字符组成，且不能以‘-’开头结尾',
  10009: '项目数量以超配额',
  10010: '用户不存在',
  10011: '集群上创建项目对应的Namespace失败',
  10012: '项目已存在',
  10013: '名称和邮箱格式必须为字符串',
  10014: '用户在集群上没有对应凭证，请先在 “集群信息->获取凭证”',
  10015: '集群中没有项目对应的Namespace',
  10016: 'Role不存在',
  10017: "项目添加用户时数据格式应该为{'name': string, 'role': owner or user}",
  10018: '项目无法删除',
  10019: 'Namesapce已存在',
  10020: 'ServiceAccount已存在',
  10021: '用户已在当前Namespace授权',
  10022: '当前Namespace的权限已经被删除',
  10023: '没找到对应的日志服务',
  10024: '自定义日志服务请求Body不可用',
  10025: '自定义日志服务不存在',
  10026: '自定义日志服务冲突',
  10027: '服务名称不合理，可能不在对应的Namespace',
  10028: '没有找到对应服务代理',
  10029: '服务代理已经存在',
  10030: '',
  10031: '请手动清除残留资源',
  10100: '超过Bucket添加上限',
  10101: '项目描述不能为空'
}

var axiosIns = axios.create({
  timeout: 30000
})
// axiosIns.defaults.baseURL = 'http://192.168.150.18:5000'
// 添加一个请求拦截器
axiosIns.interceptors.request.use(
  config => {
    if (config.headers === undefined) {
      config.headers = {
        'Content-Type': 'application/json'
      }
    } else {
      config.headers['Content-Type'] = 'application/json'
    }
    if (process.env.NODE_ENV === 'development') {
      // config.headers['remote_user'] = 'sophia.an'
      // config.headers['remote_user'] = 'gary.ge'
      config.headers['remote_user'] = 'immy.bao'
    }
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// let isFreshing = new Map()
// response 拦截器 处理error
axiosIns.interceptors.response.use(
  response => {
    return response
  },
  err => {
    if (err && err.response) {
      err.message = getErrMessage(err.response)
    }
    return Promise.reject(err)
  }
)

function getErrMessage (response) {
  let status = response.status
  if (status === 510 && response.headers['accept-zoo-status']) {
    status = parseInt(response.headers['accept-zoo-status'])
  }
  if (status === 422) {
    return response.data.message
  }
  if (status === 412) {
    return response.data
  }
  return ErrMap[status]
}
export function Request (method, url, params, headers) {
  if (
    process.env.NODE_ENV === 'production' &&
    process.env.ENDPOINT_ENV === 'test'
  ) {
    if (url.indexOf('zoo') > -1) {
      url = '/test' + url
    }
  }
  switch (method) {
    case 'GET':
      return GET(url, params, headers)
    case 'POST':
      return POST(url, params, headers)
    case 'DELETE':
      return DELETE(url, params, headers)
    case 'PUT':
      return PUT(url, params, headers)
    case 'PATCH':
      return PATCH(url, params, headers)
    case 'ALL':
      return ALL(params)
    default:
      console.log('Not found method:', method)
  }
}

// 通用方法
const POST = (url, params, headers) => {
  if (params === undefined) {
    params = {}
  }
  return axiosIns
    .post(`${url}`, params, { headers: headers })
    .then(res => res.data)
}

const GET = (url, params, headers) => {
  return axiosIns
    .get(`${url}`, { params: params, headers: headers })
    .then(res => res.data)
}

const PUT = (url, params, headers) => {
  if (params === undefined) {
    params = {}
  }
  return axiosIns
    .put(`${url}`, params, { headers: headers })
    .then(res => res.data)
}

const DELETE = (url, params, headers) => {
  return axiosIns
    .delete(`${url}`, { params: params, headers: headers })
    .then(res => res.data)
}

const PATCH = (url, params, headers) => {
  if (params === undefined) {
    params = {}
  }
  return axiosIns
    .patch(`${url}`, params, { headers: headers })
    .then(res => res.data)
}

const ALL = func => {
  return Promise.all(func)
}
/* params={
  clusterName: string
  userName: string,
  cert : string,
  apiserver: string,
  token: string,
} */
export function GetKubeconfig (params) {
  let data = {
    apiVersion: 'v1',
    clusters: [],
    contexts: [],
    'current-context': params.userName + '@' + params.clusterName,
    kind: 'Config',
    preferences: {},
    users: []
  }
  // cluster 赋值
  data.clusters.push({
    name: params.clusterName,
    cluster: {
      'certificate-authority-data': params.cert,
      server: params.apiserver
    }
  })
  // context 赋值
  data.contexts.push({
    name: params.userName + '@' + params.clusterName,
    context: {
      cluster: params.clusterName,
      user: params.userName + '@' + params.clusterName
    }
  })
  // user 赋值
  data.users.push({
    name: params.userName + '@' + params.clusterName,
    user: {
      token: params.token
    }
  })
  return data
}

export function FilterByName (all, fil) {
  let result = []

  if (!all) {
    return result
  }

  let remain = all.filter(function (value) {
    for (let j in fil) {
      let name = fil[j].name
      if (value.name === name) {
        return false
      }
    }
    return true
  })

  fil.forEach(ele => {
    let r = ele
    r['state'] = 1 // 0 不在filter， 1 在filter
    result.push(r)
  })

  remain.forEach(ele => {
    let r = ele
    r['state'] = 0 // 0 不在filter， 1 在filter
    result.push(r)
  })
  return result
}

export function GetCurrentUser () {
  return localStorage.getItem('Remote-User')
}

export function SetCurrentUser (name) {
  return localStorage.setItem('Remote-User', name)
}

export function GetJobSearch () {
  return localStorage.getItem('Job-Search')
}

export function SetJobSearch (content) {
  return localStorage.setItem('Job-Search', content)
}

export function SetResourcesetProject (project) {
  return localStorage.setItem('Resourceset-Project', project)
}

export function GetResourcesetProject () {
  return localStorage.getItem('Resourceset-Project')
}

function getProjectToken (project) {
  let currentUser = GetCurrentUser()
  return localStorage.getItem(currentUser + ';' + project)
}

function setProjectToken (project, token) {
  let currentUser = GetCurrentUser()
  return localStorage.setItem(currentUser + ';' + project, token)
}

/**
 * token校验
 * @param {*} project  作为存储本地token的key
 */
export function JWT (method, commonUrls, params, project) {
  let token = getProjectToken(project)
  let headers = []
  if (token) {
    headers = { Authorization: 'Bearer ' + token }
  }
  return Request(method, commonUrls, params, headers)
    .then(res => {
      return res
    })
    .catch(err => {
      const {
        response: { status }
      } = err
      if (status === 401) {
        const w3Authenticate = err.response.headers['www-authenticate']
        return getToken(w3Authenticate).then(res => {
          const token = res.token
          setProjectToken(project, token)
          headers = { Authorization: 'Bearer ' + token }
          return Request(method, commonUrls, params, headers)
        })
      }
      return Promise.reject(err)
    })
}
export function JWTBucket (method, commonUrls, params, project) {
  let tokenkey = GetCurrentUser() + '_' + project
  let token = tokenCollec('get', tokenkey)
  let headers = []
  if (token) {
    headers = { Authorization: 'Bearer ' + token }
  }
  return Request(method, commonUrls, params, headers)
    .then(res => {
      return res
    })
    .catch(err => {
      const {
        response: { status }
      } = err
      if (status === 401) {
        const w3Authenticate = err.response.headers['www-authenticate']
        return getToken(w3Authenticate).then(res => {
          // return getTokenBucket(w3Authenticate, project).then(res => {
          const obj = {}
          obj[tokenkey] = res.token
          tokenCollec('set', obj)
          headers = {
            Authorization: 'Bearer ' + res.token
          }
          return Request(method, commonUrls, params, headers)
        })
      }
      return Promise.reject(err)
    })
}

function getLocation (href) {
  var l = document.createElement('a')
  l.href = href
  return l
}

function getToken (w3Authenticate) {
  const tokenUrlslice = w3Authenticate
    .substring(w3Authenticate.indexOf('realm=') + 6)
    .split(',', 3)
  let uri = tokenUrlslice[0].replace(/"/g, '')
  let service = tokenUrlslice[1].replace(/"/g, '')
  let scope = tokenUrlslice[2].replace(/"/g, '')
  let newScope = scope.substring(0, scope.lastIndexOf(':') + 1)
  let location = getLocation(uri)
  // if (process.env.NODE_ENV === 'development') {
  //   return GET(location.pathname + '?' + service + '&' + newScope)
  // } else {
  //   return GET(uri + '?' + service + '&' + newScope)
  // }
  return GET(location.pathname + '?' + service + '&' + newScope)
}
// function getTokenBucket (w3Authenticate, bucket) {
//   const tokenUrlslice = w3Authenticate
//     .substring(w3Authenticate.indexOf('realm=') + 6)
//     .split(',', 3)
//   let uri = tokenUrlslice[0].replace(/"/g, '')
//   let service = tokenUrlslice[1].replace(/"/g, '')
//   let scope = tokenUrlslice[2].replace(/"/g, '')
//   let newScope = scope.substring(0, scope.indexOf('=') + 1)
//   let location = getLocation(uri)
//   return GET(
//     location.pathname + '?' + service + '&' + newScope + 'bucket:' + bucket
//   )
// }
function cLength (str) {
  var reg = /([0-9a-f]{1,4}:)|(:[0-9a-f]{1,4})/gi
  var temp = str.replace(reg, ' ')
  return temp.length
}
export function IsIPv6 (tmpstr) {
  // CDCD:910A:2222:5498:8475:1111:3900:2020
  var patrn = /^([0-9a-f]{1,4}:){7}[0-9a-f]{1,4}$/i
  var r = patrn.exec(tmpstr)
  if (r) {
    return true
  }
  if (tmpstr === '::') {
    return true
  }
  // F:F:F::1:1 F:F:F:F:F::1 F::F:F:F:F:1格式
  patrn = /^(([0-9a-f]{1,4}:){0,6})((:[0-9a-f]{1,4}){0,6})$/i
  r = patrn.exec(tmpstr)
  if (r) {
    var c = cLength(tmpstr)
    if (c <= 7 && c > 0) {
      return true
    }
  }
  // F:F:10F::
  patrn = /^([0-9a-f]{1,4}:){1,7}:$/i
  r = patrn.exec(tmpstr)
  if (r) {
    return true
  }
  // ::F:F:10F
  patrn = /^:(:[0-9a-f]{1,4}){1,7}$/i
  r = patrn.exec(tmpstr)
  if (r) {
    return true
  }
  // F:0:0:0:0:0:10.0.0.1格式
  patrn = /^([0-9a-f]{1,4}:){6}(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/i
  r = patrn.exec(tmpstr)
  if (r) {
    if (r[2] <= 255 && r[3] <= 255 && r[4] <= 255 && r[5] <= 255) {
      return true
    }
  }
  // F::10.0.0.1格式
  patrn = /^([0-9a-f]{1,4}:){1,5}:(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/i
  r = patrn.exec(tmpstr)
  if (r) {
    if (r[2] <= 255 && r[3] <= 255 && r[4] <= 255 && r[5] <= 255) {
      return true
    }
  }
  // ::10.0.0.1格式
  patrn = /^::(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/i
  r = patrn.exec(tmpstr)
  if (r) {
    if (r[1] <= 255 && r[2] <= 255 && r[3] <= 255 && r[4] <= 255) {
      return true
    }
  }
  return false
}

// 按集群名称排序
export function sort(datas = []) {
  const namePrefixGroup = {}
  // 根据集群名称前缀分组 例如：{uae-a: [{name: 'uae-a1'}, {name: 'uae-a2'}], uae-b: [{name: 'uae-b12'}, {name: 'uae-b2'}]}
  datas.map(item => {
    // namePrefix 集群名称的前缀部分
    const namePrefix = String(item.name).slice(0, 5)
    if (namePrefixGroup[namePrefix]) {
      namePrefixGroup[namePrefix].push(item)
    } else {
      namePrefixGroup[namePrefix] = [item]
    }
  })

  const nameNumPart = item => String(item.name).slice(5)
  Object.entries(namePrefixGroup).map(([key, value]) => {
    value.sort((a, b) => {
      // nameNumPart 获取集群名称的数字部分
      return nameNumPart(a) - nameNumPart(b)
    })
  })

  // sortedClusterPrefixArr 集群名称前缀排序后的数组
  const sortedClusterPrefixArr = Object.keys(namePrefixGroup)
    .filter(v => v !== 'uae-c')
    .sort((a, b) => {
      return a.localeCompare(b)
    })
  sortedClusterPrefixArr.unshift('uae-c')

  let dataSource = []
  sortedClusterPrefixArr.forEach(v => {
    if (!namePrefixGroup[v] || !namePrefixGroup[v].length) return
    dataSource = [...dataSource, ...namePrefixGroup[v]]
  })
  return dataSource
}

// 该方法负责将数组转化成二维数组
function formatJson(headers, rows) {
  // 首先遍历数组
  // [{ name: "nginx-0", "nodename": "172.18.218.28",}, {"name": "nginx-1", "nodename": "172.18.218.29"}] 
  // => [ ['nginx-0','172.18.218.28'], ['nginx-1', '172.18.218.29'] ]
  return rows.map(item => {
    return Object.keys(headers).map(key => {
      return item[headers[key]]
    }) 
  })
}

/**
 * @description 导出表格数据
 * @param {Object} headers 表头对应关系 
 * @param {Array} datas 表格数据
 * @param {string} filename 导出的文件名
 */
export function exportData({ headers, datas, filename }) {
  // 懒加载
  import('@/vendor/Export2Excel').then(async excel => {
    const data = formatJson(headers, datas)

    excel.export_json_to_excel({
      header: Object.keys(headers),
      data,
      filename,
      autoWidth: true,
      bookType: 'xlsx'
    })
  })
}
