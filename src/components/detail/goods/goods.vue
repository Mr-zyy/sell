<template>
  <div class="goods">
    <div class="sideWrapper" ref="sideWrapper">
    	<ul>
    		<li v-for="(item,index) in goodsData" class="item-list" ref="itemScroll" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
    			<span class="text border-1px">
    				<span v-show="item.type>0" class="icon" :class="[classMap[item.type]]"></span>{{item.name}}
    			</span>
    		</li>
    	</ul>
    </div>
    <div class="menuWrapper" ref="menuWrapper">
    	<ul>
    		<li v-for="item in goodsData" class="menu-item" ref="menuScroll">
    			<h1 class="title">{{item.name}}</h1>
    			<ul>
    				<li v-for="food in item.foods" class="food-item border-1px">
    					<div class="icon">
    						<img width="57" height="57" :src="food.icon" alt="">
    					</div>
    					<div class="content">
    						<h2 class="name">{{food.name}}</h2>
    						<div class="desc">{{food.description}}</div>
    						<div class="extra">
    							<span class="count">月售{{food.sellCount}}</span><span>好评率{{food.rating}}%</span>
    						</div>
    						<div class="price">
    							<span class="new">￥{{food.price}}</span><span
    							v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
    						</div>
                <div class="cartControlWrapper">
                  <cartControl :food="food"></cartControl>
                </div>
    					</div>
    				</li>
    			</ul>
    		</li>
    	</ul>
    </div>
    <shop-cart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></shop-cart>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import shopCart from './shopcart/shopcart.vue'
import cartControl from './../controlcart/controlcart.vue'
const ERR_OK = 0
export default {
  data () {
    return {
      goodsData: [],
      menuHeight: [],
      scrollY: 0
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.$http.get('/api/goods').then(function(result){
      let res = result.data
      if (res.errno === ERR_OK){
        this.goodsData = res.data
        this.$nextTick(function(){
          this._initScroll()
          this._calculateHeight()
        })
      }
    })
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
  },
  components: {
    shopCart,
    cartControl
  },
  methods: {
    _calculateHeight() {
      let height = 0
      this.menuHeight.push(height)
      for (let i = 0; i < this.$refs.menuScroll.length; i++){
        let list = this.$refs.menuScroll[i]
        height += list.clientHeight
        this.menuHeight.push(height)
      }
    },
    _initScroll() {
      this.itemScroll = new BScroll(this.$refs.sideWrapper, {
        click: true
      })
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true,
        probeType: 3
      })
      this.menuScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    selectMenu(index, event) {
      if (!event._constructed){
        return
      }
      let el = this.$refs.menuScroll[index]
      this.menuScroll.scrollToElement(el, 300)
    }
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.menuHeight.length; i++){
        let h1 = this.menuHeight[i]
        let h2 = this.menuHeight[i + 1]
        if (!h2 || (this.scrollY >= h1 && this.scrollY < h2)){
          return i
        }
      }
    },
    selectFoods() {
      let arr = []
      this.goodsData.forEach((item) => {
        item.foods.forEach((food) => {
          if (food.count){
            arr.push(food)
          }
        })
      })
      return arr
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixin'
.goods
  display: flex
  position: absolute
  top: 172px
  bottom: 46px
  width: 100%
  overflow: hidden
  .sideWrapper
    flex: 0 0 80px
    width: 80px
    background: #f3f5f7
    .item-list
      display: table
      width: 56px
      height: 54px
      padding: 0 12px
      &.current
        position: relative
        top: -1px
        z-index: 10
        background-color: #FFF
        font-weight: bold
        color: rgb(240, 20, 20)
        .text:after
          border-bottom: none
      .icon
        display: inline-block
        vertical-align: middle
        margin-right: 2px
        width: 12px
        height: 12px
        background-size: 12px 12px
        background-repeat: no-repeat
        &.decrease
          bg-image('imgs/decrease_3')
        &.discount
          bg-image('imgs/discount_3')
        &.guarantee
          bg-image('imgs/guarantee_3')
        &.invoice
          bg-image('imgs/invoice_3')
        &.special
          bg-image('imgs/special_3')
      .text
        display: table-cell
        vertical-align: middle
        font-size: 12px
        line-height: 14px
        border-1px(rgba(7,17,27,0.1))
  .menuWrapper
    flex: 1
    .title
      height: 26px
      line-height: 26px
      padding-left: 12px
      font-size: 12px
      color: rgb(147, 153, 159)
      border-left: 2px solid #d9dde1
      background: #f3f5f7
    .food-item
      display: flex
      padding:18px
      border-1px(rgba(7, 17, 27, 0.1))
      &:last-child:after
        border-bottom: none
      .icon
        flex: 0 0 57px
        margin-right: 10px
        img
          border-radius: 2px
      .content
        position: relative
        flex: 1
        color: rgb(147, 153, 159)
        .name
          margin: 2px 0 0 0
          font-size: 14px
          color: rgb(7, 17, 27)
          line-height: 14px
        .desc
          width: 100px
          font-size: 12px
          margin: 8px 0
          white-space: nowrap
          text-overflow: ellipsis
          overflow: hidden
        .extra
          font-size: 10px
          line-height: 10px
          margin-bottom: 8px
          .count
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          .new
            font-size: 14px
            color: rgb(240,20,20)
            margin-right: 8px
          .old
            text-decoration: line-through
            font-size: 10px
        .cartControlWrapper
          position: absolute
          right: 0px
          bottom: 0px
</style>
