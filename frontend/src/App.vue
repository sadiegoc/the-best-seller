<template>
  <div class="app">
    <Header></Header>
    <Content></Content>
    <Footer></Footer>
  </div>
</template>

<script>
import Content from './components/templates/Content.vue';
import Footer from './components/templates/Footer.vue';
import Header from './components/templates/Header.vue';

export default {
  name: 'App',
  components: { Header, Content, Footer }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  width: 100vw; height: 100vh;
  margin: 0; padding: 0;
}

html, body {
  margin: 0; padding: 0;
  width: 100vw; height: 100vh;
  background-color: #eee;
}

* {
  box-sizing: border-box;
  font-size: 1;
  font-weight: 100;
  font-family: monospace;
}
</style>
