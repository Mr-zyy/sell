<template>
  <div class="header">
  	<div class="content-wrapper">
  		<div class="avatar">
  		  	<img :src="seller.avatar" width="64" height="64" alt="" />
  		</div>
  		<div class="content">
  			<div class="title">
  				<span class="brand"></span>
  				<span class="name">{{seller.name}}</span>
  			</div>
  			<div class="description">
  			{{seller.description}}/{{seller.deliveryTime}}分钟送达
  			</div>
  			<div class="supports">
  				<span class="icon" :class="[supportsClass]"></span>
  				<span class="text">
  					{{supportsDescript}}
  				</span>
  			</div>
  		</div>
      <div class="suppour-count" @click="showDetail">
        <span class="count">{{supportsLength}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
  	</div>
  	<div class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i @click="showDetail" class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" alt="">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <v-line :msg="message1"></v-line>
            </div>
            <ul v-if="seller.supports" class="support">
              <li v-for="(item,index) in seller.supports" class="support-item">
                <span class="icon" :class="[classMap[index]]"></span>
                <span class="text">
                  {{seller.supports[index].description}}
                </span>
              </li>
            </ul>
            <div class="title">
              <v-line :msg="message2"></v-line>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetil">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import star from '../star/star.vue'
import vLine from './line/line.vue'
export default {
  data () {
    return {
      detailShow: false,
      message1: '优惠信息',
      message2: '商家公告'
    }
  },
  methods: {
    showDetail() {
      this.detailShow = true
    },
    hideDetil() {
      this.detailShow = false
    }
  },
  computed: {
    supportsClass: function(){
      if (this.seller.supports){
        let type = this.seller.supports[0].type
        return this.classMap[type]
      }
    },
    supportsDescript: function(){
      if (this.seller.supports){
        let description = this.seller.supports[0].description
        return description
      }
    },
    supportsLength: function(){
      if (this.seller.supports){
        let length = this.seller.supports.length
        return length
      }
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    star,
    vLine
  },
  created() {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import "./../../../common/stylus/mixin.styl"
  .header
    position: relative
    overflow: hidden
    background: rgba(7, 17, 27, 0.5)
    color: #fff 
    .content-wrapper
      position: relative
      font-size: 0
      .avatar
        display: inline-block
        margin: 24px 16px 16px 24px
        img
          border-radius: 2px
      .content
        display: inline-block
        font-size: 14px
        .title
        	margin: 2px 0 8px 0
        	.brand
        	  display: inline-block
        	  width: 30px
        	  height: 18px
        	  bg-image('imgs/brand')
        	  background-size: 30px 18px
        	  background-repeat: no-repeat
        	.name
        	  vertical-align: top
        	  margin-left: 6px
        	  font-size: 16px
        	  font-weight: bold
        	  line-height: 18px
        .description
        	margin-bottom: 10px
        	font-size: 12px
        	line-height: 12px
        .supports
        	margin-bottom: 2px
        	.icon
            display: inline-block
            margin-right: 4px
            width: 12px
            height: 12px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('imgs/decrease_1')
            &.discount
              bg-image('imgs/discount_1')
            &.guarantee
              bg-image('imgs/guarantee_1')
            &.invoice
              bg-image('imgs/invoice_1')
            &.special
              bg-image('imgs/special_1')
          .text
            vertical-align: top
            font-size: 10px
            line-height: 12px
      .suppour-count
        position: absolute
        right: 12px 
        bottom: 14px
        height: 24px
        line-height: 24px
        padding: 0px 8px
        background: rgba(0,0,0,0.2)
        border-radius: 14px
        text-align: center
        .count
          vertical-align: top
          display: inline-block
          font-size: 10px
        .icon-keyboard_arrow_right
          line-height: 24px
          margin-left: 2px
          font-size: 10px
    .bulletin-wrapper
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 26px 0 12px
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
      background: rgba(7, 17, 27, 0.2)
      .bulletin-title
        display: inline-block
        width: 22px
        height: 12px
        bg-image('imgs/bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        vertical-align: top
        margin: 0 4px
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute
        right: 12px
        font-size: 10px
        top: 9px
    .background
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
    .detail
      position: fixed
      top: 0
      left: 0 
      z-index: 100
      overflow: auto
      width: 100%
      height: 100%
      background: rgba(7, 17, 27, 0.8)
      &.fade-enter-active,&.fade-leave-active
        transition: all 0.5s
      &.fade-enter,&.fade-leave-to
        opacity: 0
        background: rgba(7,17,27,0)
      .detail-wrapper
        width: 100%
        min-height: 100%
        .detail-main
          margin-top: 64px
          padding-bottom: 64px
          .name
            line-height: 16px
            font-weight: 700
            font-size: 16px
            text-align: center
          .star-wrapper
            margin-top: 16px
            padding: 2px 0
            text-align: center
          .title
            width: 100%
          .support
            width: 80%
            margin: 0 auto
            .support-item
              padding: 0 12px
              margin-bottom: 12px
              font-size: 0px
              &:last-child
                margin-bottom: 0px
              .icon
                display: inline-block
                width: 16px
                height: 16px
                background-size: 16px 16px
                background-repeat: no-repeat
                &.decrease
                  bg-image('imgs/decrease_2')
                &.discount
                  bg-image('imgs/discount_2')
                &.guarantee
                  bg-image('imgs/guarantee_2')
                &.invoice
                  bg-image('imgs/invoice_2')
                &.special
                  bg-image('imgs/special_2')
              .text
                display: inline-block
                vertical-align: top
                margin-left: 6px
                font-size: 12px
                line-height: 16px
          .bulletin
            width: 80%
            margin: 0 auto
            .content
              font-size: 12px
              line-height: 24px
              padding: 0 12px
      .detail-close
        position: relative
        margin: -64px auto 0 auto
        width: 32px
        height: 32px
        clear: both
        font-size: 32px
</style>

