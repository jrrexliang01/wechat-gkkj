<template>
  <div class="container ub-box">
    <scroll-view scroll-y style="height:calc(100vh);" scroll-top="0">
      <dl class="z-width-100-percent ub-box ub-col">
        <dd @click.stop="$openWin('/pages/patinfo/main?ordId=' + val.id)" v-for="(val, idx) in reportList" :key="idx" class="order z-width-100-percent ub-box z-box-sizing-border">
          <div class="ub-flex-1 z-padding-left-10-px ub-box ub-col">
            <span class="z-font-size-15 z-color-333 z-margin-bottom-3-px z-font-weight-bold">{{val.doc.docName}}问诊报告</span>
            <span class="z-font-size-12 z-color-888 z-margin-bottom-3-px">报告时间{{val.reportDate}}</span>
          </div>
        </dd>
        <view class="i-divider-mart">
          <i-divider content="加载已经完成,没有其他数据" lineColor="#2d8cf0"></i-divider>
        </view>
      </dl>
    </scroll-view>
  </div>
</template>

<script>
import { getPatReportList } from '../../config'
export default {
  data () {
    return {
      modalLoading: true,
      modal: false,
      reportList: {},
      patId: 0,
      orderStatus: 0
    }
  },
  methods: {
  },
  async onLoad (options) {
    this.patId = parseInt(options.patId)
    const { reportList } = await getPatReportList(this.patId)
    wx.setStorageSync('reportList', reportList)
  },
  mounted () {
    this.reportList = wx.getStorageSync('reportList')
  }
}
</script>

<style lang="stylus" scoped>
  .container{width:100%;height:100vh;background:#fff}
  .order{border-bottom: 1px solid #f5f5f5;padding: 10px 8px;}
  .order img{width: 55px; height: 55px; border-radius: 3px}
</style>
