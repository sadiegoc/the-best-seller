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
:root {
  --header-h: 100px;
  --color-theme: #C96868;
  --card-width: 200px;
}

* {
  box-sizing: border-box;
  font-size: 1;
  font-weight: 100;
  font-family: 'Times New Roman', Times, serif;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  margin: 0; padding: 0;
}

html, body {
  margin: 0; padding: 0;
  background-color: #eee;
}

</style>
