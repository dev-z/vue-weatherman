<template>
  <div>
    <!-- City Details -->
    <div class="bg-city">
      <div class="content-area">
        <div class="city-details">
          <div class="city-text">
            <h2 class="w-status text-white" v-if="todayForecast.weather">{{ todayForecast.weather[0].main }}</h2>
            <h1 class="text-white">{{ city.name }}, {{ city.country }}</h1>
          </div>
          <div class="city-picker">
            Hakuna Matata
          </div>
        </div>
      </div>
    </div>
    <!-- City Forecast -->
    <div class="bg-forecast">
      <div class="loading" v-if="loading">
        Loading...
      </div>
      <div v-if="error" class="error">
        <p class="text-white">{{ error }}</p>
      </div>
      <div v-if="nextForecast.length">
        <el-row>
          <el-col :span="6" v-for="(wdata, index) in nextForecast" :key="wdata.dt">
            <div style="margin: 0.5em">
              <weather-card :wdata="wdata"/>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import WeatherCard from './WeatherCard';

export default {
  name: 'Weather',
  computed: {
    city() {
      return this.$store.getters.getCityByName(this.$route.params.name);
    },
  },
  components: {
    WeatherCard,
  },
  data() {
    return {
      todayForecast: {},
      nextForecast: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    $route: 'fetchData',
  },
  methods: {
    fetchData() {
      this.error = null;
      this.loading = true;
      const self = this; // Context capture to avoid loss of this binding
      // Fetch the 5 day forecast for this city
      const url = `http://api.openweathermap.org/data/2.5/forecast?q=${this.city.name},${this.city.country}&APPID=258a05b8d98cd3170949d8a8df2b411a&cnt=5&units=metric`;
      axios.get(url)
        .then((response) => {
          self.todayForecast = response.data.list[0];
          self.nextForecast = response.data.list.splice(1);
          self.loading = false;
        })
        // eslint-disable-next-line no-unused-vars
        .catch((err) => {
          self.error = 'Oops, could not fetch weather data. Please try again later';
          self.loading = false;
          this.$message({
            showClose: true,
            message: 'Error in fetching weather data.',
            type: 'error',
            center: true,
          });
        });
    },
  },
};
</script>
<style>
.bg-city {
  height: 22em;
  background: #c94b4b; /* fallback for old browsers */
  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to bottom, #4b134f, #c94b4b);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to bottom, #4b134f, #c94b4b);
}
.bg-forecast {
  height: 20em;
  background-color: #cccccc;
}
.text-white {
  color: #f4f4f4;
}
.city-details {
  position: relative;
}
.city-details > .city-text {
  position: absolute;
  top: 5em;
}
.city-details > .city-picker {
  position: absolute;
  top: 0em;
  right: 0em;
}
.w-status {
  font-size: 3em;
  margin: 0px;
}
</style>

