<template>
  <header>
    <div class="container">
      <h1><router-link to="/cities">WeatherMan</router-link></h1>
      <nav v-show="showNav">
        <router-link to="/cities">Home</router-link></h1>
      </nav>
    </div>
  </header>
</template>
<script>
export default {
  name: 'Header',
  computed: {
    showNav() {
      return this.$route.name !== 'cities';
    },
  },
};
</script>
<style scoped>
header {
  font-family: 'Roboto', sans-serif;
  position: fixed;
  width: 100%;
  height: 80px;
  top: 0;
  left: 0;
  background-color: rgba(22, 22, 22, 0.4);
  border-bottom: 3px solid rgba(0, 0, 0, 0.4);
  transition: height 0.3s;
  -webkit-transition: height 0.3s;
}
header .container {
  width: 90%;
  margin: 0 auto;
}
header h1 {
  margin-top: 0;
}
header h1, header nav {
  display: inline-block;
  position: relative;
  line-height: 80px;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
}
header a {
  text-decoration: none;
  color: #F4F4F4;
}
header nav {
  float: right;
  line-height: 80px;
  font-size: 1.4em;
}
header nav a {
  margin-left: 10px;
}
header nav a:hover {
  border-bottom: 2px solid white;
}
</style>
