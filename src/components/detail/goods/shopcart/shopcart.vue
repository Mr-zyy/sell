<template>
  <div class="shopcart">
	<div class="content">
	  <div class="content-left">
	  	<div class="logo-wrapper">
	  		<div class="logo">
	  			<i class="icon-shopping_cart"></i>
	  		</div>
	  	</div>
	  	<div class="price">￥0</div>
	  	<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
	  </div>
	  <div class="content-right">￥{{minPrice}}起送</div>
	</div>
  </div>
</template>
<script>
  export default {
  	props: {
  		deliveryPrice: {
  			type: Number,
  			default: 0
  		},
  		minPrice: {
  			type: Number,
  			default: 20
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
      .price
        display: inline-block
        padding-right: 12px
        border-right: 1px solid rgba(255, 255, 255, 0.1)
        font-size: 16px
        line-height: 24px
        font-weight: 700
        color: rgba(255, 255, 255, 0.4)
      .desc
        display: inline-block
        padding-left: 12px
        font-size: 10px
        font-weight: 700
        color: rgba(255, 255, 255, 0.4)
    .content-right
      flex: 0 0 105px
      height: 100%
      background-color: #2b333b
      font-size: 12px
      font-weight: 700
      line-height: 46px
      color: rgba(255, 255, 255, 0.4)
      text-align: center
</style>