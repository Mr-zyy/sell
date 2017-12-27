<template>
	<div class="sellerWrapper">
		<ul class="sellerList">
			<li class="list border-1px" v-for="(seller, index) in sellerData">
				<router-link :to="path">
					<div class="avatar" @click="link(index, $event)">
						<img width="57" height="57" :src="seller.avatar" alt="">
					</div>
				</router-link>
				<div class="content">
					<h2 class="name">{{seller.name}}</h2>
					<div class="rating">
						<span class="starCom"><star :size="24" :score="seller.score"></star></span><span class="score">{{seller.score}}</span><span class="sellCount">月售{{seller.sellCount}}单</span>
					</div>
					<div class="delivery border-1px">
						<span class="minPrice">￥{{seller.minPrice}}起送</span><span class="deliveryPrice">配送费￥{{seller.deliveryPrice}}</span>
					</div>
					<div class="support-wrapper" ref="supportWrapper">
						<ul v-if="seller.supports" class="support">
						  <li v-for="(item,index1) in seller.supports" class="support-item">
						  	<transition name="fade">
						  		<div class="contentsWrapper" v-show="isShowItemArray[index][index1]" ref="contentWrapper">
						  			<span class="icon" :class="classMap[index1]"></span>
						  			<span class="des">
						  			  {{seller.supports[index1].description}}
						  			</span>
						  		</div>
						  	</transition>
						  </li>
						</ul>
						<div class="iconArrow" v-show="showIconUpArray[index]" @click="showArrow(index,$event)">
							<span class="num">{{seller.supports.length}}个活动</span>
							<span class="icon-keyboard_arrow_right icon1"></span>
						</div>
						<div class="iconArrow" v-show="showIconDownArray[index]" @click="showArrow(index,$event)">
							<span class="num">{{seller.supports.length}}个活动</span>
							<span class="icon-keyboard_arrow_right icon2"></span>
						</div>
					</div>
				</div>
			</li>
		</ul>
		<div class="show" v-show="isShowItem"></div> <!-- 存在的意义就是通过它的显示隐藏来重绘页面 -->
	</div>
</template>
<script>
import star from './../../detail/star/star.vue'
export default {
	data() {
		return {
			path: '',
			isShowItem: false,
			showIconUpArray: [],
			showIconDownArray: [],
			isShowItemArray: []
		}
	},
	props: {
		sellerData: {
			type: Array
		}
	},
	components: {
		star
	},
	methods: {
		showArrow(index, event) {
			this.showIconUpArray[index] = !this.showIconUpArray[index]
			this.showIconDownArray[index] = !this.showIconDownArray[index]
			this.isShowItemArray[index].forEach((item, index1) => {
				if (index1 >= 2) {
					this.isShowItemArray[index][index1] = !this.isShowItemArray[index][index1]
				}
			})
			// 手动重绘页面
			this.isShowItem = !this.isShowItem
		},
		link(index, event) {
			let id = this.sellerData[index].id
			this.path = `/detail/${id}`
		}
	},
	computed: {
	},
	created() {
		this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
	},
	watch: {
		sellerData: function() {
			this.sellerData.forEach((item, index) => {
				let arr = []
				this.showIconUpArray.push(true)
				this.showIconDownArray.push(false)
				item.supports.forEach((value, index1) => {
					if (index1 < 2) {
						arr.push(true)
					} else {
						arr.push(false)
					}
				})
				this.isShowItemArray.push(arr)
			})
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import './../../../common/stylus/mixin.styl'
.sellerList
  .list
    display: flex
    padding: 12px 10px
    border-1px(rgba(7, 17, 27, 0.1))
		.avatar
		  flex: 0 0 57px
		  margin-right: 10px
		  img
		    border: 1px solid rgba(7, 17, 27, 0.1)
		    border-radius: 2px
		.content
		  flex: 1
		  font-size: 12px
		  color: rgb(147, 153, 159)
		  .name
		    margin: 2px 0 0 0
		    font-size: 14px
		    line-height: 14px
		    color: rgb(7, 17, 27)
		  .rating
		    padding: 5px 0
		    .starCom
		      display: inline-block
		    .score
		      display: inline-block
		      margin: 0 5px
		    .sellCount
		      display: inline-block
		  .delivery
		    padding-bottom: 10px
		    border-1px(rgba(7, 17, 27, 0.1))
		    .minPrice
		      padding-right: 5px
		      border-right: 1px solid rgba(7, 17, 27, 0.1)
		      line-height: 12px
		    .deliveryPrice
		      padding-left: 5px
		  .support-wrapper
		    position: relative
			  .support
			    margin: 0 auto
			    .support-item
			      margin-top: 5px
			      font-size: 0px
			      .contentsWrapper
			        &.fade-enter-active,&.fade-leave-active
			          transition: all 0.4s linear
			        &.fade-enter,&.fade-leave-to
			          opacity: 0
			        .icon
			          display: inline-block
			          width: 16px
			          height: 16px
			          background-size: 16px 16px
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
			        .des
			          display: inline-block
			          vertical-align: top
			          margin-left: 6px
			          font-size: 12px
			          line-height: 16px
				.iconArrow
				  position: absolute
				  top: 0
				  right: 0
				  .icon-keyboard_arrow_right
				    display: inline-block
				    &.icon1
				      transform: rotateZ(90deg)
				    &.icon2
					    transform: rotateZ(-90deg)	
</style>