<template>
  <div class="container ub-box ub-col">
    <dd style="padding:8px 10px"
        class="z-margin-top-8-px z-width-100-percent ub-box ub-ver ub-col z-box-sizing-border z-bg-color-fff">
      <ul class="z-width-100-percent ub-box ub-col ub-ver">
        <li class="z-width-100-percent ub-box ub-between ub-ver z-margin-bottom-20-px">
          <span class="z-font-size-18 z-color-000 ub-flex-1 z-textAlign-left">调理建议</span>
        </li>
      </ul>
      <ul class="z-width-100-percent ub-box ub-col ub-ver">
        <li class="z-width-100-percent ub-box ub-between ub-ver z-margin-bottom-20-px">
            <span class="z-font-size-18 z-color-000 ub-flex-1 z-textAlign-left">
              <textarea placeholder="调理建议(非必填)" v-model="healthProposal" auto-focus right/>
            </span>
        </li>
      </ul>
    </dd>
    <dd style="padding:8px 10px"
        class="z-margin-top-8-px z-width-100-percent ub-box ub-ver ub-col z-box-sizing-border z-bg-color-fff">
      <ul class="z-width-100-percent ub-box ub-col ub-ver">
        <li class="z-width-100-percent ub-box ub-between ub-ver z-margin-bottom-20-px">
          <span class="z-font-size-18 z-color-000 ub-flex-1 z-textAlign-left">项目建议</span>
        </li>
      </ul>
      <ul class="z-width-100-percent ub-box ub-col ub-ver">
        <li class="z-width-100-percent ub-box ub-between ub-ver z-margin-bottom-20-px">
            <span class="z-font-size-18 z-color-000 ub-flex-1 z-textAlign-left">
              <textarea placeholder="项目建议(非必填)" v-model="projectProposal" auto-focus right/>
            </span>
        </li>
      </ul>
    </dd>
    <dd class="z-font-size-18 z-color-333 z-padding-h-10-px z-margin-top-30-px">
      <button class="loginBtn" lang="zh_CN" @click="addReport()">保 存</button>
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
    changValue (val, event) {
      this[val] = event.target.detail.value
    },
    async addReport () {
      this.patRepInfo = wx.getStorageSync('reportInfoAdd')
      this.patRepInfo.healthProposal = this.healthProposal
      this.patRepInfo.projectProposal = this.projectProposal
      console.log(this.patRepInfo)
      const {status} = await reportAdd(JSON.stringify(this.patRepInfo))
      if (status.status === 1) {
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
                  wx.removeStorage('reportInfoAdd')
                  wx.navigateTo({
                    url: '/pages/doc/home/main'
                  })
                }
              })
            }
          }
        })
      }
    }
  },
  mounted () {
    if (wx.getStorageSync('reportInfo') !== null) {
      this.healthProposal = this.patRepInfo.healthProposal
      this.projectProposal = this.patRepInfo.projectProposal
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container {
    width: 100%;
    height: 100vh;
    background: #e8e8e8
  }

  .label {
    border-radius: 3px;
    background: #fff;
    padding: 3px 5px;
    margin: 0 5px 5px 0
  }

  .loginBtn {
    font-size: 18px;
    color: #fff;
    padding: 0px 20px;
    margin-left: 10px;
    margin-right: 10px;
    background: #357cfb
  }
</style>
