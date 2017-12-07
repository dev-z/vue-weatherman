<template>
  <div>
    <!-- City Details -->
    <div class="bg-city">
      <div class="content-area">
        <weather-main :wdata="todayForecast" :city="city"/>
      </div>
    </div>
    <!-- Next 4 day forecast -->
    <div class="bg-forecast">
      <div class="loading" v-if="loading">
        <p class="text-center">Loading...</p>
      </div>
      <div v-if="error" class="error">
        <p class="text-white">{{ error }}</p>
      </div>
      <div v-if="nextForecast.length && !loading">
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
import WeatherMain from './WeatherMain';

export default {
  name: 'Weather',
  computed: {
    city() {
      const city = this.$store.getters.getCityByName(this.$route.params.name);
      if (city) {
        return city;
      }
      this.$message({
        showClose: true,
        message: 'Invalid URL parameter. City not found.',
        type: 'error',
        center: true,
      });
      this.$router.go(-1);
      return {};
    },
  },
  components: {
    WeatherCard,
    WeatherMain,
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
      if (!this.city) {
        this.error = true;
        return;
      }
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
          self.$message({
            showClose: true,
            message: 'Error in fetching weather data. City not found.',
            type: 'error',
            center: true,
          });
          self.$router.go(-1);
        });
    },
  },
};
</script>
<style>
.bg-city {
  height: 22em;
  background: #c94b4b; /* fallback */
  /* background-image: url('../src/assets/bg_city_default.png') */
}
.bg-forecast {
  height: 20em;
  background-color: #cccccc;
}
</style>

