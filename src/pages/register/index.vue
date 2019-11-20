<template>
  <div class="container ub-box ub-col">
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff" style="border-bottom: 1px solid #f5f5f5">
      <p class="z-font-size-20 z-color-888" style="color: #5ca2f2;padding: 10px;">患者注册</p>
    </dd>
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px" style="border-bottom: 1px solid #f5f5f5">
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333"><i-input value="" v-model="phone" title="手机号"/></span>
      </p>
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333"><i-input value="" v-model="code" title="邀请码"/></span>
      </p>
    </dd>
    <div class="revise">
      <button @click="saveUser()" class="btn" style="background-color: #5ca2f2;margin: 20px;">注册</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      phone: '',
      code: '',
      form: {
        phone: '',
        code: ''
      },
      formData: {}
    }
  },
  methods: {
    async saveUser () {
      this.form.phone = this.phone
      this.form.code = this.code
      let sessionKey = wx.getStorageSync('sessionKey')
      let userInfo = wx.getStorageSync('userInfo')
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/patient/add',
        data: {
          openId: sessionKey.openid,
          icon: userInfo.avatarUrl,
          alias: userInfo.nickName,
          phone: this.form.phone
        },
        method: 'POST',
        success (res) {
          wx.setStorageSync('userInfo', res.data.data)
          wx.navigateTo({url: '/pages/init/main'})
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container{width:100%;height:100vh;background:#ffffff}
  .label{border-radius:3px;background: #fff;padding: 3px 5px;margin: 0 5px 5px 0}
</style>
