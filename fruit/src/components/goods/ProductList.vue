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
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              plain
              @click="editRow(scope.row.fid)"
            ></el-button>

            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="DelRow(scope.row.fid)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageCount"
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
      pageCount: 8,
      total: 0
    };
  },

  methods: {
    handleCurrentChange(val) {
      console.log(val);
      this.getDate(val);
    },
    getDate(curP = 1) {
      this.axios
        .get("/fruit/list", {
          params: { pageNum: curP, pageCount: this.pageCount }
        })
        .then(res => {
          console.log(res.data);
          this.tableData = res.data.data;
          this.total = res.data.data.dataCount;
        })
        .catch(err => {
          console.log(err);
        });
    },
    editRow(row) {
      alert("编辑:" + row);
    },
    DelRow(row) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .post("/fruit/del", { fid: row })
            .then(res => {
              console.log(res.data);
              if (res.data.code === 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                ++this.keyNum;
              } else {
                this.$message({
                  showClose: true,
                  message: "删除失败,请重新操作!",
                  type: "error"
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
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
