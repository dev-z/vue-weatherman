<!-- 
@desc: Component to display the current city details and current date's weather forecast

@param wdata  {Object}  Object containing current day's weather data.
@param city   {Object}  City details { name, country }

@example:
<weather-main :wdata="todayForecast" :city="city"/>
-->
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
        <div class="text-white text-right other-text">
          <h3>Min {{ weatherTemp.temp_min }}</h3>
          <h3>Max {{ weatherTemp.temp_max }}</h3>
          <h3 class="text-grey">{{ wdata.dt_txt }}</h3>
        </div>
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
    // stores the weather icon url
    wimage() {
      return this.getWeatherIcon(this.weather.id);
    },
    // contains the weather data
    weather() {
      if (this.wdata && this.wdata.weather) {
        return this.wdata.weather[0];
      }
      return {};
    },
    // contains the temperature data
    weatherTemp() {
      if (this.wdata && this.wdata.main) {
        return this.wdata.main;
      }
      return {};
    },
    // stores the list of all cities
    cities() {
      return this.$store.state.cities;
    },
  },
  watch: {
    // changes the city name in url params as soon as user selects a different city.
    selectedCityName(newCityName) {
      // using .replace() instead of .push() because user is not navigating to a new page.
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
.other-text {
  margin-top: 4em;
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
