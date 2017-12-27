<template>
  <div class="sellers" ref="sellers">
    <div class="sellers-content">
    	<div class="overView">
    		<h1 class="title">{{seller.name}}</h1>
    		<div class="content">
    			<span class="starCom"><star :size="36" :score="seller.score"></star></span>
    			<span class="text">({{seller.ratingCount}})</span>
    			<span class="text">月售{{seller.sellCount}}单</span>
    			<span class="favorite">
    				<div class="icon" @click="toggleFavorite"><span class="icon-favorite" :class="{highLight:favorite}"></span></div>
    				<div class="collection">{{favoriteText}}</div>
    			</span>
    		</div>
    	</div>
    	<ul class="remark">
    		<li class="block">
    			<h2 class="name">起送价</h2>
    			<div class="textCon"><span class="num">{{seller.minPrice}}</span>元</div>
    		</li>
    		<li class="block">
    			<h2 class="name">商家配送</h2>
    			<div class="textCon"><span class="num">{{seller.deliveryPrice}}</span>元</div>
    		</li>
    		<li class="block">
    			<h2 class="name">平均配送时间</h2>
    			<div class="textCon"><span class="num">{{seller.deliveryTime}}</span>分钟</div>
    		</li>
    	</ul>
    	<split></split>
    	<div class="bulletin border-1px">
    		<h1>公告与活动</h1>
    		<p class="text">{{seller.bulletin}}</p>
    	</div>
    	<ul v-if="seller.supports" class="support">
    	  <li v-for="(item,index) in seller.supports" class="support-item border-1px">
    	    <span class="icon" :class="classMap[index]"></span>
    	    <span class="text">
    	      {{item.description}}
    	    </span>
    	  </li>
    	</ul>
    	<split></split>
    	<div class="pics">
    		<h1 class="title">商家实景</h1>
    		<div class="pic-wrapper" ref="picWrapper">
    			<ul class="pic-list" ref="picList">
    				<li class="pic" v-for="pic in seller.pics">
    					<img :src="pic" width="120" height="90">
    				</li>
    			</ul>
    		</div>
    	</div>
    	<split></split>
    	<div class="infos">
    		<h1 class="title border-1px">商家信息</h1>
    		<ul class="info-list">
    			<li class="info" v-for="item in seller.infos">{{item}}</li>	
    		</ul>
    	</div>
    </div>
  </div>
</template>

