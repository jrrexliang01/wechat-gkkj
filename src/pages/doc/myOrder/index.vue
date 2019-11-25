<template>
  <div class="container ub-box">
    <scroll-view scroll-y style="height:calc(100vh);" scroll-top="0">
      <dl class="z-width-100-percent ub-box ub-col">
        <dd @click.stop="$openWin('/pages/doc/orderInfo/main?ordId=' + val.id)" v-for="(val, idx) in orderList" :key="idx" class="order z-width-100-percent ub-box z-box-sizing-border">
          <img class="z-img-cover" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573708198208&di=caad1e40da5a13dd206896e3494cffed&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F17%2F12%2F27%2Fd4e58d34321d4d7be62b4a6d7682c211.jpg" />
          <div class="ub-flex-1 z-padding-left-10-px ub-box ub-col">
            <span class="z-font-size-15 z-color-333 z-margin-bottom-3-px z-font-weight-bold">{{val.course.courseTitle}}</span>
            <span class="z-font-size-12 z-color-888 z-margin-bottom-3-px">主讲医生：{{val.doc.docName}}</span>
            <span class="z-font-size-12 z-color-888 z-margin-bottom-3-px">总价：{{val.total}}</span>
          </div>
          <span class="z-font-size-14" style="color:#06c1ae">{{val.statusStr}}</span>
        </dd>
      </dl>
    </scroll-view>
  </div>
</template>

<script>
import { getOrderCourseList, getOrderCourseStatusList } from '../../../config'
export default {
  data () {
    return {
      modalLoading: true,
      modal: false,
      orderList: {},
      docId: 0,
      orderStatus: 0
    }
  },
  methods: {
  },
  async onLoad (options) {
    this.docId = parseInt(options.docId)
    this.orderStatus = parseInt(options.orderStatus)
    if (this.orderStatus === 2) {
      const { orderCourseList } = await getOrderCourseList(this.docId)
      wx.setStorageSync('orderCourseList', orderCourseList)
    } else {
      const { orderCourseList } = await getOrderCourseStatusList(this.docId, this.orderStatus)
      wx.setStorageSync('orderCourseList', orderCourseList)
    }
    this.orderList = wx.getStorageSync('orderCourseList')
    for (const v of this.orderList) {
      if (v.status === 1) {
        v.statusStr = '已付款'
      }
      if (v.status === 0) {
        v.statusStr = '未付款'
      }
    }
  },
  mounted () {
    this.orderList = wx.getStorageSync('orderList')
  }
}
</script>

<style lang="stylus" scoped>
  .container{width:100%;height:100vh;background:#fff}
  .order{border-bottom: 1px solid #f5f5f5;padding: 10px 8px;}
  .order img{width: 55px; height: 55px; border-radius: 3px}
</style>
