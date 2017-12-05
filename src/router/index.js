import Vue from 'vue'
import Router from 'vue-router'
import Detail from '@/components/detail/detail'
import Goods from '@/components/detail/goods/goods'
import Ratings from '@/components/detail/ratings/ratings'
import Sellers from '@/components/detail/sellers/sellers'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/detail', redirect: '/detail/goods'
    },
    {
      path: '/detail',
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
    }
  ]
})
