<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>|
    <router-link to="/minesweeper">minesweeper</router-link>
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
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
