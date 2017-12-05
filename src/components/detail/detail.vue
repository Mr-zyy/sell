<template>
  <div id="detail">
    <v-header :seller="sellerData"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
         <router-link to="/detail/goods">商品</router-link>
      </div>
      <div class="tab-item">
         <router-link to="/detail/ratings">评价</router-link>
      </div>
      <div class="tab-item">
         <router-link to="/detail/sellers">商家</router-link>
      </div>
    </div>
    <router-view :seller="sellerData"></router-view>
  </div>
</template>

<script>
import vHeader from './header/header'
const ERR_OK = 0
export default {
  data(){
    return {
      sellerData: {},
      ratingsData: {}
    }
  },
  components: {
    'v-header': vHeader
  },
  created(){
    this.$http.get('/api/seller').then(function(result){
      let response = result.data
      if (response.errno === ERR_OK){
        this.sellerData = response.data[0]
        console.log(this.sellerData)
      }
    })
    //  this.$http.get('/api/ratings').then(function(result){
    //     this.ratingsData = result.data
    //     console.log(this.ratingsData)
    // })
  }
}
</script>
  
<style lang="stylus" rel="stylesheet/stylus">
@import "./../../common/stylus/mixin.styl"
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7,17,27,0.1))
    & .tab-item
      flex: 1
      text-align :center
      & > a
        display: block
        color: rgb(77,85,93)
        font-size: 14px
        &.router-link-active
          color: rgb(240,20,20)
</style>
