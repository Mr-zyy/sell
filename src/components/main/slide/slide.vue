<template>
	<div class="slideShow">
		<div class="slideImg">
			<transition name="slide-trans">
				<img :src="slideImgArray[nowIndex]" v-if="isShow">
			</transition>
			<transition name="slide-trans-old">
				<img :src="slideImgArray[nowIndex]" v-if="!isShow">
			</transition>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			isShow: true,
			nowIndex: 0,
			setInv: {}
		}
	},
	props: {
		slideImgArray: {
			type: Array
		},
		invTime: {
			type: Number
		}
	},
	computed: {
		nextIndex() {
			if (this.nowIndex < this.slideImgArray.length - 1) {
				return this.nowIndex + 1
			} else {
				return 0
			}
		}
	},
	methods: {
		runInv() {
			this.isShow = false
			this.$nextTick(() => {
				this.isShow = true
				this.nowIndex = this.nextIndex
			})
		},
		clearInv() {
			clearInterval(this.setInv)
		},
		go() {
			this.setInv = setInterval(() => {
				this.runInv()
			}, this.invTime)
		}
	},
	mounted() {
		this.go()
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.slideShow
  position: relative
  width: 100%
  height: 100px
  .slideImg
    transform-style: preserve-3d
    height: 100%
    img
      position: absolute
      transform: translate3d(0, 0, 0)
      width: 100%
      height: 100px
    .slide-trans-enter-active
      transition: all 1s linear
    .slide-trans-enter
      transform: translate3d(100%, 0, 0)
    .slide-trans-old-leave-active
      transition: all 1s linear
    .slide-trans-old-leave-to
      transform: translate3d(-100%, 0, 0)
</style>