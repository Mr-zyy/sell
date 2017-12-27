<template>
	<div class="header">
		<div class="search">
			<div class="search-input" @click="showSearch">
				<span class="icon-search"></span>搜索商家、商品
			</div>
	  </div>
	  <div class="listWrapper" ref="listWrapper">
	  	<ul class="search-list" ref="searchList">
	  		<li class="list" ref="list" v-for="(item, index) in hotSearch" @click="search(index, $event)">{{hotSearch[index]}}</li>
	  	</ul>
	  </div>
	  <search :toggleSearch="toggleSearch" @hideSearch="hideSearch" :searchFood="searchFood"></search>
	</div>
</template>
<script>
import search from './search/search.vue'
import BScroll from 'better-scroll'
export default {
	data() {
		return {
			toggleSearch: false,
			hotSearch: ['一粥七天', '正德兴', '谷香谷道', '爬山虎主题餐厅', '意字号饭团', '粥品香坊（回龙观）', '满朝佰家粥铺', '大众饭店 (新安店)', '好再来饭店', '五口灶 (新安店)'],
			searchFood: ''
		}
	},
	components: {
		search
	},
	methods: {
		showSearch(event) {
			this.toggleSearch = true
		},
		hideSearch() {
			this.toggleSearch = false
		},
		search(index, event) {
			this.toggleSearch = true
			this.searchFood = this.hotSearch[index]
		},
		_initScroll() {
			let width = 0
			let margin = 14
			this.$refs.list.forEach((item, index) => {
			  width += item.offsetWidth
			})
			width = width + margin * (this.hotSearch.length - 1)
			this.$refs.searchList.style.width = width + 'px'
			if (!this.scroll) {
				this.scroll = new BScroll(this.$refs.listWrapper, {
					scrollX: true,
					click: true
				})
			} else {
				 this.scroll.refresh()
			}
		}
	},
	created() {
		this.$nextTick(() => {
			this._initScroll()
		})
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.header
  padding: 30px 0 20px 0
  background: linear-gradient(to right, #4ba7f8 , #3a83f7)
  .search
    padding: 0 18px
    font-size: 12px
    text-align: center
    .search-input
      padding: 10px 0
      background-color: #fff
      border: 1px solid rgba(7, 17, 27, 0.1) 
      border-radius: 2px
      color: rgb(7, 17, 27, 0.2)
			.icon-search
			  display: inline-block
			  vertical-align: top
			  margin-right:5px
			  color: rgb(147, 153, 159)
  .search-list
    padding: 18px 18px 0px 18px
    font-size: 0
    white-space: nowrap
    .list
      display: inline-block
      text-align: center
      font-size: 12px
      margin-right: 14px
      color: #fff
      &:last-child
        margin-right: 0
</style>