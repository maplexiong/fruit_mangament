<template>
  <div>
    <p>登录</p>
    <input type="text" v-model="aname" />
    <input type="text" v-model="apwd" />
    <button @click="login">登录</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aname: "admin",
      apwd: "admin"
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
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style>
</style>