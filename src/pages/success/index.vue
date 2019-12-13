<template>
  <div class="counter-warp">
    <i-card @click="toMyInfo">
      <img src="http://39.100.255.143:8013/img/wx/pay.png" size="large" shape="square"  style="height: 600px;width: 100%;"/>
    </i-card>
  </div>
</template>

<script>
import { msgAdd } from '../../config'
export default {
  data () {
    return {
      id: '',
      userInfo: {},
      docInfo: {},
      status: 0,
      msgInfo: {
        title: '',
        userId: 0,
        userType: 0,
        msg: ''
      },
      msgDocInfo: {
        title: '',
        userId: 0,
        userType: 0,
        msg: ''
      },
      formData: {},
      formDocData: {}
    }
  },
  methods: {
    async toMyInfo () {
      this.msgInfo.title = '订单消息'
      this.msgInfo.userId = this.userInfo.id
      this.msgInfo.userType = 2
      if (this.userInfo.patientName === null) {
        this.msgInfo.msg = '患者您好，您的订单已支付成功！'
      } else {
        this.msgInfo.msg = this.userInfo.patientName + '您好，您的订单已支付成功！'
      }

      this.formData = JSON.stringify(this.msgInfo)
      const { status } = await msgAdd(this.formData)
      this.status = status
      if (this.status === 1) {
        this.msgDocInfo.title = '诊疗消息'
        this.msgDocInfo.userId = this.docInfo.id
        this.msgDocInfo.userType = 1
        this.msgDocInfo.msg = this.docInfo.docName + '您好，有新的诊疗信息！'
        this.formDocData = JSON.stringify(this.msgDocInfo)
        const { status } = await msgAdd(this.formDocData)
        this.status = status
        if (this.status === 1) {
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
        }
      } else {
      }
    }
  },
  onUnload: function () {
    wx.reLaunch({
      url: '../home/main'
    })
  },
  mounted () {
    this.docInfo = wx.getStorageSync('docInfo')
    this.userInfo = wx.getStorageSync('userInfo')
  }
}
</script>

<style lang="stylus" scoped>
.counter-warp
  text-align center
  margin-top 100px
</style>
