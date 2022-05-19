import Vue from 'vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import router from './router'
import App from './App.vue'
import axios from 'axios'
import '../theme/index.css'

axios.defaults.baseURL = 'https://single.sends.cc/api'
//axios.defaults.baseURL = 'http://139.224.68.119:13284/'
Vue.prototype.axios = axios

Vue.use(ElementUI)
Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
