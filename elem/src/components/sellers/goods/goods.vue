<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
      	<li v-for="item in goods" class="menu-item">
          <span class="text">
            <span class="icon" v-if="item.type > 0" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
      	<li v-for="item in goods" class="food-list">
          <h1 class="title">{{item.name}}</h1>
          <ul>
          	<li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p v-if="food.description!=''" class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice!=''">￥{{food.oldPrice}}</span>
                </div>
              </div>
              <div class="operate">
                <span class=""></span>
                <span class="num"></span>
                <span class="add"></span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import MScroll from 'better-scroll'

  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: []
      }
    },
    created() {
      this.classMap = ['decrease','discount','special','invoice','guarantee']

      this.$http.get('/api/goods').then((res)=>{
        res = res.body
        if (res.errno == 0) {
          this.goods = res.data
          console.log(this.goods)
          this.$nextTick(()=>{
            this._initScroll();
          })
        }
      })
    },
    methods:{
      _initScroll() {
        this.menuScroll = new MScroll(this.$refs.menuWrapper,{})

        this.foodsScroll = new MScroll(this.$refs.foodsWrapper,{})
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixin.styl";
  .goods
    display: flex
    width: 100%
    position: absolute
    top: 177px
    bottom: 46px
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background-color: #f3f5f7
      .menu-item
        display: table
        // text-align: center
        width: 56px
        height: 54px
        font-size: 12px
        line-height: 14px
        // font-size: 12px
        padding: 0 12px
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7,17,27,0.1))
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            background-color: skyblue
            background-repeat: no-repeat
            background-size: 12px 12px
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.special
              bg-image('special_3')
            &.invoice
              bg-image('invoice_3')
    .foods-wrapper
      flex: 1
      .food-list
        .title
          height: 26px
          line-height: 26px
          font-size: 12px
          color: rgb(147,153,159)
          padding: 0 14px
          background-color #F3F5F7
          border-left: 2px solid #d9dde1
        .food-item
          display: flex
          margin: 18px
          padding-bottom: 18px
          border-1px(rgba(7,17,27,0.1))
          &:last-child
            border-none()
          .icon
            width: 60px
            height: 60px
            margin-right: 10px
            img
              width: 100%
              height: 100%
          .content
            // display: flex
            // flex-direction: column
            flex: 1
            .name
              margin: 2px 0 8px
              color: rgb(7,17,27)
              font-size: 14px
              height: 14px
            .desc
              margin-bottom: 8px
              font-size: 10px
              height: 10px
              line-height: 10px
              color: rgb(147,153,159)
              white-space: nowrap
              overflow: hidden
              text-overflow: ellipsis
            .extra
              font-size: 10px
              height: 10px
              line-height: 10px
              color: rgb(147,153,159)
              margin-bottom: 8px
              .count
                margin-right: 12px
            .price
              font-weight: 700
              line-height: 24px
              height: 24px
              .now
                font-size: 14px
                color: rgb(240,20,20)
                margin-right: 8px
              .old
                text-decoration: line-through
                font-size: 10px
                color: rgb(147,153,159)
</style>
