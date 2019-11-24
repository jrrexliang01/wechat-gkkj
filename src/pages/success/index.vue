<template>
  <div class="counter-warp">
    <i-card @click="toMyInfo">
      <img src="http://39.100.255.143/img/wx/pay.png" size="large" shape="square"  style="height: 600px;width: 100%;"/>
    </i-card>
  </div>
</template>

<script>
import { msgAdd } from '../../config'
export default {
  data () {
    return {
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
      this.msgInfo.msg = this.userInfo.patientName + '您好，您的订单已支付成功！'
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
          let url = '../myInfo/main'
          wx.navigateTo({ url: url })
        } else {
          console.log('保存消息失败！')
        }
      } else {
        console.log('保存消息失败！')
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
