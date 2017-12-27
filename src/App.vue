<template>
  <div class="app">
  	<transition name="slide">
	      <router-view class=slide></router-view>
    </transition>
  </div>
</template>

<script>
export default {
	data() {
		return {
		}
	}
}
</script>
  
<style lang="stylus" rel="stylesheet/stylus">
.app
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  .slide
	  &.slide-enter-active,&.slide-leave-active
	    transition: all 0.5s linear
	  &.slide-enter,&.slide-leave-to
	    opacity: 0
	    transform: translate3d(0, -100%, 0)
</style>
