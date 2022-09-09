import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from "./plugins/axios";
import {Chart} from 'chart.js'
import VueChartkick from 'vue-chartkick'

Vue.use(Chartkick.use(Chart));

Vue.use(axios);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  VueChartkick,
  render: h => h(App)
}).$mount('#app')
