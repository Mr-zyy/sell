<template>
	<div class="star" :class="starType">
		<span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
	</div>
</template>
<script>
const LENGTH = 5
const CLSON = 'on'
const CLSHALF = 'half'
const ClSOFF = 'off'
export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {starType() {
   return 'star' + '-' + this.size
   },
   itemClasses() {
      let result = []
      let score = Math.floor(this.score * 2) / 2
      let integer = Math.floor(score)
      let isDecimal = score % 1 !== 0
      for (let i = 0; i < integer; i++){
        result.push(CLSON)
      }
      if (isDecimal){
        result.push(CLSHALF)
      }
      while (result.length < LENGTH){
       result.push(ClSOFF)
      }
      return result
	}
  }
}
</script>
<style  lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixin'
.star
  font-size: 0
  .star-item
  	display: inline-block
  &.star-24
  	.star-item
  	  margin-right: 3px
  	  width: 10px
  	  height: 10px
  	  background-size: 10px 10px
  	  background-repeat: no-repeat
  	  &:last-child
  	    margin-right: 0px
  	  &.on
  	    bg-image('imgs/star24_on')
  	  &.half
  	    bg-image('imgs/star24_half')
  	  &.half
  	    bg-image('imgs/star24_off')
  &.star-36
  	.star-item
  	  margin-right: 6px
  	  width: 15px
  	  height: 15px
  	  background-size: 15px 15px
  	  background-repeat: no-repeat
  	  &:last-child
  	    margin-right: 0px
  	  &.on
  	    bg-image('imgs/star36_on')
  	  &.half
  	    bg-image('imgs/star36_half')
  	  &.half
  	    bg-image('imgs/star36_off')
  &.star-48
  	.star-item
  	  margin-right: 22px
  	  width: 20px
  	  height: 20px
  	  background-size: 20px 20px
  	  background-repeat: no-repeat
  	  &:last-child
  	    margin-right: 0px
  	  &.on
  	    bg-image('imgs/star48_on')
  	  &.half
  	    bg-image('imgs/star48_half')
  	  &.half
  	    bg-image('imgs/star48_off')
</style>
