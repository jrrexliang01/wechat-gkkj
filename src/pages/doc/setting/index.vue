<template>
  <div class="container ub-box ub-col">
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff">
      <p class="z-font-size-18 z-color-000" style="padding: 20px 0 20px 20px;">随访设置</p>
    </dd>
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px">
      <p class="ub-box">
        <span class="z-font-size-14 z-color-333"><i-input v-model="day" type="number" title="随访天数" placeholder="请输入随访天数" maxlength="2" right @change="changValue('day',$event)"/></span>
      </p>
    </dd>
    <dd class="z-font-size-18 z-color-333 z-padding-h-10-px z-margin-top-30-px">
      <button class="loginBtn" lang="zh_CN" @click="saveDay()">保存</button>
    </dd>
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px ub-box ub-between" style="padding: 5px 20px 0 20px;">
      <p class="z-font-size-14 z-color-333">随访天数用来通过系统提示您何时对患者进行随访。</p>
    </dd>
  </div>
</template>

<script>
export default {
  data () {
    return {
      day: '',
      form: {
        day: ''
      },
      formData: {}
    }
  },
  methods: {
    async saveDay () {
      this.form.day = this.day
      // let sessionKey = wx.getStorageSync('sessionKey')
      // let userInfo = wx.getStorageSync('userInfo')
      // TODO 补全后台AJAX
      // wx.request({
      //   url: 'https://gkkj.jrrexliang.com/api/wx/patient/add',
      //   data: {
      //     openId: sessionKey.openid,
      //     icon: userInfo.avatarUrl,
      //     alias: userInfo.nickName,
      //     phone: this.form.phone
      //   },
      //   method: 'POST',
      //   success (res) {
      //     wx.setStorageSync('userInfo', res.data.data)
      //     wx.navigateTo({url: '/pages/init/main'})
      //   }
      // })
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
