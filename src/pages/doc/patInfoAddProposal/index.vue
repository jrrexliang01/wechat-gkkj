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
import {msgAdd, reportAdd} from '../../../config'
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
      const {status} = await reportAdd(JSON.stringify(this.patRepInfo))
      if (status.status === 1) {
        this.formData.docId = this.patRepInfo.doc.id
        this.formData.patientId = this.patRepInfo.patient.id
        let msgInfo = {
          title: '',
          userId: '',
          userType: 0,
          msg: ''
        }
        msgInfo.title = '病例消息'
        msgInfo.userId = this.patRepInfo.patient.id
        msgInfo.userType = 2
        msgInfo.msg = '您的专属医生已为您提交病例报告,请查看！'
        await msgAdd(JSON.stringify(msgInfo))
        wx.removeStorage('reportInfoAdd')
        wx.navigateTo({
          url: '/pages/doc/myPatList/main'
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
