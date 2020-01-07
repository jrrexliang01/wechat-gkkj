<template>
  <div class="container ub-box ub-col">
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px">
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333"><i-input v-model="phone" type="number" autofocus placeholder="请输入手机号（非必填）" title="+86" maxlength="11" right @change="changValue('phone',$event)"/></span>
      </p>
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333"><i-input v-model="code" type="number" title="推荐码"
                                                          placeholder="请输入推荐码（非必填）" maxlength="8" right
                                                          @change="changValue('code',$event)"/></span>
      </p>
    </dd>
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-between z-margin-top-10-px" style="padding: 5px 20px 0 20px;">
      <p class="z-font-size-16 z-color-333">输入医生推荐码，可以获取医生的专属服务</p>
    </dd>
    <dd class="z-font-size-18 z-color-333 z-padding-h-10-px z-margin-top-30-px">
      <button class="loginBtn" lang="zh_CN" @click="saveUser()">注册</button>
    </dd>
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-between" style="padding: 5px 20px 0 20px;">
      <p class="z-font-size-14 z-color-333">注册代表同意<font style="color: #357cfb;" @click.stop="goTOAgreement()">用户协议</font></p>
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
        code: '',
        docUniqueCode: ''
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
      let location = wx.getStorageSync('location')

      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/patient/add',
        data: {
          openId: sessionKey.openid,
          icon: userInfo.avatarUrl,
          alias: userInfo.nickName,
          county: location.nation || userInfo.county,
          city: location.city || userInfo.city,
          province: location.province || userInfo.province,
          sex: userInfo.gender,
          phone: this.phone,
          docUniqueCode: this.code
        },
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
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
    },
    goTOAgreement () {
      wx.navigateTo({url: '/pages/agreement/main'})
    },
    changValue (val, event) {
      this[val] = event.target.detail.value
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container{width:100%;height:100vh;background:#ffffff}
  .label{border-radius:3px;background: #fff;padding: 3px 5px;margin: 0 5px 5px 0}
  .loginBtn{font-size:18px;color:#fff;padding:0px 20px;margin-left: 10px;margin-right: 10px;background: #357cfb}
</style>
