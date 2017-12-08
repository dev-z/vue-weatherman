<!-- 
@desc: Component to display the weather details in a card

@param wdata  {Object}  Object containing current day's weather data.

@example:
<weather-card :wdata="wdata"/>
-->
<template>
  <el-card :body-style="{ padding: '0px' }">
    <img :src="wimage" class="image">
    <div style="padding: 14px;">
      <h2>{{ wdata.main.temp }} &deg;C</h2>
      <span><strong>{{ wdata.weather[0].main }}</strong></span>
      <p>
        <small>Min: {{ wdata.main.temp_min }}</small>
        <small class="pull-right">Max: {{ wdata.main.temp_max }}</small>
      </p>
      <div class="bottom clearfix">
        <time class="time">{{ wdata.dt_txt }}</time>
      </div>
    </div>
  </el-card>
</template>
<script>
import weatherIconMixin from '../mixins/mx_weathericon';

export default {
  name: 'WeatherCard',
  mixins: [weatherIconMixin],
  computed: {
    // stores the weather icon url
    wimage() {
      return this.getWeatherIcon(this.wdata.weather[0].id);
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
  width: 100px;
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

.pull-right {
  float: right;
}
</style>
