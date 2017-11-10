import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import novel from '@/components/novel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/novel/:novelname',
      name: 'novel',
      component: novel
    }
  ]
})