<script>
import star from './../star/star.vue'
import split from './../goods/split/split.vue'
import {saveToLocal, getFromLocal} from './../../../common/js/store.js'
import BScorll from 'better-scroll'
export default {
  data () {
    return {
      favorite: (() => {
        let fav = getFromLocal(this.seller.id, 'favorite', false)
        return fav
      })()
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    star,
    split
  },
  computed: {
  	favoriteText() {
  		return this.favorite ? '收藏' : '未收藏'
  	}
  },
  methods: {
    _initScroll() {
      if (!this.scroll) {
          this.scroll = new BScorll(this.$refs.sellers, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    },
    _initPics() {
    	if (this.seller.pics) {
    		let picWidth = 120
    		let picMargin = 6
    		let totalWidth = (picWidth + picMargin) * this.seller.pics.length - picMargin
    		this.$refs.picList.style.width = totalWidth + 'px'
    		this.$nextTick(() => {
    			if (!this.picScroll) {
    				this.picScroll = new BScorll(this.$refs.picWrapper, {
    					scrollX: true,
    					eventPassthrough: 'vertical'
    				})
    			} else {
    				this.picScroll.refresh()
    			}
    		})
    	}
    },
    toggleFavorite(event) {
    	if (!event._constructed) {
    		return
    	}
    	this.favorite = !this.favorite
    	saveToLocal(this.seller.id, 'favorite', this.favorite)
    }
  },
  watch: {
    seller: function() {
      this._initScroll()
      this._initPics()
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
  },
  mounted() {
  	// seller数据是异步获取的，在vue挂载之后,seller数据还是空
  	this.$nextTick(() => {
	    this._initScroll()
	    this._initPics()
  	})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import './../../../common/stylus/mixin.styl'
.sellers
  position: absolute
  top: 172px
  bottom: 0
  left: 0
  overflow: hidden
  width: 100%
  .overView
    position: relative
    padding: 18px 0
    margin: 0 18px
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    .title
      margin-bottom: 8px
      font-size: 14px
      line-height: 14px
      color: rgb(7, 17, 27)
		.content
		  font-size: 0
		  .starCom
		    display: inline-block
		    margin-right: 8px
		  .text
		    display: inline-block
		    vertical-align: bottom
		    margin-right: 12px
		    font-size: 10px
		    line-height: 16px
		    color: rgb(77, 85, 93)
		  .favorite
		    position: absolute
		    top: 18px
		    right: -3px
		    width: 50px
		    text-align: center
		    .icon
		      margin-bottom: 4px
		      .icon-favorite
		        font-size:  24px
		        line-height: 24px
		        color: #d3d6d9
		        &.highLight
		          color: rgb(240, 20, 20)
		    .collection
		      font-size: 10px
		      line-height: 10px
		      color: rgb(77, 85, 93)
	.remark
	  display: flex
	  padding: 18px 0
	  .block
	    flex: 1
	    font-size: 10px
	    text-align: center
	    border-right: 1px solid rgba(7, 17, 27, 0.1)
	    &:last-child
	      border: none
	    .name
	      line-height: 10px
	      color: rgb(147, 153, 159)
	      margin-bottom: 4px
      .textCon
        .num
          font-size: 24px
          line-height: 24px
          color: rgb(7, 17, 27)
  .bulletin
    padding: 18px 18px 16px 18px
    border-1px(rgba(7, 17, 27, 0.1))
    h1
      margin-bottom: 4px
      font-size: 14px
      line-height: 14px
      color: rgb(7, 17, 27)
    .text
      padding: 0 12px
      font-size: 12px
      line-height: 24px
      color: rgb(240, 20, 20)
	.support
	  .support-item
	    padding: 16px 12px
	    margin: 0 18px
	    border-1px(rgba(7, 17, 27, 0.1))
	    &:last-child
	      &:after
	        border: none
	    .icon
	      display: inline-block
	      margin-right: 6px
	      width: 16px
	      height: 16px
	      background-size: 16px 16px
	      background-repeat: no-repeat
	      &.decrease
	        bg-image('imgs/decrease_4')
	      &.discount
	        bg-image('imgs/discount_4')
	      &.guarantee
	        bg-image('imgs/guarantee_4')
	      &.invoice
	        bg-image('imgs/invoice_4')
	      &.special
	        bg-image('imgs/special_4')
	    .text
	      display: inline-block
	      vertical-align: top
	      font-size: 12px
	      line-height: 16px
	      color: rgb(7, 17, 27)
	.pics
	  padding: 18px
	  .title
	    font-size: 14px
	    line-height: 14px
	    color: rgb(7, 17, 27)
	  .pic-wrapper
	    margin-top: 12px
	    width: 100%
	    overflow: hidden
	    .pic-list
	      font-size: 0
	      white-space: nowrap
	      .pic
	        display: inline-block
	        margin-right: 6px
	        &:last-child
	          margin-right: 0
	.infos
	  padding: 18px
	  .title
	    padding-bottom: 12px
	    font-size: 14px
	    line-height: 14px
	    color: rgb(7, 17, 27)
	    border-1px(rgba(7, 17, 27, 0.1))
	  .info-list
	    .info
	      padding: 18px 12px
	      font-size: 12px
	      line-height: 16px
	      color: rgb(7, 17, 27)
	      border-1px(rgba(7, 17, 27, 0.1))
	      &:last-child
	        &:after
	          border-bottom: none
</style>