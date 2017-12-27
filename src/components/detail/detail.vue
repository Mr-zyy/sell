<template>
  <div class="detail">
    <v-header :seller="sellerData"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
         <router-link :to="goods">商品</router-link>
      </div>
      <div class="tab-item">
         <router-link :to="ratings">评价</router-link>
      </div>
      <div class="tab-item">
         <router-link :to="sellers">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="sellerData" :id="$route.params.id"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import vHeader from './header/header'
const ERR_OK = 0
export default {
  data(){
    return {
      sellerData: {
        // id: this.$route.params.id
      },
      ratingsData: {},
      goods: `/detail/${this.$route.params.id}/goods`,
      ratings: `/detail/${this.$route.params.id}/ratings`,
      sellers: `/detail/${this.$route.params.id}/sellers`
    }
  },
  components: {
    'v-header': vHeader
  },
  created(){
    let id = this.$route.params.id
    this.$http.get('/api/seller?id=' + id).then(function(result){
      let response = result.data
      if (response.errno === ERR_OK){
        let data = response.data
        this.sellerData = data
        // console.log(this.sellerData)
      }
    })
    //  this.$http.get('/api/ratings').then(function(result){
    //     this.ratingsData = result.data
    //     console.log(this.ratingsData)
    // })
  }
}
</script>
  
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "./../../common/stylus/mixin.styl"
.detail
  position: fixed
  width: 100%
  height: 100%
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
