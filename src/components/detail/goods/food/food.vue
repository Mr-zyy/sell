<template>
	<transition name="slide">
		<div class="food-list" v-show="showFood" ref="foodList">
			<div class="slide">
				<div class="image-header">
					<img :src="food.image">
					<div class="close" @click="hide">
						<i class="icon-arrow_lift"></i>
					</div>
				</div>
				<div class="food-content">
					<h1 class="title">{{food.name}}</h1>
					<div class="text">
						<span class="sellCount">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="new">￥{{food.price}}</span><span
						v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
					</div>
					<div class="controlcartWrapper">
						<controlcart :food="food" @addBall="temp" @selectIndex="contactSlide"></controlcart>
					</div>
					<transition name="fade">
						<div class="add" v-show="!food.count || food.count === 0" @click="showBall">加入购物车</div>
					</transition>
				</div>
				<split v-show="food.info"></split>
				<div class="info">
					<h1 class="title">商品介绍</h1>
					<div class="text">{{food.info}}</div>
				</div>
				<split></split>
				<div class="ratings">
					<h1 class="title">商品评价</h1>
				  <assess :desc="desc" :selectType="selectType" :onlyContent="onlyContent" :ratings="food.ratings" @toggleContent="toggleSonShow" @toggleType="toggleSonType"></assess>
				  <div class="ratings-list">
				  	<ul>
				  		<li v-for="(item, index) in food.ratings" >
				  			<transition name="fade">
				  				<div class="list border-1px" v-show="(showContent === item.rateType || showContent === 2)&&(!onlyContent || item.text)">
				  					<div class="date"><span class="time">{{item.rateTime | formDate}}</span>
				  						<span class="user"><span class="username">{{item.username}}</span><img :src="item.avatar"></span></div>
				  					<div class="text"><span :class="selectIcon[index]"></span>{{text[index]}}</div>
				  				</div>
				  			</transition>
				  	  </li>
				  	</ul>
				  	<div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
				  </div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script type="text/javascript">
import controlcart from './../../controlcart/controlcart.vue'
import split from './../split/split.vue'
import assess from './../../assess/assess.vue'
import {formDate} from './../../../../common/js/formDate.js'
import BScroll from 'better-scroll'
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
	export default {
		data() {
			return {
				showFood: false,
				desc: {
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				},
				selectType: ALL,
				showContent: ALL,
				onlyContent: true
			}
		},
		props: {
			food: {
				type: Object
			}
		},
		filters: {
			formDate
		},
		methods: {
			show() {
				this.showFood = true
				this.$nextTick(() => {
					if (!this.BScroll){
						this.BScroll = new BScroll(this.$refs.foodList, {
							click: true
						})
					} else {
						this.BScroll.refresh()
					}
				})
			},
			hide() {
				this.showFood = false
			},
			temp(el) {
				this.$emit('ballMove', el)
			},
			contactSlide() {
				this.$emit('slideCount')
			},
			showBall(event) {
				this.$set(this.food, 'count', 1)
				this.$emit('showBall', event.target)
				this.$emit('showSlide')
			},
			toggleSonShow() {
        this.onlyContent = !this.onlyContent
      },
			toggleSonType(type) {
				this.selectType = type
				this.showContent = type
			}
		},
		components: {
			controlcart,
			split,
			assess
		},
		created() {
		},
		computed: {
			selectIcon() {
				let arr = []
				this.food.ratings.forEach((item) => {
					if (item.rateType === POSITIVE) {
						arr.push('icon-thumb_up')
					} else if (item.rateType === NEGATIVE) {
						arr.push('icon-thumb_down')
					}
				})
				return arr
			},
			text() {
				let arr = []
				this.food.ratings.forEach((item) => {
					if (item.rateType === POSITIVE) {
						if (item.text) {
							arr.push(item.text)
						} else {
							arr.push('满意')
						}
					} else if (item.rateType === NEGATIVE) {
						if (item.text) {
							arr.push(item.text)
						} else {
							arr.push('吐槽')
						}
					}
				})
				return arr
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import './../../../../common/stylus/mixin.styl'
.food-list
  position: fixed
  top: 0
  left: 0
  bottom: 46px
  width: 100%
  z-index: 9
  overflow: hidden
  background-color: #fff
  transform: translate3d(0, 0, 0)
  &.slide-enter-active,&.slide-leave-active
    transition: all 0.4s linear
  &.slide-enter,&.slide-leave-to
    transform: translate3d(100%, 0, 0)
  .image-header
    position: relative
    width: 100%
    padding-top: 100%
    img
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
    .close
      position: absolute
      top: 10px
      left: 10px
      background-color: #666
      border-radius: 50%
      .icon-arrow_lift
        display: block
        padding: 4px
        font-size: 28px
        color: #fff
  .food-content
    position: relative
    padding: 18px
    .title
      margin-bottom: 8px
      line-height: 14px
      font-size: 14px
      font-weight: 700
      color: rgb(7, 17, 27)
    .text
      margin-bottom: 18px
      font-size: 10px
      line-height: 10px
      color: rgb(147, 153, 159)
      .sellCount
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
    .controlcartWrapper
      position: absolute
      right: 12px
      bottom: 12px
    .add
      position: absolute
      right: 18px
      bottom: 18px
      padding: 6px
      font-size: 10px
      line-height: 12px
      background-color: rgb(0, 160, 220)
      color: #fff
      border-radius: 12px
      transform: translate3d(0, 0, 0)
      &.fade-enter-active,&.fade-leave-active
        transition: all 0.2s linear
      &.fade-enter
        opacity: 0
        transform: translate3d(0, -100%, 0)
      &.fade-leave-to
        opacity: 0
        transform : translate3d(0, 100%, 0)
  .info
    padding: 18px
    .title
      font-size: 14px
      font-weight: 700
      margin-bottom: 6px
    .text
      padding: 0 8px
      font-size: 12px
      line-height: 24px
      color: #93999f
  .ratings
    padding-top: 18px
    .title
      margin-left: 18px
    .ratings-list
      margin: 0 18px
      .list
        padding: 16px 0px
        border-1px(rgba(7, 17, 27, 0.1))
        transform: translate3d(0, 0, 0)
        &.fade-enter-active,&.fade-leave-active
          transition: all 0.4s linear
        &.fade-enter,&.fade-leave-to
          opacity: 0
          transform: translate3d(0, -100%, 0)
	      .date
	        margin-bottom: 5px
	        overflow: hidden
	        font-size: 10px
	        line-height: 12px
	        color: rgb(147, 153, 159)
	        .time
	          display: inline-block
	          float: left
	        .user
	          display: inline-block
	          float: right
	          .username
	            display: inline-block
	            vertical-align: top
	            line-height: 14px
	          img
	            margin-left: 6px
	            vertical-align: top
	            width: 12px
	            height: 12px
	            border-radius: 50%
	      .text
	        font-size: 12px
	        line-height: 16px
	        color: rgb(7, 17, 27)
	        .icon-thumb_up,.icon-thumb_down
	          margin-right: 4px
	          font-size: 12px
	          line-height: 24px
	          color: rgb(147, 153, 159)
	        .icon-thumb_up
	          color: rgb(0, 160, 220)
		.no-rating
		  padding: 16px 0
		  font-size: 12px
		  color: rgb(147, 153, 159)
</style>