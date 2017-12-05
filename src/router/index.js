import Vue from 'vue';
import Router from 'vue-router';
import Cities from '@/components/Cities';
import Weather from '@/components/Weather';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/cities',
      name: 'cities',
      component: Cities,
    },
    {
      path: '/cities/:id',
      name: 'city-weather',
      component: Weather,
    },
    {
      path: '*',
      redirect: '/cities',
    },
  ],
});
