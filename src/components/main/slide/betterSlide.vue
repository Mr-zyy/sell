<template>
	<div class="betterSlide" ref="slide">
		<div class="slideGroup" ref="slideGroup">
			<slot></slot>
		</div>
		<div class="dots">
			<span class="dot" v-for="(dot, index) in dots" :class="{on: currentPageIndex === index}"></span>
		</div>
	</div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
	data() {
		return {
			currentPageIndex: 0,
			dots: []
		}
	},
	props: {
		loop: {
			type: Boolean,
			default: true
		},
		autoPlay: {
			type: Boolean,
			default: true
		}
	},
	methods: {
		addClass(el, className) {
			if (this.hasClass(el, className)) {
				return
			}
			let arr = el.className.split(' ')
			arr.push(className)
			let newClass = arr.join(' ')
			el.className = newClass
		},
		hasClass(el, className) {
			let reg = new RegExp('(^|\\s)' + className + '($|\\s)')
			return reg.test(el.className)
		},
		_setSlideWidth(flag) {
			let children = [...this.$refs.slideGroup.children]
			let slideWidth = this.$refs.slide.offsetWidth
			let totalWidth = 0
			children.forEach((item, index) => {
				this.addClass(item, 'slideItem')
				item.style.width = slideWidth + 'px'
				totalWidth += slideWidth
			})
			if (this.loop && !flag) {
				totalWidth += slideWidth * 2
			}
			this.$refs.slideGroup.style.width = totalWidth + 'px'
		},
		_initSlide() {
			this.slider = new BScroll(this.$refs.slide, {
			  scrollX: true,
			  scrollY: false,
			  momentum: false,
			  snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
			})
			this.slider.on('scrollEnd', () => {
				let pageIndex = this.slider.getCurrentPage().pageX
				if (this.loop) {
					pageIndex -= 1
				}
				this.currentPageIndex = pageIndex
				if (this.autoPlay) {
					this._play()
				}
			})
			this.slider.on('touchend', () => {
				if (this.autoPlay) {
					this._play()
				}
			})
			this.slider.on('beforeScrollStart', () => {
				if (this.autoPlay) {
					clearTimeout(this.timer)
				}
			})
		},
		_play() {
			clearTimeout(this.timer)
			this.timer = setTimeout(() => {
				this.slider.next()
			}, 4000)
		},
		_initDots() {
			this.dots = new Array(this.$refs.slideGroup.children.length)
		}
	},
	mounted() {
		setTimeout(() => {
			this._setSlideWidth()
			this._initDots()
			this._initSlide()
			if (this.loop){
				this._play()
			}
		}, 20)
		window.addEventListener('resize', () => {
			if (!this.slider) {
				return
			}
			this._setSlideWidth(true)
			this.slider.refresh()
		})
	},
	beforeDestroy() {
		clearTimeout(this.timer)
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.betterSlide
  position: relative
  min-height: 1px
  .slideGroup
    position: relative
    overflow: hidden
    white-space: nowrap
    .slideItem
      display: inline-block
      box-sizing: border-box
      overflow: hidden
      text-align: center
			a
			  display: block
			  width: 100%
			  overflow: hidden
			  text-decoration: none
			  img
			    display: block
			    width: 100%
			    height: 130px
  .dots
    position: absolute
    left: 0
    right: 0
    bottom: 20px
    text-align: center
    font-size: 0
    .dot
      display: inline-block
      margin: 0 4px
      width: 8px
      height: 8px
      border-radius: 50%
      background-color: rgba(255, 255, 255, 0.8)
      &.on
        width: 20px
        border-radius: 5px
        background-color: rgba(255, 255, 255, 0.8)
</style>