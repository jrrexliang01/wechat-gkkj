<template>
  <div class="bg">
    <div class="card" style="margin-top:20px">
      <view style="margin: 16px">用户信息</view>
      <i-input value="" v-model="patientName" title="姓名" disabled/>
      <i-input value="" v-model="age" title="年龄" disabled/>
      <i-input value="" v-model="phone" title="电话" disabled/>
      <i-panel title="哺乳期">
        <i-cell title="疾病史">
          <i-switch :value="switch1" @change="onChange1" slot="footer"></i-switch>
        </i-cell>
        <i-cell title="过敏史">
          <i-switch :value="switch2" @change="onChange2" slot="footer"></i-switch>
        </i-cell>
        <i-input value="" v-model="postpartumDay" title="产后天数（天）"/>
        <i-cell title="产后修复">
          <i-switch :value="switch3" @change="onChange3" slot="footer"></i-switch>
        </i-cell>
        <i-panel title="目前状态">
          <i-checkbox-group :current="current" v-for="(now,index ) in nowList" :key="now.id" @change="handleChange">
            <i-checkbox position="right" :value="now.name">
            </i-checkbox>
          </i-checkbox-group>
        </i-panel>
      </i-panel>
      <i-panel title="非哺乳期">
        <i-panel title="疾病">
          <i-checkbox-group :current="currentDisease" v-for="(disease,index ) in diseaseList" :key="disease.id" @change="handleDiseaseChange">
            <i-checkbox position="right" :value="disease.name">
            </i-checkbox>
          </i-checkbox-group>
        </i-panel>
        <i-panel title="治疗或服务经历">
          <i-checkbox-group :current="currentTreatment" v-for="(treatment,index ) in treatmentList" :key="treatment.id" @change="handleTreatmentChange">
            <i-checkbox position="right" :value="treatment.name">
            </i-checkbox>
          </i-checkbox-group>
        </i-panel>
        <i-panel title="目前状况">
          <i-panel title="1.外观">
            <i-radio-group :current="currentAppearance" v-for="(appearance,index ) in appearanceList" :key="appearance.id" @change="handleAppearanceChange">
              <i-radio position="right" :value="appearance.name">
              </i-radio>
            </i-radio-group>
          </i-panel>
          <i-panel title="2.疼痛">
            <i-radio-group :current="currentPain" v-for="(pain,index ) in painList" :key="pain.id" @change="handlePainChange">
              <i-radio position="right" :value="pain.name">
              </i-radio>
            </i-radio-group>
          </i-panel>
          <i-panel title="3.触感">
            <i-radio-group :current="currentTouch" v-for="(touch,index ) in touchList" :key="touch.id" @change="handleTouchChange">
              <i-radio position="right" :value="touch.name">
              </i-radio>
            </i-radio-group>
          </i-panel>
          <i-panel title="4.分泌物">
            <i-radio-group :current="currentSecretion" v-for="(secretion,index ) in secretionList" :key="secretion.id" @change="handleSecretionChange">
              <i-radio position="right" :value="secretion.name">
              </i-radio>
            </i-radio-group>
          </i-panel>
        </i-panel>
      </i-panel>
    </div>
    <div class="card" style="margin-top:20px">
      <view style="margin: 16px">就诊报告</view>
      <i-panel title="疼痛">
        <i-radio-group :current="currentPainRep" v-for="(painRep,index ) in painRepList" :key="painRep.id" @change="handlePainChange">
          <i-radio position="right" :value="painRep.name">
          </i-radio>
        </i-radio-group>
      </i-panel>
      <i-panel title="积乳">
        <i-radio-group :current="currentMilkRep" v-for="(milkRep,index ) in milkRepList" :key="milkRep.id" @change="handlePainChange">
          <i-radio position="right" :value="milkRep.name">
          </i-radio>
        </i-radio-group>
      </i-panel>
      <i-panel title="包块">
        <i-radio-group :current="currentChunksRep" v-for="(chunksRep,index ) in chunksRepList" :key="chunksRep.id" @change="handlePainChange">
          <i-radio position="right" :value="chunksRep.name">
          </i-radio>
        </i-radio-group>
      </i-panel>
      <i-panel title="急性乳腺炎">
        <i-radio-group :current="currentAcuteMastitisRep" v-for="(acuteMastitisRep,index ) in acuteMastitisRepList" :key="acuteMastitisRep.id" @change="handlePainChange">
          <i-radio position="right" :value="acuteMastitisRep.name">
          </i-radio>
        </i-radio-group>
      </i-panel>
      <i-panel title="溢液">
        <i-radio-group :current="currentSpillRep" v-for="(spillRep,index ) in spillRepList" :key="spillRep.id" @change="handlePainChange">
          <i-radio position="right" :value="spillRep.name">
          </i-radio>
        </i-radio-group>
      </i-panel>
      <i-panel title="乳头问题">
        <i-radio-group :current="currentQuestionRep" v-for="(questionRep,index ) in questionRepList" :key="questionRep.id" @change="handlePainChange">
          <i-radio position="right" :value="questionRep.name">
          </i-radio>
        </i-radio-group>
      </i-panel>
      <i-panel title="增生">
        <i-radio-group :current="currentHyperplasiaRep" v-for="(hyperplasiaRep,index ) in hyperplasiaRepList" :key="hyperplasiaRep.id" @change="handlePainChange">
          <i-radio position="right" :value="hyperplasiaRep.name">
          </i-radio>
        </i-radio-group>
      </i-panel>
      <i-panel title="纤维瘤、脂肪瘤">
        <i-radio-group :current="currentFibromaRep" v-for="(fibromaRep,index ) in fibromaRepList" :key="fibromaRep.id" @change="handlePainChange">
          <i-radio position="right" :value="fibromaRep.name">
          </i-radio>
        </i-radio-group>
      </i-panel>
      <i-panel title="乳痛症">
        <i-radio-group :current="currentMastodyniaRep" v-for="(mastodyniaRep,index ) in mastodyniaRepList" :key="mastodyniaRep.id" @change="handlePainChange">
          <i-radio position="right" :value="mastodyniaRep.name">
          </i-radio>
        </i-radio-group>
      </i-panel>
      <i-panel title="乳腺囊肿">
        <i-radio-group :current="currentBreastCystRep" v-for="(breastCystRep,index ) in breastCystRepList" :key="breastCystRep.id" @change="handlePainChange">
          <i-radio position="right" :value="breastCystRep.name">
          </i-radio>
        </i-radio-group>
      </i-panel>
    </div>
  </div>
