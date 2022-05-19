import VueRouter from 'vue-router'

import Login from '../pages/Login'
import Examine from '../pages/Examine'
import Admin from '../pages/Admin'
import Report from '../pages/Report'
import Announce from '../pages/Announce'

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
      path: '/announce',
      component: Announce,
    },
    {
      path: '/report',
      component: Report,
    }
  ]
})