<template>
  <el-row>
    <div class="first-button">
      <el-button
                 type="primary"
                 :disabled="!selectedIds.length"
                 @click="
          ; (makeSureVisible = true),
                  (sureMessage = '创建集群' + selectedIds.join(',') + '凭证')
                  ">获取凭证</el-button>
      <el-dialog title="提示" :visible.sync="makeSureVisible">
        <span>{{ sureMessage }}</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="makeSureVisible = false">取 消</el-button>
          <el-button
                     type="primary"
                     @click="createToken(); makeSureVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <token
             v-if="tokenVisible"
             :tokenVisible="tokenVisible"
             :token="selectedCluster.clusterToken"
             :clusterName="selectedCluster.name"
             :authNamespace="selectedCluster.authNamespace"
             @update:tokenVisible="val => (tokenVisible = val)"></token>
    </div>
    <el-table
              stripe
              ref="multipleTable"
              :data="clusterList"
              v-loading="loading"
              @selection-change="handleSelectionChange">
      <el-table-column
                       type="selection"
                       width="55"
                       :selectable="checkSelectable">
      </el-table-column>
      <el-table-column prop="name" label="集群名称"></el-table-column>
      <el-table-column
                       prop="region"
                       label="地域"
                       :filters="[
                        { text: '国内', value: 'internal' },
                        { text: '海外', value: 'foreign' }
                      ]"
                       :filter-method="filterHandler">
      </el-table-column>
      <el-table-column prop="network" label="网络联通性">
        <template slot="header">
          <div style="display: flex; align-items: center;">
            <div>网络联通性</div>
            <el-tooltip class="item" effect="dark" content="KUN上网关主要支持服务管理流量，服务数据流量不支持，大流量请慎用。" placement="right">
              <i class="el-icon-question tips"></i>
            </el-tooltip>
          </div>
        </template>
        <template slot-scope="scope">
          <div v-for="item in scope.row.network" :key="item">
            {{ item }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="storage" label="存储类型">
        <template slot-scope="scope">
          <div v-for="item in scope.row.storage" :key="item">
            {{ item }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="logsystem_url" label="日志地址">
        <template slot-scope="scope">
          <el-link
                   type="primary"
                   :href="scope.row.logsystem_url"
                   target="_blank">kibana</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="monitor_url" label="监控地址">
        <template slot-scope="scope">
          <el-link type="primary" :href="scope.row.monitor_url" target="_blank">prometheus</el-link>
        </template></el-table-column>
      <el-table-column prop="dashboard_url" label="dashboard">
        <template slot-scope="scope">
          <el-link
                   type="primary"
                   :href="scope.row.dashboard_url"
                   target="_blank">dashboard</el-link>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div v-loading="scope.row.loading">
            <el-button
                       v-if="scope.row.token"
                       @click="getCredentials(scope.row)"
                       type="text"
                       :disabled="!!scope.row.error">
              查看凭证
            </el-button>
            <el-button
                       v-else
                       @click="createToken(scope.row.name)"
                       type="text"
                       :disabled="!!scope.row.error">
              获取凭证
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
// import Token from '../project/components/ClusterTokenShow'
// import { GetCredentials, CreateToken, GetToken } from '@/api/cluster'
// import { ListClusterV2 } from '@/api/clusterV2'
export default {
  components: { Token },
  props: {},
  data() {
    return {
      loading: false,
      selectedIds: [],
      sureMessage: '',
      makeSureVisible: false,
      tokenVisible: false,
      clusterList: [],
      selectedCluster: {}
    }
  },
  created() {
    this.loading = true
    this.ListCluster()
  },
  methods: {
    ListCluster() {
      ListClusterV2()
        .then(res => {
          res = res.map(item => ({ ...item, loading: true, error: false }))
          this.clusterList = res
          this.loading = false
          res.forEach(ele => {
            GetToken(ele.name)
              .then(res => {
                const token = (res || {}).token
                this.setToken({ name: ele.name, token, loading: false, error: null })
              }).catch(err => {
                this.setToken({ name: ele.name, loading: false, error: err.message })
                console.log(ele.name + 'GetToken err', err.message)
              })
          })
        })
        .catch(err => {
          this.loading = false
          this.noticeWarning(err.message)
        })
    },
    setToken({ name, token, loading, error }) {
      const dataSource = [...this.clusterList]
      const findIndex = dataSource.findIndex(item => item.name === name)
      if (findIndex > -1) {
        dataSource[findIndex] = { ...dataSource[findIndex], token, loading: loading, error: error }
        this.clusterList = dataSource
      }
    },
    filterHandler(value, row) {
      return row['cluster_type'] === value
    },
    handleSelectionChange(val) {
      this.selectedIds = val.map(ele => ele.name)
    },
    checkSelectable(item) {
      return !item.token && !item.error && !item.loading
    },
    getCredentials(item) {
      let that = this
      that.selectedCluster = item
      GetCredentials(item.name)
        .then(res => {
          if (res) {
            that.selectedCluster.clusterToken = res
            that.selectedCluster.authNamespace = { hasCreated: true }
            this.tokenVisible = true
          } else {
            that.noticeWarning('GetCredentials err')
          }
        })
        .catch(err => {
          that.noticeWarning('GetCredentials err', err)
        })
    },
    createToken(name) {
      let that = this
      const create = name =>
        new Promise(resolve =>
          CreateToken(name)
            .then(() => {
              // 获取凭证 => 查看凭证
              this.clusterList.forEach(item => {
                if (item.name === name) {
                  item.token = true
                }
              })
              that.noticeSuccess(name + ' 创建成功')
              resolve('success')
            })
            .catch(err => {
              that.noticeWarning(name + ' ' + err.message)
              resolve('fail')
            })
        )

      this.loading = true
      Promise.all(
        (name ? [name] : this.selectedIds).map(id => (
          create(id)
        ))
      ).then(() => {
        this.loading = false
        // this.ListCluster()
      }).finally(() => {
        this.resetTable()
      })
    },
    resetTable() {
      this.selectedIds = []
      this.$refs.multipleTable.clearSelection()
    }
  },
  watch: {}
}
</script>
