export default {
  methods: {
    /**
     * Returns the url of the icon pertaining to the weather condition.
     * @param {Number} id ID of the weather condition. e.g. 800 for clear skies.
     * @returns {String} url of the icon asset.
     */
    getWeatherIcon(id) {
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
    },
  },
};
