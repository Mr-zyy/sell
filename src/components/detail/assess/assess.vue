<template>
	<div class="rating">
		<div class="rating-select border-1px">
			<span class="block positive" @click="switchType(2,$event)" :class="{active:selectType===2}">{{desc.all}}<span class="count" v-show="ratings.length>0">{{ratings.length}}</span></span>
			<span class="block positive" @click="switchType(0,$event)" :class="{active:selectType===0}">{{desc.positive}}<span class="count" v-show="positiveLength>0">{{positiveLength}}</span></span>
			<span class="block negative" @click="switchType(1,$event)" :class="{active:selectType===1}">{{desc.negative}}<span class="count" v-show="negativeLength>=0">{{negativeLength}}</span></span>
		</div>
		<div class="onlyContent" @click="toggleContent">
			<span class="icon-check_circle" :class="{on:onlyContent}"></span>
			<span class="content">只看有内容的评价</span>
		</div>
	</div>
</template>
<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
	export default {
		props: {
			desc: {
				type: Object,
				default() {
					return {
						all: '全部',
						positive: '满意',
						negative: '不满意'
					}
				}
			},
			ratings: {
				type: Array,
				default() {
					return []
				}
			},
			selectType: {
				type: Number,
				default: ALL
			},
			onlyContent: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			toggleContent(event) {
				if (!event._constructed){
					return
				}
				this.$emit('toggleContent')
			},
			switchType(type, event) {
				if (!event._constructed) {
					return
				}
				this.$emit('toggleType', type)
			}
		},
		computed: {
			positiveLength() {
				let length = 0
				this.ratings.forEach((item) => {
					if (item.rateType === POSITIVE) {
						length++
					}
				})
				return length
			},
			negativeLength() {
				let length = 0
				this.ratings.forEach((item) => {
					if (item.rateType === NEGATIVE) {
						length++
					}
				})
				return length
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import './../../../common/stylus/mixin.styl'
.rating
  .rating-select
    padding: 18px 0
    margin: 0 18px
    border-1px(rgba(7, 17, 27, 0.1))
    font-size: 0
    .block
      display: inline-block
      padding: 8px 12px
      margin-right: 8px
      font-size: 12px
      color: rgb(77, 85, 93)
      border-radius: 2px
      .count
        font-size: 8px
        margin-left: 2px
      &.positive
        background-color: rgba(0, 160, 220, 0.2)
        &.active
          background-color: rgb(0, 160, 220)
          color: #fff
      &.negative
        background-color: rgba(77, 85, 93, 0.2)
        &.active
          background-color: rgb(77, 85, 93)
          color: #fff
  .onlyContent
    padding: 12px 18px
    font-size: 0
    color: rgb(147, 153, 159)
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    .icon-check_circle
      display: inline-block
      margin-right: 4px
      font-size: 24px
      line-height: 24px
      &.on
        color: #00c850
    .content
      display:inline-block
      vertical-align: top
      margin-top: 6px
      font-size: 12px
</style>










