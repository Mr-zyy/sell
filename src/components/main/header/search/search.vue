<template>
	<transition name="slide">
	<div class="searchWrapper" v-show="toggleSearch">
		<div class="searchContent">
			<span class="icon-undo2" @click="hide"></span>
			<span class="input"><span class="icon-search" @click="search"></span><input type="text" placeholder="输入商家、商店名称" ref="inputs" v-model="propFood" @keydown.enter="search"></span>
			<span class="text" @click="search">搜索</span>
		</div>
		<seller-list :sellerData="sellerData"></seller-list>
		<div class="none" v-show="isShowData">未找到查询结果</div>
	</div>
	</transition>
</template>
<script>
import sellerList from './../../sellerList/sellerList.vue'
const OK = 0
const NO = 1
export default {
	data() {
		return {
			sellerData: [],
			propFood: '',
			isShowData: false
		}
	},
	props: {
		toggleSearch: {
			type: Boolean
		},
		searchFood: {
			type: String
		}
	},
	components: {
		'seller-list': sellerList
	},
	methods: {
		hide(event) {
			this.$emit('hideSearch')
			this.propFood = ''
			this.isShowData = false
			this.sellerData = []
		},
		search(event) {
			this.$http.get('/api/search?seller=' + encodeURIComponent(this.propFood)).then((result) => {
				let sellers = result.data
				if (sellers.errno === OK) {
					this.isShowData = false
					this.sellerData = sellers.data
				} else if (sellers.errno === NO) {
					this.sellerData = []
					this.isShowData = true
				}
			})
		}
	},
	watch: {
		searchFood: function() {
			this.propFood = this.searchFood
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import './../../../../common/stylus/mixin.styl'
.searchWrapper
  position: fixed
  top: 0
  left:0
  z-index: 1
  width: 100%
  height: 100%
  background-color: #FFF
  &.slide-enter-active,&.slide-leave-active
    transition: all 0.4s linear
  &.slide-enter
    transform: translate3d(-100%, 0, 0)
  &.slide-leave-active
    transform: translate3d(100%, 0, 0)
  .searchContent
    display: flex
    padding: 10px
    border: 1px solid black
    font-size: 0
    .icon-undo2
      flex:0 0 20px
      padding: 5px 0 0 0
      vertical-align: bottom
      font-size: 20px
      color: rgb(147, 153, 159)
		.input
		  position: relative
		  flex: 1
		  margin: 0 10px 0 20px
		  font-size: 12px
		  .icon-search
		    position: absolute
		    top: 10px
		    left: 8px
		    color: rgba(7, 17, 27, 0.1)
			input
			  padding: 8px 0 8px 25px
			  box-sizing: border-box
			  width: 100%
			  background: #f8f8f8
		.text
		  flex:0 0 40px
		  vertical-align: bottom
		  height: 31px
		  line-height: 31px
		  font-size: 16px
		  color: #333333
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
				      .contentWrapper
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
  .none
    height: 50px
    line-height: 50px
    text-align: center
    color: rgb(147, 153, 159)
    border-bottom: 1px solid rgba(7, 17, 27, 0.2)
</style>