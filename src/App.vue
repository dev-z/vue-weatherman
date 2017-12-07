<template>
  <div id="app">
    <my-header/>
    <router-view/>
  </div>
</template>

<script>
import MyHeader from './components/Header';

export default {
  name: 'app',
  components: {
    MyHeader,
  },
};
</script>

<style>
body {
  margin: 0px;
}
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
.content-area {
  padding: 6em 1em 1em 1em;
}
.text-white {
  color: #f4f4f4;
}
.text-grey {
  color: #cccccc;
}
.text-center {
  text-align: center;
}
</style>
