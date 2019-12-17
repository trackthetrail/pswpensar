<template>
  <div id="app">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="a" href="https://wpensar.com.br/" target="__blank">
          <img
            src="https://wpensar.com.br/imgs/logo-wpensar.svg"
            alt="WPENSAR"
          />
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item @click="$router.push({ name: 'home' })">
          Home
        </b-navbar-item>

        <b-navbar-item @click="$router.push({ name: 'Produtos' })">
          Produtos
        </b-navbar-item>

        <b-navbar-item @click="$router.push({ name: 'Compras' })">
          Compras
        </b-navbar-item>
      </template>
    </b-navbar>
    <!-- <img alt="Vue logo" src="./assets/wpensar.png" /> -->

    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
