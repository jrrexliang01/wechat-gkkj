<template>
  <div class="counter-warp">
    <div class="revise" style="margin-top: 10px;">
      <img src="http://39.100.255.143:8013/img/wx/puru.png" @click="toAddIn" size="large" shape="square"  style="height: 200px;width: 100%;"/>
    </div>
    <div class="revise" style="margin-top: 20px;">
      <img src="http://39.100.255.143:8013/img/wx/feipuru.png" @click="toAddOut" size="large" shape="square"  style="height: 200px;width: 100%;"/>
    </div>
    <dd class="z-font-size-18 z-color-333 z-padding-h-10-px z-margin-top-30-px">
      <button class="loginBtn" lang="zh_CN" @click="checkReport()">查看报告</button>
    </dd>
  </div>
</template>

<script>
import { getReportInfo } from '../../config'
export default {
  data () {
    return {
      own: false,
      id: '',
      patRepInfo: {
        isPain: '',
        isMilk: '',
        chunks: '',
        auteMastitis: '',
        spill: '',
        question: '',
        hyperplasia: '',
        fibroma: '',
        mastodynia: '',
        breastCyst: '',
        patient: {
          id: 0
        },
        doc: {
          id: 0
        },
        patientHistory: {
          id: 0
        },
        healthProposal: '',
        projectProposal: ''
      }
    }
  },
  async onLoad (options) {
    this.own = options.own
    this.id = options.caseId
    const { reportInfo } = await getReportInfo(this.id)
    wx.setStorageSync('reportInfo', reportInfo)
  },
  methods: {
    toAddIn () {
      wx.setStorageSync('isIn', '1')
      wx.navigateTo({
        url: '/pages/lactatingCase/main?own=' + this.own + '&caseId=' + this.id
      })
    },
    toAddOut () {
      wx.setStorageSync('isIn', '2')
      wx.navigateTo({
        url: '/pages/nonLactatingCase/main?own=' + this.own + '&caseId=' + this.id
      })
    },
    checkReport () {
      this.patRepInfo = wx.getStorageSync('reportInfo')
      if (this.patRepInfo === null) {
        this.$store.commit('showToast', {
          title: '暂无诊断报告',
          icon: 'none',
          duration: 1500
        })
        return
      }
      wx.navigateTo({
        url: '/pages/reportInfo/main'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
