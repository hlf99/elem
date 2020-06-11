<template>
    <div class="header">
      <div class="content-wrapper">
        <div class="avatar">
          <img width="64" height="64" :src="seller.avatar" alt="">
        </div>
        <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="description">
            {{seller.description}}<span>/</span>{{seller.deliveryTime}}分钟送达
          </div>
          <div class="support" v-if="seller.supports">
            <span class="icon" :class="classMap[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
        <div v-if="seller.supports" class="support-count">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
      <div class="bulletin-wrapper">
        <span class="bulletin-title"></span>
        <span class="bulletin-text">{{seller.bulletin}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
      <div class="background">
        <img width="100%" height="100%" :src="seller.avatar" alt="">
      </div>
    </div>
</template>

<script>
  // 输出组件（导出组件）
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    created(){
      this.classMap = ['decrease','discount','special','invoice','guarantee']
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixin.styl";
  .header
    color: rgb(255,255,255)
    background-color: rgba(7,17,27,0.5)
    position: relative
    overflow: hidden
    .content-wrapper
      padding: 24px 12px 18px 24px
      position: relative
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 6px
      .content
        display: inline-block
        margin-left: 16px
        .title
          margin: 2px 0 8px
          display: flex
          align-items: center
          .brand
            // display: inline-block
            // vertical-align: top
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            font-size: 16px
            font-weight: bold
            line-height: 18px
            margin-left: 12px
        .description
          font-size: 12px
          font-weight: 200
          margin-bottom: 10px
          span
            padding: 0 4px
        .support
          display: flex
          align-items: center
          .icon
            width: 12px
            height: 12px
            background-color: #42B983
            background-repeat: no-repeat
            background-size: 12px 12px
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.special
              bg-image('special_1')
            &.invoice
              bg-image('invoice_1')
          .text
            font-size: 10px
            font-weight: 200
            margin-left: 4px
      .support-count
        position: absolute
        right: 10px
        bottom: 16px
        height: 24px
        padding: 0 8px
        line-height: 24px
        border-radius: 12px
        font-size: 10px
        text-align: center
        // font-weight: 200
        background-color: rgba(0,0,0,0.2)
    .bulletin-wrapper
      // width: 100%
      height: 28px
      // line-height: 28px
      background-color: rgba(7,17,27,0.2)
      display: flex
      align-items: center
      // justify-content: space-between
      padding: 0 12px
      .bulletin-title
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size: 22px 12px
      .bulletin-text
        width: 90%
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        font-size: 10px
        font-weight: 200
        color: rgb(255,255,255)
        padding: 0 4px
    .background
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: -1
        filter: blur(10px)
</style>
