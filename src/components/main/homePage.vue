<template>
	<div class="homePage">
		<v-header></v-header>
		<div class="homeWrapper" ref="homeWrapper">
			<div class="homeContent">
				<split></split>
				<better-slide>
					<div class="slideItem" v-for="item in slideImgArray">
						<a href="">
							<img :src="item" alt="">
						</a>
					</div>
				</better-slide>
				<split></split>
				<h2 class="title">推荐商家</h2>
			  <seller-list :sellerData="allSeller"></seller-list>
			  <div class="load-more" v-if="hasMore" ref="loadMore">
			  	<span v-if="isLoading">加载中...</span>
			  	<span v-else @click="loadMoreData">加载更多</span>
			  </div>
			</div>
		</div>
	</div>
</template>
<script>
import vHeader from './header/header.vue'
import sellerList from './../main/sellerList/sellerList.vue'
import betterSlide from './slide/betterSlide.vue'
import split from './../detail/goods/split/split.vue'
import BScroll from 'better-scroll'
const OK = 0
export default {
	data() {
		return {
			allSeller: [],
			slideImgArray: [],
			hasMore: false,
			page: 1,
			isLoading: false
		}
	},
	components: {
		'v-header': vHeader,
		sellerList,
		betterSlide,
		split
	},
	created() {
		this.loadFirstdata()
		this.slideImgArray = ['/static/imgs/01/IMG_0857.jpg', '/static/imgs/01/IMG_0858.jpg', '/static/imgs/01/IMG_0868.jpg', '/static/imgs/01/IMG_0870.jpg', '/static/imgs/01/IMG_0874.jpg']
	},
	methods: {
		// 获取首屏数据
		loadFirstdata() {
			this.$http.get('/api/allSeller?page=0').then((result) => {
				let sellers = result.data
				this.handleResult(sellers)
			})
		},
		// 获取更多数据
		loadMoreData() {
			// 记录状态 加载中
			this.isLoading = true

			this.$http.get('/api/allSeller?page=' + this.page).then((result) => {
				let sellers = result.data
				this.handleResult(sellers)
				this.page = this.page + 1
			})
			// 恢复状态
			this.isLoading = false
		},
		// 处理数据
		handleResult(result) {
			if (result.errno === OK){
				this.allSeller = [...this.allSeller, ...result.data]
				this.hasMore = result.hasMore
			}
		}
	},
	watch: {
		allSeller: function() {
			this.$nextTick(() => {
				if (!this.scroll) {
					this.scroll = new BScroll(this.$refs.homeWrapper, {
						click: true,
						probeType: 3
					})
				} else {
					this.scroll.refresh()
				}
				this.scroll.on('scrollEnd', () => {
					let loadMore = this.$refs.loadMore
					if (loadMore) {
						let loadMoreTop = loadMore.getBoundingClientRect().top
						let screenHeight = window.screen.height
						if (loadMoreTop < screenHeight) {
							this.loadMoreData()
						}
					}
				})
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
      .load-more
        padding: 10px 0;
        text-align: center;
        font-size: 18px;
        color: #666;
        background-color: #fff;
</style>