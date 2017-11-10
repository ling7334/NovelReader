// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMaterial from 'vue-material'
import VueSession from 'vue-session'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App'
import router from './router'
import menubar from './components/menubar'

import 'vue-material/dist/vue-material.css'

Vue.config.productionTip = false

Vue.use(VueMaterial)
Vue.use(VueSession)
Vue.use(VueAxios, axios)

Vue.use(menubar)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
