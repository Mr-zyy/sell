<template>
  <div class="ratingsComponent" ref="ratings">
    <div class="ratings-content">
    	<div class="viewContent">
    		<div class="viewContent-left">
    			<div class="score">{{seller.score}}</div>
    			<div class="title">综合评分</div>
    			<div class="rank">高于周边商家{{seller.rankRate}}%</div>
    		</div>
    		<div class="viewContent-right">
    			<div class="score-wrapper">
    				<span class="title">服务态度</span>
    				<span class="starComponent"><star :size="36" :score="seller.score"></star></span>
    				<span class="score">{{seller.score}}</span>
    			</div>
    			<div class="score-wrapper">
    				<span class="title">商品评价</span>
    				<span class="starComponent"><star :size="36" :score="seller.foodScore"></star></span>
    				<span class="score">{{seller.foodScore}}</span>
    			</div>
    			<div class="deliveryTime">
    				<span class="title">送达时间</span>
    				<span class="time">{{seller.deliveryTime}}分钟</span>
    			</div>
    		</div>
    	</div>
      <split></split>
      <assess :desc="desc" :onlyContent="onlyContent" :selectType="selectType" :ratings="ratingsData" @toggleContent="isShowOnlyContent" @toggleType="changeType"></assess>
      <div class="ratings-wrapper">
        <ul>
          <li class="rating-list border-1px" v-for="rating in ratingsData" v-show="(showContent === rating.rateType || showContent === 2)&&(!onlyContent || rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28" alt="">
            </div>
            <div class="content">
              <div class="user"><span class="username">{{rating.username}}</span><span class="time">{{rating.rateTime | formDate}}</span></div>
              <div class="deliveryRate">
                <span class="starCom"><star :size="24" :score="rating.score"></star></span>
                <span class="delivery" v-show="!!rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <div class="text">{{rating.text}}</div>
              <div class="recommend" v-show="rating.recommend.length !== 0">
                <span class="icon-thumb_up"></span><span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from './../star/star.vue'
import split from './../goods/split/split.vue'
import assess from './../assess/assess.vue'
import {formDate} from './../../../common/js/formDate.js'
import BScroll from 'better-scroll'
const ERR_OK = 0
// const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2
export default {
  data () {
    return {
      desc: {
        all: '全部',
        positive: '满意',
        negative: '不满意'
      },
      onlyContent: true,
      selectType: ALL,
      ratingsData: [],
      showContent: ALL
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    star,
    split,
    assess
  },
  filters: {
    formDate
  },
  methods: {
    isShowOnlyContent() {
      this.onlyContent = !this.onlyContent
    },
    changeType(type) {
      this.selectType = type
      this.showContent = type
    }
  },
  created() {
    this.$http.get('/api/ratings').then(function(result){
      let res = result.data
      if (res.errno === ERR_OK){
        this.ratingsData = res.data
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import './../../../common/stylus/mixin.styl'
.ratingsComponent
  position: absolute
  top: 172px
  bottom: 0
  left: 0
  overflow: hidden
  width: 100%
  .viewContent
    display: flex
    padding: 18px 0
    .viewContent-left
      flex: 0 0 135px
      padding: 6px 0
      border-right: 1px solid rgb(147, 153, 159)
      text-align: center
      @media only screen and (max-width: 320px)
        flex: 0 0 120px
        width: 120px
      .score
        font-size: 24px
        color: rgb(255, 153, 0)
        line-height: 28px
      .title
        padding: 6px 0 8px 0
        font-size: 12px
        color: rgb(7, 17, 27)
        line-height: 12px
      .rank
        font-size: 10px
        color: rgb(147, 153, 159)
        line-height: 10px
    .viewContent-right
      flex: 1
      padding: 6px 24px
      @media only screen and (max-width: 320px)
        padding: 6px 0 6px 6px
      .score-wrapper
        margin-bottom: 8px
        font-size: 0
        .title
          display: inline-block
          vertical-align: top
          font-size: 12px
          line-height: 18px
          color: rgb(7, 17, 27)
        .starComponent
          display: inline-block
          margin: 0 12px
        .score
          display: inline-block
          vertical-align: top
          font-size: 12px
          color: rgb(255, 153, 0)
          line-height: 18px
      .deliveryTime
        .title
          display: inline-block
          font-size: 12px
          line-height: 18px
          color: rgb(7, 17, 27)
        .time
          display: inline-block
          margin: 0 12px
          font-size: 12px
          line-height: 18px
          color: rgb(147, 153, 159)
  .ratings-wrapper
    .rating-list
      display: flex
      padding: 18px
      border-1px(rgba(147, 153, 159, 0.1))
      .avatar
        flex: 0 0 28px
        vertical-align: top
        margin-right: 12px
        img
          border-radius: 50%
      .content
        flex: 1
        .user
          font-size: 10px
          line-height: 12px
          overflow: hidden
          color: rgb(7, 17, 27)
          .username
            float: left
          .time
            float: right
            color: rgb(147, 153, 159) 
        .deliveryRate
          margin: 4px 0 6px 0
          font-size: 0
          .starCom
            display: inline-block
            margin-right: 6px
          .delivery
            display: inline-block
            font-size: 10px
            line-height: 12px
            color: rgb(147, 153, 159)
        .text
          font-size: 12px
          line-height: 18px
          color: rgb(7, 17, 27)
          margin-bottom: 8px
        .recommend
          font-size: 0
          .icon-thumb_up
            display: inline-block
            position: relative
            top: 1px
            margin-right: 8px
            font-size: 12px
            color: rgb(0, 160, 220)
            line-height: 16px
          .item
            display: inline-block
            padding: 0 6px
            margin:0 8px 8px 0
            font-size: 9px
            line-height: 16px
            color: rgb(147, 153, 159)
            border: 1px solid rgba(7, 17, 27, 0.1)
            border-radius: 2px
</style>