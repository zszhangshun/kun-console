<template>
  <div class="main">
    <!-- <my-topbar title></my-topbar> -->
    <div class="header">
      <div class="nav">
        <div class="top clearfix">
          <ul class="tabsleft clearfix">
            <li class="logo"></li>
            <li
                v-for="(item, index) in productList"
                :key="index"
                :class="active === index ? 'active' : ''"
                @click="goProject(index)">
              <a href="#" @click.prevent>{{ item }}</a>
            </li>
          </ul>
          <div class="portright">
            <a href="/project">
              <span class="btn-console">控制台</span>
            </a>
            <a href="http://kun.page.ucloudadmin.com/userguide/" target="blank">
              <span class="btn-help">文档中心</span>
            </a>
            <a
               href="http://kun.page.ucloudadmin.com/userguide/docs/quickstart/quickstart.html"
               target="blank">
              <span class="btn-help">Quick Start</span>
            </a>
          </div>
        </div>
      </div>
      <div class="banner">
        <div class="banner-text">
          <div class="desc">
            <div class="theme">鲲</div>
            <div class="sketch">鲲 | KUN， Keep UCloud Nimble</div>
            <div
                 class="detail">北冥有鱼，其名为鲲。鲲之大，一锅炖不下。
              <div class="detail"> 鲲项目面向 UCloud 内部，通过一系列的平台和工具，帮助您更快地研发产品、提供更好的服务。</div>
            </div>
          </div>
        </div>
        <div class="content">
        </div>
      </div>
    </div>
    <div class="section">
      <div class="project clearfix" id="prj0">
        <div class="prj-desc prj-text">
          <div class="logo logo-console"></div>
          <div class="title">容器平台(UAEK)</div>
          <div class="alias">分布式的应用托管平台，自动化的容器部署、扩展和管理</div>
          <div
               class="detail">提供弹性、分布式的应用托管服务平台，帮助开发者一站式轻松开发并部署应用程序。 UAEK底层基于 Kubernetes
            ，提供高可用，在线升级，自动扩缩，负载均衡，日志查看，资源监控，等多种功能。</div>
          <div class="port" @click="OpenProject('/project')">立即使用</div>
        </div>
        <div class="prj-show prj-console"></div>
      </div>
      <div class="project clearfix" id="prj1">
        <div class="prj-desc prj-text fr">
          <div class="logo logo-repository"></div>
          <div class="title">镜像仓库</div>
          <div class="alias">高可用的 Docker 镜像仓库</div>
          <div class="detail">高可用的 Docker 镜像仓库，提供了华北、华东和华南异地容灾特性。 可以在管理网，预发布，办公网直接使用。</div>
          <div class="port" @click="OpenProject('/repository')">立即使用</div>
        </div>
        <div class="prj-show prj-repository fl"></div>
      </div>
      <div class="project clearfix" id="prj2">
        <div class="prj-desc prj-text">
          <div class="logo logo-deploy"></div>
          <div class="title">部署工具</div>
          <div class="alias">持续集成工具集</div>
          <div class="detail">部署工具提供了持续集成方案，实现了CI/CD 等功能</div>
          <div class="port" @click="OpenProject('/deploy/job')">立即使用</div>
        </div>
        <div class="prj-show prj-deploy"></div>
      </div>
    </div>
    <div class="footer">鲲项目组：基础产品中心-PPL_FPC/技术中台研发部-PPL_TRDD</div>
  </div>
</template>

<script>
// import MyTopbar from '@/components/Layout/Topbar'
export default {
  // components: { MyTopbar },
  data() {
    return {
      productList: ['容器平台', '镜像仓库', '部署工具'],
      active: 0,
      background: {
        // backgroundImage: 'url(' + require('../assets/img/background.png') + ')',
        // backgroundSize: '100% 100%',
        // minHeight: '100vh',
        // minWidth: '100vw'

      }
    }
  },
  methods: {
    tbaleswitch(val) {
      console.log(val)
      this.active = val
    },
    goProject(index) {
      this.active = index
      const el = document.getElementById(`prj${index}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    OpenProject(val) {
      this.$router.push({ path: val })
    }
  }
}
</script>
<style scoped lang="scss" src='./style.scss'></style>
