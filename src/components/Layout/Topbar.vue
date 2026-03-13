<template>
  <el-row>
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-title">
        <span>
          <span class="logo"></span>
          {{title}}
        </span>
      </div>
      <div class="topbar-account">
        <a href="https://git.ucloudadmin.com/kun/feedback/issues" target="blank">
          <span class="userinfo-inner">
            <i class="el-icon-star-on"></i>
            我要吐槽
          </span>
        </a>
        <a href="http://kun.page.ucloudadmin.com/userguide/" target="blank">
          <span class="userinfo-inner">
            <i class="el-icon-tickets"></i>
            文档
          </span>
        </a>
        <el-dropdown trigger="click">
          <span class="userinfo-inner">
            <i class="iconfont icon-user"></i>
            {{nickname}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span @click="toAuth">设置</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- <div class="">
          <span>
            设置
          </span>
        </div>-->
        <!--<el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner"><i class="iconfont icon-user"></i> {{nickname}}  <i
            class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item  @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>-->
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { GetCurrentUser } from '@/api/utils'
import { CreateUser } from '@/api/iam'
export default {
  props: {
    title: String
  },
  data () {
    let currentName = GetCurrentUser()
    return {
      nickname: currentName
    }
  },
  created () {
    this.setNickName()
  },
  methods: {
    saveUser (name) {
      CreateUser({ 'name': name }).then().catch(function (err) {
        console.log('createUserfaile:', err)
      })
    },
    setNickName () {
      let currentName = GetCurrentUser()
      if (currentName) {
        this.nickname = currentName
      }
      // WhoAmI().then(res => {
      //   // 没有创建，需要先创建
      //   let currentName = res.username
      //   SetCurrentUser(currentName)
      //   this.nickname = currentName
      //   if (!res.registered) {
      //     this.saveUser(currentName)
      //   }
      // }).catch(err => {
      //   console.log(err)
      // })
    },
    toAuth () {
      console.log('toAuth')
      this.$router.push({ path: '/setting/authorization' })
    }
  }
}
</script>
<style lang="scss" scoped>
.logo {
  width: 74px;
  height: 14px;
  margin-left: 25px;
  display: inline-block;
  // background-image: '/assets/img/logo.png';
  background: url(../../assets/img/logo.png) no-repeat center center;
  background-size: 100%;
}
.topbar-wrap {
  height: 50px;
  line-height: 50px;
  background: transparent;
  padding: 0px;

  .topbar-btn {
    color: #fff;
  }
  /*.topbar-btn:hover {*/
  /*background-color: #4A5064;*/
  /*}*/
  .topbar-logo {
    float: left;
    width: 179px;
    line-height: 26px;
  }
  .topbar-logos {
    float: left;
    width: 60px;
    line-height: 26px;
  }
  .topbar-logo img,
  .topbar-logos img {
    height: 40px;
    margin-top: 5px;
    margin-left: 10px;
  }
  .topbar-title {
    float: left;
    text-align: left;
    width: 200px;
    padding-left: 20px;
    color: #fff;
    font-size: 18px;
    border-left: 1px solid #606266;
  }
  .topbar-account {
    position: relative;
    float: right;
    padding-right: 20px;
  }
  .userinfo-inner {
    cursor: pointer;
    color: #fff;
    padding-left: 10px;
  }
}
</style>
