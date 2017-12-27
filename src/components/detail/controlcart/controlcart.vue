<template>
	<div class="controlcart">
		<transition name="move">
			<div class="decrerase icon-remove_circle_outline" v-show="food.count>0"
			@click="decCart">
			</div>
		</transition>	
		<div class="cartCount" v-show="food.count>0">{{food.count}}</div>
		<div class="increase icon-add_circle" @click="addCart"></div>
	</div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.controlcart
  font-size: 0
  .decrerase
    display: inline-block
    transform: translate3d(0, 0, 0) rotateZ(0)
    padding: 6px
    display: inline-block
    font-size: 24px
    line-height: 24px
    color: rgb(0, 160, 220)
    transition: all 0.4s linear
    transform: rotate(0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.4s linear
    &.move-enter, &.move-leave-to
      opacity: 0
      transform: translate3d(24px, 0 , 0) rotateZ(-180deg)
  .cartCount
    display: inline-block
    vertical-align: top
    width: 12px
    padding-top: 6px
    line-height: 24px
    font-size: 10px
    text-align: center
    color: rgb(147, 153, 159)
  .increase
    display: inline-block
    padding: 6px
    font-size: 24px
    line-height: 24px
    color: rgb(0, 160, 220)
</style>
<script>
import Vue from 'vue'
	export default {
		props: {
			food: {
				type: Object
			}
		},
		created() {
		},
		methods: {
			addCart(event) {
        if (!event._constructed){
          return
        }
        if (!this.food.count){
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        this.$emit('selectIndex')
        this.$emit('addBall', event.target)
			},
			decCart() {
				if (!event._constructed){
          return
				}
				if (this.food.count){
          this.food.count--
				}
        this.$emit('selectIndex')
			}
		}
	}
</script>