</template>

<script>
import { getPatientDetail } from '../../config'
export default {
  data () {
    return {
      switch1: false,
      switch2: false,
      switch3: false,
      age: 0,
      phone: '',
      patientName: '',
      postpartumDay: 0,
      nowList: [{
        id: 1,
        name: '少奶'
      }, {
        id: 2,
        name: '生理涨奶'
      }, {
        id: 3,
        name: '乳头问题'
      }, {
        id: 4,
        name: '急性乳腺炎'
      }, {
        id: 5,
        name: '回奶'
      }],
      current: [],
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
      painRepList: [{
        id: 1,
        name: '有'
      }, {
        id: 2,
        name: '无'
      }],
      milkRepList: [{
        id: 1,
        name: '有'
      }, {
        id: 2,
        name: '无'
      }],
      chunksRepList: [{
        id: 1,
        name: '团结'
      }, {
        id: 2,
        name: '条状'
      }, {
        id: 3,
        name: '结节'
      }, {
        id: 4,
        name: '片状'
      }],
      acuteMastitisRepList: [{
        id: 1,
        name: '穿刺引流'
      }, {
        id: 2,
        name: '切开引流'
      }, {
        id: 3,
        name: '自行破溃'
      }, {
        id: 4,
        name: '无'
      }],
      spillRepList: [{
        id: 1,
        name: '清水'
      }, {
        id: 2,
        name: '奶汁'
      }, {
        id: 3,
        name: '鲜血'
      }, {
        id: 4,
        name: '褐色'
      }],
      questionRepList: [{
        id: 1,
        name: '皲裂'
      }, {
        id: 2,
        name: '水肿'
      }, {
        id: 3,
        name: '白斑'
      }, {
        id: 4,
        name: '溃疡'
      }, {
        id: 5,
        name: '疼痛'
      }],
      hyperplasiaRepList: [{
        id: 1,
        name: '有'
      }, {
        id: 2,
        name: '无'
      }],
      fibromaRepList: [{
        id: 1,
        name: '有'
      }, {
        id: 2,
        name: '无'
      }],
      mastodyniaRepList: [{
        id: 1,
        name: '胀痛'
      }, {
        id: 2,
        name: '刺痛'
      }, {
        id: 3,
        name: '间歇痛'
      }],
      breastCystRepList: [{
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
      currentPainRep: '',
      currentMilkRep: '',
      currentChunksRep: '',
      currentAcuteMastitisRep: '',
      currentSpillRep: '',
      currentQuestionRep: '',
      currentHyperplasiaRep: '',
      currentFibromaRep: '',
      currentMastodyniaRep: '',
      currentBreastCystRep: '',
      patInfo: {},
      patRepInfo: {}
    }
  },
  methods: {
    onChange (event) {
      const detail = event.detail
      this.setData({
        'switch1': detail.value
      })
    },
    handleDiseaseChange (data) {
      console.log(data.target.value)
      const index = this.currentDisease.indexOf(data.target.value)
      index === -1 ? this.currentDisease.push(data.target.value) : this.currentDisease.splice(index, 1)
    },
    handleTreatmentChange (data) {
      console.log(data.target.value)
      const index = this.currentTreatment.indexOf(data.target.value)
      index === -1 ? this.currentTreatment.push(data.target.value) : this.currentTreatment.splice(index, 1)
    },
    handleAppearanceChange (data) {
      console.log(data.target.value)
      this.currentAppearance = data.target.value
    },
    handlePainChange (data) {
      console.log(data.target.value)
      this.currentPain = data.target.value
    },
    handleTouchChange (data) {
      console.log(data.target.value)
      this.currentTouch = data.target.value
    },
    handleSecretionChange (data) {
      console.log(data.target.value)
      this.currentSecretion = data.target.value
    },
    onChange1 () {
      this.switch1 === true ? this.switch1 = false : this.switch1 = true
    },
    onChange2 () {
      this.switch2 === true ? this.switch2 = false : this.switch2 = true
    },
    onChange3 () {
      this.switch3 === true ? this.switch3 = false : this.switch3 = true
    },
    handleChange (data) {
      console.log(data.target.value)
      const index = this.current.indexOf(data.target.value)
      index === -1 ? this.current.push(data.target.value) : this.current.splice(index, 1)
    }
  },
  async beforeCreate () {
    // 调用应用实例的方法获取全局数据
    this.userInfo = wx.getStorageSync('userInfo')
    const { patientDetail } = await getPatientDetail(this.userInfo.id)
    wx.setStorageSync('patientDetail', patientDetail)
  },
  mounted () {
    // this.patInfo = wx.getStorageSync('patientDetail')
    // this.patInfo.medicalHistory = '妇科疾病,内分泌疾病'
    // this.patInfo.treatment = '有乳腺病治疗经历,有乳腺病服务经历'
    // this.patInfo.currentState = '少奶,乳头问题'
    // this.patInfo.appearance = '对称且无明显凸起'
    // this.patInfo.pain = '非经期胀痛'
    // this.patInfo.secretion = '无'
    // this.patInfo.touch = '有明显肿块'
    // this.patInfo.isDisease = false
    // this.patInfo.isAllergy = false
    // this.patInfo.postpartumRepair = true
    // this.phone = this.patInfo.phone
    // this.age = this.patInfo.age
    // this.postpartumDay = this.patInfo.postpartumDay
    // this.patientName = this.patInfo.patientName
    // this.currentAppearance = this.patInfo.appearance
    // this.currentPain = this.patInfo.pain
    // this.currentSecretion = this.patInfo.secretion
    // this.currentTouch = this.patInfo.touch
    // this.currentDisease = this.patInfo.medicalHistory.split(',')
    // this.currentTreatment = this.patInfo.treatment.split(',')
    // this.current = this.patInfo.currentState.split(',')
    // this.switch1 = this.patInfo.isDisease
    // this.switch2 = this.patInfo.isAllergy
    // this.switch3 = this.patInfo.postpartumRepair
    // console.log(this.patInfo)
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
