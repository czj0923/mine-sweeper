<template>
  <div id="nav">
    <router-link to="/"
      ><h4><span class="badge secondary">扫雷小游戏</span></h4>
    </router-link>
  </div>
  <router-view />
  <Alert></Alert>
</template>

<script>
import Alert from "@/components/Alert";
import { useMainStore } from "./store/main";
export default {
  name: "App",
  components: {
    Alert,
  },
  setup() {
    const store = useMainStore();
    //初始化时读取本地存储中的纪录
    const record = JSON.parse(localStorage.getItem("record"));
    store.refreshRecord(record);
  },
};
</script>

<style lang="scss">
* {
  user-select: none;
  padding: 0;
  margin: 0;
}
body {
  background-image: url(./assets/images/bg.webp);
  background-repeat: no-repeat;
  background-size: cover;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;
  text-align: left;
}
</style>
