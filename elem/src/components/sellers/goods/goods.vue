<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
      	<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index)">
          <span class="text">
            <span class="icon" v-if="item.type > 0" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
      	<li v-for="item in goods" class="food-list food-list-hook">
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
                <i class="icon-remove_circle_outline" v-if=""></i>
                <span class="num">6</span>
                <i class="icon-add_circle"></i>
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
        goods: [],
        heightList: [],
        scrollY: 0
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.heightList.length; i++) {
          let height1 = this.heightList[i];
          let height2 = this.heightList[i+1];
          if (!height2 || (this.scrollY>=height1 && this.scrollY<height2)) {
            return i;
          }
        }
        return 0;
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
            this._calculateHeight();
          })
        }
      })
    },
    methods:{
      selectMenu(index) {
        console.log(index);
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let dom = foodList[index];
        this.foodsScroll.scrollToElement(dom,300)
      },

      _initScroll() {
        this.menuScroll = new MScroll(this.$refs.menuWrapper,{
          click: true
        })

        this.foodsScroll = new MScroll(this.$refs.foodsWrapper,{
          // 实时监听滚动的位置
          probeType: 3
        })

        this.foodsScroll.on('scroll', (pos)=>{
          this.scrollY = Math.abs(Math.round(pos.y));
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        console.log(foodList);
        let height = 0;
        this.heightList.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.heightList.push(height);
        }
        console.log(this.heightList);
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
        &.current
          position: relative
          margin-top: -1px
          // z-index: 10
          font-weight: 700
          background-color: #fff
          color: rgb(7,17,27)
          .text
            border-none()
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
          position: relative
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
            width: 200px
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
          .operate
            position: absolute
            right: 18px
            bottom: 14px
            width: 70px
            height: 20px
            display: flex
            justify-content: space-between
            align-items: center
            .num
              font-size: 10px
              color: rgb(147,153,159)
            .icon-remove_circle_outline
              font-size: 24px
              color: rgb(0,160,220)
            .icon-add_circle
              font-size: 24px
              color: rgb(0,160,220)
</style>
