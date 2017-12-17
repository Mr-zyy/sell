<template>
  <div class="shopcart">
  	<div class="content" @click="toggleList">
  	  <div class="content-left">
  	  	<div class="logo-wrapper">
  	  		<div class="logo" :class="{hightLight:totalCount>0}">
  	  			<i class="icon-shopping_cart"></i>
  	  		</div>
          <div v-show="totalPrice > 0" class="count">
            {{totalCount}}
          </div>
  	  	</div>
  	  	<div class="price" :class="{hightLight:totalPrice>0}">￥{{totalPrice}}</div>
  	  	<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
  	  </div>
  	  <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
      <div class="ball-wrapper">
       <div v-for="ball in balls">
         <transition name="drop" @before-enter="beforeDrop" @enter="drop" @after-enter="afterDrop">
           <div class="ball" v-show="ball.show">
           </div>
         </transition>
       </div>
      </div>
  	</div>
    <transition name="slide">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header border-1px">
          <h1 class="title">购物车</h1>
          <div class="empty" @click="empty">清空</div>
        </div>
        <div class="list-content border-1px" ref="contentWrapper">
          <ul>
            <li class="list-menu" v-for="food in selectFoods">
              <div class="name">{{food.name}}</div>
              <div class="price">￥ <span class="totalPrice">{{food.count*food.price}}</span></div>
              <div class="controlcart-wrapper">
                <cartControl @selectIndex="selectEat" @addBall="dropBall" :food="food"></cartControl>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="mask" v-show="hideMask"></div>
    </transition>
  </div>
</template>
<script>
import cartControl from './../../controlcart/controlcart.vue'
import BScroll from 'better-scroll'
  export default {
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropedBall: [],
        fold: true,
        scroll: ''
      }
    },
    props: {
      selectFoods: {
        type: Array,
        default: function() {
          return [{
            price: 10,
            count: 1
          }]
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 20
      }
    },
    computed: {
      totalPrice() {
        let price = 0
        this.selectFoods.forEach((food) => {
          price += food.price * food.count
        })
        return price
      },
      totalCount() {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc() {
        if (this.totalPrice === 0){
          return `￥${this.minPrice}起送`
        } else if (this.totalPrice < this.minPrice) {
          return `还差￥${this.minPrice - this.totalPrice}元起送`
        } else {
          return `去结算`
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      listShow() {
        if (this.totalCount === 0){
          this.fold = true
          return false
        }
        let show = !this.fold
        return show
      },
      hideMask() {
        if (this.listShow){
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      dropBall(elm) {
        for (let i = 0; i < this.balls.length; i++){
          if (!this.balls[i].show){
            this.balls[i].show = true
            this.balls[i].el = elm
            this.dropedBall.push(this.balls[i])
            return
          }
        }
      },
      beforeDrop(el) {
        for (let i = 0; i < this.balls.length; i++){
          let ball = this.balls[i]
          if (ball.show){
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 20
            let y = -(window.innerHeight - rect.top - 35)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(${x}px,${y}px,0)`
            el.style.transform = `translate3d(${x}px,${y}px,0)`
          }
        }
      },
      drop(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight  //  重绘页面 因为enter表示的是一个静止的状态
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          el.addEventListener('transitionend', done)
        })
      },
      afterDrop(el) {
        let ball = this.dropedBall.shift()
        if (ball){
          ball.show = false
          el.style.display = 'none'
        }
      },
      toggleList() {
        if (this.totalCount === 0){
          return
        }
        this.fold = !this.fold
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
        this.$emit('empty')
      },
      selectEat(index) {
        this.$emit('light')
      }
    },
    components: {
      cartControl
    },
    created() {
      this.$nextTick(() => {
        if (!this.scroll){
          this.scroll = new BScroll(this.$refs.contentWrapper, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import './../../../../common/stylus/mixin' 
.shopcart
  position: fixed
  left: 0
  bottom: 0 
  z-index: 10
  width: 100%
  height: 46px
  .content
    display: flex
    font-size: 0px
    height: 100%
    background: #141d27
    .content-left
      flex: 1
      .logo-wrapper
        display: inline-block
        position: relative
        box-sizing: border-box
        width: 56px
        height: 56px
        padding: 6px
        margin: -10px 12px 0 12px
        border-radius: 50%
        background-color: #141d27
        .logo
          width: 100%
          height: 100%
          border-radius: 50%
          background-color: #2b343c
          text-align: center
          .icon-shopping_cart
            font-size: 24px
            line-height: 44px
            color: #80858a
          &.hightLight
            background-color: rgb(0, 160, 220)
            .icon-shopping_cart
              color: #fff
        .count 
          position: absolute
          top: 0
          right: 0
          width: 24px
          height: 16px
          line-height: 16px
          border-radius: 16px
          text-align: center
          font-size: 9px
          font-weight: 700
          color: #fff
          background-color: rgb(240, 20, 20)
          box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4)
      .price
        display: inline-block
        padding-right: 12px
        border-right: 1px solid rgba(255, 255, 255, 0.1)
        font-size: 16px
        line-height: 24px
        font-weight: 700
        color: rgba(255, 255, 255, 0.4)
        &.hightLight
          color: #fff
      .desc
        display: inline-block
        padding-left: 12px
        font-size: 10px
        font-weight: 700
        color: rgba(255, 255, 255, 0.4)
    .content-right
      flex: 0 0 105px
      height: 100%
      .pay
        font-size: 12px
        font-weight: 700
        line-height: 46px
        color: rgba(255, 255, 255, 0.4)
        text-align: center
        &.not-enough
          background-color: #2b333b
        &.enough
          background-color: #00b43c
          color: #fff
    .ball-wrapper
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.3s cubic-bezier(0.63, 0.13, 0.36, 0.39)
        width: 16px
        height: 16px
        background-color: #00a0dc
        border-radius: 50%
  .shopcart-list
      position: absolute
      top: 0
      left: 0
      z-index: -1
      width: 100%
      transform: translate3d(0,-100%,0)
      &.slide-enter-active,&.slide-leave-active
        transition: all 0.5s linear
      &.slide-enter,&.slide-leave-to
        transform: translate3d(0, 0, 0)
      .list-header
        padding: 0 18px
        font-size: 12px
        background-color: #f3f5f7
        height: 40px
        border-1px(rgba(7, 17, 27, 0.1))
        .title
          float: left
          font-size: 14px
          line-height: 40px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          line-height: 40px
          color: rgb(0, 160, 220)
      .list-content
        padding: 0 18px
        max-height: 242px
        overflow: hidden
        background-color: #FFF
        .list-menu
          position: relative
          padding: 12px 0
          height: 24px
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            display: inline-block
            vertical-align: top
            line-height: 24px
            font-size: 14px
          .price
            display: inline-block
            position: absolute
            right: 90px
            margin-left: 18px
            vertical-align: top
            line-height: 24px
            font-size: 12px
            color: rgb(240, 20, 20)
            .totalPrice
              font-size: 14px
              font-weight: 700
          .controlcart-wrapper
            display: inline-block
            position: absolute
            right: 0
            top: 6px
  .mask
    position: fixed
    top: 0
    left: 0
    z-index: -2
    width: 100%
    height: 100%
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active,&.fade-leave-active
      transition: all 0.4s linear
    &.fade-enter,&.fade-leave-to
      background: rgba(7, 17, 27, 0)
</style>