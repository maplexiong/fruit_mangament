<template>
  <el-container class="root_container">
    <el-header height="100px">
      <Header />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="1"
          background-color="#2A3F54"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/user">用户列表</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/authority">权限信息</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="/goods">商品列表</el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-shopping-cart-2"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="/order">订单列表</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-sunny"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="/statistics">销售信息</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "../components/Header";
export default {
  components: {
    Header
  },
  data() {
    return {
      user: {}
    };
  },

  created() {
    let abc = sessionStorage.getItem("user");
    abc = JSON.parse(abc);
    console.log(abc, "aa");
  }
};
</script>

<style>
.root_container {
  height: 100%;
}
.el-header {
  background: #2a3f54;
}
.el-aside {
  height: 100%;
  background: #2a3f54;
}
.el-menu {
  border-right-width: 0;
}
h1 {
  color: #fff;
}
</style>
