import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import router from './router'
import App from './App.vue'
import axios from 'axios'

axios.defaults.baseURL = 'https://single.sends.cc/api'
Vue.prototype.axios = axios

Vue.use(ElementUI)
Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')