<template>
  <div class="counter-warp">
    <i-card @click="toMyInfo">
      <img src="http://39.100.255.143:8013/img/wx/pay.png" size="large" shape="square"  style="height: 600px;width: 100%;"/>
    </i-card>
  </div>
</template>

<script>
import { msgAdd } from '../../../config'
export default {
  data () {
    return {
      courseInfo: {},
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
      formDocData: {},
      docId: 0
    }
  },
  methods: {
    async toMyInfo () {
      this.msgInfo.title = '订单消息'
      this.msgInfo.userId = this.docInfo.id
      this.msgInfo.userType = 1
      this.msgInfo.msg = this.docInfo.docName + '您好，您的订单已支付成功！'
      this.formData = JSON.stringify(this.msgInfo)
      const { status } = await msgAdd(this.formData)
      this.status = status
      if (this.status === 1) {
        this.docId = this.docInfo.id
        let url = '/pages/doc/myCourse/main?docId=' + this.docId
        wx.navigateTo({ url: url })
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
    this.courseInfo = wx.getStorageSync('courseInfo')
    this.docInfo = wx.getStorageSync('userInfo')
  }
}
</script>

<style lang="stylus" scoped>
.counter-warp
  text-align center
  margin-top 100px
</style>
