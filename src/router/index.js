import VueRouter from 'vue-router'

import Login from '../pages/Login'
import Examine from '../pages/Examine'

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Login,
    },
    {
      path: '/examine',
      component: Examine,
    }
  ]
})