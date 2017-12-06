<template>
  <div class="shopcart">
	<div class="content">
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
	</div>
  </div>
</template>
<script>
  export default {
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
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.shopcart
  position: fixed
  left: 0
  bottom: 0 
  z-index: 10
  width: 100%
  height: 46px
  background: #141d27
  .content
    display: flex
    font-size: 0px
    height: 100%
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
</style>