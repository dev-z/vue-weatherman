import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cities: [],
  },
  mutations: {
    addCity(state, payload) {
      state.cities.push(payload);
    },
    removeCity(state, payload) {
      const cityIndex = state.cities.indexOf(payload);
      if (cityIndex !== -1) {
        state.cities.splice(cityIndex, 1);
      }
    },
  },
  getters: {
    getCityById(state) {
      // return another function which accepts id as a parameter
      return id => state.cities.find(city => city.id === id);
    },
  },
  plugins: [createPersistedState()],
});
