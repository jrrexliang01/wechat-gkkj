<template>
  <div class="container ub-box ub-col ub-ver">
    <scroll-view scroll-y style="height:calc(100vh);" scroll-top="0">
      <dd style="padding:8px 10px"
          class="z-margin-top-8-px z-width-100-percent ub-box ub-ver ub-col z-box-sizing-border z-bg-color-fff">
        <span class="z-font-size-15 z-color-333 z-margin-bottom-8-px z-font-weight-bold">基本信息</span>
        <ul class="z-width-100-percent ub-box ub-col ub-ver">
          <li class="z-width-100-percent ub-box ub-between ub-ver z-margin-bottom-20-px">
            <span class="z-font-size-18 z-color-000 ub-flex-1 z-textAlign-left">姓名</span>
            <span class="z-font-size-16 z-color-888 ub-flex-2 z-textAlign-right">
              <input v-model="patientName" placeholder="请输入姓名">
            </span>
          </li>
        </ul>
        <ul class="z-width-100-percent ub-box ub-col ub-ver">
          <li class="z-width-100-percent ub-box ub-between ub-ver z-margin-bottom-20-px">
            <span class="z-font-size-18 z-color-000 ub-flex-1 z-textAlign-left">年龄</span>
            <span class="z-font-size-16 z-color-888 ub-flex-2 z-textAlign-right">
              <input v-model="age" placeholder="请输入年龄" type="number">
            </span>
          </li>
        </ul>
        <ul class="z-width-100-percent ub-box ub-col ub-ver">
          <li class="z-width-100-percent ub-box ub-between ub-ver z-margin-bottom-20-px">
            <span class="z-font-size-18 z-color-000 ub-flex-1 z-textAlign-left">电话</span>
            <span class="z-font-size-16 z-color-888 ub-flex-2 z-textAlign-right">
              <input v-model="phone" placeholder="请输入电话" type="number">
            </span>
          </li>
        </ul>
      </dd>
      <dd class="z-margin-top-8-px z-width-100-percent z-bg-color-fff">
        <span class="z-font-size-15 z-color-333 z-margin-bottom-8-px z-font-weight-bold ub-box ub-ver ub-col z-padding-top-10-px">疾病</span>
        <i-checkbox-group :current="currentDisease" v-for="(disease,index ) in diseaseList" :key="disease.id" @change="handleDiseaseChange">
          <i-checkbox position="right" :value="disease.name">
          </i-checkbox>
        </i-checkbox-group>
      </dd>
      <dd class="z-margin-top-8-px z-width-100-percent z-bg-color-fff">
        <span class="z-font-size-15 z-color-333 z-margin-bottom-8-px z-font-weight-bold ub-box ub-ver ub-col z-padding-top-10-px">治疗或服务经历</span>
        <i-checkbox-group :current="currentTreatment" v-for="(treatment,index ) in treatmentList" :key="treatment.id" @change="handleTreatmentChange">
          <i-checkbox position="right" :value="treatment.name">
          </i-checkbox>
        </i-checkbox-group>
      </dd>
      <div style="padding:8px 10px" class="z-margin-top-8-px z-width-100-percent ub-box ub-ver ub-col z-box-sizing-border z-bg-color-fff">
        <span class="z-font-size-15 z-color-333 z-margin-bottom-8-px z-font-weight-bold">目前状况</span>
        <dd class="z-margin-top-8-px z-width-100-percent z-bg-color-fff">
          <span class="z-font-size-15 z-color-333 z-margin-bottom-8-px z-font-weight-bold ub-box ub-ver ub-col z-padding-top-10-px">外观</span>
          <i-radio-group :current="currentAppearance" v-for="(appearance,index ) in appearanceList" :key="appearance.id" @change="handleAppearanceChange">
            <i-radio position="right" :value="appearance.name">
            </i-radio>
          </i-radio-group>
        </dd>
        <dd class="z-margin-top-8-px z-width-100-percent z-bg-color-fff">
          <span class="z-font-size-15 z-color-333 z-margin-bottom-8-px z-font-weight-bold ub-box ub-ver ub-col z-padding-top-10-px">疼痛</span>
          <i-radio-group :current="currentPain" v-for="(pain,index ) in painList" :key="pain.id" @change="handlePainChange">
            <i-radio position="right" :value="pain.name">
            </i-radio>
          </i-radio-group>
        </dd>
        <dd class="z-margin-top-8-px z-width-100-percent z-bg-color-fff">
          <span class="z-font-size-15 z-color-333 z-margin-bottom-8-px z-font-weight-bold ub-box ub-ver ub-col z-padding-top-10-px">触感</span>
          <i-radio-group :current="currentTouch" v-for="(touch,index ) in touchList" :key="touch.id" @change="handleTouchChange">
            <i-radio position="right" :value="touch.name">
            </i-radio>
          </i-radio-group>
        </dd>
        <dd class="z-margin-top-8-px z-width-100-percent z-bg-color-fff">
          <span class="z-font-size-15 z-color-333 z-margin-bottom-8-px z-font-weight-bold ub-box ub-ver ub-col z-padding-top-10-px">分泌物</span>
          <i-radio-group :current="currentSecretion" v-for="(secretion,index ) in secretionList" :key="secretion.id" @change="handleSecretionChange">
            <i-radio position="right" :value="secretion.name">
            </i-radio>
          </i-radio-group>
        </dd>
      </div>
      <dd class="z-font-size-18 z-color-333 z-padding-h-10-px z-margin-top-30-px z-margin-bottom-20-px"
          v-if="own !== 'false'">
        <button class="loginBtn" lang="zh_CN" @click="addOut">保存</button>
      </dd>
    </scroll-view>
  </div>
