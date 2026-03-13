<template>
  <el-row>
    <el-row>
      <my-breadcrumb :show="showBreadcrumb"></my-breadcrumb>
    </el-row>
    <el-row>
      <list></list>
    </el-row>
  </el-row>
</template>
<script>
import MyBreadcrumb from '@/components/Breadcrumb/Breadcrumb'
import List from './list'
export default {
  components: { MyBreadcrumb, List },
  data() {
    return {
      showBreadcrumb: false
    }
  },
  methods: {}
}
</script>
