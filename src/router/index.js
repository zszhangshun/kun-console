import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import Layout from '../components/Layout/Layout.vue'
import Cluster from '../views/cluster/cluster.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/',
    component: Layout,
    menuShow: true,
    leaf: true,
    iconCls: 'el-icon-menu',
    children: [{ path: '/cluster', component: Cluster, name: '集群信息' }]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
//createWebHashHistory()
// 使用 # 路由，URL 像：http://a.com/#/home
// # 后内容不会发给服务器，部署简单，刷新基本不 404。

// createWebHistory()
// 使用 HTML5 history，URL 像：http://a.com/home
// 地址更美观，但刷新 / 直达子路径时，服务器必须配置“所有路由回退到 index.html”，否则 404。

export default router
