import Vue from 'vue'
import Router from 'vue-router'
import Detail from '@/components/detail/detail'
import Goods from '@/components/detail/goods/goods'
import Ratings from '@/components/detail/ratings/ratings'
import Sellers from '@/components/detail/sellers/sellers'
import homePage from '@/components/main/homePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/detail/:id', redirect: '/detail/:id/goods'
    },
    {
      path: '/detail/:id',
      component: Detail,
      children: [
        {
          path: 'goods',
          component: Goods
        },
        {
          path: 'ratings',
          component: Ratings
        },
        {
          path: 'sellers',
          component: Sellers
        }
      ]
    },
    {
      path: '/',
      component: homePage
    }
  ]
})
