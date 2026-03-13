import * as API from './utils'
import { Base64 } from 'js-base64'
import axios from 'axios'
import yaml from 'js-yaml'

function request (method, url, project, isNeedToken, params) {
  let commonUrls = '/zoo/v2' + url
  if (isNeedToken === true) {
    return API.JWT(method, commonUrls, params, project)
  } else {
    return API.Request(method, commonUrls, params)
  }
}
export function ListCluster () {
  // 查询获取cluster列表
  return request('GET', '/cluster')
}

export function ListBusiness () {
  // 查询获取business列表
  return request('GET', '/business')
}
// 查询获取一条cluster信息
export function GetCluster (name) {
  return request('GET', `/cluster/${name}`)
}

// 创建用户集群证书
export function CreateToken (name) {
  return request('POST', `/cluster/${name}/account`, '', true)
}

// 获取用户集群证书
export function GetToken (name) {
  return request('GET', `/cluster/${name}/account`, '', true).then(function (
    res
  ) {
    if (res && res.token) {
      let token = Base64.decode(JSON.stringify(res.token))
      res.token = token
    }
    return res
  })
}

// 获取集群上的所有有权限的namespace
export function ListPermits (name, userName) {
  return request('GET', `/cluster/${name}/permit`, '', true, {
    user_name: userName
  })
}
// 更新集群用户绑定的权限
export function UpdateNamespace (namespace, userName, readOnly) {
  return request(
    'PUT',
    `/cluster/permit/${namespace}?user_name=${userName}&read_only=${readOnly}`,
    namespace,
    true
  )
}
// 用户加入namespace
export function JoinNamespace (params) {
  return request(
    'POST',
    `/cluster/${params.clusterName}/permit/${params.namespace}?read_only=${params.read_only}`,
    params.namespace,
    true
  )
}

// 从namespace中删除用户
export function OutNamespace (params) {
  return request(
    'DELETE',
    `/cluster/${params.clusterName}/permit/${params.namespace}`,
    params.namespace,
    true,
    { user_name: params.userName, read_only: params.read_only }
  )
}

// 创建集群上的namespace
export function CreateClusterNamespace (params) {
  return request(
    'POST',
    `/cluster/${params.clusterName}/namespace`,
    params.projectName,
    true,
    { name: params.projectName }
  )
}
// 查看是否有对应集群上namespace的权限
export function GetNamespacePermits (params) {
  return ListPermits(params.clusterName).then(res => {
    let permit = false
    res.forEach(ele => {
      if (ele.namespace === params.namespace) {
        permit = true
      }
    })
    return permit
  })
}

// 获取用户kubeconfig和token
export function GetCredentials (name) {
  let funcs = [GetToken(name), GetCluster(name)]
  return request('ALL', '', '', false, funcs).then(
    axios.spread(function (res1, res2) {
      let p = {
        clusterName: name,
        userName: res1.user,
        cert: res2.cert,
        apiserver: res2.addr,
        token: res1.token
      }
      let obj = API.GetKubeconfig(p)
      if (!obj) {
        return {
          key: res1.token,
          kubeconfig: ''
        }
      }

      let config = yaml.safeDump(obj)
      return {
        key: res1.token,
        kubeconfig: config
      }
    })
  )
}

// 获取项目绑定的集群
export function ListBindedCluster (projectName) {
  return request('GET', `/cluster?project=${projectName}`, projectName, true)
}
// 查看集群上的namespace是否存在
export function getClusterNamespace (projectName) {
  return request('GET', `/cluster/namespace/${projectName}`, projectName, true)
}
// 删除namespace, 只允许owner角色删除; 删除所有集群上的namespace
export function deleteClusterNamespace (projectName) {
  return request(
    'DELETE',
    `/cluster/namespace/${projectName}`,
    projectName,
    true
  )
}

/**
 * 虚拟用户
 */

// 虚拟用户加入namespace
export function JoinNamespa (params) {
  return request(
    'POST',
    `/cluster/${params.clusterName}/vuserpermit/${params.namespace}?vuser=${params.userName}
    `,
    params.namespace,
    true
    // {
    //   user_name: params.userName
    // }
  )
}

// 查看是否有对应集群上namespace的权限
export function GetNamespacePermit (params) {
  return ListPermits(params.clusterName, params.userName).then(res => {
    let permit = false
    res.forEach(ele => {
      if (ele.namespace === params.namespace) {
        permit = true
      }
    })
    return permit
  })
}

// 获取虚拟用户集群证书
export function GetTokenVUser (params) {
  return request('GET', `/cluster/${params.name}/vuseraccount`, '', true, {
    vuser: params.userName
  }).then(function (res) {
    if (res && res.token) {
      let token = Base64.decode(JSON.stringify(res.token))
      res.token = token
    }
    return res
  })
}

// 创建虚拟用户用户集群证书
export function CreateTokenToVUser ({ name, userName }) {
  return request(
    'POST',
    `/cluster/${name}/vuseraccount?vuser=${userName}`,
    '',
    true
  )
}

// 获取虚拟用户kubeconfig和token
export function GetCredential (params) {
  let funcs = [GetTokenVUser(params), GetCluster(params.name)]
  return request('ALL', '', '', false, funcs).then(
    axios.spread(function (res1, res2) {
      let p = {
        clusterName: params.name,
        userName: res1.user,
        cert: res2.cert,
        apiserver: res2.addr,
        token: res1.token
      }
      let obj = API.GetKubeconfig(p)
      if (!obj) {
        return {
          key: res1.token,
          kubeconfig: ''
        }
      }

      let config = yaml.safeDump(obj)
      return {
        key: res1.token,
        kubeconfig: config
      }
    })
  )
}

// 从namespace中删除用户
export function OutNamespa (params) {
  return request(
    'DELETE',
    `/cluster/${params.clusterName}/vuserpermit/${params.namespace}?vuser=${params.userName}`,
    params.namespace,
    true
  )
}
