<template>
  <div class="container ub-box">
    <scroll-view scroll-y style="height:calc(100vh);" scroll-top="0">
      <dl class="z-width-100-percent ub-box ub-col">
        <dd @click.stop="$openWin('/pages/orderInfo/main?ordId=' + val.id)" v-for="(val, idx) in orderList" :key="idx" class="order z-width-100-percent ub-box z-box-sizing-border">
          <img class="z-img-cover" :src="val.doc.icon" />
          <div class="ub-flex-1 z-padding-left-10-px ub-box ub-col">
            <span class="z-font-size-15 z-color-333 z-margin-bottom-3-px z-font-weight-bold">在线问诊</span>
            <span class="z-font-size-12 z-color-888 z-margin-bottom-3-px">问诊医生：{{val.doc.docName}}</span>
            <span class="z-font-size-12 z-color-888 z-margin-bottom-3-px">问诊时间：{{val.createTime}}</span>
          </div>
          <span class="z-font-size-14" style="color:#06c1ae">评估报告已上传</span>
        </dd>
      </dl>
    </scroll-view>
  </div>
</template>

<script>
import { getOrderList, getOrderStatusList } from '../../config'
export default {
  data () {
    return {
      modalLoading: true,
      modal: false,
      orderList: {},
      patId: 0,
      orderStatus: 0
    }
  },
  methods: {
  },
  async onLoad (options) {
    this.patId = parseInt(options.patId)
    this.orderStatus = parseInt(options.orderStatus)
    if (this.orderStatus === 2) {
      const { orderList } = await getOrderList(this.patId)
      wx.setStorageSync('orderList', orderList)
    } else {
      const { orderList } = await getOrderStatusList(this.patId, this.orderStatus)
      wx.setStorageSync('orderList', orderList)
    }
    this.orderList = wx.getStorageSync('orderList')
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
