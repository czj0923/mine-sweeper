<template>
  <div id="nav">
    <router-link to="/"
      ><h4><span class="badge secondary">扫雷小游戏（mine-sweeper）</span></h4>
    </router-link>
  </div>
  <router-view />
  <Alert></Alert>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Alert from "@/components/AlertComp.vue";
import { useMainStore } from "./store/main";
export default defineComponent({
  name: "App",
  components: {
    Alert,
  },
  setup() {
    const store = useMainStore();
    //初始化时读取本地存储中的纪录
    let record = localStorage.getItem("record");
    if (record) {
      record = JSON.parse(record);
    }
    store.refreshRecord(record);
  },
});
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
.panel {
  background-color: #fff;
  margin-bottom: 20px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
</style>
