import VueRouter from 'vue-router'

import Login from '../pages/Login'
import Examine from '../pages/Examine'
import Admin from '../pages/Admin'
import Report from '../pages/Report'

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Login,
    },
    {
      path: '/examine',
      component: Examine,
    },
    {
      path: '/admin',
      component: Admin,
    },
    {
      path: '/report',
      component: Report,
    }
  ]
})