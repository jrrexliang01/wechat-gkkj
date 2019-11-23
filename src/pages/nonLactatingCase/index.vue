<template>
  <div class="bg">
    <div class="card" style="margin-top:20px">
      <view style="margin: 2px"></view>
      <i-input value="" v-model="patientName" title="姓名"/>
      <i-input value="" v-model="age" title="年龄"/>
      <i-input value="" v-model="phone" title="电话"/>
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
    </div>
    <div class="revise">
<!--      <button @click="deleteFriend" class="btn delete">删除好友</button>-->
      <button @click="addOut" class="btn" style="background-color: #5ca2f2;">保存</button>
    </div>
  </div>
</template>

<script>
import { patientAdd } from '../../config'
export default {
  data () {
    return {
      id: '',
      content: '',
      age: 0,
      phone: '',
      patientName: '',
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
        age: 0,
        phone: '',
        medicalHistory: [],
        treatment: [],
        appearance: '',
        pain: '',
        touch: '',
        secretion: ''
      },
      formData: {},
      status: 0,
      docInfo: {}
    }
  },
  methods: {
    // 拉黑好友
    async addOut () {
      this.form.patientName = this.patientName
      this.form.age = this.age
      this.form.phone = this.phone
      this.form.medicalHistory = this.currentDisease.toString()
      this.form.treatment = this.currentTreatment.toString()
      this.form.appearance = this.currentAppearance
      this.form.pain = this.currentPain
      this.form.touch = this.currentTouch
      this.form.secretion = this.currentSecretion
      console.log(this.form)
      this.formData = JSON.stringify(this.form)
      const { status } = await patientAdd(this.formData)
      this.status = status
      if (this.status === 1) {
        this.$store.commit('showToast', {
          title: '保存成功',
          icon: 'none',
          duration: 1500
        })
        this.docInfo = wx.getStorageSync('docInfo')
        this.id = this.docInfo.openId
        this.content = '医生，您好'
        if (this.content !== '' && this.id !== '') {
          let option = {
            userIDList: [this.id]
          }
          wx.$app.getUserProfile(option).then((res) => {
            if (res.data.length > 0) {
              const message = wx.$app.createTextMessage({
                to: this.id,
                conversationType: this.TIM.TYPES.CONV_C2C,
                payload: { text: this.content }
              })
              wx.$app.sendMessage(message).then(() => {
                let conversationID = this.TIM.TYPES.CONV_C2C + this.id
                wx.$app.getConversationProfile(conversationID).then((res) => {
                  this.$store.commit('resetCurrentConversation')
                  this.$store.commit('resetGroup')
                  this.$store.commit('updateCurrentConversation', res.data.conversation)
                  this.$store.dispatch('getMessageList', conversationID)
                  this.content = ''
                  this.id = ''
                  let url = `../chat/main?toAccount=${res.data.conversation.userProfile.nick || res.data.conversation.userProfile.userID}`
                  wx.navigateTo({ url })
                }).catch(error => {
                  console.log(error)
                })
              }).catch(() => {
                this.$store.commit('showToast', {
                  title: '输入内容有误',
                  icon: 'none',
                  duration: 1000
                })
              })
            } else {
              this.$store.commit('showToast', {
                title: '用户不存在',
                icon: 'none',
                duration: 1000
              })
              this.id = ''
              this.content = ''
            }
          }).catch(() => {
            this.$store.commit('showToast', {
              title: '用户不存在',
              icon: 'none',
              duration: 1000
            })
            this.id = ''
            this.content = ''
          })
        }
      } else {
        console.log('用户保存失败！')
      }
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
