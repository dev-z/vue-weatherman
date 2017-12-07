<template>
  <el-row>
    <el-col :span="8">
      <div class="city-text">
        <h2 class="w-status text-white">{{ weatherTemp.temp }} &deg;C</h2>
        <h2 class="w-status text-white">{{ weather.main }}</h2>
        <h1 class="text-grey">{{ city.name }}, {{ city.country }}</h1>
      </div>
    </el-col>
    <el-col :span="8">
      <img :src="wimage" class="image">
      <p class="text-white text-center">{{ weather.description | capitalize}}</p>
    </el-col>
    <el-col :span="8">
      <div class="city-picker text-white">
        <el-select v-model="selectedCityName" placeholder="Select">
          <el-option
            v-for="city in cities"
            :key="city.id"
            :label="city.name"
            :value="city.name">
              <span style="float: left" class="dp-font">{{ city.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px" class="dp-font">{{ city.country }}</span>
          </el-option>
        </el-select>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import weatherIconMixin from '../mixins/mx_weathericon';

export default {
  name: 'WeatherMain',
  props: ['wdata', 'city'],
  mixins: [weatherIconMixin],
  data() {
    return {
      selectedCityName: this.city.name,
    };
  },
  computed: {
    wimage() {
      return this.getWeatherIcon(this.wdata.weather[0].id);
    },
    weather() {
      if (this.wdata && this.wdata.weather) {
        return this.wdata.weather[0];
      }
      return {};
    },
    weatherTemp() {
      if (this.wdata && this.wdata.main) {
        return this.wdata.main;
      }
      return {};
    },
    cities() {
      return this.$store.state.cities;
    },
  },
  watch: {
    selectedCityName(newCityName) {
      this.$router.replace({ name: 'city-weather', params: { name: newCityName } });
    },
  },
  filters: {
    capitalize(value) {
      if (!value) return '';
      const val = value.toString();
      return val.charAt(0).toUpperCase() + val.slice(1);
    },
  },
};
</script>
<style scoped>
.city-text {
  margin-top: 3em;
}
.city-picker {
  float: right;
}
.w-status {
  font-size: 3em;
  margin: 0px;
}
.image {
  width: 128px;
  display: block;
  margin: 3em auto 1em auto;
}
.dp-font {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
