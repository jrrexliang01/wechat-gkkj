<template>
  <div class="container ub-box">
    <scroll-view scroll-y style="height:calc(100vh);" scroll-top="0">
      <dl class="z-width-100-percent ub-box ub-col">
        <dd v-for="(val, idx) in billList" :key="idx" class="order z-width-100-percent ub-box z-box-sizing-border">
          <div class="ub-flex-1 z-padding-left-10-px ub-box ub-col">
            <span class="z-font-size-15 z-color-333 z-margin-bottom-3-px z-font-weight-bold">收益明细</span>
            <span class="z-font-size-12 z-color-888 z-margin-bottom-3-px">{{val.createTime}}</span>
            <span class="z-font-size-12 z-color-888 z-margin-bottom-3-px">收入</span>
            <span class="z-font-size-12 z-color-888 z-margin-bottom-3-px">{{val.income}}</span>
            <span class="z-font-size-12 z-color-888 z-margin-bottom-3-px">支出</span>
            <span class="z-font-size-12 z-color-888 z-margin-bottom-3-px">{{val.pay}}</span>
            <span class="z-font-size-12 z-color-888 z-margin-bottom-3-px">实际收入</span>
            <span class="z-font-size-12 z-color-888 z-margin-bottom-3-px">{{val.realIn}}</span>
          </div>
        </dd>
      </dl>
    </scroll-view>
  </div>
</template>

<script>
import { getDocBill } from '../../../config'
export default {
  data () {
    return {
      modalLoading: true,
      modal: false,
      billList: {},
      patId: 0,
      orderStatus: 0
    }
  },
  methods: {
  },
  async onLoad (options) {
    this.docId = parseInt(options.docId)
    const { docBill } = await getDocBill(this.docId)
    wx.setStorageSync('docBill', docBill)
  },
  mounted () {
    this.billList = wx.getStorageSync('docBill')
    for (const v of this.billList) {
      v.realIn = v.income - v.pay
    }
    console.log(this.billList)
  }
}
</script>

<style lang="stylus" scoped>
  .container{width:100%;height:100vh;background:#fff}
  .order{border-bottom: 1px solid #f5f5f5;padding: 10px 8px;}
  .order img{width: 55px; height: 55px; border-radius: 3px}
</style>
