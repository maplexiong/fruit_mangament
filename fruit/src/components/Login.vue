<template>
  <div class="login_login">
    <div class="login">
      <p>登录界面</p>
      <el-input v-model="aname" placeholder="请输入用户名" clearable></el-input>
      <el-input
        v-model="apwd"
        placeholder="请输入密码"
        clearable
        show-password
      ></el-input>
      <a class="btn" href="javascript:;" @click="login">登录</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aname: "",
      apwd: ""
    };
  },
  methods: {
    login() {
      let aname = this.aname;
      let apwd = this.apwd;
      console.log(aname, apwd);
      this.axios
        .get(`/admin/login`, { params: { aname, apwd } })
        .then(res => {
          console.log(res);
          console.log(res.data.sessionID);
          if (res.data.code === 200) {
            window.sessionStorage.setItem("cookie", 1);
            this.$message({
              type: "success",
              message: "登录成功",
              center: true
            });
            this.$router.push("/home");
          } else {
            this.$message({
              type: "error",
              message: "用户名或密码错误",
              center: true
            });
            this.aname = "";
            this.apwd = "";
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style scoped>
.login {
  width: 400px;
  height: 300px;
  border: 1px solid gray;
  padding: 20px 10px;
  border-radius: 4px;
  margin: 0 auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -150px;
  margin-left: -200px;
}
.login > p {
  text-align: center;
}
.login > el-input {
  width: 200px;
  height: 80px;
}
.login > .btn {
  display: inline-block;
  width: 100%;
  height: 45px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  text-align: center;
  line-height: 45px;
  text-decoration: none;
  font-size: 20px;
  background: #42c02e;
  color: #ffffff;
  margin-top: 20px;
}
.login > .btn:hover {
  background: #22c22e;
}
</style>
