<template>
  <div>
    <!-- City Details -->
    <div class="bg-city">
      <div class="content-area">
        <div class="city-details">
          <div class="city-text">
            <h1 class="text-white">{{ city.name }}, {{ city.country }}</h1>
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
      <div v-if="forecast.length">
        <el-row>
          <el-col :span="4" v-for="(wdata, index) in forecast" :key="wdata.dt" style="margin: 1em">
            <weather-card :wdata="wdata"/>
          </el-col>
        </el-row>
        <!-- <div v-for="wdata in forecast" :key="wdata.dt" :wdata="wdata" ></div> -->
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
      return this.$store.getters.getCityById(this.$route.params.id);
    },
  },
  components: {
    WeatherCard,
  },
  data() {
    return {
      forecast: [],
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
          self.forecast = response.data.list;
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
  height: 20em;
  background: #c94b4b; /* fallback for old browsers */
  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to bottom, #4b134f, #c94b4b);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to bottom, #4b134f, #c94b4b);
}
.bg-forecast {
  height: 22em;
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
</style>

