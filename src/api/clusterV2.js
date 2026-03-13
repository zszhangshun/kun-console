import * as API from "./utils";

function request(method, url, project, isNeedToken, params) {
  let commonUrls = "/zoo/v2" + url;
  if (isNeedToken === true) {
    return API.JWT(method, commonUrls, params, project);
  } else {
    return API.Request(method, commonUrls, params);
  }
}

// 查询获取cluster列表
export function ListClusterV2() {
  return request("GET", "/cluster?rank=priority");
}

// 获取namespace状态
export function GetNamespaceStatus(clusterName, namespace) {
  return request(
    "GET",
    `/cluster/${clusterName}/namespace/${namespace}`,
    namespace,
    true
  );
}

// 获取项目绑定的集群
export function ListBindedCluster(projectName) {
  return request('GET', `/cluster?project=${projectName}&support=istio`, projectName, true)
}
