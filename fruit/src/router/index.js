import Vue from "vue";
import Router from "vue-router";

import Index from "../components/Index.vue";

import User from "../components/User.vue";
import Login from "../components/user/Login.vue";

import Goods from "../components/Goods.vue";

import Order from "../components/Order.vue";

import Authority from "../components/Authority.vue";

import Statistics from "../components/Statistics.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/index",
      component: Index,
      beforeEnter: (to, from, next) => {
        let result = sessionStorage.getItem("user");
        result = JSON.parse(result);
        if (result.role) {
          next();
        } else {
          next("/login");
        }
      },
      children: [
        {
          path: "/user",
          component: User
        },
        {
          path: "/goods",
          component: Goods
        },
        {
          path: "/order",
          component: Order
        },
        {
          path: "/authority",
          component: Authority
        },
        {
          path: "/statistics",
          component: Statistics
        }
      ]
    }
  ]
});
