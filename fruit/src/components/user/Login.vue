<template>
  <el-card class="login">
    <span class="login_title">水果店销售管理系统</span>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      status-icon
    >
      <div class="login_info">
        <el-form-item label="用户姓名" prop="uname" class="label_font">
          <el-input
            type="text"
            v-model="ruleForm.uname"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item label="用户密码" prop="upwd">
          <el-input
            type="password"
            v-model="ruleForm.upwd"
            autocomplete="off"
            clearable
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="login_btn" @click="login">登录</div>
        </el-form-item>
      </div>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    var validateUname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validateUpwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        uname: "",
        upwd: ""
      },
      rules: {
        uname: [{ validator: validateUname, trigger: "blur" }],
        upwd: [{ validator: validateUpwd, trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      let uname = this.ruleForm.uname;
      let upwd = this.ruleForm.upwd;
      if (!uname || !upwd) {
        this.$message({
          showClose: true,
          message: "请输入登录信息",
          type: "error"
        });
        return;
      }

      this.axios
        .post(`/user/login`, { uname, upwd })
        .then(res => {
          console.log(res.data);
          if (res.data.code === 201) {
            console.log("用户信息错误或不存在");
          }
          if (res.data.code === 200) {
            console.log("登录成功");
            sessionStorage.setItem("user", JSON.stringify(res.data.data));
            this.$router.push("/index");
          } else {
            this.$message({
              showClose: true,
              message: "用户信息错误或不存在",
              type: "error"
            });
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
  position: fixed;
  width: 460px;
  height: 550px;
  top: 45%;
  left: 50%;
  margin-left: -230px;
  margin-top: -250px;
  text-align: center;
  padding-right: 10px;
  box-sizing: border-box;
}
.login_title {
  font-size: 30px;
}
.login_info {
  margin-top: 100px;
}

.login_btn {
  width: 250px;
  height: 50px;
  border: 1px solid #dcdfe6;
  border-radius: 16px;
  background: #3194d0;
  color: #fff;
  font-size: 20px;
  line-height: 50px;
  margin-top: 30px;
  cursor: default;
  user-select: none;
}
</style>
