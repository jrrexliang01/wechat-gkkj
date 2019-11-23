<template>
  <div class="bg">
    <div class="card" style="margin-top:20px">
      <view style="margin: 16px">用户信息</view>
      <i-input value="" v-model="patientName" title="姓名"/>
      <i-input value="" v-model="age" title="年龄"/>
      <i-input value="" v-model="phone" title="电话"/>
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
    </div>
    <div class="revise">
      <button @click="add" class="btn" style="background-color: #5ca2f2;">保存</button>
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
      form: {
        patientName: '',
        age: 0,
        phone: '',
        isDisease: false,
        isAllergy: false,
        postpartumDay: 0,
        postpartumRepair: false,
        currentState: []
      },
      formData: {},
      status: 0,
      docInfo: {}
    }
  },
  methods: {
    async add () {
      this.form.patientName = this.patientName
      this.form.age = this.age
      this.form.phone = this.phone
      this.form.isDisease = this.switch1
      this.form.isAllergy = this.switch2
      this.form.postpartumDay = this.postpartumDay
      this.form.postpartumRepair = this.switch3
      this.form.currentState = this.current.toString()
      this.formData = JSON.stringify(this.form)
      console.log('这是JSON' + this.formData)
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
