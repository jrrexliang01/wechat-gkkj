<template>
  <div class="container ub-box ub-col">
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff">
      <p class="z-font-size-18 z-color-000" style="padding: 20px 0 20px 20px;">在线状态</p>
    </dd>
    <dd class="z-width-100-percent z-box-sizing-border z-bg-color-fff z-padding-all-8-px">
      <ul class="z-width-100-percent ub-box ub-col ub-ver">
        <li class="z-width-100-percent ub-box ub-between ub-ver z-margin-bottom-20-px">
          <span class="z-font-size-18 z-color-000 ub-flex-1 z-textAlign-left">是否在线</span>
          <span class="z-font-size-16 z-color-888 ub-flex-2 z-textAlign-right">
              <i-switch :value="switch1" @change="onChange1" slot="footer"></i-switch>
            </span>
        </li>
      </ul>
    </dd>
    <dd class="z-font-size-18 z-color-333 z-padding-h-10-px z-margin-top-30-px">
      <button class="loginBtn" lang="zh_CN" @click="savePrice()">保存</button>
    </dd>
  </div>
</template>

<script>
import { getDocInfo } from '../../../config'
export default {
  data () {
    return {
      switch1: false,
      docInfo: {},
      formData: {}
    }
  },
  async onLoad (options) {
    this.docId = parseInt(options.docId)
    const { docInfo } = await getDocInfo(this.docId)
    wx.setStorageSync('docInfo', docInfo)
    this.docInfo = wx.getStorageSync('docInfo')
    this.switch1 = this.docInfo.onlineStatus
  },
  methods: {
    onChange1 () {
      this.switch1 === true ? this.switch1 = false : this.switch1 = true
    },
    async savePrice () {
      if (this.switch1) {
        this.docInfo.onlineStatus = 1
      } else {
        this.docInfo.onlineStatus = 0
      }
      // TODO 补全后台AJAX
      this.formData = JSON.stringify(this.docInfo)
      wx.request({
        url: 'https://gkkj.jrrexliang.com/api/wx/doc/add',
        data: this.formData,
        method: 'POST',
        header: {
          'content-type': 'application/json', // 默认值
          'wxAuthorization': 'Bearer ' + wx.getStorageSync('token')
        },
        success (res) {
          wx.removeStorageSync('docInfo')
          wx.setStorageSync('docInfo', res.data.data)
          this.$store.commit('showToast', {
            title: '保存成功',
            icon: 'none',
            duration: 1500
          })
        }
      })
    },
    changValue (val, event) {
      this[val] = event.target.detail.value
    }
  },
  mounted () {
    wx.removeStorage('docInfo')
  }
}
</script>

<style lang="stylus" scoped>
  .container{width:100%;height:100vh;background:#ffffff}
  .label{border-radius:3px;background: #fff;padding: 3px 5px;margin: 0 5px 5px 0}
  .loginBtn{font-size:18px;color:#fff;padding:0px 20px;margin-left: 10px;margin-right: 10px;background: #357cfb}
</style>
