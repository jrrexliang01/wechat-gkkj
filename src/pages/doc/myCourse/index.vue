<template>
  <div class="container ub-box">
    <scroll-view scroll-y style="height:calc(100vh);" scroll-top="0">
      <dl class="z-width-100-percent ub-box ub-col">
        <dd @click.stop="$openWin('/pages/doc/courseFInfo/main?courseId=' + val.course.id)" v-for="(val, idx) in orderList" :key="idx" class="order z-width-100-percent ub-box z-box-sizing-border">
          <img class="z-img-cover" :src="imgSrc"/>
          <div class="ub-flex-1 z-padding-left-10-px ub-box ub-col">
            <span class="z-font-size-15 z-color-333 z-margin-bottom-3-px z-font-weight-bold">{{val.course.courseTitle}}</span>
<!--            <span class="z-font-size-12 z-color-888 z-margin-bottom-3-px">数量：1</span>-->
<!--            <span class="z-font-size-12 z-color-888 z-margin-bottom-3-px">总价：{{val.total}}</span>-->
          </div>
<!--          <span class="z-font-size-14" style="color:#06c1ae">{{payStatus[val.status]}}</span>-->
        </dd>
      </dl>
    </scroll-view>
  </div>
</template>

<script>
  import {getOrderCourseStatusList} from '../../../config'

  export default {
    data () {
      return {
        imgSrc: '',
        orderList: [],
        payStatus: {
          1: '已付款',
          0: '未付款'
        }
      }
    },
    async onLoad (options) {
      const {orderCourseList} = await getOrderCourseStatusList(parseInt(options.docId), 1)
      this.orderList = orderCourseList
    },
    mounted () {
      let banner = wx.getStorageSync('enclosureList')
      for (let i = 0; i < banner.data.length; i++) {
        if (banner.data[i].enclosureName === 'course_order') {
          this.imgSrc = banner.data[i].enclosurePath
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .container{width:100%;height:100vh;background:#fff}
  .order{border-bottom: 1px solid #f5f5f5;padding: 10px 8px;}
  .order img{width: 55px; height: 55px; border-radius: 3px}
</style>
