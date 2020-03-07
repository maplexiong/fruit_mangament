<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 列表 -->
    <el-card class="box-card" shadow="hover">
      <el-table :data="tableData" border style="width:800">
        <el-table-column prop="fid" label="唯一编号" width="80">
        </el-table-column>
        <el-table-column prop="fname" label="水果名" width="180">
        </el-table-column>
        <el-table-column prop="funit" label="单位" width="80">
        </el-table-column>
        <el-table-column prop="fkind" label="类名" width="80">
        </el-table-column>
        <el-table-column prop="forigin" label="产地" width="80">
        </el-table-column>
        <el-table-column prop="fcount" label="数量" width="80">
        </el-table-column>
        <el-table-column prop="fprice" label="进价" width="80">
        </el-table-column>
        <el-table-column prop="f_sale_price" label="售价" width="80">
        </el-table-column>
        <el-table-column prop="f_is_sale" label="状态" width="80">
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
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="32"
        :page-size="8"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      curP: null,
      pageCount: 8
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.getDate(val);
      this.curP = val;
    },
    getDate(curP = 1) {
      this.axios
        .get("/fruit/list", {
          params: { pageNum: this.curP, pageCount: this.pageCount }
        })
        .then(res => {
          console.log(res.data);
          this.tableData = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    let user_info = sessionStorage.getItem("user");
    user_info = JSON.parse(user_info);
    this.getDate();
  }
};
</script>

<style>
.box-card {
  margin-top: 10px;
  width: 1200px;
}
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
