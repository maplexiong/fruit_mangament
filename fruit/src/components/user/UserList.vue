<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 列表 -->
    <el-card class="box-card" shadow="hover">
      <el-table :data="tableData" border style="width:800">
        <el-table-column prop="uid" label="编号" width="80"> </el-table-column>
        <el-table-column prop="uname" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="180">
        </el-table-column>
        <el-table-column prop="role" label="角色" width="180">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
          ></el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          uid: 1,
          uname: "王小虎",
          phone: 1234567,
          role: "员工"
        }
      ]
    };
  }
};
</script>

<style>
.box-card {
  margin-top: 10px;
  width: 1200px;
}
</style>
