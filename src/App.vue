<template>
  <div id="nav">
    <router-link to="/"
      ><h4><span class="badge secondary">扫雷小游戏</span></h4>
    </router-link>
  </div>
  <router-view />
</template>

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
