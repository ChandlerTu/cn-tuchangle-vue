<template>
  <div id="app">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" router>
      <el-menu-item index="/">Home</el-menu-item>
      <el-menu-item index="/dashboard">Dashboard</el-menu-item>
      <el-menu-item index="/about">About</el-menu-item>
      <el-menu-item v-if="loggedIn" index="/logout">Log out</el-menu-item>
      <el-menu-item v-if="!loggedIn" index="/login">Log in</el-menu-item>
    </el-menu>
    <template v-if="$route.matched.length">
      <router-view></router-view>
    </template>
    <template v-else>
      <h1>Home</h1>
      <p>You are logged {{ loggedIn ? 'in' : 'out' }}</p>
    </template>
  </div>
</template>

<script>
import auth from "../auth";

export default {
  data() {
    return {
      activeIndex: this.$route.path,
      loggedIn: auth.loggedIn()
    };
  },
  created() {
    auth.onChange = loggedIn => {
      this.loggedIn = loggedIn;
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key;
      console.log(key, keyPath);
    }
  }
};
</script>
