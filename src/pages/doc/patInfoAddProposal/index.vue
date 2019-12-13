<template>
  <div class="container ub-box ub-col">
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff">
      <p class="z-font-size-18 z-color-000" style="padding: 20px 0 20px 20px;">就诊报告</p>
    </dd>
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px">
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333"><i-input placeholder="调理建议" @change="changValue('healthProposal', $event)" right title="调理建议"/></span>
      </p>
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333"><i-input placeholder="项目建议" @change="changValue('projectProposal', $event)" right title="项目建议"/></span>
      </p>
    </dd>
    <dd class="z-font-size-18 z-color-333 z-padding-h-10-px z-margin-top-30-px">
      <button class="loginBtn" lang="zh_CN" @click="addReport()">保  存</button>
    </dd>
  </div>
</template>

<script>
import { reportAdd } from '../../../config'
export default {
  data () {
    return {
      healthProposal: '',
      projectProposal: '',
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
        healthProposal: '',
        projectProposal: ''
      },
      orderInfo: {},
      formData: {}
    }
  },
  methods: {
    async addReport () {
      this.patRepInfo = wx.getStorageSync('reportInfoAdd')
      this.patRepInfo.healthProposal = this.healthProposal
      this.patRepInfo.projectProposal = this.projectProposal
      let formData = JSON.stringify(this.patRepInfo)
      const { status } = await reportAdd(formData)
      this.status = status.status
      if (this.status === 1) {
        this.formData.docId = this.patRepInfo.doc.id
        this.formData.patientId = this.patRepInfo.patient.id
        let formData = JSON.stringify(this.formData)
        wx.request({
          url: 'https://gkkj.jrrexliang.com/api/wx/order/interrogation/orderInfo',
          data: formData,
          method: 'POST',
          header: {
            'content-type': 'application/json', // 默认值
            'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
          },
          success (res) {
            let orderInfo = res.data.data
            if (orderInfo !== null) {
              orderInfo.isReport = true
              orderInfo.reportTime = new Date()
              orderInfo.reportTime = status.id
              let formData = JSON.stringify(orderInfo)
              wx.request({
                url: 'https://gkkj.jrrexliang.com/api/wx/order/interrogation/save',
                data: formData,
                method: 'POST',
                header: {
                  'content-type': 'application/json', // 默认值
                  'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
                },
                success (res) {
                  if (res.data.status === 1) {
                    wx.removeStorage('reportInfoAdd')
                    this.$store.commit('showToast', {
                      title: '保存成功',
                      icon: 'none',
                      duration: 1500
                    })
                  }
                }
              })
            }
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.bg
  background-color $background
  height 100vh
.right
  box-sizing border-box
  height 100px
  padding 10px
  display flex
  flex-direction column
  justify-content space-around
  .username
    font-weight 600
    font-size 18px
    color $base
  .account
    font-size 14px
    color $secondary
.btn
  color white
  background-color $primary
  border-radius 20px
  height 40px
  width 150px
  line-height 40px
  font-size 16px
.delete
  background-color $danger
.container
  background-color $background
  height 100vh
  overflow scroll
.card
  border-top 1px solid $border-light
  border-bottom 1px solid $border-light
  background-color white
  margin-bottom -1px
  .item
    display flex
    width 100vw
    padding 10px 20px
    border-bottom 1px solid $border-base
    font-size 16px
    .key
      width 60vw
      font-weight 500
      color $base
      box-sizing border-box
    .value
      width 40vw
      font-weight 400
      color $regular
      box-sizing border-box
.avatar
  padding 10px
.revise
  padding-top 20px
  display flex
  flex-direction column
  justify-content space-around
  height 100px
</style>
