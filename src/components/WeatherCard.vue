<template>
  <el-card :body-style="{ padding: '0px' }">
    <img :src="wimage" class="image">
    <div style="padding: 14px;">
      <h2>{{ wdata.main.temp }} &deg;C</h2>
      <span>{{ wdata.weather[0].main }}</span>
      <div class="bottom clearfix">
        <time class="time">{{ wdata.dt_txt }}</time>
      </div>
    </div>
  </el-card>
</template>
<script>
export default {
  name: 'WeatherCard',
  computed: {
    wimage() {
      return '../src/assets/logo.png';
    },
    currentDate() {
      return new Date(this.wdata.dt);
    },
  },
  props: ['wdata'],
};
</script>
<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 90%;
  display: block;
  margin: auto;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
