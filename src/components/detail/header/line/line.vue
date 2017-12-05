<template>
	<div class="vLine">
		<div class="line"></div>
		<div class="text">{{msg}}</div>
		<div class="line"></div>
	</div>
</template>
<script>
  export default {
    props: {
      msg: {
        type: String
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.vLine
  display: flex
  width: 80%
  margin: 28px auto 24px auto
  .line 
    flex: 1
    position: relative
    top: -6px
    border-bottom: 1px solid rgba(225, 225, 225, 0.2)
  .text
    font-weight: 700
    padding: 0px 12px
    font-size: 14px
</style>