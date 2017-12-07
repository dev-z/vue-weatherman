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
function getWeatherIcon(id) {
  let wid = id;
  if (id >= 200 && id < 300) {
    wid = 200; // Thunderstorm
  } else if (id >= 300 && id < 400) {
    wid = 300; // Drizzle
  } else if (id >= 500 && id < 600) {
    wid = 500; // Rain
  } else if (id >= 600 && id < 700) {
    wid = 600; // Snow
  } else if (id >= 700 && id < 800) {
    wid = 700; // Haze
  } else if (id >= 801 && id < 900) {
    wid = 801; // Clouds
  } else if (id >= 900) {
    wid = 900; // Extreme Weather
  }
  let icon = '';
  switch (wid) {
    case 200:
      icon = '../src/assets/icons/storm.png';
      break;
    case 300:
      icon = '../src/assets/icons/drizzle.png';
      break;
    case 500:
      icon = '../src/assets/icons/rain.png';
      break;
    case 600:
      icon = '../src/assets/icons/snow.png';
      break;
    case 700:
      icon = '../src/assets/icons/wind.png';
      break;
    case 800:
      icon = '../src/assets/icons/sunny.png';
      break;
    case 801:
      icon = '../src/assets/icons/cloud.png';
      break;
    case 900:
      icon = '../src/assets/icons/blizzard.png';
      break;
    default:
      icon = '../src/assets/icons/sunny.png';
  }
  return icon;
}

export default {
  name: 'WeatherCard',
  computed: {
    wimage() {
      return getWeatherIcon(this.wdata.weather[0].id);
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
