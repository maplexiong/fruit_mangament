// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from "axios";

import "./assets/css/comm.css";
//element模块引入
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  let result = sessionStorage.getItem("user");
  result = JSON.parse(result);
  if (to.path == "/login" || result) {
    next();
  } else {
    next("/login");
  }
});

Vue.config.productionTip = false;

// axios.defaults.baseURL = "http://127.0.0.1:6060";
axios.defaults.baseURL = "http://106.53.50.157:6060";
axios.defaults.withCredentials = true;
Vue.prototype.axios = axios;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
