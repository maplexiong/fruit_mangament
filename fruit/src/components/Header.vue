<template>
  <div class="header">
    <el-row :gutter="10" justify="end">
      <el-col :span="16">
        <router-link to="/index" class="title">
          水果店销售管理系统
        </router-link>
      </el-col>
      <el-col :span="2" :offset="2">
        <span class="username">{{ username }}</span>
      </el-col>
      <el-col :span="4">
        <el-button size="small" round @click="logout">退出</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    var result = sessionStorage.getItem("user");
    result = JSON.parse(result);
    return {
      username: result.uname
    };
  },
  methods: {
    logout() {
      this.axios("/user/logout")
        .then(res => {
          console.log(res);
          sessionStorage.removeItem("user");
          this.$router.push("/login");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.header {
  line-height: 100px;
}
.title {
  display: inline-block;
  text-decoration: none;
  color: #fff;
  font-size: 26px;
}
.username {
  color: #fff;
  font-size: 20px;
}
</style>
