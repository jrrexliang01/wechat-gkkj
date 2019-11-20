<template>
  <div class="container ub-box ub-col">
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff">
      <p class="z-font-size-18 z-color-000" style="padding: 20px 0 20px 20px;">请输入手机号</p>
    </dd>
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px">
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333"><i-input value="" v-model="phone" type="number" autofocus placeholder="请输入手机号" title="+86" right/></span>
      </p>
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333"><i-input value="" v-model="code" type="number" title="邀请码" placeholder="请输入邀请码" right/></span>
      </p>
    </dd>
    <dd class="z-font-size-18 z-color-333 z-padding-h-10-px z-margin-top-30-px">
      <button class="loginBtn" lang="zh_CN" @click="saveUser()">注册</button>
    </dd>
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-between" style="padding: 5px 20px 0 20px;">
      <p class="z-font-size-14 z-color-333">注册代表同意用户协议</p>
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333" style="color: #357cfb;" @click="toDocReg()">我是医生</span>
      </p>
    </dd>
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
    },
    toDocReg () {
      wx.navigateTo({url: '/pages/registerDoc/main'})
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container{width:100%;height:100vh;background:#ffffff}
  .label{border-radius:3px;background: #fff;padding: 3px 5px;margin: 0 5px 5px 0}
  .loginBtn{font-size:18px;color:#fff;padding:0px 20px;margin-left: 10px;margin-right: 10px;background: #357cfb}
</style>
