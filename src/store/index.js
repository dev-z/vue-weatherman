import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cities: [],
  },
  mutations: {
    /**
     * Adds a city to the list of cities
     * @param {Object} state The previous state
     * @param {Object} payload An object containing the city details
     */
    addCity(state, payload) {
      state.cities.push(payload);
    },
    /**
     * Removes the given city from the list of cities
     * @param {Object} state The previous state
     * @param {Object} payload An object containing the city details
     */
    removeCity(state, payload) {
      const cityIndex = state.cities.indexOf(payload);
      if (cityIndex !== -1) {
        state.cities.splice(cityIndex, 1);
      }
    },
  },
  getters: {
    /**
     * Returns a city whose matched by id. Returns undefined otherwise.
     * @param {Object} state The current state object
     * @returns {Function}
     */
    getCityById(state) {
      // return another function which accepts id as a parameter
      return id => state.cities.find(city => city.id === id);
    },
    /**
     * Returns a city whose matched by name. Returns undefined otherwise.
     * @param {Object} state The current state object
     * @returns {Function}
     */
    getCityByName(state) {
      // return another function which accepts name as a parameter
      return name => state.cities.find(city => city.name === name);
    },
  },
  // Persist the VueX state to localStorage
  plugins: [createPersistedState()],
});
