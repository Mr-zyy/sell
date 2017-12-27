<template>
	<div class="homePage">
		<v-header></v-header>
		<div class="homeWrapper" ref="homeWrapper">
			<div class="homeContent">
				<slide-show :slideImgArray="slideImgArray" :invTime="3000"></slide-show>
				<split></split>
				<h2 class="title">推荐商家</h2>
			  <seller-list :sellerData="allSeller"></seller-list>
			</div>
		</div>
	</div>
</template>
<script>
import vHeader from './header/header.vue'
import sellerList from './../main/sellerList/sellerList.vue'
import slideShow from './slide/slide.vue'
import split from './../detail/goods/split/split.vue'
import BScroll from 'better-scroll'
const OK = 0
export default {
	data() {
		return {
			allSeller: [],
			slideImgArray: []
		}
	},
	components: {
		'v-header': vHeader,
		sellerList,
		slideShow,
		split
	},
	created() {
		this.$http.get('/api/allSeller').then((result) => {
			let sellers = result.data
			if (sellers.errno === OK){
				this.allSeller = sellers.data
			}
		})
		this.slideImgArray = ['/static/imgs/01/IMG_0857.jpg', '/static/imgs/01/IMG_0858.jpg', '/static/imgs/01/IMG_0868.jpg', '/static/imgs/01/IMG_0870.jpg', '/static/imgs/01/IMG_0874.jpg']
	},
	watch: {
		allSeller: function() {
			this.$nextTick(() => {
				if (!this.scroll) {
					this.scroll = new BScroll(this.$refs.homeWrapper, {
						click: true
					})
				} else {
					this.scroll.refresh()
				}
			})
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.homePage
  position: fixed
  width: 100%
  height: 100%
  .homeWrapper
    position: absolute
    top: 114px
    bottom: 0px
    width: 100%
    overflow: hidden
    .homeContent
      .title
        margin-top: 12px
        padding-bottom: 12px
        text-align: center
        font-size: 15px
        color: rgb(7, 17, 27)
        border-bottom: 1px solid rgba(7, 17, 27, 0.2)
</style>