</template>

<script>
import {addCaseDetail, getCaseDetail} from '../../config'
export default {
  data () {
    return {
      caseId: '',
      id: '',
      patId: '',
      content: '',
      age: '',
      phone: '',
      patientName: '',
      own: false,
      diseaseList: [{
        id: 1,
        name: '妇科疾病'
      }, {
        id: 2,
        name: '内分泌疾病'
      }, {
        id: 3,
        name: '心理疾病'
      }],
      treatmentList: [{
        id: 1,
        name: '有乳腺病治疗经历'
      }, {
        id: 2,
        name: '有乳腺病服务经历'
      }],
      appearanceList: [{
        id: 1,
        name: '双乳不对称'
      }, {
        id: 2,
        name: '对称且无明显凸起'
      }],
      painList: [{
        id: 1,
        name: '经期胀痛'
      }, {
        id: 2,
        name: '非经期胀痛'
      }],
      touchList: [{
        id: 1,
        name: '有明显肿块'
      }, {
        id: 2,
        name: '有小型或分散性肿块'
      }, {
        id: 3,
        name: '无明显肿块'
      }],
      secretionList: [{
        id: 1,
        name: '有'
      }, {
        id: 2,
        name: '无'
      }],
      currentDisease: [],
      currentTreatment: [],
      currentAppearance: '',
      currentPain: '',
      currentTouch: '',
      currentSecretion: '',
      form: {
        patientName: '',
        age: '',
        phone: '',
        medicalHistory: [],
        treatment: [],
        appearance: '',
        pain: '',
        touch: '',
        secretion: '',
        isLactation: 0
      },
      formData: {},
      status: 0,
      docInfo: {}
    }
  },
  methods: {
    async addOut () {
      let userInfo = wx.getStorageSync('userInfo')
      this.form.patientName = this.patientName
      this.form.age = this.age
      this.form.phone = this.phone
      this.form.medicalHistory = this.currentDisease.toString()
      this.form.treatment = this.currentTreatment.toString()
      this.form.appearance = this.currentAppearance
      this.form.pain = this.currentPain
      this.form.touch = this.currentTouch
      this.form.secretion = this.currentSecretion
      this.form.patient = {
        id: userInfo.id,
        patientName: this.patientName,
        age: this.age,
        phone: this.phone
      }
      this.form.isLactation = 0
      this.formData = JSON.stringify(this.form)
      console.log(this.formData)
      if (this.form.patientName === '' || this.form.patientName == null) {
        this.$store.commit('showToast', {
          title: '请输入姓名',
          icon: 'none',
          duration: 1500
        })
        return
      }
      if (this.form.age === '' || this.form.age == null) {
        this.$store.commit('showToast', {
          title: '请输入年龄',
          icon: 'none',
          duration: 1500
        })
        return
      }
      if (this.form.phone === '' || this.form.phone == null) {
        this.$store.commit('showToast', {
          title: '请输入手机号',
          icon: 'none',
          duration: 1500
        })
        return
      }

      const {status} = await addCaseDetail(this.formData)
      this.status = status
      if (this.status === 1) {
        this.$store.commit('showToast', {
          title: '保存成功',
          icon: 'none',
          duration: 1500
        })
        if (this.own === 'true') {
          wx.navigateBack()
        } else {
          wx.navigateTo({
            url: '/pages/caseList/main'
          })
        }
      }
    },
    handleDiseaseChange (data) {
      const index = this.currentDisease.indexOf(data.target.value)
      index === -1 ? this.currentDisease.push(data.target.value) : this.currentDisease.splice(index, 1)
    },
    handleTreatmentChange (data) {
      const index = this.currentTreatment.indexOf(data.target.value)
      index === -1 ? this.currentTreatment.push(data.target.value) : this.currentTreatment.splice(index, 1)
    },
    handleAppearanceChange (data) {
      this.currentAppearance = data.target.value
    },
    handlePainChange (data) {
      this.currentPain = data.target.value
    },
    handleTouchChange (data) {
      this.currentTouch = data.target.value
    },
    handleSecretionChange (data) {
      this.currentSecretion = data.target.value
    }
  },
  async mounted () {
    // 调用应用实例的方法获取全局数据
    const {patientDetail} = await getCaseDetail(this.caseId)
    console.log(patientDetail)
    if (patientDetail !== null && patientDetail !== '' && patientDetail !== undefined) {
      this.form = patientDetail
      this.patientName = this.form.patientName
      this.age = this.form.age
      this.phone = this.form.phone
      if (this.form.medicalHistory !== null) {
        this.currentDisease = this.form.medicalHistory.split(',')
      }
      if (this.form.treatment !== null) {
        this.currentTreatment = this.form.treatment.split(',')
      }
      this.currentAppearance = this.form.appearance
      this.currentPain = this.form.pain
      this.currentTouch = this.form.touch
      this.currentSecretion = this.form.secretion
    }
  },
  onLoad (options) {
    this.own = options.own
    this.caseId = options.caseId
  }
}
</script>

<style lang="stylus" scoped>
  .container{width:100%;height:100vh;background:#e8e8e8}
  .indexImg{height: 170px;position: relative;}
  .indexImg-bk{position: absolute;bottom: 0;left: 0;z-index: 1;width: 100%;height: 30%;background: rgba(0,0,0,.3);padding: 5px 0px}
  .buyBtn{background: #f90;padding: 8px 12px;border-radius:3px}
  .label{border-radius:3px;background: #fff;padding: 3px 5px;margin: 0 5px 5px 0}
  .fixCon{position: fixed;left: 0;bottom: 0;z-index: 10;width: 100%;background: #fff;}
  .submitBtn{padding: 15px 35px;background: #5CA2F2;box-sizing: border-box;}
  .input{font-size: 12px;}
  .loginBtn{font-size:18px;color:#fff;padding:0px 20px;margin-left: 10px;margin-right: 10px;background: #5CA2F2}
</style>

